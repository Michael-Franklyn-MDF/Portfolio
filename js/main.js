(function initThemeToggleAndMenu() {
	const body = document.body;
	const themeToggleButton = document.getElementById('theme-toggle');
	const hamburgerButton = document.querySelector('.hamburger');
	const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

	// Persisted theme from localStorage
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme === 'dark') {
		body.classList.add('dark-mode');
		if (themeToggleButton) {
			themeToggleButton.innerHTML = '<span class="icon-sun"></span>';
			themeToggleButton.setAttribute('aria-label', 'Switch to light mode');
		}
	}

	// Enable global stripes background (toggle here if you want to control per page)
	body.classList.add('stripes-bg');
	// Remove preload classes to reveal page (no-flash + page fade-in)
	const root = document.documentElement;
	root.classList.remove('preload-dark');
	root.classList.remove('page-preload');

	// Toggle theme
	if (themeToggleButton) {
		themeToggleButton.addEventListener('click', () => {
			const isDark = body.classList.toggle('dark-mode');
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
			themeToggleButton.innerHTML = isDark ? '<span class="icon-sun"></span>' : '<span class="icon-moon"></span>';
			themeToggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
		});
	}

	// Mobile menu toggle
	if (hamburgerButton && navLinks) {
		hamburgerButton.setAttribute('aria-expanded', 'false');
		hamburgerButton.addEventListener('click', () => {
			const isOpen = body.classList.toggle('menu-open');
			hamburgerButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		});

		// Close menu when a link is clicked (use event delegation)
		navLinks.addEventListener('click', (event) => {
			const target = event.target;
			if (target && target.tagName === 'A') {
				body.classList.remove('menu-open');
				hamburgerButton.setAttribute('aria-expanded', 'false');
			}
		});
	}
})();

(function initHeroStagger(){
	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const hero = document.querySelector('.hero-text');
	if(!hero) return;
	const elements = [];
	const h1 = hero.querySelector('h1');
	const h2 = hero.querySelector('h2');
	const p = hero.querySelector('p');
	const buttons = hero.querySelectorAll('.hero-buttons .btn');
	[h1, h2, p, ...buttons].forEach((el)=>{ if(el){ el.classList.add('stagger-item'); elements.push(el); }});
	if(prefersReduced){
		elements.forEach((el)=> el.classList.add('in'));
		return;
	}
	let delay = 80; // ms between items
	elements.forEach((el, idx)=>{
		setTimeout(()=>{ el.classList.add('in'); }, idx * delay + 150);
	});
})();

(function initSmoothPageTransitions(){
	// Intercept internal links and fade out before navigation
	const root = document.documentElement;
	function isInternalLink(anchor){
		const url = new URL(anchor.href, window.location.origin);
		return url.origin === window.location.origin;
	}
		document.addEventListener('click', function(e){
		const a = e.target.closest('a');
		if(!a) return;
		// Handle in-page anchors with smooth scroll and no page fade
		const href = a.getAttribute('href') || '';
		if(href.startsWith('#')){
			const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			const targetEl = document.querySelector(href);
			if(targetEl){
				e.preventDefault();
				if(prefersReduced){
					targetEl.scrollIntoView();
				}else{
					targetEl.scrollIntoView({ behavior: 'smooth' });
				}
			}
			return;
		}

		if(a.target === '_blank' || a.hasAttribute('download')) return;
		if(!isInternalLink(a)) return;
		e.preventDefault();
		root.classList.add('page-preload');
		setTimeout(()=>{ window.location.href = a.href; }, 220);
	});
})();
