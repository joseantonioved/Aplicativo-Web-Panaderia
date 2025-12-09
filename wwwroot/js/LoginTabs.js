document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. TABS PRINCIPALES (Cliente / Administrador)
    ========================================== */
    const tabButtons = document.querySelectorAll(".tab-trigger");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            // Quitar activo a todos los botones y poner activo al seleccionado
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const targetTab = btn.getAttribute("data-tab"); // "customer" o "admin"

            // Mostrar únicamente el tab seleccionado
            tabContents.forEach(section => {
                if ((section.id === "customer-tab" && targetTab === "customer") ||
                    (section.id === "admin-tab" && targetTab === "admin")) {
                    section.classList.add("active");
                    section.classList.remove("hidden");
                } else {
                    section.classList.remove("active");
                    section.classList.add("hidden");
                }
            });

            // Si cambiamos de tab, aseguramos que se oculte el registro
            const customerRegister = document.getElementById("customer-register");
            const customerLogin = document.getElementById("customer-login");
            if (customerRegister && customerLogin) {
                customerRegister.classList.add("hidden");
                customerLogin.classList.remove("hidden");
            }
        });
    });

    /* =========================================
       2. CLIENTE: LOGIN <--> REGISTRO
    ========================================== */
    const loginForm = document.getElementById("customer-login");
    const registerForm = document.getElementById("customer-register");

    const showRegisterBtn = document.getElementById("show-register");
    const showLoginBtn = document.getElementById("show-login");

    // Inicial: ocultar registro
    if (registerForm) registerForm.classList.add("hidden");

    // Mostrar registro, ocultar login
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener("click", () => {
            loginForm.classList.add("hidden");
            registerForm.classList.remove("hidden");
        });
    }

    // Mostrar login, ocultar registro
    if (showLoginBtn) {
        showLoginBtn.addEventListener("click", () => {
            registerForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        });
    }
});