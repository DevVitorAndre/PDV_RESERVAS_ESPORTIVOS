// ======================================================
// LA CANCHA FUT 7
// FUNÇÕES GERAIS DO PAINEL DO GERENTE
// ======================================================



// ======================================================
// 1. MENU LATERAL MOBILE
// ======================================================

const btnSidebar =
    document.getElementById(
        "btnSidebar"
    );

const sidebar =
    document.getElementById(
        "sidebar"
    );


if (
    btnSidebar &&
    sidebar
) {

    btnSidebar.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "aberta"
            );

        }
    );

}



// ======================================================
// 2. LOGIN DO GERENTE
// ======================================================

const formLoginGerente =
    document.getElementById(
        "formLoginGerente"
    );

const emailGerente =
    document.getElementById(
        "emailGerente"
    );

const senhaGerente =
    document.getElementById(
        "senhaGerente"
    );

const btnMostrarSenha =
    document.getElementById(
        "btnMostrarSenha"
    );



// ======================================================
// 3. MOSTRAR / ESCONDER SENHA
// ======================================================

if (
    btnMostrarSenha &&
    senhaGerente
) {

    btnMostrarSenha.addEventListener(
        "click",
        () => {

            const senhaVisivel =
                senhaGerente.type ===
                "text";


            if (senhaVisivel) {

                senhaGerente.type =
                    "password";

                btnMostrarSenha.textContent =
                    "👁";

            } else {

                senhaGerente.type =
                    "text";

                btnMostrarSenha.textContent =
                    "🙈";

            }

        }
    );

}



// ======================================================
// 4. LOGIN TEMPORÁRIO DO GERENTE
// ======================================================

if (
    formLoginGerente &&
    emailGerente &&
    senhaGerente
) {

    formLoginGerente.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();



            // ==================================================
            // CAMPOS DE ERRO
            // ==================================================

            const erroEmail =
                document.getElementById(
                    "erroEmailGerente"
                );

            const erroSenha =
                document.getElementById(
                    "erroSenhaGerente"
                );



            // LIMPAR ERROS

            if (erroEmail) {

                erroEmail.textContent =
                    "";

            }


            if (erroSenha) {

                erroSenha.textContent =
                    "";

            }



            emailGerente.classList.remove(
                "campo-erro"
            );


            senhaGerente.classList.remove(
                "campo-erro"
            );



            let valido =
                true;



            // ==================================================
            // VALIDAR EMAIL
            // ==================================================

            if (
                !emailGerente
                    .value
                    .trim()
            ) {

                if (erroEmail) {

                    erroEmail.textContent =
                        "Informe seu e-mail.";

                }


                emailGerente.classList.add(
                    "campo-erro"
                );


                valido =
                    false;

            }



            // ==================================================
            // VALIDAR SENHA
            // ==================================================

            if (
                senhaGerente
                    .value
                    .length < 4
            ) {

                if (erroSenha) {

                    erroSenha.textContent =
                        "Informe sua senha.";

                }


                senhaGerente.classList.add(
                    "campo-erro"
                );


                valido =
                    false;

            }



            // ==================================================
            // IMPEDIR LOGIN
            // ==================================================

            if (!valido) {

                return;

            }



            /*
                LOGIN TEMPORÁRIO.

                Neste momento estamos usando
                apenas front-end.

                Quando criarmos o backend,
                essa autenticação será feita
                de verdade no servidor.
            */


            sessionStorage.setItem(
                "gerenteDemo",
                "true"
            );



            // ==================================================
            // IR PARA DASHBOARD
            // ==================================================

            window.location.href =
                "dashboard.html";

        }
    );

}