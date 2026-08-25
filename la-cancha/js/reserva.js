// ===========================================
// LA CANCHA FUT 7
// CONFIRMAÇÃO DA RESERVA
// ===========================================


// PEGA OS PARÂMETROS DA URL

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


// ELEMENTOS DA TELA

const reservaData =
    document.getElementById("reservaData");

const reservaHorario =
    document.getElementById("reservaHorario");

const reservaDuracao =
    document.getElementById("reservaDuracao");

const reservaValor =
    document.getElementById("reservaValor");


const resumoData =
    document.getElementById("resumoData");

const resumoHorario =
    document.getElementById("resumoHorario");

const resumoDuracao =
    document.getElementById("resumoDuracao");


const btnContinuarLogin =
    document.getElementById("btnContinuarLogin");


// ===========================================
// VERIFICAR SE RECEBEU UMA RESERVA
// ===========================================

if (!data || !inicio || !fim || !valor) {

    alert(
        "Nenhum horário foi selecionado. Escolha um horário na agenda."
    );

    window.location.href = "agenda.html";

}


// ===========================================
// CALCULAR DURAÇÃO
// ===========================================

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


// ===========================================
// FORMATAR VALOR
// ===========================================

const valorFormatado =
    Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );


const duracao =
    calcularDuracao(inicio, fim);


const horarioFormatado =
    `${inicio} às ${fim}`;


// ===========================================
// MOSTRAR NA TELA
// ===========================================

reservaData.textContent =
    data;

reservaHorario.textContent =
    horarioFormatado;

reservaDuracao.textContent =
    duracao;

reservaValor.textContent =
    valorFormatado;


// RESUMO

resumoData.textContent =
    data;

resumoHorario.textContent =
    horarioFormatado;

resumoDuracao.textContent =
    duracao;


// ===========================================
// CONTINUAR PARA LOGIN
// ===========================================

btnContinuarLogin.addEventListener(
    "click",
    () => {

        const dadosReserva =
            new URLSearchParams();

        dadosReserva.set(
            "data",
            data
        );

        dadosReserva.set(
            "inicio",
            inicio
        );

        dadosReserva.set(
            "fim",
            fim
        );

        dadosReserva.set(
            "valor",
            valor
        );


        window.location.href =
            `login.html?${dadosReserva.toString()}`;

    }
);