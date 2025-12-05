// Registro.js
document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.getElementById("registro");
    const mensaje = document.getElementById("mensaje");
    const showLoginBtn = document.getElementById("show-login");
    const showRegisterBtn = document.getElementById("show-register");
    const customerLogin = document.getElementById("customer-login");
    const customerRegister = document.getElementById("customer-register");

    // Mostrar formulario de registro
    showRegisterBtn.addEventListener("click", () => {
        customerLogin.classList.add("hidden");
        customerRegister.classList.remove("hidden");
    });

    // Volver al login
    showLoginBtn.addEventListener("click", () => {
        customerRegister.classList.add("hidden");
        customerLogin.classList.remove("hidden");
    });

    // Enviar registro
    registroForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const password = document.getElementById("register-password").value;
        const confirm = document.getElementById("register-confirm").value;

        if (password !== confirm) {
            mensaje.innerText = "Las contraseñas no coinciden";
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
                mensaje.classList.remove("text-red-500");
                mensaje.classList.add("text-green-500");
                mensaje.innerText = "Cliente registrado correctamente";
                registroForm.reset();
                // Redirigir después de 1 segundo
                setTimeout(() => {
                    window.location.href ="/CustomerMvc/Index";
                }, 1000);

            } else {
                const errorText = await res.text();
                mensaje.innerText = "Error al registrar: " + errorText;
            }
        } catch (err) {
            mensaje.innerText = "Error al conectar con el servidor: " + err.message;
        }
    });
});
