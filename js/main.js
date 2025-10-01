// Main JS file for Portfolio Website

(function initThemeToggleAndMenu() {
	const body = document.body;
	const themeToggleButton = document.getElementById('theme-toggle');
	const hamburgerButton = document.querySelector('.hamburger');
	const navLinks = document.querySelector('.nav-links');

	// Persisted theme from localStorage
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme === 'dark') {
		body.classList.add('dark-mode');
		if (themeToggleButton) {
			themeToggleButton.innerHTML = '<span class="icon-sun"></span>';
			themeToggleButton.setAttribute('aria-label', 'Switch to light mode');
		}
	}

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

(function initPreviewReveal() {
	// Graceful enhancement: reveal preview sections on scroll
	const previews = document.querySelectorAll('.preview');
	if (!('IntersectionObserver' in window) || previews.length === 0) return;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.2 });

	previews.forEach((el) => observer.observe(el));
})();
