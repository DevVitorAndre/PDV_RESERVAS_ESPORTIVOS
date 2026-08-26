// ==========================================
// LA CANCHA FUT 7
// PAINEL DO GERENTE
// ==========================================

const btnSidebar =
    document.getElementById("btnSidebar");

const sidebar =
    document.getElementById("sidebar");


if (btnSidebar && sidebar) {

    btnSidebar.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle("aberta");

        }
    );

}

// ==========================================
// LOGIN DO GERENTE
// ==========================================

const formLoginGerente =
    document.getElementById("formLoginGerente");

const emailGerente =
    document.getElementById("emailGerente");

const senhaGerente =
    document.getElementById("senhaGerente");

const btnMostrarSenha =
    document.getElementById("btnMostrarSenha");


// ==========================================
// MOSTRAR / ESCONDER SENHA
// ==========================================

if (btnMostrarSenha && senhaGerente) {

    btnMostrarSenha.addEventListener(
        "click",
        () => {

            if (senhaGerente.type === "password") {

                senhaGerente.type = "text";

                btnMostrarSenha.textContent = "🙈";

            } else {

                senhaGerente.type = "password";

                btnMostrarSenha.textContent = "👁";

            }

        }
    );

}


// ==========================================
// LOGIN DE DEMONSTRAÇÃO
// ==========================================

if (formLoginGerente) {

    formLoginGerente.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const erroEmail =
                document.getElementById(
                    "erroEmailGerente"
                );

            const erroSenha =
                document.getElementById(
                    "erroSenhaGerente"
                );


            erroEmail.textContent = "";
            erroSenha.textContent = "";


            emailGerente.classList.remove(
                "campo-erro"
            );

            senhaGerente.classList.remove(
                "campo-erro"
            );


            let valido = true;


            if (!emailGerente.value.trim()) {

                erroEmail.textContent =
                    "Informe seu e-mail.";

                emailGerente.classList.add(
                    "campo-erro"
                );

                valido = false;

            }


            if (senhaGerente.value.length < 4) {

                erroSenha.textContent =
                    "Informe sua senha.";

                senhaGerente.classList.add(
                    "campo-erro"
                );

                valido = false;

            }


            if (!valido) {
                return;
            }


            /*
                LOGIN TEMPORÁRIO DE FRONT-END.

                Isso NÃO representa segurança real.
                Quando criarmos o backend, essa
                validação será feita no servidor.
            */

            sessionStorage.setItem(
                "gerenteDemo",
                "true"
            );


            window.location.href =
                "dashboard.html";

        }
    );

}