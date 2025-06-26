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
document.addEventListener('DOMContentLoaded', function() {
    // Efeito de digitação no título
    const titulo = document.querySelector('.caneca-texto h2 span');
    if (titulo) {
        const textoOriginal = titulo.textContent;
        titulo.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < textoOriginal.length) {
                titulo.textContent += textoOriginal.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
    }
    
    // Contador regressivo para promoção
    const promoTag = document.querySelector('.destaque-tag');
    if (promoTag) {
        let countdown = 10; // minutos
        const updateCountdown = () => {
            promoTag.textContent = `PROMOÇÃO LIMITADA (Termina em ${countdown} min)`;
            countdown--;
            if (countdown < 0) {
                promoTag.textContent = "ÚLTIMAS UNIDADES!";
                clearInterval(countdownInterval);
            }
        };
        const countdownInterval = setInterval(updateCountdown, 60000);
        updateCountdown();
    }
    
    // Efeito parallax nas canecas flutuantes
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const canecas = document.querySelectorAll('.caneca-flutuante');
        
        canecas.forEach((caneca, index) => {
            const speed = index === 0 ? 0.2 : 0.1;
            caneca.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.05}deg)`;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Efeito de brilho na placa
    const placaImg = document.querySelector('.placa-imagem img');
    if (placaImg) {
        placaImg.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            this.style.filter = `
                drop-shadow(0 15px 30px rgba(0,0,0,0.2))
                brightness(${1 + (y * 0.2)})
            `;
        });
        
        placaImg.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 15px 30px rgba(0,0,0,0.2))';
        });
    }
    
    // Contador de placas instaladas (animação)
    const contadorPlacas = document.querySelector('.selo:nth-child(1) span');
    if (contadorPlacas) {
        let contador = 0;
        const target = 500;
        const increment = target / 50;
        
        const updateCounter = setInterval(() => {
            contador += increment;
            if (contador >= target) {
                contador = target;
                clearInterval(updateCounter);
            }
            contadorPlacas.textContent = `+${Math.floor(contador)} placas instaladas`;
        }, 50);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar iframe com o link exato fornecido
    const iframe = document.querySelector('.mapa-iframe');
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3836.123456789012!2d-47.56789012345678!3d-15.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDA3JzI0LjQiUyA0N8KwMzQnMDEuNiJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr";
    
    // Efeito de zoom nos cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Efeito de brilho na imagem do cardápio
    const cardapioImg = document.querySelector('.img-destaque');
    if (cardapioImg) {
        cardapioImg.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            this.style.filter = `
                drop-shadow(0 15px 30px rgba(0,0,0,0.2))
                brightness(${1 + (y * 0.1)})
            `;
        });
        
        cardapioImg.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 15px 30px rgba(0,0,0,0.2))';
        });
    }

    // Contador regressivo para promoção
    const badgePromo = document.querySelector('.destaque-badge');
    if (badgePromo) {
        let horas = 24; // horas restantes
        const updateCountdown = () => {
            badgePromo.textContent = `PROMOÇÃO (${horas}h RESTANTES)`;
            horas--;
            if (horas < 0) {
                badgePromo.textContent = "ÚLTIMAS UNIDADES!";
                clearInterval(timer);
            }
        };
        const timer = setInterval(updateCountdown, 3600000); // atualiza a cada hora
        updateCountdown();
    }
});