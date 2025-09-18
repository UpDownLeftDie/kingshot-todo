# GitHub Pages Deployment Guide

This guide will help you deploy your Kingshot Daily Optimizer to GitHub Pages.

## Prerequisites

1. Your code should be in a GitHub repository
2. You should have push access to the repository

## Deployment Steps

### 1. Update Repository Settings

**Important:** You need to update the `site` URL in `astro.config.mjs` to match your GitHub username:

```javascript
site: 'https://YOUR_GITHUB_USERNAME.github.io',
base: '/kingshot-todo',
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**

### 3. Deploy

Once you push your code to the `main` branch, the GitHub Actions workflow will automatically:

1. Build your Astro app
2. Deploy it to GitHub Pages
3. Make it available at `https://YOUR_GITHUB_USERNAME.github.io/kingshot-todo`

### 4. Manual Deployment (Alternative)

If you prefer manual deployment:

1. Install gh-pages package: `npm install --save-dev gh-pages`
2. Run: `npm run deploy`

## Configuration Details

### Astro Config (`astro.config.mjs`)

- `site`: Your GitHub Pages URL
- `base`: Repository name (must match your repo name)
- `output: 'static'`: Ensures static site generation

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

- Triggers on pushes to `main` branch
- Uses official Astro GitHub Action
- Automatically handles build and deployment

## Troubleshooting

### Build Failures

- Check the Actions tab in your GitHub repository for error logs
- Ensure all dependencies are properly declared in `package.json`

### 404 Errors

- Verify the `base` path in `astro.config.mjs` matches your repository name
- Ensure GitHub Pages is enabled in repository settings

### Asset Loading Issues

- Check that all assets use relative paths
- Verify the build process includes all necessary files

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Update the `site` URL in `astro.config.mjs`

## Environment Considerations

The app will run in static mode on GitHub Pages, which means:

- No server-side functionality
- All data is client-side (localStorage)
- Service Worker for offline functionality is supported

Your app is now ready for deployment! 🚀
