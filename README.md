# Belligerently.dev - Personal Bio Site

A modern, customizable bio site with an admin dashboard for easy management.

## Features

- 🎨 Modern glassmorphism design
- ✨ Smooth animations and particle system
- 🎯 Fully customizable through admin dashboard
- 📱 Responsive design
- 🌙 Dark/light theme toggle
- ⚡ Fast and lightweight

## Files Overview

- `index.html` - Main bio site
- `admin.html` - Admin login page
- `dashboard.html` - Admin dashboard for editing
- `styles/style.css` - Main site styles
- `styles/dashboard.css` - Dashboard styles
- `script.js` - Main site functionality
- `dashboard.js` - Dashboard functionality

## Using the Dashboard

1. Visit `admin.html` to access the dashboard
2. Default password: `admin123` (change this in `admin.html`)
3. Use the dashboard to customize:
   - Profile information (name, title, bio)
   - Skills and technologies
   - Social links
   - Particle system settings
   - Theme colors
   - Statistics

## Customization

### Changing the Admin Password

Edit the `ADMIN_PASSWORD` variable in `admin.html`:

```javascript
const ADMIN_PASSWORD = 'your-secure-password-here';
```

### Adding New Social Platforms

The dashboard supports these platforms out of the box:
- GitHub
- BlueSky
- Discord
- Email
- Twitter
- LinkedIn
- Instagram
- Website
- Custom (with custom icon)

### Particle System

Customize the background particles through the dashboard:
- Particle count (5-50)
- Speed (0.1-2.0)
- Size (0.5-5.0)
- Opacity (0.1-1.0)
- Color (any hex color)

## Development

The site uses modern web technologies:
- CSS Custom Properties for theming
- Web Animations API for smooth animations
- Canvas API for particle system
- LocalStorage for settings persistence
- Modern JavaScript (ES6+)

## Security Note

The current authentication is basic and designed for personal use. For production use with sensitive data, implement proper server-side authentication and authorization.

## License

This project is for personal use. Feel free to fork and customize for your own bio site!
