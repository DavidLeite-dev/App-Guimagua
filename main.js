/**
 * Guimágua Smart Pool - Website Institucional
 * Script de Interatividade e Dinâmica de Interface (main.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Controlo do Cabeçalho Fixo (Navbar Scroll Shadow Effect)
    // -------------------------------------------------------------------------
    const header = document.querySelector('.site-header');
    
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Verificação inicial

    // -------------------------------------------------------------------------
    // 2. Menu Mobile (Hamburger Drawer)
    // -------------------------------------------------------------------------
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-drawer .nav-link, .mobile-nav-drawer .btn-client-area');

    if (mobileToggle && mobileDrawer) {
        const toggleIcon = mobileToggle.querySelector('i');

        const openMenu = () => {
            mobileDrawer.classList.add('open');
            mobileToggle.setAttribute('aria-expanded', 'true');
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-bars');
                toggleIcon.classList.add('fa-xmark');
            }
        };

        const closeMenu = () => {
            mobileDrawer.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded', 'false');
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-xmark');
                toggleIcon.classList.add('fa-bars');
            }
        };

        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileDrawer.classList.contains('open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Fechar ao clicar em qualquer link da gaveta
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Fechar ao clicar fora da gaveta
        document.addEventListener('click', (e) => {
            if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Fechar com a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
                closeMenu();
            }
        });
    }

    // -------------------------------------------------------------------------
    // 3. Destaque de Navegação Ativa ao Fazer Scroll (Scrollspy)
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.nav-menu .nav-link');

    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                desktopNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // -------------------------------------------------------------------------
    // 4. Interatividade do Formulário de Contacto
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && formFeedback && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtenção dos valores
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const servico = document.getElementById('servico').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            if (!nome || !email || !servico || !mensagem) {
                showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            // Simulação de envio com feedback visual
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> A enviar mensagem...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;

                showToast('Obrigado, ' + nome + '! A sua mensagem foi enviada com sucesso. Entraremos em contacto brevemente.', 'success');
                contactForm.reset();
            }, 1200);
        });

        function showToast(message, type) {
            formFeedback.className = `form-feedback-toast ${type}`;
            formFeedback.innerHTML = `
                <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
                <span>${message}</span>
            `;
            formFeedback.style.display = 'flex';
            formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 6000);
        }
    }
});
