# Security + DevOps Assessment Report

## Live Deployment

**Live URL:** https://demo-testing.duckdns.org

### Technology Stack
- Next.js 15
- Node.js 18
- Nginx
- PM2
- Ubuntu 24.04
- Let's Encrypt SSL

---

# Security Testing Methodology

The application and infrastructure were tested using:

- curl
- Browser DevTools
- Manual HTTP header inspection
- Nginx configuration review
- OWASP Top 10 2021 methodology
- Manual attack simulation

The assessment focused on:

- Application security
- Web server hardening
- Abuse prevention
- Infrastructure security
- Misconfiguration risks
- Real-world attack scenarios

---

# Findings Overview

| # | Vulnerability | Severity | Status |
|---|---|---|---|
| 1 | Missing Rate Limiting on `/api/sendgrid` | High | ✅ Remediated |
| 2 | Unsanitized User Input in Email Body | High | ✅ Remediated |
| 3 | Public Access to `.git` Directory | High | ✅ Remediated |
| 4 | Missing HTTPS Enforcement | High | ✅ Remediated |
| 5 | Clickjacking Vulnerability | Medium | ✅ Remediated |
| 6 | Missing Security Headers | Medium | ✅ Remediated |
| 7 | Application Running as Root User | Critical | ✅ Remediated |
| 8 | Technology Information Disclosure | Low | ✅ Remediated |

---

# 1. Missing Rate Limiting on `/api/sendgrid`

## OWASP Category
**A04:2021 – Insecure Design**

## Severity
**High**

## Affected File
`/etc/nginx/sites-available/lt-nilavan`

## Description

The `/api/sendgrid` endpoint originally had no request throttling or abuse prevention.

An attacker could continuously send requests to the contact form endpoint and flood the business owner's inbox or exhaust the SendGrid quota.

Initially, rate limiting was applied globally, but that affected frontend asset loading because Next.js loads multiple static resources simultaneously. The fix was later scoped specifically to `/api/sendgrid`.

## Business Impact

An attacker could:

- Flood the business inbox
- Exhaust SendGrid quota
- Trigger denial-of-service conditions
- Cause operational disruption

## Proof of Concept

```bash
for i in $(seq 1 20); do
  curl -s -o /dev/null -w "Request $i: %{http_code}\n" \
    -X POST https://demo-testing.duckdns.org/api/sendgrid \
    -H "Content-Type: application/json" \
    -d '{"name":"spam","email":"spam@test.com","phone":"9999999999","message":"spam"}'
done
```

### Output After Fix

```text
Request 1: 500
Request 2: 500
Request 3: 500
Request 4: 429
Request 5: 429
```

## Recommended Fix

```nginx
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=5r/m;

location /api/sendgrid {

    limit_req zone=api_limit burst=3 nodelay;
    limit_req_status 429;

    proxy_pass http://localhost:3000;
}
```

## Status
✅ Remediated

---

# 2. Unsanitized User Input in Email Body

## OWASP Category
**A03:2021 – Injection**

## Severity
**High**

## Description

The contact form accepted unsanitized user input and inserted it directly into the email body.

An attacker could inject phishing links or malicious content into emails appearing to originate from the business system.

## Business Impact

An attacker could:

- Send phishing emails
- Abuse the business email system
- Trick employees or customers
- Damage brand reputation

## Proof of Concept

```bash
curl -X POST https://demo-testing.duckdns.org/api/sendgrid \
  -H "Content-Type: application/json" \
  -d '{
    "name":"IT Support",
    "email":"attacker@test.com",
    "phone":"9999999999",
    "message":"Urgent verification required: https://evil-example.com"
  }'
```

## Recommended Fix

Added input validation and sanitization.

Example:

```javascript
const safeMessage = message.replace(/<[^>]*>/g, '');
```

Additional recommendations:

- CAPTCHA
- URL filtering
- Input length restrictions
- Strict validation

## Status
✅ Remediated

---

# 3. Public Access to `.git` Directory

## OWASP Category
**A05:2021 – Security Misconfiguration**

## Severity
**High**

## Description

If the `.git` directory becomes publicly accessible, attackers can retrieve source code, git history, deployment information, and accidentally committed secrets.

## Business Impact

An attacker could:

- Download source code
- Discover sensitive endpoints
- Retrieve credentials
- Analyze internal implementation

## Proof of Concept

```bash
curl -I https://demo-testing.duckdns.org/.git/config
```

### Output

```text
HTTP/1.1 403 Forbidden
```

## Recommended Fix

```nginx
location /.git {
    deny all;
    return 403;
}
```

## Status
✅ Remediated

---

# 4. Missing HTTPS Enforcement

## OWASP Category
**A02:2021 – Cryptographic Failures**

## Severity
**High**

## Description

The application initially allowed HTTP access without forced HTTPS redirection.

This exposed traffic to interception and man-in-the-middle attacks.

## Business Impact

An attacker could:

- Intercept user traffic
- Capture sensitive data
- Hijack sessions
- Modify requests

## Proof of Concept

```bash
curl -I http://demo-testing.duckdns.org
```

### Output After Fix

```text
HTTP/1.1 301 Moved Permanently
Location: https://demo-testing.duckdns.org/
```

## Recommended Fix

```nginx
server {
    listen 80;
    return 301 https://$host$request_uri;
}
```

