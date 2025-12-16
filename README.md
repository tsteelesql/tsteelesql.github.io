# AI Engineer Portfolio - Tyler

A modern, professional portfolio website showcasing the transition from Senior SQL Server DBA to AI Engineer. Built with clean HTML/CSS/JS and designed to make an impact.

## 🚀 Live Demo

Once deployed: `https://yourusername.github.io`

## ✨ Features

- **Dark theme with vibrant cyan accents** - Professional yet eye-catching
- **Glassmorphism effects** - Modern UI design trends
- **Fully responsive** - Mobile, tablet, and desktop optimized
- **Smooth animations** - Intersection observers and scroll effects
- **Production-ready code** - Clean, documented, and maintainable
- **SEO optimized** - Meta tags and semantic HTML
- **Fast loading** - No heavy frameworks, pure performance

## 📸 Screenshots Needed

Before deployment, add these screenshots to the `assets/` folder:

### AgentLint Project
1. **agentlint-dashboard.png** (600x400px recommended)
   - Show the Streamlit analytics dashboard with code quality trends
   - Capture the visualization of agent findings

2. **agentlint-cli.png** (Optional, for future use)
   - CLI output showing a code review in progress

### Conversational Data Analyst
1. **data-analyst-chat.png** (600x400px recommended)
   - Show the chat interface with a SQL query being generated
   - Include a visualization if possible

### LLM Evaluation
1. **blog-generator-gui.png** (600x400px recommended)
   - Show the LLM Evaluation interface
   - Display the metrics and evaluation results

**Note:** The site will use placeholder images until you add real screenshots. Simply replace the placeholder images with your actual screenshots using the same filenames.

## 🛠️ Customization Guide

### 1. Update Personal Information

**index.html** - Replace these placeholders:

```html
<!-- Line 40: Your name in nav logo -->
<div class="nav-logo">Tyler</div>

<!-- Line 59: Update LinkedIn URL -->
<a href="https://linkedin.com/in/yourprofile" target="_blank">

<!-- Line 152: Update GitHub URLs for each project -->
<a href="https://github.com/yourusername/agentlint" target="_blank">
<a href="https://github.com/yourusername/conversational-analyst" target="_blank">
<a href="https://github.com/yourusername/blog-generator" target="_blank">

<!-- Line 425: Contact section links -->
<a href="https://linkedin.com/in/yourprofile" target="_blank">
<a href="https://github.com/yourusername" target="_blank">
<a href="mailto:your.email@example.com">
```

### 2. Update Project Links

When you publish LinkedIn articles about your projects, update the "Read Article →" links:

```html
<!-- Find these lines in the project cards -->
<a href="#" class="project-link">
    Read Article →
</a>

<!-- Replace with your LinkedIn article URLs -->
<a href="https://linkedin.com/pulse/your-article-slug" class="project-link">
    Read Article →
</a>
```

### 3. Color Customization (Optional)

**styles.css** - Modify color variables at the top:

```css
:root {
    --accent-primary: #00d9ff;  /* Change primary accent color */
    --accent-secondary: #0066ff; /* Change secondary accent */
    /* Other colors... */
}
```

### 4. Add Your GitHub Stats (Optional Enhancement)

You can add GitHub contribution stats by including this in your About section:

```html
<img src="https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=radical" alt="GitHub Stats">
```

## 📦 Deployment to GitHub Pages

### Step 1: Create Repository

1. Go to GitHub and create a new repository
2. Name it: `yourusername.github.io` (replace with your actual GitHub username)
3. Make it public
4. Don't initialize with README (we have one)

### Step 2: Upload Files

**Option A: Using Git (Recommended)**

```bash
# Navigate to your portfolio-site folder
cd /path/to/portfolio-site

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio deployment"

# Add remote (replace yourusername)
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Option B: Using GitHub Web Interface**

1. Click "uploading an existing file" on the repository page
2. Drag and drop all files from the portfolio-site folder
3. Commit changes

### Step 3: Enable GitHub Pages

1. Go to repository Settings
2. Click "Pages" in the left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Your site will be live at `https://yourusername.github.io` in 1-2 minutes

### Step 4: Add Screenshots

After deployment:

1. Take screenshots of your projects (see "Screenshots Needed" section above)
2. Save them in the `assets/` folder with the exact names listed
3. Commit and push:

```bash
git add assets/
git commit -m "Add project screenshots"
git push
```

## 🎨 Design Philosophy

This portfolio is designed to:

1. **Lead with your unique value proposition** - DBA → AI Engineer transition
2. **Show production-ready thinking** - Database design, error handling, performance
3. **Demonstrate technical depth** - Multi-agent systems, RAG, LangGraph
4. **Make it easy to connect** - Clear CTAs, multiple contact options
5. **Stand out visually** - Modern design without being flashy

## 📱 Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Maintenance

### Updating Projects

To add a new project, copy a project card section in `index.html` and update:
- Project title
- Description
- Tech stack badges
- GitHub link
- Screenshot

### Updating Certifications

Add new certifications in the certifications grid:

```html
<div class="cert-badge">
    <div class="cert-icon">☁️</div>
    <div class="cert-details">
        <div class="cert-name">New Certification</div>
        <div class="cert-level">Level</div>
    </div>
</div>
```

## 📊 Analytics (Optional)

To track visitors, add Google Analytics:

1. Get your GA4 measurement ID
2. Add this before `</head>` in index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🎯 Next Steps After Deployment

1. ✅ **Deploy to GitHub Pages**
2. ✅ **Add real screenshots**
3. ✅ **Update all personal links**
4. 📝 **Write AgentLint article**
5. 📝 **Post to LinkedIn with portfolio link**
6. 🔄 **Update portfolio link in LinkedIn headline**
7. 📧 **Add portfolio link to email signature**
8. 💼 **Include in job applications**

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Verify all links are updated
3. Ensure images are in the correct folder
4. Clear browser cache

## 🎓 Learning Resources

This portfolio demonstrates:
- Modern CSS (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Responsive Design
- Web Performance Optimization
- UX Best Practices

Perfect example of "production-ready" front-end development to show recruiters!

---

**Built by Tyler** | AI Engineer Portfolio | 2024
