// Menu Mobile
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('.nav');

mobileMenu.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenu.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Efeito de scroll no header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Slider do banner
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Auto-play do slider
let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Pausar auto-play quando o mouse estiver sobre o slider
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// Filtro do portfólio
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove a classe active de todos os botões
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Adiciona a classe active ao botão clicado
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Carregar itens do portfólio dinamicamente
const portfolioGrid = document.querySelector('.portfolio-grid');
const portfolioData = [
    { image: 'images/produtos/cartao-visita.jpg', category: 'cartoes', title: 'Cartões de Visita' },
    { image: 'images/produtos/panfleto.jpg', category: 'cartoes', title: 'Panfletos' },
    { image: 'images/produtos/banner.jpg', category: 'banners', title: 'Banners' },
    { image: 'images/produtos/wind-banner.jpg', category: 'banners', title: 'Wind Banner' },
    { image: 'images/produtos/caneca.jpg', category: 'brindes', title: 'Canecas Personalizadas' },
    { image: 'images/produtos/camiseta.jpg', category: 'brindes', title: 'Camisetas' },
    { image: 'images/produtos/quadro.jpg', category: 'personalizados', title: 'Quadros Personalizados' },
    { image: 'images/produtos/adesivo.jpg', category: 'personalizados', title: 'Adesivos' }
];

function loadPortfolioItems() {
    portfolioGrid.innerHTML = '';
    
    portfolioData.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-category', item.category);
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <a href="https://wa.me/5511999999999?text=Olá! Gostaria de um orçamento para ${encodeURIComponent(item.title)}" target="_blank">Solicitar Orçamento</a>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Carregar itens quando a página for carregada
window.addEventListener('DOMContentLoaded', loadPortfolioItems);

// Slider de depoimentos
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(n) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    currentTestimonial = (n + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}

// Auto-play dos depoimentos
setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 8000);

// Formulário de contato
const contactForm = document.getElementById('form-contato');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simular envio do formulário
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Formulário enviado:', data);
    
    // Exibir mensagem de sucesso
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Limpar formulário
    contactForm.reset();
});

// Animação de scroll
function animeScroll() {
    const windowTop = window.pageYOffset + (window.innerHeight * 0.75);
    const elements = document.querySelectorAll('[data-anime]');
    
    elements.forEach(element => {
        if (windowTop > element.offsetTop) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animeScroll);

// Iniciar animações quando a página carregar
window.addEventListener('load', () => {
    animeScroll();
    
    // Adicionar classe animate aos elementos visíveis inicialmente
    const elements = document.querySelectorAll('[data-anime]');
    const windowTop = window.innerHeight * 0.75;
    
    elements.forEach(element => {
        if (windowTop > element.offsetTop) {
            element.classList.add('animate');
        }
    });
});

// Atualizar número do WhatsApp em todos os botões
function updateWhatsAppNumber() {
    const whatsappNumber = '5511999999999'; // Substitua pelo número real
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn, .whatsapp-float');
    
    whatsappBtns.forEach(btn => {
        const currentHref = btn.getAttribute('href');
        const newHref = currentHref.replace(/5511999999999/g, whatsappNumber);
        btn.setAttribute('href', newHref);
    });
}

updateWhatsAppNumber();