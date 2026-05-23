# Hosting Guide
## Deploying Your React Product Showcase Website

---

## 1. Overview

This guide provides step-by-step instructions for deploying your React website to popular hosting platforms. We recommend **Vercel** for React applications due to its excellent performance, ease of use, and free tier for personal projects.

---

## 2. Pre-Deployment Checklist

Before deploying, ensure you have:
- [ ] All code committed to Git repository
- [ ] Production build tested locally (`npm run build`)
- [ ] Environment variables configured (if any)
- [ ] Domain name purchased (optional but recommended)
- [ ] SSL certificate ready (most platforms provide free SSL)
- [ ] Images optimized and compressed
- [ ] Meta tags and SEO configured

---

## 3. Vercel Deployment (Recommended)

Vercel is the recommended platform for React applications. It offers:
- Free hosting for personal projects
- Automatic SSL certificates
- Global CDN
- Fast deployments
- Preview deployments
- Custom domain support

### 3.1 Step-by-Step Deployment

#### Option A: Using Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```
Follow the prompts to authenticate with your Vercel account.

3. **Deploy from Project Directory**
```bash
cd d:\Developer\modular-one
vercel
```

4. **Follow the Prompts**
- Set up and deploy? → **Yes**
- Which scope? → Select your account
- Link to existing project? → **No** (for first deployment)
- Project name? → Enter your project name
- Directory? → **./** (current directory)
- Override settings? → **No**

5. **Production Deployment**
```bash
vercel --prod
```

#### Option B: Using Vercel Dashboard (No Code)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket
   - Verify your email

2. **Import Your Project**
   - Click "Add New" → "Project"
   - Import your Git repository
   - Vercel will detect it as a React/Vite project automatically

3. **Configure Project**
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** npm run build
   - **Output Directory:** dist
   - **Install Command:** npm install

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### 3.2 Connecting Custom Domain on Vercel

1. **Purchase Domain**
   - Buy domain from any registrar (GoDaddy, Namecheap, BigRock, etc.)
   - Note: Indian domains (.in) cost ~₹500-₹800/year

2. **Add Domain in Vercel**
   - Go to your project in Vercel Dashboard
   - Click "Settings" → "Domains"
   - Click "Add Domain"
   - Enter your domain name (e.g., `yourwebsite.com`)

3. **Configure DNS**
   - Vercel will provide DNS records to add
   - Log in to your domain registrar
   - Add the following records:
     - **Type:** A
     - **Name:** @
     - **Value:** 76.76.21.21
     - **TTL:** 3600
   - Or add CNAME record:
     - **Type:** CNAME
     - **Name:** www
     - **Value:** cname.vercel-dns.com

4. **Verify Domain**
   - Wait for DNS propagation (5-30 minutes)
   - Vercel will automatically verify
   - SSL certificate will be issued automatically

### 3.3 Vercel Pricing

**Free Tier (Hobby)**
- Unlimited bandwidth
- 100GB bandwidth per month
- 6,000 minutes of build time per month
- Automatic HTTPS
- Preview deployments
- Perfect for small websites

**Pro Tier ($20/month ~₹1,600)**
- Everything in Free
- Unlimited bandwidth
- Priority support
- Team collaboration
- Advanced analytics

---

## 4. Netlify Deployment

Netlify is another excellent option for React applications with similar features to Vercel.

### 4.1 Step-by-Step Deployment

#### Option A: Using Netlify CLI

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**
```bash
netlify login
```

3. **Initialize Project**
```bash
cd d:\Developer\modular-one
netlify init
```

4. **Deploy**
```bash
netlify deploy --prod
```

#### Option B: Using Netlify Dashboard (Drag & Drop)

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with email or GitHub

2. **Build Project Locally**
```bash
cd d:\Developer\modular-one
npm run build
```

3. **Deploy via Drag & Drop**
   - Go to Netlify Dashboard
   - Click "Add new site" → "Deploy manually"
   - Drag and drop the `dist` folder
   - Your site will be live immediately

#### Option C: Using Git Integration

1. **Connect Git Repository**
   - In Netlify Dashboard, click "Add new site"
   - Choose "Import an existing project"
   - Connect your Git provider (GitHub, GitLab, Bitbucket)
   - Select your repository

2. **Configure Build Settings**
   - **Build Command:** npm run build
   - **Publish Directory:** dist
   - **Branch:** main (or master)

3. **Deploy**
   - Click "Deploy Site"
   - Netlify will build and deploy automatically

### 4.2 Connecting Custom Domain on Netlify

1. **Add Domain in Netlify**
   - Go to Site Settings → Domain Management
   - Click "Add custom domain"
   - Enter your domain name

2. **Configure DNS**
   - Netlify will provide DNS records
   - Add these records to your domain registrar:
     - **Type:** A
     - **Name:** @
     - **Value:** 75.2.70.75
   - Or add CNAME:
     - **Type:** CNAME
     - **Name:** www
     - **Value:** your-site.netlify.app

3. **Enable HTTPS**
   - Netlify will automatically provision SSL certificate
   - Enable "Automatic HTTPS" in domain settings

### 4.3 Netlify Pricing

**Free Tier**
- 100GB bandwidth per month
- 300 minutes build time
- Free SSL certificates
- Form submissions (100/month)
- Perfect for small websites

**Pro Tier ($19/month ~₹1,500)**
- Unlimited bandwidth
- Unlimited build time
- Priority support
- Team collaboration
- Advanced analytics

---

## 5. Custom Domain Purchase Guide

### 5.1 Recommended Domain Registrars (India)

**BigRock**
- .in domain: ~₹599/year
- .com domain: ~₹799/year
- Website: [bigrock.in](https://bigrock.in)

**GoDaddy India**
- .in domain: ~₹699/year
- .com domain: ~₹849/year
- Website: [godaddy.in](https://godaddy.in)

**Namecheap**
- .in domain: ~₹650/year
- .com domain: ~₹800/year
- Website: [namecheap.com](https://namecheap.com)

**Hostinger**
- .in domain: ~₹599/year
- .com domain: ~₹699/year
- Website: [hostinger.in](https://hostinger.in)

### 5.2 Domain Purchase Steps

1. **Choose Domain Name**
   - Keep it short and memorable
   - Use .com for global reach
   - Use .in for India-specific business
   - Avoid hyphens and numbers

2. **Search Availability**
   - Use registrar's search tool
   - Check for similar names
   - Consider alternative TLDs if taken

3. **Purchase Domain**
   - Add to cart
   - Create account
   - Complete payment (UPI, card, net banking)
   - Verify email

4. **Configure DNS**
   - Log in to registrar dashboard
   - Find DNS management
   - Add records provided by hosting platform

---

## 6. Environment Variables (If Needed)

If your website uses environment variables (API keys, etc.):

### Vercel
1. Go to Project Settings → Environment Variables
2. Add variable name and value
3. Select environment (Production, Preview, Development)
4. Redeploy to apply changes

### Netlify
1. Go to Site Settings → Environment Variables
2. Add variable name and value
3. Redeploy to apply changes

---

## 7. Post-Deployment Checklist

After deployment, verify:
- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Images are loading
- [ ] Filters and search work
- [ ] Mobile responsiveness is correct
- [ ] SSL certificate is active (HTTPS)
- [ ] Custom domain is working (if applicable)
- [ ] Meta tags are correct
- [ ] Performance is acceptable (use PageSpeed Insights)
- [ ] No console errors

---

## 8. Performance Testing

### 8.1 Google PageSpeed Insights
1. Go to [pagespeed.web.dev](https://pagespeed.web.dev)
2. Enter your website URL
3. Run test for both Mobile and Desktop
4. Aim for:
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

### 8.2 Lighthouse (Chrome DevTools)
1. Open your website in Chrome
2. Press F12 (Developer Tools)
3. Go to Lighthouse tab
4. Run audit
5. Review scores and recommendations

---

## 9. Troubleshooting

### Common Issues

**Issue: Build fails on Vercel/Netlify**
- Solution: Check build logs for errors
- Ensure all dependencies are in package.json
- Verify build command is correct

**Issue: Images not loading**
- Solution: Check image paths
- Ensure images are in public/ folder
- Verify case sensitivity of file names

**Issue: Custom domain not working**
- Solution: Wait for DNS propagation (up to 48 hours)
- Verify DNS records are correct
- Check domain registrar settings

**Issue: HTTPS not working**
- Solution: Wait for SSL certificate provisioning (5-30 minutes)
- Ensure DNS records are correct
- Check platform's SSL settings

**Issue: Blank page after deployment**
- Solution: Check console for errors
- Verify build output directory
- Ensure routing is configured correctly

---

## 10. Ongoing Maintenance

### Regular Tasks
- **Weekly:** Check website uptime
- **Monthly:** Update dependencies
- **Quarterly:** Review performance metrics
- **Annually:** Renew domain registration

### Dependency Updates
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Audit for security vulnerabilities
npm audit
```

### Backup Strategy
- Keep Git repository updated
- Export product data regularly
- Save custom domain credentials securely
- Document any custom configurations

---

## 11. Cost Summary

### Annual Costs (Approximate)

**Hosting**
- Vercel Free: ₹0
- Vercel Pro: ₹19,200/year
- Netlify Free: ₹0
- Netlify Pro: ₹18,000/year

**Domain**
- .in domain: ₹600-₹800/year
- .com domain: ₹700-₹900/year

**Total Minimum Annual Cost: ₹600-₹900** (domain only, free hosting)

---

## 12. Support Resources

### Platform Documentation
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Netlify:** [netlify.com/docs](https://netlify.com/docs)
- **React:** [react.dev](https://react.dev)
- **Vite:** [vitejs.dev](https://vitejs.dev)

### Community Support
- Stack Overflow
- Reddit (r/reactjs, r/webdev)
- Discord communities

---

*Document Version: 1.0*  
*Last Updated: May 2026*
