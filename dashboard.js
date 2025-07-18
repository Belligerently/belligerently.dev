// Dashboard functionality
class Dashboard {
    constructor() {
        this.initializeRangeSliders();
        this.loadCurrentSettings();
        this.setupEventListeners();
    }

    // Initialize range slider value displays
    initializeRangeSliders() {
        const rangeInputs = document.querySelectorAll('input[type="range"]');
        rangeInputs.forEach(input => {
            const valueDisplay = input.parentElement.querySelector('.setting-value');
            if (valueDisplay) {
                valueDisplay.textContent = input.value;
                input.addEventListener('input', () => {
                    valueDisplay.textContent = input.value;
                });
            }
        });
    }

    // Load current settings from localStorage or defaults
    loadCurrentSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('bioSiteSettings') || '{}');
        
        // Load profile settings
        document.getElementById('profile-name').value = savedSettings.name || 'Belligerently';
        document.getElementById('profile-title').value = savedSettings.title || 'iOS Developer & Designer';
        document.getElementById('profile-bio').value = savedSettings.bio || 'Passionate iOS developer crafting beautiful digital experiences. I specialize in SwiftUI, user interface design, and creating apps that users love.';
        document.getElementById('profile-status').value = savedSettings.status || 'available';
        
        // Load particle settings
        document.getElementById('particle-count').value = savedSettings.particleCount || 40;
        document.getElementById('particle-speed').value = savedSettings.particleSpeed || 0.3;
        document.getElementById('particle-size').value = savedSettings.particleSize || 2;
        document.getElementById('particle-opacity').value = savedSettings.particleOpacity || 0.4;
        document.getElementById('particle-color').value = savedSettings.particleColor || '#6366f1';
        
        // Load theme colors
        document.getElementById('primary-color').value = savedSettings.primaryColor || '#6366f1';
        document.getElementById('secondary-color').value = savedSettings.secondaryColor || '#ec4899';
        document.getElementById('accent-color').value = savedSettings.accentColor || '#06b6d4';
        
        // Load stats
        document.getElementById('stat-1-number').value = savedSettings.stat1Number || '1';
        document.getElementById('stat-1-label').value = savedSettings.stat1Label || 'Year Experience';
        document.getElementById('stat-2-number').value = savedSettings.stat2Number || '5+';
        document.getElementById('stat-2-label').value = savedSettings.stat2Label || 'Projects';
        document.getElementById('stat-3-number').value = savedSettings.stat3Number || '∞';
        document.getElementById('stat-3-label').value = savedSettings.stat3Label || 'Coffee';
        
        // Load skills
        if (savedSettings.skills) {
            this.loadSkills(savedSettings.skills);
        }
        
        // Load social links
        if (savedSettings.socialLinks) {
            this.loadSocialLinks(savedSettings.socialLinks);
        }
        
        // Update range slider displays
        this.initializeRangeSliders();
    }

    // Load skills into the UI
    loadSkills(skills) {
        const skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = '';
        
        skills.forEach(skill => {
            const skillElement = this.createSkillElement(skill);
            skillsList.appendChild(skillElement);
        });
    }

    // Load social links into the UI
    loadSocialLinks(socialLinks) {
        const socialList = document.getElementById('social-list');
        socialList.innerHTML = '';
        
        socialLinks.forEach(link => {
            const socialElement = this.createSocialElement(link.platform, link.url, link.title);
            socialList.appendChild(socialElement);
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Real-time preview for color changes
        document.getElementById('particle-color').addEventListener('input', this.updateParticlePreview.bind(this));
        document.getElementById('primary-color').addEventListener('input', this.updateThemePreview.bind(this));
        document.getElementById('secondary-color').addEventListener('input', this.updateThemePreview.bind(this));
        document.getElementById('accent-color').addEventListener('input', this.updateThemePreview.bind(this));
        
        // File upload preview
        document.getElementById('profile-picture').addEventListener('change', this.handleImageUpload.bind(this));
    }

    // Update particle preview in real-time
    updateParticlePreview() {
        const color = document.getElementById('particle-color').value;
        document.documentElement.style.setProperty('--particle-color', color);
    }

    // Update theme preview in real-time
    updateThemePreview() {
        const primary = document.getElementById('primary-color').value;
        const secondary = document.getElementById('secondary-color').value;
        const accent = document.getElementById('accent-color').value;
        
        document.documentElement.style.setProperty('--primary-color', primary);
        document.documentElement.style.setProperty('--secondary-color', secondary);
        document.documentElement.style.setProperty('--accent-color', accent);
    }

    // Handle image upload
    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Update the file upload text
                const fileText = event.target.parentElement.querySelector('.file-upload-text');
                fileText.textContent = `Selected: ${file.name}`;
                
                // Store the image data for later use
                this.profileImageData = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // Create skill element
    createSkillElement(skillName) {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <span class="skill-name">${skillName}</span>
            <button class="skill-remove" onclick="removeSkill(this)">
                <i class="fas fa-times"></i>
            </button>
        `;
        return skillItem;
    }

    // Create social element
    createSocialElement(platform, url, title) {
        const platformIcons = {
            github: 'fab fa-github',
            bluesky: 'fas fa-at',
            discord: 'fab fa-discord',
            email: 'fas fa-envelope',
            twitter: 'fab fa-twitter',
            linkedin: 'fab fa-linkedin',
            instagram: 'fab fa-instagram',
            website: 'fas fa-globe',
            custom: 'fas fa-link'
        };

        const platformNames = {
            github: 'GitHub',
            bluesky: 'BlueSky',
            discord: 'Discord',
            email: 'Email',
            twitter: 'Twitter',
            linkedin: 'LinkedIn',
            instagram: 'Instagram',
            website: 'Website',
            custom: title || 'Custom'
        };

        const socialItem = document.createElement('div');
        socialItem.className = 'social-item';
        socialItem.innerHTML = `
            <div class="social-info">
                <i class="${platformIcons[platform] || 'fas fa-link'} social-icon-preview"></i>
                <div class="social-details">
                    <span class="social-name">${platformNames[platform] || title}</span>
                    <span class="social-url-text">${url}</span>
                </div>
            </div>
            <button class="social-remove" onclick="removeSocialLink(this)">
                <i class="fas fa-times"></i>
            </button>
        `;
        return socialItem;
    }

    // Get current settings
    getCurrentSettings() {
        const skills = Array.from(document.querySelectorAll('.skill-name')).map(el => el.textContent);
        const socialLinks = Array.from(document.querySelectorAll('.social-item')).map(item => {
            const nameEl = item.querySelector('.social-name');
            const urlEl = item.querySelector('.social-url-text');
            const iconEl = item.querySelector('.social-icon-preview');
            
            // Determine platform from icon class
            let platform = 'custom';
            const iconClass = iconEl.className;
            if (iconClass.includes('fa-github')) platform = 'github';
            else if (iconClass.includes('fa-at')) platform = 'bluesky';
            else if (iconClass.includes('fa-discord')) platform = 'discord';
            else if (iconClass.includes('fa-envelope')) platform = 'email';
            else if (iconClass.includes('fa-twitter')) platform = 'twitter';
            else if (iconClass.includes('fa-linkedin')) platform = 'linkedin';
            else if (iconClass.includes('fa-instagram')) platform = 'instagram';
            else if (iconClass.includes('fa-globe')) platform = 'website';
            
            return {
                platform,
                url: urlEl.textContent,
                title: nameEl.textContent
            };
        });

        return {
            name: document.getElementById('profile-name').value,
            title: document.getElementById('profile-title').value,
            bio: document.getElementById('profile-bio').value,
            status: document.getElementById('profile-status').value,
            profileImage: this.profileImageData,
            skills,
            socialLinks,
            particleCount: document.getElementById('particle-count').value,
            particleSpeed: document.getElementById('particle-speed').value,
            particleSize: document.getElementById('particle-size').value,
            particleOpacity: document.getElementById('particle-opacity').value,
            particleColor: document.getElementById('particle-color').value,
            primaryColor: document.getElementById('primary-color').value,
            secondaryColor: document.getElementById('secondary-color').value,
            accentColor: document.getElementById('accent-color').value,
            stat1Number: document.getElementById('stat-1-number').value,
            stat1Label: document.getElementById('stat-1-label').value,
            stat2Number: document.getElementById('stat-2-number').value,
            stat2Label: document.getElementById('stat-2-label').value,
            stat3Number: document.getElementById('stat-3-number').value,
            stat3Label: document.getElementById('stat-3-label').value
        };
    }

    // Show message
    showMessage(message, type = 'success') {
        const messageContainer = document.getElementById('message-container');
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        
        messageContainer.appendChild(messageEl);
        
        // Trigger animation
        setTimeout(() => messageEl.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageEl.classList.remove('show');
            setTimeout(() => messageContainer.removeChild(messageEl), 300);
        }, 3000);
    }
}

// Initialize dashboard
const dashboard = new Dashboard();

// Global functions for UI interactions
function addSkill() {
    const skillInput = document.getElementById('new-skill');
    const skillName = skillInput.value.trim();
    
    if (!skillName) {
        dashboard.showMessage('Please enter a skill name', 'error');
        return;
    }
    
    // Check if skill already exists
    const existingSkills = Array.from(document.querySelectorAll('.skill-name')).map(el => el.textContent.toLowerCase());
    if (existingSkills.includes(skillName.toLowerCase())) {
        dashboard.showMessage('Skill already exists', 'warning');
        return;
    }
    
    const skillsList = document.getElementById('skills-list');
    const skillElement = dashboard.createSkillElement(skillName);
    skillsList.appendChild(skillElement);
    
    skillInput.value = '';
    dashboard.showMessage('Skill added successfully');
}

function removeSkill(button) {
    const skillItem = button.closest('.skill-item');
    const skillName = skillItem.querySelector('.skill-name').textContent;
    skillItem.remove();
    dashboard.showMessage(`Removed skill: ${skillName}`);
}

function addSocialLink() {
    const platform = document.getElementById('social-platform').value;
    const url = document.getElementById('social-url').value.trim();
    const title = document.getElementById('social-title').value.trim();
    
    if (!url) {
        dashboard.showMessage('Please enter a URL or email', 'error');
        return;
    }
    
    // Basic URL validation
    if (platform !== 'email' && !url.startsWith('http://') && !url.startsWith('https://')) {
        dashboard.showMessage('Please enter a valid URL (starting with http:// or https://)', 'error');
        return;
    }
    
    // Email validation
    if (platform === 'email' && !url.includes('@')) {
        dashboard.showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    const socialList = document.getElementById('social-list');
    const socialElement = dashboard.createSocialElement(platform, url, title);
    socialList.appendChild(socialElement);
    
    // Clear inputs
    document.getElementById('social-url').value = '';
    document.getElementById('social-title').value = '';
    
    dashboard.showMessage('Social link added successfully');
}

function removeSocialLink(button) {
    const socialItem = button.closest('.social-item');
    const socialName = socialItem.querySelector('.social-name').textContent;
    socialItem.remove();
    dashboard.showMessage(`Removed social link: ${socialName}`);
}

function saveChanges() {
    try {
        const settings = dashboard.getCurrentSettings();
        localStorage.setItem('bioSiteSettings', JSON.stringify(settings));
        
        // Generate and download the updated HTML file
        generateUpdatedSite(settings);
        
        dashboard.showMessage('Changes saved successfully! Updated files generated.');
    } catch (error) {
        console.error('Error saving changes:', error);
        dashboard.showMessage('Error saving changes. Please try again.', 'error');
    }
}

function previewChanges() {
    const settings = dashboard.getCurrentSettings();
    localStorage.setItem('bioSiteSettings', JSON.stringify(settings));
    window.open('index.html', '_blank');
}

function resetToDefaults() {
    if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
        localStorage.removeItem('bioSiteSettings');
        location.reload();
    }
}

function generateUpdatedSite(settings) {
    // Generate updated HTML
    const htmlContent = generateHTML(settings);
    const cssContent = generateCSS(settings);
    const jsContent = generateJS(settings);
    
    // Create downloadable files
    downloadFile('index.html', htmlContent);
    downloadFile('style.css', cssContent);
    downloadFile('script.js', jsContent);
}

function generateHTML(settings) {
    const skillTags = settings.skills.map(skill => `<div class="skill-tag">${skill}</div>`).join('\n                    ');
    
    const socialLinks = settings.socialLinks.map(link => {
        const platformIcons = {
            github: 'fab fa-github',
            bluesky: 'fas fa-at',
            discord: 'fab fa-discord',
            email: 'fas fa-envelope',
            twitter: 'fab fa-twitter',
            linkedin: 'fab fa-linkedin',
            instagram: 'fab fa-instagram',
            website: 'fas fa-globe',
            custom: 'fas fa-link'
        };

        const platformSubtitles = {
            github: 'View my code',
            bluesky: 'Follow updates',
            discord: 'Let\'s chat',
            email: 'Get in touch',
            twitter: 'Follow me',
            linkedin: 'Connect with me',
            instagram: 'Follow my journey',
            website: 'Visit my site',
            custom: 'Check it out'
        };

        const href = link.platform === 'email' ? `mailto:${link.url}` : link.url;
        const icon = platformIcons[link.platform] || 'fas fa-link';
        const subtitle = platformSubtitles[link.platform] || 'Check it out';

        return `                    <a href="${href}" class="social-link" data-platform="${link.platform}">
                        <div class="social-icon">
                            <i class="${icon}"></i>
                        </div>
                        <div class="social-content">
                            <span class="social-title">${link.title}</span>
                            <span class="social-subtitle">${subtitle}</span>
                        </div>
                        <i class="fas fa-external-link-alt social-arrow"></i>
                    </a>`;
    }).join('\n                    ');

    const statusBadges = settings.status === 'available' 
        ? '<span class="badge">Available for work</span>\n                        <span class="badge">Remote friendly</span>'
        : settings.status === 'busy'
        ? '<span class="badge">Currently busy</span>'
        : '<span class="badge">Not available</span>';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${settings.name} - Developer & Designer</title>
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Animated background -->
    <div id="particles-container"></div>
    
    <!-- Main container -->
    <div class="container">
        <!-- Profile card -->
        <div class="profile-card">
            <div class="profile-header">
                <div class="profile-pic-wrapper">
                    <img src="assets/profile-pic.jpg" alt="${settings.name}" class="profile-pic">
                    <div class="profile-ring"></div>
                    <div class="status-indicator">
                        <span class="status-dot"></span>
                    </div>
                </div>
                
                <div class="profile-info">
                    <h1 class="name">${settings.name}</h1>
                    <p class="title">${settings.title}</p>
                    <div class="badges">
                        ${statusBadges}
                    </div>
                </div>
            </div>
            
            <div class="profile-body">
                <p class="bio">
                    ${settings.bio}
                </p>
                
                <div class="skills">
                    ${skillTags}
                </div>
                
                <div class="social-links">
                    ${socialLinks}
                </div>
                
                <div class="cta-section">
                    <a href="mailto:${settings.socialLinks.find(link => link.platform === 'email')?.url || 'contact@example.com'}" class="cta-button">
                        <span>Start a project</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Quick stats -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${settings.stat1Number}</div>
                <div class="stat-label">${settings.stat1Label}</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${settings.stat2Number}</div>
                <div class="stat-label">${settings.stat2Label}</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${settings.stat3Number}</div>
                <div class="stat-label">${settings.stat3Label}</div>
            </div>
        </div>
    </div>
    
    <!-- Theme toggle -->
    <button class="theme-toggle" aria-label="Toggle theme">
        <i class="fas fa-sun"></i>
    </button>
    
    <script src="script.js"></script>
</body>
</html>`;
}

function generateCSS(settings) {
    return `/* Modern Bio Site - Clean & Fast */
:root {
    --primary: ${settings.primaryColor};
    --primary-light: color-mix(in srgb, ${settings.primaryColor} 80%, white);
    --primary-dark: color-mix(in srgb, ${settings.primaryColor} 80%, black);
    --secondary: ${settings.secondaryColor};
    --accent: ${settings.accentColor};
    
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --text-muted: #94a3b8;
    
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-card: rgba(255, 255, 255, 0.8);
    --bg-glass: rgba(255, 255, 255, 0.1);
    
    --border: rgba(203, 213, 225, 0.3);
    --shadow: rgba(0, 0, 0, 0.1);
    --shadow-lg: rgba(0, 0, 0, 0.15);
    
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-muted: #64748b;
    
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-card: rgba(30, 41, 59, 0.8);
    --bg-glass: rgba(255, 255, 255, 0.05);
    
    --border: rgba(71, 85, 105, 0.3);
    --shadow: rgba(0, 0, 0, 0.3);
    --shadow-lg: rgba(0, 0, 0, 0.5);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
}

/* Particles Container */
#particles-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
}

#particles-container canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/* Container */
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-height: 100vh;
    justify-content: center;
}

/* Profile Card */
.profile-card {
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 20px 40px var(--shadow);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.profile-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
    opacity: 0.5;
}

.profile-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 32px 64px var(--shadow-lg);
}

/* Profile Header */
.profile-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
}

.profile-pic-wrapper {
    position: relative;
    flex-shrink: 0;
}

.profile-pic {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--bg-primary);
    box-shadow: 0 8px 32px var(--shadow);
    transition: var(--transition);
}

.profile-ring {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 132px;
    height: 132px;
    border: 2px solid var(--primary);
    border-radius: 50%;
    opacity: 0;
    animation: pulse 3s infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 0;
        transform: scale(1);
    }
    50% {
        opacity: 0.5;
        transform: scale(1.05);
    }
}

.status-indicator {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: var(--bg-primary);
    border-radius: 50%;
    padding: 4px;
    box-shadow: 0 2px 8px var(--shadow);
}

.status-dot {
    width: 16px;
    height: 16px;
    background: #10b981;
    border-radius: 50%;
    display: block;
    animation: heartbeat 2s infinite;
}

@keyframes heartbeat {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

.profile-info {
    flex: 1;
    min-width: 0;
}

.name {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
    line-height: 1.2;
}

.title {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 1rem;
    font-weight: 500;
}

.badges {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.badge {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    transition: var(--transition);
}

.badge:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}

/* Profile Body */
.profile-body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.bio {
    font-size: 1.125rem;
    color: var(--text-secondary);
    line-height: 1.7;
    text-align: center;
}

/* Skills */
.skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
}

.skill-tag {
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border);
    padding: 0.75rem 1rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
    transition: var(--transition);
    cursor: default;
}

.skill-tag:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
}

/* Social Links */
.social-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border);
    border-radius: 16px;
    text-decoration: none;
    color: var(--text-primary);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.social-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s;
}

.social-link:hover::before {
    left: 100%;
}

.social-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px var(--shadow);
    border-color: var(--primary);
}

.social-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border-radius: 12px;
    color: white;
    font-size: 1.25rem;
    flex-shrink: 0;
}

.social-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.social-title {
    font-weight: 600;
    font-size: 1rem;
}

.social-subtitle {
    color: var(--text-muted);
    font-size: 0.875rem;
}

.social-arrow {
    color: var(--text-muted);
    transition: var(--transition);
}

.social-link:hover .social-arrow {
    color: var(--primary);
    transform: translateX(4px);
}

/* CTA Section */
.cta-section {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

.cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    padding: 1rem 2rem;
    border-radius: 16px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: var(--transition);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
    position: relative;
    overflow: hidden;
}

.cta-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s;
}

.cta-button:hover::before {
    left: 100%;
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(99, 102, 241, 0.4);
}

/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
}

.stat-card {
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2rem 1rem;
    text-align: center;
    transition: var(--transition);
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px var(--shadow);
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
}

.stat-label {
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 0.875rem;
}

/* Theme Toggle */
.theme-toggle {
    position: fixed;
    top: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
    z-index: 1000;
    color: var(--text-primary);
    font-size: 1.25rem;
}

.theme-toggle:hover {
    background: var(--primary);
    color: white;
    transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 1rem;
        gap: 1.5rem;
    }

    .profile-header {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
    }

    .profile-pic {
        width: 100px;
        height: 100px;
    }

    .profile-ring {
        width: 112px;
        height: 112px;
        top: -6px;
        left: -6px;
    }

    .name {
        font-size: 2rem;
    }

    .title {
        font-size: 1.125rem;
    }

    .badges {
        justify-content: center;
    }

    .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
    }

    .stat-card {
        padding: 1.5rem 0.75rem;
    }

    .stat-number {
        font-size: 2rem;
    }

    .theme-toggle {
        top: 1rem;
        right: 1rem;
        width: 48px;
        height: 48px;
    }

    .social-link {
        padding: 1rem;
    }

    .social-icon {
        width: 40px;
        height: 40px;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0.75rem;
    }

    .profile-card {
        padding: 1.5rem;
        border-radius: 20px;
    }

    .name {
        font-size: 1.75rem;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Focus styles */
.theme-toggle:focus,
.social-link:focus,
.cta-button:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}`;
}

function generateJS(settings) {
    return `// Modern Bio Site - Clean & Smooth
document.addEventListener('DOMContentLoaded', function() {
    
    // Load dashboard settings
    const dashboardSettings = ${JSON.stringify(settings, null, 4)};
    
    // Apply dashboard settings to the site
    if (Object.keys(dashboardSettings).length > 0) {
        applyDashboardSettings(dashboardSettings);
    }
    
    // Theme Management
    class ThemeManager {
        constructor() {
            this.theme = localStorage.getItem('theme') || 'light';
            this.toggle = document.querySelector('.theme-toggle');
            this.init();
        }

        init() {
            this.applyTheme();
            if (this.toggle) {
                this.toggle.addEventListener('click', () => this.toggleTheme());
            }
        }

        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            this.applyTheme();
            localStorage.setItem('theme', this.theme);
        }

        applyTheme() {
            document.documentElement.setAttribute('data-theme', this.theme);
            const icon = this.toggle?.querySelector('i');
            
            if (icon) {
                if (this.theme === 'dark') {
                    icon.className = 'fas fa-moon';
                } else {
                    icon.className = 'fas fa-sun';
                }
            }
        }
    }

    // Simple Particle System
    class ParticleSystem {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.particleCount = ${settings.particleCount || 15};
            this.particleSpeed = ${parseFloat(settings.particleSpeed) || 0.3};
            this.particleSize = ${parseFloat(settings.particleSize) || 2};
            this.particleOpacity = ${parseFloat(settings.particleOpacity) || 0.4};
            this.particleColor = '${settings.particleColor || '#6366f1'}';
            this.animationId = null;
            this.init();
        }

        init() {
            const container = document.getElementById('particles-container');
            if (!container) return;
            
            container.appendChild(this.canvas);
            this.resize();
            this.createParticles();
            
            window.addEventListener('resize', () => this.resize());
            
            // Start with lower opacity for performance
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }
            
            this.animate();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        createParticles() {
            this.particles = [];
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: Math.random() * this.particleSize + 0.5,
                    speedX: (Math.random() - 0.5) * this.particleSpeed,
                    speedY: (Math.random() - 0.5) * this.particleSpeed,
                    opacity: Math.random() * this.particleOpacity + 0.1
                });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                if (particle.x > this.canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = this.canvas.width;
                if (particle.y > this.canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = this.canvas.height;
                
                this.ctx.save();
                this.ctx.globalAlpha = particle.opacity;
                this.ctx.fillStyle = this.particleColor;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            });
            
            this.animationId = requestAnimationFrame(() => this.animate());
        }

        destroy() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        }
    }

    // Smooth Interactions
    class SmoothInteractions {
        constructor() {
            this.init();
        }

        init() {
            this.setupHoverEffects();
            this.setupScrollEffects();
        }

        setupHoverEffects() {
            // Enhanced social link hovers
            const socialLinks = document.querySelectorAll('.social-link');
            socialLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    link.style.transform = 'translateY(-2px) scale(1.02)';
                });
                
                link.addEventListener('mouseleave', () => {
                    link.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Skill tag interactions
            const skills = document.querySelectorAll('.skill-tag');
            skills.forEach(skill => {
                skill.addEventListener('mouseenter', () => {
                    skill.style.transform = 'translateY(-2px) scale(1.05)';
                });
                
                skill.addEventListener('mouseleave', () => {
                    skill.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        setupScrollEffects() {
            // Optional: Add scroll-based animations here
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                });

                const elements = document.querySelectorAll('.profile-card, .stat-card');
                elements.forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(el);
                });
            }
        }
    }

    // Function to apply dashboard settings
    function applyDashboardSettings(settings) {
        // Apply theme colors
        if (settings.primaryColor) {
            document.documentElement.style.setProperty('--primary', settings.primaryColor);
        }
        if (settings.secondaryColor) {
            document.documentElement.style.setProperty('--secondary', settings.secondaryColor);
        }
        if (settings.accentColor) {
            document.documentElement.style.setProperty('--accent', settings.accentColor);
        }

        // Apply profile information
        if (settings.name) {
            const nameEl = document.querySelector('.name');
            if (nameEl) nameEl.textContent = settings.name;
        }
        
        if (settings.title) {
            const titleEl = document.querySelector('.title');
            if (titleEl) titleEl.textContent = settings.title;
        }
        
        if (settings.bio) {
            const bioEl = document.querySelector('.bio');
            if (bioEl) bioEl.textContent = settings.bio;
        }

        // Apply skills
        if (settings.skills && settings.skills.length > 0) {
            const skillsContainer = document.querySelector('.skills');
            if (skillsContainer) {
                skillsContainer.innerHTML = settings.skills.map(skill => 
                    \`<div class="skill-tag">\${skill}</div>\`
                ).join('');
            }
        }

        // Apply stats
        if (settings.stat1Number) {
            const stat1NumberEl = document.querySelector('.stats-grid .stat-card:nth-child(1) .stat-number');
            if (stat1NumberEl) stat1NumberEl.textContent = settings.stat1Number;
        }
        if (settings.stat1Label) {
            const stat1LabelEl = document.querySelector('.stats-grid .stat-card:nth-child(1) .stat-label');
            if (stat1LabelEl) stat1LabelEl.textContent = settings.stat1Label;
        }
        if (settings.stat2Number) {
            const stat2NumberEl = document.querySelector('.stats-grid .stat-card:nth-child(2) .stat-number');
            if (stat2NumberEl) stat2NumberEl.textContent = settings.stat2Number;
        }
        if (settings.stat2Label) {
            const stat2LabelEl = document.querySelector('.stats-grid .stat-card:nth-child(2) .stat-label');
            if (stat2LabelEl) stat2LabelEl.textContent = settings.stat2Label;
        }
        if (settings.stat3Number) {
            const stat3NumberEl = document.querySelector('.stats-grid .stat-card:nth-child(3) .stat-number');
            if (stat3NumberEl) stat3NumberEl.textContent = settings.stat3Number;
        }
        if (settings.stat3Label) {
            const stat3LabelEl = document.querySelector('.stats-grid .stat-card:nth-child(3) .stat-label');
            if (stat3LabelEl) stat3LabelEl.textContent = settings.stat3Label;
        }

        // Apply social links
        if (settings.socialLinks && settings.socialLinks.length > 0) {
            const socialContainer = document.querySelector('.social-links');
            if (socialContainer) {
                const platformIcons = {
                    github: 'fab fa-github',
                    bluesky: 'fas fa-at',
                    discord: 'fab fa-discord',
                    email: 'fas fa-envelope',
                    twitter: 'fab fa-twitter',
                    linkedin: 'fab fa-linkedin',
                    instagram: 'fab fa-instagram',
                    website: 'fas fa-globe',
                    custom: 'fas fa-link'
                };

                const platformSubtitles = {
                    github: 'View my code',
                    bluesky: 'Follow updates',
                    discord: 'Let\\'s chat',
                    email: 'Get in touch',
                    twitter: 'Follow me',
                    linkedin: 'Connect with me',
                    instagram: 'Follow my journey',
                    website: 'Visit my site',
                    custom: 'Check it out'
                };

                socialContainer.innerHTML = settings.socialLinks.map(link => {
                    const href = link.platform === 'email' ? \`mailto:\${link.url}\` : link.url;
                    const icon = platformIcons[link.platform] || 'fas fa-link';
                    const subtitle = platformSubtitles[link.platform] || 'Check it out';

                    return \`
                        <a href="\${href}" class="social-link" data-platform="\${link.platform}">
                            <div class="social-icon">
                                <i class="\${icon}"></i>
                            </div>
                            <div class="social-content">
                                <span class="social-title">\${link.title}</span>
                                <span class="social-subtitle">\${subtitle}</span>
                            </div>
                            <i class="fas fa-external-link-alt social-arrow"></i>
                        </a>
                    \`;
                }).join('');
            }
        }

        // Update status badges
        if (settings.status) {
            const badgesContainer = document.querySelector('.badges');
            if (badgesContainer) {
                let badgesHTML = '';
                if (settings.status === 'available') {
                    badgesHTML = '<span class="badge">Available for work</span><span class="badge">Remote friendly</span>';
                } else if (settings.status === 'busy') {
                    badgesHTML = '<span class="badge">Currently busy</span>';
                } else {
                    badgesHTML = '<span class="badge">Not available</span>';
                }
                badgesContainer.innerHTML = badgesHTML;
            }
        }

        // Update CTA button email
        const emailLink = settings.socialLinks?.find(link => link.platform === 'email');
        if (emailLink) {
            const ctaButton = document.querySelector('.cta-button');
            if (ctaButton) {
                ctaButton.href = \`mailto:\${emailLink.url}\`;
            }
        }
    }

    // Initialize everything
    new ThemeManager();
    new ParticleSystem();
    new SmoothInteractions();

    // Smooth page reveal
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});`;
}

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Handle Enter key for adding skills and social links
document.getElementById('new-skill').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addSkill();
    }
});

document.getElementById('social-url').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addSocialLink();
    }
});
