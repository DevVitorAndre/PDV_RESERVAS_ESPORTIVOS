// ======================================================
// LA CANCHA FUT 7
// IDENTIFICAÇÃO DO CLIENTE
// ======================================================



// ======================================================
// 1. PARÂMETROS DA RESERVA
// ======================================================

const parametrosLogin =
    new URLSearchParams(
        window.location.search
    );


const loginTipo =
    parametrosLogin.get("tipo");

const loginData =
    parametrosLogin.get("data");

const loginInicio =
    parametrosLogin.get("inicio");

const loginFim =
    parametrosLogin.get("fim");

const loginValor =
    Number(
        parametrosLogin.get("valor")
    );

const loginHorarioId =
    parametrosLogin.get(
        "horarioId"
    );



// ======================================================
// 2. ELEMENTOS DO CLIENTE
// ======================================================

const formCliente =
    document.getElementById(
        "formCliente"
    );

const clienteNome =
    document.getElementById(
        "clienteNome"
    );

const clienteWhatsapp =
    document.getElementById(
        "clienteWhatsapp"
    );

const clienteEmail =
    document.getElementById(
        "clienteEmail"
    );

const lembrarCliente =
    document.getElementById(
        "lembrarCliente"
    );

const btnGoogle =
    document.getElementById(
        "btnGoogle"
    );



// ======================================================
// 3. ELEMENTOS DO RESUMO
// ======================================================

const loginDescricao =
    document.getElementById(
        "loginDescricao"
    );

const loginResumoTitulo =
    document.getElementById(
        "loginResumoTitulo"
    );

const loginTipoReserva =
    document.getElementById(
        "loginTipoReserva"
    );

const loginTipoIcone =
    document.getElementById(
        "loginTipoIcone"
    );

const loginTipoTexto =
    document.getElementById(
        "loginTipoTexto"
    );

const loginLabelData =
    document.getElementById(
        "loginLabelData"
    );

const loginResumoData =
    document.getElementById(
        "loginResumoData"
    );

const loginResumoHorario =
    document.getElementById(
        "loginResumoHorario"
    );

const loginLinhaRecorrencia =
    document.getElementById(
        "loginLinhaRecorrencia"
    );

const loginResumoRecorrencia =
    document.getElementById(
        "loginResumoRecorrencia"
    );

const loginLabelValor =
    document.getElementById(
        "loginLabelValor"
    );

const loginComplementoValor =
    document.getElementById(
        "loginComplementoValor"
    );

const loginResumoValor =
    document.getElementById(
        "loginResumoValor"
    );

const loginTextoAviso =
    document.getElementById(
        "loginTextoAviso"
    );



// ======================================================
// 4. VALIDAR RESERVA
// ======================================================

function reservaLoginValida() {

    const tipoValido =
        loginTipo === "avulso" ||
        loginTipo === "fixo";


    return (
        tipoValido &&
        loginData &&
        loginInicio &&
        loginFim &&
        loginValor > 0
    );

}



// ======================================================
// 5. DATA LOCAL
// ======================================================

function criarDataLogin(data) {

    const [
        ano,
        mes,
        dia
    ] =
        data
            .split("-")
            .map(Number);


    return new Date(
        ano,
        mes - 1,
        dia
    );

}



// ======================================================
// 6. FORMATAR DATA
// ======================================================

function formatarDataLogin(data) {

    const objetoData =
        criarDataLogin(
            data
        );


    return objetoData
        .toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

}



// ======================================================
// 7. DIA DA SEMANA
// ======================================================

function obterDiaSemanaLogin(
    data
) {

    return criarDataLogin(data)
        .toLocaleDateString(
            "pt-BR",
            {
                weekday: "long"
            }
        );

}



// ======================================================
// 8. MÊS DE REFERÊNCIA
// ======================================================

function obterMesLogin(data) {

    return criarDataLogin(data)
        .toLocaleDateString(
            "pt-BR",
            {
                month: "long",
                year: "numeric"
            }
        );

}



// ======================================================
// 9. FORMATAR VALOR
// ======================================================

function formatarValorLogin(valor) {

    return Number(valor)
        .toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

}



// ======================================================
// 10. CONFIGURAR RESERVA AVULSA
// ======================================================

function configurarLoginAvulso() {

    if (loginDescricao) {

        loginDescricao.textContent =
            "Informe seus dados para continuar com sua reserva.";

    }


    if (loginResumoTitulo) {

        loginResumoTitulo.textContent =
            "Resumo da reserva";

    }


    if (loginTipoReserva) {

        loginTipoReserva.classList.add(
            "avulso"
        );

    }


    if (loginTipoIcone) {

        loginTipoIcone.textContent =
            "⚽";

    }


    if (loginTipoTexto) {

        loginTipoTexto.textContent =
            "Reserva avulsa";

    }


    if (loginLabelData) {

        loginLabelData.textContent =
            "Data";

    }


    if (loginResumoData) {

        loginResumoData.textContent =
            formatarDataLogin(
                loginData
            );

    }


    if (loginResumoHorario) {

        loginResumoHorario.textContent =
            `${loginInicio} → ${loginFim}`;

    }


    if (loginLinhaRecorrencia) {

        loginLinhaRecorrencia
            .style
            .display =
            "none";

    }


    if (loginLabelValor) {

        loginLabelValor.textContent =
            "Valor da reserva";

    }


    if (loginComplementoValor) {

        loginComplementoValor
            .textContent =
            "pagamento único";

    }


    if (loginResumoValor) {

        loginResumoValor.textContent =
            formatarValorLogin(
                loginValor
            );

    }


    if (loginTextoAviso) {

        loginTextoAviso.textContent =
            "Seu horário será confirmado somente após a aprovação do pagamento.";

    }

}



