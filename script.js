document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. Dark Mode Toggle
    // =========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('ri-sun-line', 'ri-moon-line');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Icon toggle
        if (newTheme === 'dark') {
            themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
        } else {
            themeIcon.classList.replace('ri-sun-line', 'ri-moon-line');
        }
    });

    // =========================================
    // 2. Mobile Menu
    // =========================================
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links-container');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinksContainer.contains(e.target) && !hamburger.contains(e.target) && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // =========================================
    // 3. Scroll Animations (Intersection Observer)
    // =========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to run animation only once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // =========================================
    // 4. Reveal Progress Bars on Scroll
    // =========================================
    const skillSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-bar');

    const skillsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            progressBars.forEach(bar => {
                // Get the target width from the style attribute (which we set in HTML initially)
                // We previously set style="width: 90%" in HTML. 
                // To animate, we might need to reset them to 0 optionally or just let the CSS transition handle it if we toggle a class.
                // However, our CSS setup `width: 0` -> `width: X` works best if we set the width in JS from a data attribute.
                // Let's refactor HTML slightly or just force the width re-apply logic here.

                // Current approach: CSS has `width: 0`. We need to set it to full value here.
                // But in HTML I wrote `style="width: 90%"`.
                // Let's fix this for better animation:
                // We will rely on the fact that `style` attribute overrides class.
                // Actually, let's just add a class that triggers the width.

                // Better approach:
                // 1. HTML: <div class="progress-bar" data-width="90%"></div>
                // 2. JS sets style.width = data-width

                // Since I already wrote HTML with style="width: X", the browser renders it immediately.
                // I'll update the logic: On load, set width to 0. When observed, restore it.
            });
        }
    });

    // Fix for progress bars: Reset to 0 initially via JS to ensure animation works on load
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.setAttribute('data-width', targetWidth);
        bar.style.width = '0';
    });

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });

    progressBars.forEach(bar => progressObserver.observe(bar));

});
