# Approach, Methodology, and Deployment Decisions

# Approach to Finding Vulnerabilities

I first reviewed the application source code to understand how the application works before deploying it. The application mainly exposed a contact form integrated with SendGrid, so I focused primarily on API abuse possibilities, input handling, deployment misconfigurations, and publicly exposed resources.

After understanding the application flow, I deployed the application on an Ubuntu EC2 instance and started testing it from an attacker's perspective.

The assessment focused on:

- Publicly exposed endpoints
- Email abuse possibilities
- Source code exposure
- HTTP security headers
- HTTPS enforcement
- Server hardening
- Privilege separation
- Reverse proxy security
- Browser-side protections

The testing methodology included:

- Manual code review
- curl-based API testing
- Browser DevTools inspection
- HTTP header analysis
- Nginx configuration review
- Manual attack simulation
- OWASP Top 10 2021 mapping

Tools used during testing:

- curl
- Browser DevTools
- Nginx logs
- PM2 monitoring
- Manual request replay
- Linux system utilities

---

# Server Setup Decisions and Reasoning

## Non-Root Application Execution

A dedicated user (`app-user`) was created to run the Node.js application instead of running the application as root.

Reason:
If the application becomes compromised, running under a limited user significantly reduces the impact and prevents full server takeover.

---

## Nginx Reverse Proxy

Nginx was used as a reverse proxy in front of the Next.js application.

Reason:
Nginx provides:

- Better request handling
- SSL termination
- Security header management
- Rate limiting
- Hidden file protection
- Reverse proxy isolation

---

## HTTPS Enforcement

HTTPS was enforced using Let's Encrypt SSL certificates and HTTP-to-HTTPS redirection.

Reason:
This protects user traffic from interception and ensures encrypted communication between clients and the application.

---

## UFW Firewall Configuration

Only required ports were allowed:

- SSH
- HTTP (80)
- HTTPS (443)

Reason:
Restricting unnecessary inbound ports reduces attack surface exposure.

---

## Security Headers

Security headers were added through Nginx:

- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security
- Content-Security-Policy

Reason:
These headers improve browser-side security protections and reduce risks like clickjacking and MIME sniffing.

---

## Rate Limiting

Rate limiting was applied specifically to `/api/sendgrid`.

Reason:
Initially, global rate limiting caused issues because Next.js loads multiple frontend assets simultaneously. Applying the limit only to the vulnerable API endpoint protected the application without affecting normal frontend behavior.

---

## Hidden File Protection

Access to `.git` and hidden files was blocked through Nginx configuration.

Reason:
Exposed git repositories can leak source code, commit history, credentials, and deployment details.

---

# Trade-Offs and Implementation Considerations

## Content Security Policy Trade-Off

A stricter Content Security Policy initially broke frontend rendering and Google Maps functionality because the application relied on inline styles/scripts and external map resources.

The final CSP policy was adjusted to allow:

- Google Maps
- Inline styles
- Inline scripts
- Blob/data resources

Trade-off:
The policy became slightly less strict, but application functionality remained stable.

---

## Rate Limiting Trade-Off

Global rate limiting affected frontend asset loading and caused the website to partially fail rendering.

The final implementation limited only `/api/sendgrid`.

Trade-off:
This protects the vulnerable API endpoint while avoiding impact to legitimate frontend requests.

---

## Reverse Proxy Simplicity

The deployment intentionally used a simple Nginx + PM2 architecture rather than containers or orchestration tools.

Reason:
The objective focused on secure deployment, infrastructure hardening, and vulnerability assessment rather than large-scale orchestration complexity.

---

# Final Outcome

The application was successfully deployed and secured with:

- HTTPS enforcement
- Nginx reverse proxy
- PM2 process management
- Non-root application execution
- Security headers
- Clickjacking protection
- Hidden file protection
- API rate limiting
- UFW firewall restrictions
- SSL certificate management

The deployment remained fully functional while significantly improving the application's security posture.

---````