## Status
✅ Remediated

---

# 5. Clickjacking Vulnerability

## OWASP Category
**A05:2021 – Security Misconfiguration**

## Severity
**Medium**

## Description

Without clickjacking protection, attackers could embed the website inside malicious external pages using iframes.

## Business Impact

An attacker could:

- Trick users into unintended actions
- Create phishing overlays
- Abuse user trust

## Proof of Concept

```bash
curl -I https://demo-testing.duckdns.org
```

### Output

```text
X-Frame-Options: DENY
```

## Recommended Fix

```nginx
add_header X-Frame-Options "DENY" always;
```

## Status
✅ Remediated

---

# 6. Missing Security Headers

## OWASP Category
**A05:2021 – Security Misconfiguration**

## Severity
**Medium**

## Description

The application initially lacked several important browser security headers.

## Business Impact

Missing security headers increase exposure to:

- Clickjacking
- MIME sniffing
- SSL stripping
- Browser abuse
- Information leakage

## Recommended Fix

```nginx
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

## Status
✅ Remediated

---

# 7. Application Running as Root User

## OWASP Category
**A05:2021 – Security Misconfiguration**

## Severity
**Critical**

## Description

Running the Node.js application as root significantly increases the impact of server compromise.

## Business Impact

If the application becomes compromised, attackers could:

- Read system files
- Access SSH keys
- Create backdoor users
- Install malware
- Fully compromise the server

## Proof of Concept

```bash
ps aux | grep node
```

### Output

```text
app-user
```

## Recommended Fix

```bash
sudo adduser app-user
sudo -u app-user pm2 start npm --name "lt-nilavan" -- start
```

## Status
✅ Remediated

---

# 8. Technology Information Disclosure

## OWASP Category
**A05:2021 – Security Misconfiguration**

## Severity
**Low**

## Description

The application exposed technology and server information through HTTP response headers.

Observed headers:

```text
Server: nginx/1.24.0
X-Powered-By: Next.js
```

## Business Impact

Attackers could fingerprint technologies and search for known vulnerabilities.

## Recommended Fix

### Nginx

```nginx
server_tokens off;
```

### Next.js

```javascript
module.exports = {
  poweredByHeader: false,
};
```

## Status
✅ Remediated

---

# Query-Style Threat Scenarios

---

# Scenario 1 — Flooding the Business Inbox

## Attack Goal

> "I want to flood the business owner's inbox with thousands of spam emails using the contact form."

## Demonstration

```bash
for i in $(seq 1 20); do
  curl -X POST https://demo-testing.duckdns.org/api/sendgrid \
    -H "Content-Type: application/json" \
    -d '{"name":"spam","email":"spam@test.com","phone":"9999999999","message":"spam"}'
done
```

## Result

Without protection:

- Requests were continuously accepted
- SendGrid quota could be exhausted
- Inbox flooding was possible

After remediation:

```text
429 Too Many Requests
```

## Fix

Implemented targeted Nginx rate limiting for `/api/sendgrid`.

---

# Scenario 2 — Injecting Malicious Links Into Emails

## Attack Goal

> "I want to inject a malicious link into an email that appears to come from the business's own system."

## Demonstration

```bash
curl -X POST https://demo-testing.duckdns.org/api/sendgrid \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Attacker",
    "email":"attacker@test.com",
    "phone":"9999999999",
    "message":"Reset your password here: https://evil-example.com"
  }'
```

## Result

The malicious content would appear in the business inbox as a legitimate website-generated email.

## Fix

Implemented validation and sanitization before processing user content.

---

# Scenario 3 — Accessing Source Code Without Credentials

## Attack Goal

> "I want to access the full source code of the application from the browser without credentials."

## Demonstration

```bash
curl -I https://demo-testing.duckdns.org/.git/config
```

## Result

```text
HTTP/1.1 403 Forbidden
```

## Fix

Configured Nginx to deny access to hidden files and directories.

---

# Scenario 4 — Clickjacking Attack

## Attack Goal

> "I want to embed this website inside my own malicious site to trick users."

## Demonstration

```bash
curl -I https://demo-testing.duckdns.org
```

## Result

```text
X-Frame-Options: DENY
```

Browser blocks iframe embedding attempts.

## Fix

Implemented clickjacking protection headers.

---

# Scenario 5 — Running the Application as Root

## Attack Goal

> "I gained access to the server - how did running the app as root make things worse?"

## Impact

If the application runs as root and becomes compromised, attackers immediately gain full server control.

Possible attacker actions:

- Read `/etc/shadow`
- Access SSH private keys
- Install malware
- Create backdoor users
- Persist via cron jobs
- Modify system services

## Fix

Application processes were moved to a dedicated non-root user:

```text
app-user
```

---

# Final Hardening Summary

The deployment was hardened using:

- HTTPS enforcement
- Nginx reverse proxy
- PM2 process management
- Non-root application execution
- Security headers
- Clickjacking protection
- Hidden file protection
- Rate limiting
- SSL via Let's Encrypt
- UFW firewall restrictions

---

# Included Evidence

The `screenshots/` directory contains evidence for:

- UFW firewall status
- PM2 process list
- HTTPS working in browser
- SSL certificate validation
- Security headers
- Rate limiting validation
- Nginx configuration
- `.git` protection
- Clickjacking protection

---
