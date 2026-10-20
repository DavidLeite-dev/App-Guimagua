const emailError = document.getElementById("emailError");

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // Atualizar automaticamente o ano do rodapé
    document.querySelectorAll(".current-year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // Verificar o formato do email
    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    // Apresentar erro num campo
    function showFieldError(input, errorElement, message) {
        input.closest(".form-group").classList.add("error");
        input.setAttribute("aria-invalid", "true");

        errorElement.textContent = message;
        errorElement.hidden = false;
    }

    // Remover erro de um campo
    function clearFieldError(input, errorElement) {
        input.closest(".form-group").classList.remove("error");
        input.removeAttribute("aria-invalid");

        errorElement.textContent = "";
        errorElement.hidden = true;
    }

    // Apresentar mensagem geral
    function showMessage(element, type, message) {
        element.className = "form-message " + type;
        element.textContent = message;
        element.hidden = false;
    }

    // =====================================
    // FORMULÁRIO DE LOGIN
    // =====================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        const email = document.getElementById("email");
        const password = document.getElementById("password");

       const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const message = document.getElementById("loginMessage");
        const togglePassword = document.getElementById("togglePassword");

        function validateEmail() {
            const value = email.value.trim();

            if (!value) {
                showFieldError(
                    email,
                    emailError,
                    "O email é obrigatório."
                );

                return false;
            }

            if (!isValidEmail(value)) {
                showFieldError(
                    email,
                    emailError,
                    "Introduza um endereço de email válido."
                );

                return false;
            }

            clearFieldError(email, emailError);
            return true;
        }

        function validatePassword() {
            if (!password.value) {
                showFieldError(
                    password,
                    passwordError,
                    "A palavra-passe é obrigatória."
                );

                return false;
            }

            clearFieldError(password, passwordError);
            return true;
        }

       // Indica se o último erro foi de credenciais inválidas
            let credentialsError = false;

            // Limpar erros quando o utilizador começa a corrigir os campos
            function onInput(input, errorElement) {
                clearFieldError(input, errorElement);

                // Se o erro era de credenciais, limpa os dois campos de uma vez
                if (credentialsError) {
                    clearFieldError(email, emailError);
                    clearFieldError(password, passwordError);
                    credentialsError = false;
                }

                message.hidden = true;
            }

            email.addEventListener("input", function () {
                onInput(email, emailError);
            });

            password.addEventListener("input", function () {
                onInput(password, passwordError);
            });

            // Mostrar ou ocultar a palavra-passe
            togglePassword.addEventListener("click", function () {
                const show = password.type === "password";

                password.type = show ? "text" : "password";
                togglePassword.textContent = show ? "Ocultar" : "Mostrar";
                togglePassword.setAttribute("aria-pressed", String(show));
                togglePassword.setAttribute(
                    "aria-label",
                    show ? "Ocultar palavra-passe" : "Mostrar palavra-passe"
                );
            });

        // Validar quando o formulário é submetido
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            message.hidden = true;

            const validEmail = validateEmail();
            const validPassword = validatePassword();

            if (!validEmail || !validPassword) {
                showMessage(
                    message,
                    "error",
                    "Verifique os campos assinalados."
                );

                const invalidField = loginForm.querySelector(
                    '[aria-invalid="true"]'
                );

                if (invalidField) {
                    invalidField.focus();
                }

                return;
            }

                        // Credenciais de DEMONSTRAÇÃO (remover quando houver autenticação real)
            const DEMO_EMAIL = "cliente@guimagua.pt";
            const DEMO_PASSWORD = "Piscina2026";

            const button = loginForm.querySelector(".auth-button");
            button.disabled = true;
            button.textContent = "A entrar…";

            setTimeout(function () {
                button.disabled = false;
                button.textContent = "Iniciar sessão";

                const ok =
                    email.value.trim().toLowerCase() === DEMO_EMAIL &&
                    password.value === DEMO_PASSWORD;

                if (ok) {
                    showMessage(
                        message,
                        "success",
                        "Sessão iniciada com sucesso (demonstração)."
                    );
                    return;
                }

                // Credenciais inválidas: os dois campos ficam a vermelho
                credentialsError = true;

                [email, password].forEach(function (input) {
                    input.closest(".form-group").classList.add("error");
                    input.setAttribute("aria-invalid", "true");
                });

                showMessage(
                    message,
                    "error",
                    "Email ou palavra-passe incorretos."
                );

                password.value = "";
                password.focus();
            }, 800);
        });
    }

    // =====================================
    // RECUPERAÇÃO DA PALAVRA-PASSE
    // =====================================

    const recoveryForm = document.getElementById("recoveryForm");

    if (recoveryForm) {
        const email = document.getElementById("recoveryEmail");
        const emailError = document.getElementById("recoveryEmailError");
        const message = document.getElementById("recoveryMessage");

        // Limpar mensagens quando o email é alterado
        email.addEventListener("input", function () {
            clearFieldError(email, emailError);
            message.hidden = true;
        });

        // Validar o formulário de recuperação
        recoveryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            message.hidden = true;

            const value = email.value.trim();

            if (!value) {
                showFieldError(
                    email,
                    emailError,
                    "O email é obrigatório."
                );

                showMessage(
                    message,
                    "error",
                    "Introduza o email para continuar."
                );

                email.focus();
                return;
            }

            if (!isValidEmail(value)) {
                showFieldError(
                    email,
                    emailError,
                    "Introduza um endereço de email válido."
                );

                showMessage(
                    message,
                    "error",
                    "O endereço de email não tem um formato válido."
                );

                email.focus();
                return;
            }

            clearFieldError(email, emailError);

            showMessage(
                message,
                "success",
              "Se o email estiver registado, receberá instruções para repor a palavra-passe."
            );
        });
    }

});
