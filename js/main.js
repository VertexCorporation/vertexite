import { fetchNews } from './news.js';
import { initMobileCarousel } from './mobile-carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize News
    fetchNews();

    // Initialize Mobile Carousel for About Section
    initMobileCarousel();

    // Sticky Header
    // Utility: Throttle Function
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 100));

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenu.classList.contains('active') ? '✕' : '☰';
            mobileBtn.textContent = icon;
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileBtn.textContent = '☰';
                document.body.style.overflow = '';
            });
        });
    }

    // Theme Logic
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');

    function getPreferredTheme() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
        // Icon is updated via CSS based on data-theme attribute
    }

    // Initialize Theme
    setTheme(getPreferredTheme());

    // Listen for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax Effect for Hero
    const hero = document.querySelector('.hero');
    const heroGlow = document.querySelector('.hero-bg-glow');

    if (hero && heroGlow) {
        let ticking = false;
        hero.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const x = e.clientX / window.innerWidth;
                    const y = e.clientY / window.innerHeight;
                    heroGlow.style.transform = `translate(-${50 + x * 10}%, -${50 + y * 10}%)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Language Dropdown
    const langBtn = document.querySelector('.lang-btn-trigger');
    const langDropdown = document.querySelector('.language-dropdown');

    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });
    }

    // Mouse Spotlight Effect
    // Mouse Spotlight Effect
    let spotlightTicking = false;
    document.addEventListener('mousemove', (e) => {
        if (!spotlightTicking) {
            window.requestAnimationFrame(() => {
                document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
                document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
                spotlightTicking = false;
            });
            spotlightTicking = true;
        }
    });

    // Particle System
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = throttle(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, 100);

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const getThemeColor = () => {
            return document.documentElement.getAttribute('data-theme') === 'light' ? '0, 0, 0' : '255, 255, 255';
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.3 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(${getThemeColor()}, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }


        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(window.innerWidth / 10, 100); // Responsive count
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        };

        initParticles();
        animateParticles();
    }
});
/* =========================================
   🐰 EASTER EGG: Selim Doğan
   ========================================= */
const EASTER_EGG_I18N = {
    'en': { tooltip: "As long as I build the site, I am the boss.", btn: "Click and see", boss: "Boss", employee: "Employee" },
    'tr': { tooltip: "Siteyi ben yaptığım sürece patron benim.", btn: "Tıkla ve gör", boss: "Patron", employee: "Çalışan" },
    'hi': { tooltip: "जब तक मैं साइट बना रहा हूँ, मैं ही बॉस हूँ।", btn: "क्लिक करें और देखें", boss: "बॉस", employee: "कर्मचारी" },
    'ar': { tooltip: "طالما أنا من يبني الموقع، فأنا المدير.", btn: "انقر وانظر", boss: "المدير", employee: "موظف" },
    'az': { tooltip: "Saytı mən düzəltdiyim müddətçə, müdür mənəm.", btn: "Kliklə və gör", boss: "Müdür", employee: "İşçi" },
    'pt': { tooltip: "Enquanto eu construir o site, eu sou o chefe.", btn: "Clique e veja", boss: "Chefe", employee: "Funcionário" },
    'nl': { tooltip: "Zolang ik de site bouw, ben ik de baas.", btn: "Klik en zie", boss: "Baas", employee: "Werknemer" },
    'id': { tooltip: "Selama saya membangun situs ini, sayalah bosnya.", btn: "Klik dan lihat", boss: "Bos", employee: "Karyawan" },
    'it': { tooltip: "Finché costruisco il sito, il capo sono io.", btn: "Clicca e vedi", boss: "Capo", employee: "Dipendente" },
    'es': { tooltip: "Mientras yo construya el sitio, soy el jefe.", btn: "Haz clic y mira", boss: "Jefe", employee: "Empleado" },
    'ru': { tooltip: "Пока я создаю сайт, я здесь босс.", btn: "Нажми и смотри", boss: "Босс", employee: "Сотрудник" },
    'fr': { tooltip: "Tant que je construis le site, c'est moi le patron.", btn: "Cliquez et voyez", boss: "Patron", employee: "Employé" },
    'ja': { tooltip: "私がサイトを作っている限り、私がボスだ。", btn: "クリックして見る", boss: "ボス", employee: "従業員" },
    'ko': { tooltip: "내가 사이트를 만드는 한, 내가 보스다。", btn: "클릭하고 확인", boss: "보스", employee: "직원" },
    'zh': { tooltip: "只要是我建的网站，我就是老板。", btn: "点击查看", boss: "老板", employee: "员工" },
    'de': { tooltip: "Solange ich die Seite baue, bin ich der Boss.", btn: "Klick und sieh", boss: "Boss", employee: "Mitarbeiter" },
};

function initEasterEgg() {
    const lang = document.documentElement.lang || 'en';
    const strings = EASTER_EGG_I18N[lang] || EASTER_EGG_I18N['en'];

    // 1. Find Selim Doğan's card within Team section only
    const teamCards = document.querySelectorAll('#team .team-card');
    let selimCard = null;

    teamCards.forEach(card => {
        const h3 = card.querySelector('h3');
        if (h3 && h3.textContent.includes('Selim Doğan')) {
            selimCard = card;
        }
    });

    if (!selimCard) return;

    // 2. Create Tooltip Element
    const tooltip = document.createElement('div');
    tooltip.className = 'easter-egg-tooltip';
    tooltip.innerHTML = `
        <p style="margin-bottom:0; line-height:1.4;">${strings.tooltip}</p>
        <button class="easter-egg-btn">${strings.btn}</button>
    `;

    // 3. Hover Events
    let closeTimeout;

    selimCard.addEventListener('mouseenter', () => {
        clearTimeout(closeTimeout);
        selimCard.style.overflow = 'visible';
        selimCard.style.zIndex = '100';
        if (!tooltip.parentNode) {
            selimCard.appendChild(tooltip);
        }
    });

    selimCard.addEventListener('mouseleave', () => {
        closeTimeout = setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
            selimCard.style.overflow = '';
            selimCard.style.zIndex = '';
        }, 300);
    });

    tooltip.addEventListener('mouseenter', () => clearTimeout(closeTimeout));

    // 4. Click Event
    const btn = tooltip.querySelector('.easter-egg-btn');
    btn.addEventListener('click', (e) => {
        e.stopPropagation();

        const allCards = document.querySelectorAll('#team .team-card');
        allCards.forEach(card => {
            const roleEl = card.querySelector('.team-role');
            const nameEl = card.querySelector('h3');

            if (roleEl && nameEl) {
                // 1. Add Animation Class
                roleEl.classList.add('role-changing');

                // 2. Change Text after 350ms
                setTimeout(() => {
                    if (nameEl.textContent.includes('Selim Doğan')) {
                        roleEl.textContent = strings.boss;
                        roleEl.style.color = '#ff0000';
                        roleEl.style.fontWeight = '800';
                    } else {
                        roleEl.textContent = strings.employee;
                        roleEl.style.color = '';
                        roleEl.style.fontWeight = '';
                    }
                }, 350);

                // 3. Remove class
                setTimeout(() => {
                    roleEl.classList.remove('role-changing');
                }, 800);
            }
        });
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initEasterEgg);
// Birthday Surprise
window.addEventListener('load', () => {
    // Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        #bday-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            font-family: inherit;
            color: #fff;
            font-size: clamp(2rem, 8vw, 6rem);
            text-align: center;
            font-weight: 800;
            animation: bdayFadeOut 1s ease 5s forwards;
            pointer-events: none;
            backdrop-filter: blur(5px);
        }
        #bday-overlay span {
            animation: bdayPopIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            text-shadow: 0 0 20px rgba(255, 0, 127, 0.8), 0 0 40px rgba(255, 0, 127, 0.5);
            padding: 0 20px;
        }
        @keyframes bdayPopIn {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bdayFadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; visibility: hidden; }
        }
    `;
    document.head.appendChild(style);

    // Inject Overlay
    const overlay = document.createElement('div');
    overlay.id = 'bday-overlay';
    overlay.innerHTML = '<span>İYİ Kİ DOĞDUN ELA 🎉</span>';
    document.body.appendChild(overlay);

    // Load Confetti Library & Run
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    script.onload = () => {
        var duration = 5 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
            }));
        }, 250);
    };
    document.body.appendChild(script);
});
