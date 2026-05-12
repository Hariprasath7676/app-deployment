SECURITY_REPORT.md
Security + DevOps Assessment Report

Live URL: https://demo-testing.duckdns.org

Application Stack: Next.js 15, Node.js 18, Nginx, PM2, Ubuntu 24.04
Assessment Type: Manual Security Review + Live Deployment Hardening

Security Testing Methodology

The application and deployment were tested using:

curl
Browser DevTools
Manual HTTP header inspection
Nginx configuration review
OWASP Top 10 2021 methodology
Manual attack simulation

The assessment focused on:

Application security
Server hardening
Abuse prevention
Misconfiguration risks
Deployment security
Real-world attack scenarios
Findings Overview
#	Vulnerability	Severity	Status
1	Missing Rate Limiting on Contact Form API	High	Remediated
2	Unsanitized User Input in Email Body	High	Remediated
3	Public Access to .git Directory	High	Remediated
4	Missing HTTPS Enforcement	High	Remediated
5	Clickjacking Vulnerability	Medium	Remediated
6	Missing Security Headers	Medium	Remediated
7	Application Running as Root User	Critical	Remediated
8	Technology Information Disclosure	Low	Remediated
1. Missing Rate Limiting on Contact Form API
OWASP Category

A04:2021 – Insecure Design

Affected File

Nginx configuration

/etc/nginx/sites-available/lt-nilavan

Severity

High

Description

The /api/sendgrid endpoint originally had no request throttling or abuse prevention.

An attacker could continuously send requests to the contact form endpoint and flood the business inbox or exhaust the SendGrid quota.

Initially, rate limiting was applied globally, but that affected Next.js frontend asset loading because multiple static resources are requested simultaneously. The fix was later scoped specifically to /api/sendgrid to protect the vulnerable functionality without impacting normal frontend traffic.

Business Impact

An attacker could:

Flood the business owner's inbox
Exhaust SendGrid email quota
Cause operational disruption
Trigger denial-of-service conditions
Proof of Concept
for i in $(seq 1 20); do
  curl -s -o /dev/null -w "Request $i: %{http_code}\n" \
    -X POST https://demo-testing.duckdns.org/api/sendgrid \
    -H "Content-Type: application/json" \
    -d '{"name":"spam","email":"spam@test.com","phone":"9999999999","message":"spam"}'
done

Observed output after fix:

Request 1: 500
Request 2: 500
Request 3: 500
Request 4: 429
Request 5: 429
Recommended Fix

Implemented Nginx rate limiting specifically for the vulnerable API endpoint.

limit_req_zone $binary_remote_addr zone=api_limit:10m rate=5r/m;

location /api/sendgrid {

    limit_req zone=api_limit burst=3 nodelay;
    limit_req_status 429;

    proxy_pass http://localhost:3000;
}
Status

Remediated

2. Unsanitized User Input in Email Body
OWASP Category

A03:2021 – Injection

Affected File

SendGrid API route

Severity

High

Description

The contact form accepted user-controlled input and directly inserted it into the email body.

An attacker could submit phishing links or malicious content that would arrive in the business owner's inbox appearing to originate from the legitimate website.

Business Impact

An attacker could:

Send phishing emails
Abuse the business email system
Trick employees or customers
Damage brand reputation
Proof of Concept
curl -X POST https://demo-testing.duckdns.org/api/sendgrid \
  -H "Content-Type: application/json" \
  -d '{
    "name":"IT Support",
    "email":"attacker@test.com",
    "phone":"9999999999",
    "message":"Urgent verification required: https://evil-example.com"
  }'
Recommended Fix

Added input validation and sanitization before processing user data.

Example:

const safeMessage = message.replace(/<[^>]*>/g, '');

Additional protections recommended:

HTML stripping
Input length limits
Email validation
CAPTCHA implementation
URL filtering
Status

Remediated

3. Public Access to .git Directory
OWASP Category

A05:2021 – Security Misconfiguration

Affected File

Nginx configuration

/etc/nginx/sites-available/lt-nilavan

Severity

High

Description

If the .git directory becomes publicly accessible, attackers can retrieve source code, git history, secrets accidentally committed to the repository, and deployment information.

Business Impact

An attacker could:

Download application source code
Analyze internal implementation details
Search for secrets or credentials
Discover sensitive endpoints
Proof of Concept
curl -I https://demo-testing.duckdns.org/.git/config

Observed response:

HTTP/1.1 403 Forbidden
Recommended Fix

Configured Nginx to block access to hidden files and directories.

location ~ /\. {
    deny all;
    return 403;
}
Status

Remediated

4. Missing HTTPS Enforcement
OWASP Category

A02:2021 – Cryptographic Failures

Affected File

Nginx configuration

Severity

High

Description

The application initially allowed HTTP access without forced redirection to HTTPS.

This exposed user traffic to interception or modification.

Business Impact

An attacker could:

Intercept traffic
Perform man-in-the-middle attacks
Capture sensitive user data
Hijack sessions
Proof of Concept
curl -I http://demo-testing.duckdns.org

After remediation:

HTTP/1.1 301 Moved Permanently
Location: https://demo-testing.duckdns.org/
Recommended Fix

Configured HTTP to HTTPS redirection.

server {
    listen 80;
    return 301 https://$host$request_uri;
}

Configured SSL using Let's Encrypt Certbot.

Status

Remediated

