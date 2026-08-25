// ===============================================
// LA CANCHA FUT 7
// AGENDA
// ===============================================


const horariosDisponiveis =
    document.querySelectorAll(".horario-card.disponivel");

const resumoVazio =
    document.getElementById("resumoVazio");

const resumoDados =
    document.getElementById("resumoDados");

const resumoData =
    document.getElementById("resumoData");

const resumoHorario =
    document.getElementById("resumoHorario");

const resumoDuracao =
    document.getElementById("resumoDuracao");

const resumoValor =
    document.getElementById("resumoValor");

const btnContinuar =
    document.getElementById("btnContinuar");

const datas =
    document.querySelectorAll(".data-card");



let dataSelecionada = "25/08/2026";


// ===============================================
// SELECIONAR DATA
// ===============================================

datas.forEach((data) => {

    data.addEventListener("click", () => {

        datas.forEach((item) => {
            item.classList.remove("ativo");
        });

        data.classList.add("ativo");

        if (data.dataset.data) {
            dataSelecionada = data.dataset.data;
        }

        limparHorarioSelecionado();

    });

});



// ===============================================
// SELECIONAR HORÁRIO
// ===============================================

horariosDisponiveis.forEach((horario) => {

    horario.addEventListener("click", () => {

        horariosDisponiveis.forEach((item) => {
            item.classList.remove("selecionado");
        });

        horario.classList.add("selecionado");


        const inicio =
            horario.dataset.inicio;

        const fim =
            horario.dataset.fim;

        const valor =
            Number(horario.dataset.valor);


        const duracao =
            calcularDuracao(inicio, fim);


        mostrarResumo(
            inicio,
            fim,
            valor,
            duracao
        );

    });

});



// ===============================================
// MOSTRAR RESUMO
// ===============================================

function mostrarResumo(
    inicio,
    fim,
    valor,
    duracao
) {

    resumoVazio.style.display = "none";

    resumoDados.classList.add("ativo");


    resumoData.textContent =
        dataSelecionada;


    resumoHorario.textContent =
        `${inicio} - ${fim}`;


    resumoDuracao.textContent =
        duracao;


    resumoValor.textContent =
        valor.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );


    // Cria o endereço para reserva.html

    btnContinuar.href =
        `reserva.html?data=${encodeURIComponent(dataSelecionada)}` +
        `&inicio=${encodeURIComponent(inicio)}` +
        `&fim=${encodeURIComponent(fim)}` +
        `&valor=${encodeURIComponent(valor)}`;

}



// ===============================================
// CALCULAR DURAÇÃO
// ===============================================

function calcularDuracao(inicio, fim) {

    const [horaInicio, minutoInicio] =
        inicio.split(":").map(Number);

    const [horaFim, minutoFim] =
        fim.split(":").map(Number);


    const minutosInicio =
        horaInicio * 60 + minutoInicio;

    const minutosFim =
        horaFim * 60 + minutoFim;


    const totalMinutos =
        minutosFim - minutosInicio;


    const horas =
        Math.floor(totalMinutos / 60);

    const minutos =
        totalMinutos % 60;


    if (horas > 0 && minutos > 0) {

        return `${horas}h ${minutos}min`;

    }


    if (horas > 0) {

        return `${horas}h`;

    }


    return `${minutos}min`;

}



// ===============================================
// LIMPAR HORÁRIO SE TROCAR DATA
// ===============================================

function limparHorarioSelecionado() {

    horariosDisponiveis.forEach((item) => {

        item.classList.remove("selecionado");

    });


    resumoVazio.style.display = "block";

    resumoDados.classList.remove("ativo");

}