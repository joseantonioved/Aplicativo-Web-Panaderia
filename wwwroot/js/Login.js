document.addEventListener("DOMContentLoaded", () => {

    // ====== FORMULARIOS ======
    const formRegistro = document.getElementById("registro");
    const formLoginCliente = document.getElementById("login-cliente");
    const formLoginAdmin = document.getElementById("login-admin");
    const mensaje = document.getElementById("mensaje");

    // ====== Mostrar / ocultar formularios ======
    const showLoginBtn = document.getElementById("show-login");
    const showRegisterBtn = document.getElementById("show-register");
    const customerLogin = document.getElementById("customer-login");
    const customerRegister = document.getElementById("customer-register");
    const adminLoginContainer = document.getElementById("admin-login");

    // Mostrar formulario de registro
    showRegisterBtn?.addEventListener("click", () => {
        customerLogin.classList.add("hidden");
        adminLoginContainer.classList.add("hidden");
        customerRegister.classList.remove("hidden");
    });

    // Mostrar login cliente
    showLoginBtn?.addEventListener("click", () => {
        customerRegister.classList.add("hidden");
        adminLoginContainer.classList.add("hidden");
        customerLogin.classList.remove("hidden");
    });

    // Mostrar login admin
    document.getElementById("show-admin")?.addEventListener("click", () => {
        customerLogin.classList.add("hidden");
        customerRegister.classList.add("hidden");
        adminLoginContainer.classList.remove("hidden");
    });

    // ========================================================
    // ===============   REGISTRO CLIENTE   ===================
    // ========================================================
    formRegistro?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const password = document.getElementById("register-password").value;
        const confirm = document.getElementById("register-confirm").value;

        if (password !== confirm) {
            showMessage("Las contraseñas no coinciden", true);
            return;
        }

        const data = {
            NombreUsuario: document.getElementById("register-name").value,
            Email: document.getElementById("register-email").value,
            Telefono: document.getElementById("register-phone").value,
            Contrasena: password,
            Rol: "cliente"
        };

        try {
            const res = await fetch("/api/Registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                showMessage("Cliente registrado correctamente", false);
                formRegistro.reset();
                setTimeout(() => {
                    window.location.href = "/CustomerMvc/Index";
                }, 1000);
            } else {
                const errorText = await res.text();
                showMessage("Error al registrar: " + errorText, true);
            }
        } catch (err) {
            showMessage("Error al conectar con el servidor: " + err.message, true);
        }
    });

    // ========================================================
    // ===============   LOGIN CLIENTE   =======================
    // ========================================================
    formLoginCliente?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            Email: document.getElementById("login-email").value,
            Contrasena: document.getElementById("login-password").value
        };

        try {
            const res = await fetch("/api/Login/Cliente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                showMessage("Inicio de sesión exitoso", false);
                setTimeout(() => {
                    window.location.href = "/CustomerMvc/Index";
                }, 800);
            } else {
                showMessage("Credenciales incorrectas", true);
            }

        } catch (err) {
            showMessage("No se pudo conectar con el servidor", true);
        }
    });

    // ========================================================
    // ===============       LOGIN ADMIN     ===================
    // ========================================================
    formLoginAdmin?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            Email: document.getElementById("admin-email").value,
            Contrasena: document.getElementById("admin-password").value
        };

        try {
            const res = await fetch("/api/Login/Admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                showMessage("Bienvenido administrador", false);
                setTimeout(() => {
                    window.location.href = "/AdminMvc/Dashboard";
                }, 800);
            } else {
                showMessage("Credenciales incorrectas", true);
            }

        } catch (err) {
            showMessage("Error al conectar con el servidor", true);
        }
    });

    // ========================================================
    // ===============   FUNCIÓN PARA MENSAJES   ===============
    // ========================================================
    function showMessage(text, isError) {
        mensaje.innerText = text;
        mensaje.classList.remove("text-green-500", "text-red-500");
        mensaje.classList.add(isError ? "text-red-500" : "text-green-500");
    }

});