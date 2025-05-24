# GitHub Deployment Guide

## Quick Deployment Steps

### 1. Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `egypt-heritage-gis`
5. Description: `Interactive GIS Web Application for Egyptian Heritage Sites`
6. Make it **Public** (required for GitHub Pages)
7. **DO NOT** initialize with README, .gitignore, or license (we already have files)
8. Click "Create repository"

### 2. Connect Local Repository to GitHub
After creating the repository, GitHub will show you commands. Use these in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/egypt-heritage-gis.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Your site will be available at: `https://YOUR_USERNAME.github.io/egypt-heritage-gis/`

## Alternative: Using GitHub Desktop
If you prefer a GUI:
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in with your GitHub account
3. Click "Add an Existing Repository from your Hard Drive"
4. Select the `egymap` folder
5. Click "Publish repository" 
6. Name it `egypt-heritage-gis`
7. Make sure "Keep this code private" is **unchecked**
8. Click "Publish Repository"
9. Follow step 3 above to enable GitHub Pages

## Files Ready for Deployment
✅ `index.html` - Main application file
✅ `styles.css` - Application styles
✅ `app.js` - JavaScript functionality
✅ `heritage_sites.geojson` - Heritage sites data
✅ `README.md` - Project documentation
✅ `DEPLOYMENT.md` - This deployment guide

## Live Demo Features
Once deployed, your live site will include:
- 🗺️ Interactive map of Egyptian heritage sites
- 🏛️ Clickable site markers with detailed information
- 🛠️ Measuring tools and layer controls
- 📱 Responsive design for mobile devices
- 🌐 Satellite and street view options

## Troubleshooting
- If the site doesn't load, wait 5-10 minutes for GitHub Pages to build
- Ensure the repository is public for GitHub Pages to work
- Check that `index.html` is in the root directory
- Verify all file paths are relative (no absolute paths)

## Updates
To update your live site:
1. Make changes to your local files
2. Commit changes: `git add . && git commit -m "Update description"`
3. Push to GitHub: `git push origin main`
4. Changes will appear on your live site within minutes