// ======================================================
// 11. CONFIGURAR HORÁRIO FIXO
// ======================================================

function configurarLoginFixo() {

    const diaSemana =
        obterDiaSemanaLogin(
            loginData
        );


    const mes =
        obterMesLogin(
            loginData
        );


    if (loginDescricao) {

        loginDescricao.textContent =
            "Informe seus dados para continuar com a contratação do horário fixo.";

    }


    if (loginResumoTitulo) {

        loginResumoTitulo.textContent =
            "Resumo da mensalidade";

    }


    if (loginTipoReserva) {

        loginTipoReserva.classList.add(
            "fixo"
        );

    }


    if (loginTipoIcone) {

        loginTipoIcone.textContent =
            "🔁";

    }


    if (loginTipoTexto) {

        loginTipoTexto.textContent =
            "Horário fixo mensal";

    }


    if (loginLabelData) {

        loginLabelData.textContent =
            "Período";

    }


    if (loginResumoData) {

        loginResumoData.textContent =
            mes;

    }


    if (loginResumoHorario) {

        loginResumoHorario.textContent =
            `${loginInicio} → ${loginFim}`;

    }


    if (loginLinhaRecorrencia) {

        loginLinhaRecorrencia
            .style
            .display =
            "flex";

    }


    if (loginResumoRecorrencia) {

        loginResumoRecorrencia
            .textContent =
            `Toda ${diaSemana}`;

    }


    if (loginLabelValor) {

        loginLabelValor.textContent =
            "Mensalidade";

    }


    if (loginComplementoValor) {

        loginComplementoValor
            .textContent =
            "referente ao mês";

    }


    if (loginResumoValor) {

        loginResumoValor.textContent =
            formatarValorLogin(
                loginValor
            );

    }


    if (loginTextoAviso) {

        loginTextoAviso.textContent =
            "Após o pagamento, o horário ficará reservado para seu grupo durante o mês selecionado.";

    }

}



// ======================================================
// 12. MÁSCARA WHATSAPP
// ======================================================

function aplicarMascaraWhatsapp(
    valor
) {

    let numero =
        valor.replace(
            /\D/g,
            ""
        );


    numero =
        numero.substring(
            0,
            11
        );


    if (
        numero.length <= 2
    ) {

        return numero;

    }


    if (
        numero.length <= 6
    ) {

        return (
            `(${numero.slice(0, 2)}) ` +
            numero.slice(2)
        );

    }


    if (
        numero.length <= 10
    ) {

        return (
            `(${numero.slice(0, 2)}) ` +
            `${numero.slice(2, 6)}-` +
            numero.slice(6)
        );

    }


    return (
        `(${numero.slice(0, 2)}) ` +
        `${numero.slice(2, 7)}-` +
        numero.slice(7)
    );

}



if (clienteWhatsapp) {

    clienteWhatsapp.addEventListener(
        "input",
        () => {

            clienteWhatsapp.value =
                aplicarMascaraWhatsapp(
                    clienteWhatsapp.value
                );

        }
    );

}



// ======================================================
// 13. CARREGAR CLIENTE SALVO
// ======================================================

function carregarClienteSalvo() {

    try {

        const dados =
            localStorage.getItem(
                "clienteLaCancha"
            );


        if (!dados) {
            return;
        }


        const cliente =
            JSON.parse(
                dados
            );


        if (
            clienteNome &&
            cliente.nome
        ) {

            clienteNome.value =
                cliente.nome;

        }


        if (
            clienteWhatsapp &&
            cliente.whatsapp
        ) {

            clienteWhatsapp.value =
                cliente.whatsapp;

        }


        if (
            clienteEmail &&
            cliente.email
        ) {

            clienteEmail.value =
                cliente.email;

        }


        if (lembrarCliente) {

            lembrarCliente.checked =
                true;

        }

    } catch (erro) {

        console.error(
            "Erro ao carregar cliente:",
            erro
        );

    }

}



// ======================================================
// 14. VALIDAR NOME
// ======================================================

function validarNome() {

    const erro =
        document.getElementById(
            "erroClienteNome"
        );


    if (!clienteNome) {

        return false;

    }


    const nome =
        clienteNome.value.trim();


    if (erro) {

        erro.textContent = "";

    }


    clienteNome.classList.remove(
        "campo-erro"
    );


    if (
        nome.length < 3
    ) {

        if (erro) {

            erro.textContent =
                "Informe seu nome completo.";

        }


        clienteNome.classList.add(
            "campo-erro"
        );


        return false;

    }


    return true;

}



