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
                const offsetPosition = targetElement.offsetTop - headerOffset;

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

    // Mouse Spotlight Effect - COMPLETELY DISABLED
    /*
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
    */

    // Retro Low Poly 3D Background System
 const canvas = document.getElementById('particle-canvas');
 if (canvas) {
 const ctx = canvas.getContext('2d');

 const resizeCanvas = throttle(() => {
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 }, 100);

 window.addEventListener('resize', resizeCanvas);
 resizeCanvas();

 const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

 let time = 0;
 const mouse = { x: 0, y: 0, active: false };

 window.addEventListener('mousemove', (e) => {
 mouse.x = e.clientX;
 mouse.y = e.clientY;
 mouse.active = true;
 });

 window.addEventListener('mouseleave', () => {
 mouse.active = false;
 });

 // 3D Camera & Projection settings
 const project = (x, y, z, width, height) => {
 const camX = 0;
 const camY = 140; // Camera height above the ground plane
 const camZ = -50; // Camera position on Z
 const focalLength = 360; // Distance to projection plane

 const rx = x - camX;
 const ry = y - camY;
 const rz = z - camZ;

 if (rz <= 0.1) return null;

 const scale = focalLength / rz;
 const px = width / 2 + rx * scale;
 // Position horizon around 45% of the screen height
 const py = height * 0.45 - ry * scale;

 return { x: px, y: py, scale };
 };

 // Terrain Settings
 const cols = 22;
 const rows = 18;
 const spacingZ = 60;
 let gridOffsetZ = 0;
 const speed = 0.8;

 const getProjectedVertex = (col, row) => {
 const actualSpacingX = canvas.width / (cols - 3);
 const x = (col - cols / 2) * actualSpacingX;
 const z = row * spacingZ + (gridOffsetZ % spacingZ);

 const xPercent = (col - cols / 2) / (cols / 2);
 const sideFactor = Math.pow(Math.abs(xPercent), 2.2);

 // Base terrain height + ripples
 let y = sideFactor * 130;
 if (sideFactor > 0.05) {
 y += Math.sin(col * 0.5 - time * 1.5) * Math.cos(row * 0.4 + time) * 16;
 } else {
 // small ripples in valley
 y += Math.sin(col * 0.8 + time * 2.0) * 3.5;
 }

 const proj = project(x, y, z, canvas.width, canvas.height);
 if (proj && mouse.active) {
 const dx = proj.x - mouse.x;
 const dy = proj.y - mouse.y;
 const dist = Math.sqrt(dx * dx + dy * dy);
 if (dist < 140) {
 const force = (1 - dist / 140) * 35;
 y -= force;
 return project(x, y, z, canvas.width, canvas.height);
 }
 }
 return proj;
 };

 // Floating 3D Polyhedra Class
 class Polyhedron {
 constructor(x, y, z, type, scale) {
 this.x = x;
 this.y = y;
 this.z = z;
 this.type = type; // 'octahedron' or 'pyramid'
 this.scale = scale;
 this.ax = Math.random() * Math.PI * 2;
 this.ay = Math.random() * Math.PI * 2;
 this.az = Math.random() * Math.PI * 2;
 this.rotX = Math.random() * 0.015 - 0.0075;
 this.rotY = Math.random() * 0.015 - 0.0075;
 this.rotZ = Math.random() * 0.015 - 0.0075;

 // Define local vertices & faces
 if (type === 'octahedron') {
 this.vertices = [
 { x: 0, y: 1.2, z: 0 },
 { x: 1, y: 0, z: 0 },
 { x: 0, y: 0, z: 1 },
 { x: -1, y: 0, z: 0 },
 { x: 0, y: 0, z: -1 },
 { x: 0, y: -1.2, z: 0 }
 ];
 this.faces = [
 [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
 [5, 2, 1], [5, 3, 2], [5, 4, 3], [5, 1, 4]
 ];
 } else {
 // Pyramid/Crystal
 this.vertices = [
 { x: 0, y: 1.3, z: 0 },
 { x: 0.8, y: -0.6, z: 0.8 },
 { x: -0.8, y: -0.6, z: 0.8 },
 { x: -0.8, y: -0.6, z: -0.8 },
 { x: 0.8, y: -0.6, z: -0.8 }
 ];
 this.faces = [
 [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
 [1, 4, 3], [1, 3, 2]
 ];
 }
 }

 update() {
 this.ax += this.rotX;
 this.ay += this.rotY;
 this.az += this.rotZ;

 // Float gently up & down
 this.y += Math.sin(time + this.x) * 0.15;
 }

 draw() {
 // Rotate and project vertices
 const rotatedVertices = this.vertices.map(v => {
 // X-axis
 let y1 = v.y * Math.cos(this.ax) - v.z * Math.sin(this.ax);
 let z1 = v.y * Math.sin(this.ax) + v.z * Math.cos(this.ax);
 // Y-axis
 let x2 = v.x * Math.cos(this.ay) + z1 * Math.sin(this.ay);
 let z2 = -v.x * Math.sin(this.ay) + z1 * Math.cos(this.ay);
 // Z-axis
 let x3 = x2 * Math.cos(this.az) - y1 * Math.sin(this.az);
 let y3 = x2 * Math.sin(this.az) + y1 * Math.cos(this.az);

 const wx = this.x + x3 * this.scale;
 const wy = this.y + y3 * this.scale;
 const wz = this.z + z2 * this.scale;

 const proj = project(wx, wy, wz, canvas.width, canvas.height);
 return { wx, wy, wz, proj };
 });

 // Filter out if any vertex couldn't project
 if (rotatedVertices.some(v => !v.proj)) return;

 // Sort faces by depth
 const facesWithDepth = this.faces.map((face, idx) => {
 const zAvg = (rotatedVertices[face[0]].wz + rotatedVertices[face[1]].wz + rotatedVertices[face[2]].wz) / 3;
 return { face, idx, zAvg };
 });
 facesWithDepth.sort((a, b) => b.zAvg - a.zAvg);

 const dark = isDark();

 facesWithDepth.forEach(({ face }) => {
 // Compute normal for simple flat shading
 const v0 = rotatedVertices[face[0]];
 const v1 = rotatedVertices[face[1]];
 const v2 = rotatedVertices[face[2]];

 const ux = v1.wx - v0.wx, uy = v1.wy - v0.wy, uz = v1.wz - v0.wz;
 const vx = v2.wx - v0.wx, vy = v2.wy - v0.wy, vz = v2.wz - v0.wz;
 let nx = uy * vz - uz * vy;
 let ny = uz * vx - ux * vz;
 let nz = ux * vy - uy * vx;
 const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
 if (len > 0) {
 nx /= len; ny /= len; nz /= len;
 }

 // Light vector (from top-left-front)
 const dot = nx * 0.5 + ny * 0.8 + nz * -0.3;
 const dotVal = Math.max(0.1, Math.min(1.0, (dot + 1) / 2));

 // Depth fade
 const maxDepth = rows * spacingZ;
 const alpha = Math.max(0.1, Math.min(0.85, 1 - this.z / maxDepth));

 ctx.beginPath();
 ctx.moveTo(v0.proj.x, v0.proj.y);
 ctx.lineTo(v1.proj.x, v1.proj.y);
 ctx.lineTo(v2.proj.x, v2.proj.y);
 ctx.closePath();

 // Shade fill
 if (dark) {
 // Glowing purple base shaded by diffuse light
 const r = Math.floor(138 * dotVal);
 const g = Math.floor(43 * dotVal);
 const b = Math.floor(226 * dotVal);
 ctx.fillStyle = `rgba(${r}, ${g}, ` + b + `, ${alpha * 0.7})`;
 ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.8})`; // Neon cyan wireframe
 } else {
 // Muted blue shaded base
 const r = Math.floor(191 + 40 * dotVal);
 const g = Math.floor(219 + 30 * dotVal);
 const b = Math.floor(254 + 1 * dotVal);
 ctx.fillStyle = `rgba(${r}, ${g}, ` + b + `, ${alpha * 0.65})`;
 ctx.strokeStyle = `rgba(37, 99, 235, ${alpha * 0.7})`; // Blue wireframe
 }
 ctx.fill();
 ctx.stroke();
 });
 }
 }

 // Initialize floating shapes on the sides
 const shapes = [
 new Polyhedron(-280, 180, 240, 'octahedron', 35),
 new Polyhedron(280, 200, 200, 'pyramid', 32),
 new Polyhedron(-340, 220, 320, 'pyramid', 40),
 new Polyhedron(340, 170, 280, 'octahedron', 38)
 ];

 const animate = () => {
 time += 0.007;
 gridOffsetZ -= speed;

 ctx.clearRect(0, 0, canvas.width, canvas.height);
 const dark = isDark();

 // Draw grid from back to front (Painter's Algorithm)
 for (let r = rows - 2; r >= 0; r--) {
 for (let c = 0; c < cols - 1; c++) {
 const p00 = getProjectedVertex(c, r);
 const p10 = getProjectedVertex(c + 1, r);
 const p11 = getProjectedVertex(c + 1, r + 1);
 const p01 = getProjectedVertex(c, r + 1);

 if (!p00 || !p10 || !p11 || !p01) continue;

 // Calculate depth alpha fade
 const avgZ = (r + 0.5) * spacingZ + (gridOffsetZ % spacingZ);
 const maxDepth = rows * spacingZ;
 const alpha = Math.max(0, Math.min(1, 1 - avgZ / maxDepth));

 // Fill path first to hide hidden lines (solid 3D effect)
 ctx.beginPath();
 ctx.moveTo(p00.x, p00.y);
 ctx.lineTo(p10.x, p10.y);
 ctx.lineTo(p11.x, p11.y);
 ctx.lineTo(p01.x, p01.y);
 ctx.closePath();

 if (dark) {
 ctx.fillStyle = `rgba(5, 5, 5, ${0.8 + alpha * 0.15})`;
 } else {
 ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + alpha * 0.15})`;
 }
 ctx.fill();

 // Draw lines
 ctx.beginPath();
 ctx.moveTo(p00.x, p00.y);
 ctx.lineTo(p10.x, p10.y);
 ctx.lineTo(p11.x, p11.y);
 ctx.lineTo(p00.x, p00.y); // triangle diagonal line
 ctx.closePath();

 if (dark) {
 if (c % 4 === 0 || r % 4 === 0) {
 ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.4})`; // Cyan accent
 } else {
 ctx.strokeStyle = `rgba(147, 51, 234, ${alpha * 0.25})`; // Purple
 }
 } else {
 if (c % 4 === 0 || r % 4 === 0) {
 ctx.strokeStyle = `rgba(37, 99, 235, ${alpha * 0.3})`; // Blue accent
 } else {
 ctx.strokeStyle = `rgba(71, 85, 105, ${alpha * 0.15})`; // Slate
 }
 }
 ctx.stroke();
 }
 }

 // Draw floating polyhedra
 shapes.forEach(shape => {
 shape.update();
 shape.draw();
 });

 requestAnimationFrame(animate);
 };

 animate();
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
