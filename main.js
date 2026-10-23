const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('fa-xmark');
        navbar.classList.toggle('active');
    });
}

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach((sec) => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach((link) => {
                link.classList.remove('active');

                const href = link.getAttribute('href');
                if (href && href.includes(id)) {
                    link.classList.add('active');
                }
            });
        }
    });

    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }

    if (menuIcon && navbar) {
        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');
    }
};

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

const typed = new Typed('.multiple-text', {
    strings: ['Softwear Engineer', 'Web Designer', 'Youtuber'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

const githubUsername = 'dilsharafernando';
const portfolioContainer = document.querySelector('#portfolio-container');
const portfolioStatus = document.querySelector('#portfolio-status');

async function loadGitHubProjects() {
    if (!portfolioContainer || !portfolioStatus) {
        return;
    }

    try {
        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`
        );

        if (!response.ok) {
            throw new Error(`GitHub API request failed (${response.status})`);
        }

        const repositories = await response.json();
        const projects = repositories
            .filter((repository) => !repository.fork)
            .slice(0, 6);

        if (projects.length === 0) {
            portfolioStatus.textContent = 'No public projects found on GitHub yet.';
            return;
        }

        projects.forEach((repository) => {
            const card = document.createElement('article');
            card.className = 'portfolio-box';

            const title = document.createElement('h3');
            title.textContent = repository.name;

            const description = document.createElement('p');
            description.textContent = repository.description || 'No description provided.';

            const meta = document.createElement('p');
            meta.className = 'portfolio-meta';
            meta.textContent = `${repository.language || 'Language not specified'} · ${repository.stargazers_count} stars`;

            const link = document.createElement('a');
            link.href = repository.html_url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = 'View on GitHub';

            card.append(title, description, meta, link);
            portfolioContainer.append(card);
        });

        portfolioStatus.textContent = '';
        ScrollReveal().reveal('.portfolio-box', { origin: 'bottom', interval: 100 });
    } catch (error) {
        console.error('Unable to load GitHub projects:', error);
        portfolioStatus.textContent =
            'Could not load projects from GitHub. Please try again later.';
    }
}

loadGitHubProjects();

