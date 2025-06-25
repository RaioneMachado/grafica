document.addEventListener('DOMContentLoaded', function() {
    // ========== MENU MOBILE ==========
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');
    const body = document.body;

    function toggleMenu() {
        nav.classList.toggle('active');
        body.classList.toggle('no-scroll');
        mobileMenu.innerHTML = nav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    }

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            body.classList.remove('no-scroll');
            if (mobileMenu) mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            e.target !== mobileMenu) {
            toggleMenu();
        }
    });

    // ========== SCROLL HEADER ==========
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // ========== SLIDER BANNER ==========
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let currentSlide = 0;

    function showSlide(n) {
        if (slides.length > 0) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }

    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

    // Auto-play do slider
    let slideInterval;
    const slider = document.querySelector('.slider');
    
    if (slider && slides.length > 0) {
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);

        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
        });
    }

    // ========== FILTRO PORTFÓLIO ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        // Mostrar todos os itens inicialmente
        portfolioItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.visibility = 'visible';
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class de todos os botões
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Adiciona active class no botão clicado
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.visibility = 'visible';
                        }, 50);
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.visibility = 'visible';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.visibility = 'hidden';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }

    // ========== REMOVER CARREGAMENTO DINÂMICO DO PORTFÓLIO ==========
    // (Comentado pois já temos os itens no HTML)
    /*
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        const portfolioData = [
            { image: 'images/produtos/cartao-visita.jpg', category: 'cartoes', title: 'Cartões de Visita' },
            // ... outros itens do portfólio
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
        loadPortfolioItems();
    }
    */

    // ========== DEPOIMENTOS ==========
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        function showTestimonial(n) {
            testimonials.forEach(t => t.classList.remove('active'));
            currentTestimonial = (n + testimonials.length) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }
        
        setInterval(() => showTestimonial(currentTestimonial + 1), 8000);
    }

    // ========== FORMULÁRIO ==========
    const contactForm = document.getElementById('form-contato');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            console.log('Formulário enviado:', Object.fromEntries(formData));
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        });
    }

    // ========== ANIMAÇÕES ==========
    function animeScroll() {
        const elements = document.querySelectorAll('[data-anime]');
        const windowTop = window.pageYOffset + (window.innerHeight * 0.75);
        
        elements.forEach(element => {
            if (windowTop > element.offsetTop) {
                element.classList.add('animate');
            }
        });
    }

    window.addEventListener('scroll', animeScroll);
    animeScroll();

    // ========== WHATSAPP ==========
    function updateWhatsAppNumber() {
        const whatsappNumber = '5511999999999';
        const whatsappBtns = document.querySelectorAll('.whatsapp-btn, .whatsapp-float');
        
        whatsappBtns.forEach(btn => {
            const newHref = btn.getAttribute('href').replace(/5511999999999/g, whatsappNumber);
            btn.setAttribute('href', newHref);
        });
    }
    updateWhatsAppNumber();
});