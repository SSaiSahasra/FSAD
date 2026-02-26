# Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Via Vercel Dashboard (No CLI needed):**

1. Go to https://vercel.com and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite settings
5. Click "Deploy"
6. Done! Your app is live in ~2 minutes

**Via Vercel CLI:**

```bash
npm install -g vercel
cd conference-platform
vercel login
vercel
```

### Option 2: Netlify

**Via Netlify Dashboard:**

1. Go to https://netlify.com and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select your repository
4. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"
6. Done!

**Via Netlify CLI:**

```bash
npm install -g netlify-cli
cd conference-platform
npm run build
netlify deploy --prod
```

When prompted, set publish directory to: `dist`

### Option 3: GitHub Pages

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json:**
Add these scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Add homepage:
```json
"homepage": "https://YOUR_USERNAME.github.io/conference-platform"
```

3. **Deploy:**
```bash
npm run deploy
```

4. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: gh-pages branch
   - Save

### Option 4: Render

1. Go to https://render.com
2. Click "New Static Site"
3. Connect your GitHub repository
4. Settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Click "Create Static Site"

## Pre-Deployment Checklist

- [x] All dependencies installed
- [x] Build command works: `npm run build`
- [x] No console errors
- [x] Responsive design tested
- [x] All routes working
- [x] Authentication flow tested

## Post-Deployment

After deployment, test:
- Landing page loads
- Login with demo credentials
- Admin dashboard accessible
- User dashboard accessible
- All navigation works
- Forms submit correctly

## Custom Domain (Optional)

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS

## Environment Variables (If needed later)

For Vercel/Netlify dashboard:
- Go to Project Settings → Environment Variables
- Add variables
- Redeploy

## Troubleshooting

**Build fails:**
- Check Node.js version (use v16+)
- Clear cache: `npm clean-install`

**Routes not working:**
- Ensure `netlify.toml` or `vercel.json` is configured
- Check for SPA redirect rules

**Styles not loading:**
- Verify Tailwind CSS is properly configured
- Check build output includes CSS

## Quick Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel

# Deploy to Netlify
netlify deploy --prod
```

## Support

If deployment fails, check:
1. Build logs in deployment platform
2. Ensure all files are committed to Git
3. Verify package.json scripts are correct