5. Clickjacking Vulnerability
OWASP Category

A05:2021 – Security Misconfiguration

Affected File

Nginx configuration

Severity

Medium

Description

Without clickjacking protection, attackers could embed the website inside malicious external pages using an iframe and trick users into interacting with hidden elements.

Business Impact

An attacker could:

Trick users into unintended actions
Create phishing overlays
Abuse user trust
Proof of Concept

Validation:

curl -I https://demo-testing.duckdns.org

Observed header:

X-Frame-Options: DENY
Recommended Fix

Implemented clickjacking protection headers.

add_header X-Frame-Options "DENY" always;
Status

Remediated

6. Missing Security Headers
OWASP Category

A05:2021 – Security Misconfiguration

Affected File

Nginx configuration

Severity

Medium

Description

The application initially lacked important browser security headers.

Business Impact

Missing security headers increase exposure to:

Clickjacking
MIME sniffing
SSL stripping
Browser abuse
Information leakage
Proof of Concept
curl -I https://demo-testing.duckdns.org
Recommended Fix

Implemented the following headers:

add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
Status

Remediated

7. Application Running as Root User
OWASP Category

A05:2021 – Security Misconfiguration

Affected File

Server deployment configuration

Severity

Critical

Description

Running Node.js applications as root significantly increases the impact of application compromise.

If an attacker gains code execution, they immediately obtain full server privileges.

Business Impact

An attacker could:

Read sensitive system files
Access SSH keys
Create backdoor users
Modify system services
Fully compromise the server
Proof of Concept

Application processes were verified to run under a dedicated non-root account.

ps aux | grep node

Observed:

app-user
Recommended Fix

Created dedicated application user and executed PM2 processes under limited privileges.

sudo adduser app-user
sudo -u app-user pm2 start npm --name "nextjs-app" -- start
Status

Remediated

8. Technology Information Disclosure
OWASP Category

A05:2021 – Security Misconfiguration

Affected File

Nginx configuration and Next.js configuration

Severity

Low

Description

The application exposed framework and server information through HTTP response headers.

Observed headers:

Server: nginx/1.24.0
X-Powered-By: Next.js
Business Impact

Attackers could fingerprint technologies and target known vulnerabilities.

Recommended Fix

Disabled version disclosure.

Nginx:

server_tokens off;

Next.js:

module.exports = {
  poweredByHeader: false,
};
Status

Remediated

Query-Style Threat Scenarios
Scenario 1 — Flooding the Business Inbox
Attack Goal

"I want to flood the business owner's inbox with thousands of spam emails using the contact form."

Attack Method

The /api/sendgrid endpoint originally had no rate limiting.

An attacker could automate requests using a simple shell loop.

Demonstration
for i in $(seq 1 20); do
  curl -X POST https://demo-testing.duckdns.org/api/sendgrid \
    -H "Content-Type: application/json" \
    -d '{"name":"spam","email":"spam@test.com","phone":"9999999999","message":"spam"}'
done
Result

Without protection:

Requests were continuously accepted
SendGrid quota could be exhausted
Inbox flooding was possible

After remediation:

429 Too Many Requests
Fix

Implemented targeted Nginx rate limiting on /api/sendgrid.

Scenario 2 — Injecting Malicious Links Into Emails
Attack Goal

"I want to inject a malicious link into an email that appears to come from the business's own system."

Attack Method

The contact form accepted unsanitized user input.

An attacker could insert phishing links inside the message field.

Demonstration
curl -X POST https://demo-testing.duckdns.org/api/sendgrid \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Attacker",
    "email":"attacker@test.com",
    "phone":"9999999999",
    "message":"Reset your password here: https://evil-example.com"
  }'
Result

The malicious content would appear in the business inbox originating from the legitimate website mail system.

Fix

Added input validation and sanitization before processing email content.

Scenario 3 — Accessing Source Code Without Credentials
Attack Goal

"I want to access the full source code of the application from the browser without any credentials."

Attack Method

Attackers commonly target exposed .git directories to retrieve repository contents and commit history.

Demonstration
curl -I https://demo-testing.duckdns.org/.git/config
Result

Observed:

HTTP/1.1 403 Forbidden
Fix

Configured Nginx deny rules for hidden files and directories.

Scenario 4 — Clickjacking Attack
Attack Goal

"I want to embed this website inside my own malicious site to trick users."

Attack Method

Without clickjacking protection, attackers can iframe the website inside deceptive pages.

Demonstration

Verified protection using:

curl -I https://demo-testing.duckdns.org

Observed:

X-Frame-Options: DENY
Result

The browser blocks iframe embedding attempts.

Fix

Implemented clickjacking protection headers.

Scenario 5 — Running the Application as Root
Attack Goal

"I gained access to the server - how did running the app as root make things worse?"

Attack Method

If the application runs as root and an attacker gains code execution, they immediately obtain complete server control.

Possible Actions After Compromise

An attacker could:

Read /etc/shadow
Access SSH private keys
Install malware
Create privileged users
Modify system services
Persist via cron jobs
Fix

Application processes were moved to a dedicated non-root user:

app-user

This significantly reduced the impact of server compromise.

Final Hardening Summary

The deployment was hardened using:

HTTPS enforcement
Nginx reverse proxy
PM2 process management
Non-root application execution
Security headers
Clickjacking protection
Hidden file protection
Rate limiting
SSL via Let's Encrypt
UFW firewall restrictions
