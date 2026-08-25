// ================================================
// LA CANCHA FUT 7
// LOGIN DO CLIENTE
// ================================================


// ================================================
// DADOS RECEBIDOS DA RESERVA
// ================================================

const parametros =
    new URLSearchParams(window.location.search);

const data =
    parametros.get("data");

const inicio =
    parametros.get("inicio");

const fim =
    parametros.get("fim");

const valor =
    parametros.get("valor");


// ================================================
// ELEMENTOS
// ================================================

const loginData =
    document.getElementById("loginData");

const loginHorario =
    document.getElementById("loginHorario");

const loginDuracao =
    document.getElementById("loginDuracao");

const loginValor =
    document.getElementById("loginValor");

const cardReserva =
    document.getElementById("cardReserva");

const formLogin =
    document.getElementById("formLogin");

const nome =
    document.getElementById("nome");

const whatsapp =
    document.getElementById("whatsapp");

const email =
    document.getElementById("email");

const lembrar =
    document.getElementById("lembrar");

const btnGoogle =
    document.getElementById("btnGoogle");


// ================================================
// VERIFICAR SE O CLIENTE VEIO DE UMA RESERVA
// ================================================

const possuiReserva =
    data && inicio && fim && valor;


if (possuiReserva) {

    mostrarReserva();

} else {

    cardReserva.style.display = "none";

}


// ================================================
// MOSTRAR RESERVA
// ================================================

function mostrarReserva() {

    const duracao =
        calcularDuracao(inicio, fim);

    const valorFormatado =
        Number(valor).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );


    loginData.textContent =
        data;

    loginHorario.textContent =
        `${inicio} às ${fim}`;

    loginDuracao.textContent =
        duracao;

    loginValor.textContent =
        valorFormatado;

}


// ================================================
// CALCULAR DURAÇÃO
// ================================================

function calcularDuracao(inicio, fim) {

    const [horaInicio, minutoInicio] =
        inicio.split(":").map(Number);

    const [horaFim, minutoFim] =
        fim.split(":").map(Number);


    const minutosInicio =
        horaInicio * 60 + minutoInicio;

    const minutosFim =
        horaFim * 60 + minutoFim;


    const total =
        minutosFim - minutosInicio;


    const horas =
        Math.floor(total / 60);

    const minutos =
        total % 60;


    if (horas > 0 && minutos > 0) {

        return `${horas}h ${minutos}min`;

    }

    if (horas > 0) {

        return `${horas}h`;

    }

    return `${minutos}min`;

}


// ================================================
// MÁSCARA WHATSAPP
// ================================================

whatsapp.addEventListener(
    "input",
    () => {

        let numero =
            whatsapp.value.replace(/\D/g, "");

        numero =
            numero.substring(0, 11);


        if (numero.length > 10) {

            numero =
                numero.replace(
                    /(\d{2})(\d{5})(\d{4})/,
                    "($1) $2-$3"
                );

        } else if (numero.length > 6) {

            numero =
                numero.replace(
                    /(\d{2})(\d{4})(\d{0,4})/,
                    "($1) $2-$3"
                );

        } else if (numero.length > 2) {

            numero =
                numero.replace(
                    /(\d{2})(\d+)/,
                    "($1) $2"
                );

        }

        whatsapp.value =
            numero;

    }
);


// ================================================
// LIMPAR ERROS
// ================================================

function limparErros() {

    document
        .querySelectorAll(".campo input")
        .forEach((campo) => {

            campo.classList.remove(
                "campo-erro"
            );

        });


    document
        .querySelectorAll(".erro")
        .forEach((erro) => {

            erro.textContent = "";

        });

}


// ================================================
// VALIDAR FORMULÁRIO
// ================================================

function validarFormulario() {

    limparErros();


    let valido =
        true;


    // NOME

    if (nome.value.trim().length < 3) {

        document.getElementById(
            "erroNome"
        ).textContent =
            "Informe seu nome completo.";

        nome.classList.add(
            "campo-erro"
        );

        valido =
            false;

    }


    // WHATSAPP

    const numeroWhatsapp =
        whatsapp.value.replace(/\D/g, "");


    if (numeroWhatsapp.length < 10) {

        document.getElementById(
            "erroWhatsapp"
        ).textContent =
            "Informe um WhatsApp válido.";

        whatsapp.classList.add(
            "campo-erro"
        );

        valido =
            false;

    }


    // EMAIL

    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailValido.test(email.value)) {

        document.getElementById(
            "erroEmail"
        ).textContent =
            "Informe um e-mail válido.";

        email.classList.add(
            "campo-erro"
        );

        valido =
            false;

    }


    return valido;

}


// ================================================
// ENVIAR FORMULÁRIO
// ================================================

formLogin.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        if (!validarFormulario()) {

            return;

        }


        const cliente = {

            nome:
                nome.value.trim(),

            whatsapp:
                whatsapp.value,

            email:
                email.value.trim()

        };


        // Por enquanto vamos usar sessionStorage.
        // Depois isso irá para nosso backend/banco.

        sessionStorage.setItem(
            "clienteReserva",
            JSON.stringify(cliente)
        );


        if (possuiReserva) {

            const reserva = {

                data:
                    data,

                inicio:
                    inicio,

                fim:
                    fim,

                valor:
                    Number(valor)

            };


            sessionStorage.setItem(
                "reservaAtual",
                JSON.stringify(reserva)
            );

        }


        // Se marcou "lembrar"

        if (lembrar.checked) {

            localStorage.setItem(
                "clienteLaCancha",
                JSON.stringify(cliente)
            );

        }


        alert(
            "Dados confirmados! O próximo passo será o pagamento."
        );

    }
);


// ================================================
// CARREGAR DADOS SALVOS
// ================================================

const clienteSalvo =
    localStorage.getItem(
        "clienteLaCancha"
    );


if (clienteSalvo) {

    const cliente =
        JSON.parse(clienteSalvo);


    nome.value =
        cliente.nome || "";

    whatsapp.value =
        cliente.whatsapp || "";

    email.value =
        cliente.email || "";

    lembrar.checked =
        true;

}


// ================================================
// GOOGLE
// ================================================

btnGoogle.addEventListener(
    "click",
    () => {

        alert(
            "O login com Google será conectado quando iniciarmos o backend e a autenticação do sistema."
        );

    }
);