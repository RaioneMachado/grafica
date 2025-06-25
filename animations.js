// Animação de digitação
function typeWriter(element, text, speed) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar animação de digitação nos títulos
const typingElements = document.querySelectorAll('[data-typing]');
typingElements.forEach(el => {
    const text = el.getAttribute('data-typing');
    const speed = parseInt(el.getAttribute('data-speed')) || 100;
    typeWriter(el, text, speed);
});

// Efeito parallax
function parallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.3;
        const offset = window.pageYOffset * speed;
        element.style.transform = `translateY(${offset}px)`;
    });
}

window.addEventListener('scroll', parallaxEffect);

// Animação de contador
function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-counter');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Observador de interseção para animações
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Adicionar classes de animação baseadas em data attributes
            if (element.hasAttribute('data-animate')) {
                element.classList.add(element.getAttribute('data-animate'));
            }
            
            // Iniciar contadores quando visíveis
            if (element.hasAttribute('data-counter')) {
                animateCounters();
            }
            
            // Parar de observar após a animação
            observer.unobserve(element);
        }
    });
}, {
    threshold: 0.1
});

// Observar elementos com data-observe
document.querySelectorAll('[data-observe]').forEach(el => {
    observer.observe(el);
});

// Efeito de hover 3D nos cards de serviço
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        const width = card.offsetWidth;
        const height = card.offsetHeight;
        const moveX = (x - width / 2) / 10;
        const moveY = (y - height / 2) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${moveY}deg) rotateY(${-moveX}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Efeito de onda nos botões
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

const buttons = document.querySelectorAll('.btn, .whatsapp-btn');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Adicionar estilo ripple dinamicamente
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 600ms linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);