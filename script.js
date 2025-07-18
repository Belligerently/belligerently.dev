// Modern Bio Site - Clean & Smooth
document.addEventListener('DOMContentLoaded', function() {
    
    // Load dashboard settings
    const dashboardSettings = {
    "name": "Belligerently",
    "title": "iOS Developer & Designer",
    "bio": "Passionate iOS developer crafting beautiful digital experiences. I specialize in SwiftUI, user interface design, and creating apps that users love.",
    "status": "offline",
    "skills": [
        "Swift",
        "CSS",
        "HTML",
        "C#",
        "Windows",
        "iOS"
    ],
    "socialLinks": [
        {
            "platform": "github",
            "url": "https://github.com/belligerently",
            "title": "GitHub"
        },
        {
            "platform": "bluesky",
            "url": "https://bsky.app/profile/belligerently.dev",
            "title": "BlueSky"
        },
        {
            "platform": "mastodon",
            "url": "https://fosstodon.org/@Belligerently",
            "title": "Mastodon"
        },
        {
            "platform": "namemc",
            "url": "https://namemc.com/profile/Phanntom.5",
            "title": "NameMC"
        },
        {
            "platform": "email",
            "url": "zac@belligerently.dev",
            "title": "Email"
        },
        {
            "platform": "discord",
            "url": "https://discord.com/users/shallow.",
            "title": "Discord"
        }
    ],
    "particleCount": "40",
    "particleSpeed": "0.3",
    "particleSize": "2",
    "particleOpacity": "0.4",
    "particleColor": "#6366f1",
    "primaryColor": "#6366f1",
    "secondaryColor": "#3659fe",
    "accentColor": "#06b6d4",
    "stat1Number": "1",
    "stat1Label": "Year Experience",
    "stat2Number": "5+",
    "stat2Label": "Projects",
    "stat3Number": "∞",
    "stat3Label": "Coffee"
};
    
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
            this.particleCount = 40;
            this.particleSpeed = 0.3;
            this.particleSize = 2;
            this.particleOpacity = 0.4;
            this.particleColor = '#6366f1';
            this.animationId = null;
            this.init();
        }

        init() {
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                opacity: 0.4;
            `;
            
            const container = document.getElementById('particles-container');
            if (container) {
                container.appendChild(this.canvas);
                this.resize();
                this.createParticles();
                this.animate();
                this.addListeners();
            }
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

        addListeners() {
            window.addEventListener('resize', () => {
                this.resize();
                this.createParticles();
            });
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
            this.setupSocialLinks();
            this.setupCards();
            this.setupSkills();
        }

        setupSocialLinks() {
            const links = document.querySelectorAll('.social-link');
            
            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    link.style.transform = 'translateY(-4px)';
                    link.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
                });

                link.addEventListener('mouseleave', () => {
                    link.style.transform = 'translateY(0)';
                    link.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                });
            });
        }

        setupCards() {
            const cards = document.querySelectorAll('.stat-card, .profile-card');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-5px)';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                });
            });
        }

        setupSkills() {
            const skills = document.querySelectorAll('.skill-tag');
            
            skills.forEach(skill => {
                skill.addEventListener('mouseenter', () => {
                    skill.style.transform = 'translateY(-3px) scale(1.05)';
                });

                skill.addEventListener('mouseleave', () => {
                    skill.style.transform = 'translateY(0) scale(1)';
                });
            });
        }
    }

    // Function to apply dashboard settings
    function applyDashboardSettings(settings) {
        // Apply theme colors
        if (settings.primaryColor) {
            document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
        }
        if (settings.secondaryColor) {
            document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
        }
        if (settings.accentColor) {
            document.documentElement.style.setProperty('--accent-color', settings.accentColor);
        }
        if (settings.particleColor) {
            document.documentElement.style.setProperty('--particle-color', settings.particleColor);
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
                    `<div class="skill-tag">${skill}</div>`
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
                    mastodon: 'fab fa-mastodon',
                    namemc: 'fas fa-cube',
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
                    mastodon: 'Follow updates',
                    namemc: 'View my profile',
                    discord: 'Let\'s chat',
                    email: 'Get in touch',
                    twitter: 'Follow me',
                    linkedin: 'Connect with me',
                    instagram: 'Follow my journey',
                    website: 'Visit my site',
                    custom: 'Check it out'
                };

                socialContainer.innerHTML = settings.socialLinks.map(link => {
                    const href = link.platform === 'email' ? `mailto:${link.url}` : link.url;
                    const icon = platformIcons[link.platform] || 'fas fa-link';
                    const subtitle = platformSubtitles[link.platform] || 'Check it out';

                    return `
                        <a href="${href}" class="social-link" data-platform="${link.platform}">
                            <div class="social-icon">
                                <i class="${icon}"></i>
                            </div>
                            <div class="social-content">
                                <span class="social-title">${link.title}</span>
                                <span class="social-subtitle">${subtitle}</span>
                            </div>
                            <i class="fas fa-external-link-alt social-arrow"></i>
                        </a>
                    `;
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
                ctaButton.href = `mailto:${emailLink.url}`;
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
});