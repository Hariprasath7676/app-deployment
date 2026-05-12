# DEPLOYMENT.md

# Next.js Application Deployment Guide

## Server Information

- OS: Ubuntu 24.04 LTS
- Web Server: Nginx
- Process Manager: PM2
- SSL: Let's Encrypt (Certbot)
- Application: Next.js 15
- Runtime: Node.js 18+

---

# 1. Launch EC2 Instance

Launched Ubuntu 24.04 EC2 instance.

Configured inbound security group rules:

- SSH (2676)
- HTTP (80)
- HTTPS (443)

---

# 2. SSH Into Server

```bash
ssh -i key.pem ubuntu@<server-ip>
```

---

# 3. Create Non-Root User

```bash
sudo adduser app-user
sudo usermod -aG sudo app-user
```

---

# 4. Configure UFW Firewall

```bash
sudo ufw allow 2676
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
sudo ufw status
```

---

# 5. Install Required Packages

```bash
sudo apt update
sudo apt install nginx git curl unzip -y
```

---

# 6. Install Node.js 18 Using NVM

Install NVM:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Reload shell:

```bash
source ~/.bashrc
```

Install Node.js 18:

```bash
nvm install 18
nvm use 18
```

Verify installation:

```bash
node -v
npm -v
```

---

# 7. Install PM2

```bash
npm install -g pm2
```

---

# 8. Clone Repository

```bash
git clone https://github.com/Leadtap/lt-nilavan.git
```

Move into project directory:

```bash
cd lt-nilavan
```

---

# 9. Install Dependencies

```bash
npm install
```

---

# 10. Build Next.js Application

```bash
npm run build
```

---

# 11. Start Application Using PM2

```bash
sudo -u app-user pm2 start npm --name "lt-nilavan" -- start
```

Save PM2 process list:

```bash
pm2 save
```

Enable PM2 startup service:

```bash
pm2 startup
```

---

# 12. Configure Nginx Reverse Proxy

Create nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/lt-nilavan
```

Added configuration:

```nginx
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=5r/m;

server {
    server_name demo-testing.duckdns.org;

    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    add_header Content-Security-Policy "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-src https://www.google.com https://maps.google.com; img-src 'self' https: data: blob:; style-src 'self' https: 'unsafe-inline'; script-src 'self' https: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'none';" always;

    location /.git {
        deny all;
        return 403;
    }

    location /api/sendgrid {

        limit_req zone=api_limit burst=3 nodelay;
        limit_req_status 429;

        proxy_pass http://localhost:3000;

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {

        proxy_pass http://localhost:3000;

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/demo-testing.duckdns.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/demo-testing.duckdns.org/privkey.pem;

    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {

    listen 80;
    server_name demo-testing.duckdns.org;

    return 301 https://$host$request_uri;
}
```

---

# 13. Enable Nginx Site

```bash
sudo ln -s /etc/nginx/sites-available/lt-nilavan /etc/nginx/sites-enabled/
```

Test nginx configuration:

```bash
sudo nginx -t
```

Restart nginx:

```bash
sudo systemctl restart nginx
```

---

# 14. Disable Nginx Version Disclosure

Edit nginx.conf:

```bash
sudo nano /etc/nginx/nginx.conf
```

Enabled:

```nginx
server_tokens off;
```

Restart nginx:

```bash
sudo systemctl restart nginx
```

---

# 15. Configure SSL Using Certbot

Install Certbot:

```bash
sudo apt install certbot python3-certbot-nginx -y
```

Generate SSL certificate:

```bash
sudo certbot --nginx -d demo-testing.duckdns.org
```

---

# 16. Verify Deployment

Check HTTPS:

```bash
curl -I https://demo-testing.duckdns.org
```

Check PM2:

```bash
pm2 list
```

Check firewall:

```bash
sudo ufw status
```

---

# 17. Configure Git Identity

```bash
git config --global user.name "Hari Prasath"
git config --global user.email "your-email@example.com"
```

---

# 18. Push Changes to GitHub

```bash
git checkout -b security-fixes

git add .

git commit -m "Security hardening and deployment configuration"

git push origin security-fixes
```

---

# Final Result

Successfully deployed and secured the Next.js application using:

- Nginx reverse proxy
- PM2 process manager
- Let's Encrypt SSL
- UFW firewall
- Security headers
- Rate limiting
- Non-root execution
- HTTPS enforcement
- Hidden file protection

---