// ======================================================
// 15. VALIDAR WHATSAPP
// ======================================================

function validarWhatsapp() {

    const erro =
        document.getElementById(
            "erroClienteWhatsapp"
        );


    const numeros =
        clienteWhatsapp.value
            .replace(
                /\D/g,
                ""
            );


    if (erro) {

        erro.textContent = "";

    }


    clienteWhatsapp.classList.remove(
        "campo-erro"
    );


    if (
        numeros.length < 10
    ) {

        if (erro) {

            erro.textContent =
                "Informe um WhatsApp válido.";

        }


        clienteWhatsapp.classList.add(
            "campo-erro"
        );


        return false;

    }


    return true;

}



// ======================================================
// 16. VALIDAR EMAIL
// ======================================================

function validarEmail() {

    const erro =
        document.getElementById(
            "erroClienteEmail"
        );


    const email =
        clienteEmail.value.trim();


    if (erro) {

        erro.textContent = "";

    }


    clienteEmail.classList.remove(
        "campo-erro"
    );


    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !emailValido.test(
            email
        )
    ) {

        if (erro) {

            erro.textContent =
                "Informe um e-mail válido.";

        }


        clienteEmail.classList.add(
            "campo-erro"
        );


        return false;

    }


    return true;

}



// ======================================================
// 17. SALVAR CLIENTE
// ======================================================

function salvarDadosCliente() {

    const cliente =
    {
        nome:
            clienteNome.value.trim(),

        whatsapp:
            clienteWhatsapp.value,

        email:
            clienteEmail.value.trim()
    };


    // DURANTE O FLUXO ATUAL

    sessionStorage.setItem(
        "clienteLaCanchaAtual",
        JSON.stringify(
            cliente
        )
    );


    // SE MARCOU LEMBRAR

    if (
        lembrarCliente &&
        lembrarCliente.checked
    ) {

        localStorage.setItem(
            "clienteLaCancha",
            JSON.stringify(
                cliente
            )
        );

    } else {

        localStorage.removeItem(
            "clienteLaCancha"
        );

    }


    return cliente;

}



// ======================================================
// 18. SALVAR RESERVA TEMPORÁRIA
// ======================================================

function salvarReservaTemporaria() {

    const reserva =
    {
        horarioId:
            loginHorarioId,

        tipo:
            loginTipo,

        data:
            loginData,

        inicio:
            loginInicio,

        fim:
            loginFim,

        valor:
            loginValor
    };


    sessionStorage.setItem(
        "reservaLaCanchaAtual",
        JSON.stringify(
            reserva
        )
    );

}



// ======================================================
// 19. CONTINUAR PARA PAGAMENTO
// ======================================================

if (formCliente) {

    formCliente.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const nomeValido =
                validarNome();


            const whatsappValido =
                validarWhatsapp();


            const emailValido =
                validarEmail();


            if (
                !nomeValido ||
                !whatsappValido ||
                !emailValido
            ) {

                return;

            }


            salvarDadosCliente();

            salvarReservaTemporaria();



            // PRESERVA OS PARÂMETROS

            const parametros =
                new URLSearchParams();


            parametros.set(
                "tipo",
                loginTipo
            );


            parametros.set(
                "data",
                loginData
            );


            parametros.set(
                "inicio",
                loginInicio
            );


            parametros.set(
                "fim",
                loginFim
            );


            parametros.set(
                "valor",
                loginValor
            );


            if (loginHorarioId) {

                parametros.set(
                    "horarioId",
                    loginHorarioId
                );

            }



            /*
                PRÓXIMO PASSO DO PROJETO:

                pagamento.html
            */

            window.location.href =
                `pagamento.html?${parametros.toString()}`;

        }
    );

}



// ======================================================
// 20. GOOGLE
// ======================================================

if (btnGoogle) {

    btnGoogle.addEventListener(
        "click",
        () => {

            alert(
                "O login com Google será conectado quando implementarmos o backend."
            );

        }
    );

}



// ======================================================
// 21. INICIALIZAÇÃO
// ======================================================

function iniciarLoginCliente() {

    /*
        Se acessou login.html pelo menu
        apenas para entrar, não obrigamos
        a existir uma reserva.

        Porém se veio do fluxo de reserva,
        mostramos o resumo.
    */

    if (!reservaLoginValida()) {

        if (loginResumoTitulo) {

            loginResumoTitulo.textContent =
                "Nenhuma reserva selecionada";

        }


        const resumo =
            document.querySelector(
                ".login-resumo"
            );


        if (resumo) {

            resumo.style.display =
                "none";

        }


        return;

    }



    if (
        loginTipo ===
        "fixo"
    ) {

        configurarLoginFixo();

    } else {

        configurarLoginAvulso();

    }



    carregarClienteSalvo();

}



iniciarLoginCliente();