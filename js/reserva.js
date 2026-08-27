// ======================================================
// LA CANCHA FUT 7
// CONFIRMAÇÃO DE RESERVA
// ======================================================



// ======================================================
// 1. PARÂMETROS RECEBIDOS DA AGENDA
// ======================================================

const parametrosReserva =
    new URLSearchParams(
        window.location.search
    );


const tipoReserva =
    parametrosReserva.get("tipo");

const dataReserva =
    parametrosReserva.get("data");

const inicioReserva =
    parametrosReserva.get("inicio");

const fimReserva =
    parametrosReserva.get("fim");

const valorReserva =
    Number(
        parametrosReserva.get("valor")
    );

const horarioIdReserva =
    parametrosReserva.get("horarioId");



// ======================================================
// 2. ELEMENTOS DA PÁGINA
// ======================================================

const reservaEtiqueta =
    document.getElementById(
        "reservaEtiqueta"
    );

const reservaTitulo =
    document.getElementById(
        "reservaTitulo"
    );

const reservaDescricao =
    document.getElementById(
        "reservaDescricao"
    );

const reservaTipoBanner =
    document.getElementById(
        "reservaTipoBanner"
    );

const reservaTipoIcone =
    document.getElementById(
        "reservaTipoIcone"
    );

const reservaTipoTexto =
    document.getElementById(
        "reservaTipoTexto"
    );

const reservaTipoDescricao =
    document.getElementById(
        "reservaTipoDescricao"
    );


const reservaData =
    document.getElementById(
        "reservaData"
    );

const reservaHorario =
    document.getElementById(
        "reservaHorario"
    );

const reservaDuracao =
    document.getElementById(
        "reservaDuracao"
    );


const labelReservaData =
    document.getElementById(
        "labelReservaData"
    );


const reservaFixoInfo =
    document.getElementById(
        "reservaFixoInfo"
    );

const fixoDiaSemana =
    document.getElementById(
        "fixoDiaSemana"
    );

const fixoMesReferencia =
    document.getElementById(
        "fixoMesReferencia"
    );

const fixoQuantidadeJogos =
    document.getElementById(
        "fixoQuantidadeJogos"
    );


const tituloResumoPagamento =
    document.getElementById(
        "tituloResumoPagamento"
    );

const resumoTipo =
    document.getElementById(
        "resumoTipo"
    );

const resumoLabelData =
    document.getElementById(
        "resumoLabelData"
    );

const resumoData =
    document.getElementById(
        "resumoData"
    );

const resumoHorario =
    document.getElementById(
        "resumoHorario"
    );

const linhaResumoRecorrencia =
    document.getElementById(
        "linhaResumoRecorrencia"
    );

const resumoRecorrencia =
    document.getElementById(
        "resumoRecorrencia"
    );


const labelValorTotal =
    document.getElementById(
        "labelValorTotal"
    );

const descricaoValorTotal =
    document.getElementById(
        "descricaoValorTotal"
    );

const reservaValor =
    document.getElementById(
        "reservaValor"
    );


const textoReservaAviso =
    document.getElementById(
        "textoReservaAviso"
    );


const btnContinuarReserva =
    document.getElementById(
        "btnContinuarReserva"
    );



// ======================================================
// 3. VALIDAR PARÂMETROS
// ======================================================

function dadosReservaValidos() {

    const tipoValido =
        tipoReserva === "avulso" ||
        tipoReserva === "fixo";


    return (
        tipoValido &&
        dataReserva &&
        inicioReserva &&
        fimReserva &&
        valorReserva > 0
    );

}



// ======================================================
// 4. FORMATAR VALOR
// ======================================================

function formatarValorReserva(
    valor
) {

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
// 5. TRANSFORMAR DATA
// ======================================================

function criarDataLocal(
    data
) {

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

function formatarDataReserva(
    data
) {

    const objetoData =
        criarDataLocal(
            data
        );


    return objetoData
        .toLocaleDateString(
            "pt-BR",
            {
                weekday:
                    "long",

                day:
                    "2-digit",

                month:
                    "long",

                year:
                    "numeric"
            }
        );

}



// ======================================================
// 7. DIA DA SEMANA
// ======================================================

function obterDiaSemana(
    data
) {

    const objetoData =
        criarDataLocal(
            data
        );


    return objetoData
        .toLocaleDateString(
            "pt-BR",
            {
                weekday:
                    "long"
            }
        );

}



// ======================================================
// 8. MÊS DE REFERÊNCIA
// ======================================================

function obterMesReferencia(
    data
) {

    const objetoData =
        criarDataLocal(
            data
        );


    return objetoData
        .toLocaleDateString(
            "pt-BR",
            {
                month:
                    "long",

                year:
                    "numeric"
            }
        );

}



// ======================================================
// 9. HORÁRIO PARA MINUTOS
// ======================================================

function horarioParaMinutosReserva(
    horario
) {

    const [
        hora,
        minuto
    ] =
        horario
            .split(":")
            .map(Number);


    return (
        hora * 60 +
        minuto
    );

}



// ======================================================
// 10. CALCULAR DURAÇÃO
// ======================================================

function calcularDuracaoReserva(
    inicio,
    fim
) {

    const totalMinutos =
        horarioParaMinutosReserva(
            fim
        )
        -
        horarioParaMinutosReserva(
            inicio
        );


    const horas =
        Math.floor(
            totalMinutos / 60
        );


    const minutos =
        totalMinutos % 60;


    if (
        horas > 0 &&
        minutos > 0
    ) {

        return (
            `${horas}h ${minutos}min`
        );

    }


    if (horas > 0) {

        return `${horas}h`;

    }


    return `${minutos}min`;

}



// ======================================================
// 11. QUANTAS VEZES O DIA OCORRE NO MÊS
// ======================================================

function contarOcorrenciasNoMes(
    data
) {

    const dataInicial =
        criarDataLocal(
            data
        );


    const ano =
        dataInicial.getFullYear();

    const mes =
        dataInicial.getMonth();

    const diaSemana =
        dataInicial.getDay();


    const ultimoDiaMes =
        new Date(
            ano,
            mes + 1,
            0
        ).getDate();


    let quantidade = 0;


    for (
        let dia = 1;
        dia <= ultimoDiaMes;
        dia++
    ) {

        const dataTeste =
            new Date(
                ano,
                mes,
                dia
            );


        if (
            dataTeste.getDay() ===
            diaSemana
        ) {

            quantidade++;

        }

    }


    return quantidade;

}



// ======================================================
// 12. MONTAR TELA AVULSA
// ======================================================

function configurarReservaAvulsa() {

    if (reservaTipoBanner) {

        reservaTipoBanner.classList.add(
            "tipo-avulso"
        );

    }


    reservaEtiqueta.textContent =
        "CONFIRME SUA RESERVA";


    reservaTitulo.textContent =
        "Revise os dados da sua partida";


    reservaDescricao.textContent =
        "Confira a data, horário e valor antes de continuar.";


    reservaTipoIcone.textContent =
        "⚽";


    reservaTipoTexto.textContent =
        "Reserva avulsa";


    reservaTipoDescricao.textContent =
        "Esta reserva é válida somente para a data selecionada.";



    labelReservaData.textContent =
        "Data da partida";


    reservaData.textContent =
        formatarDataReserva(
            dataReserva
        );


    reservaHorario.textContent =
        `${inicioReserva} → ${fimReserva}`;


    reservaDuracao.textContent =
        calcularDuracaoReserva(
            inicioReserva,
            fimReserva
        );



    // ESCONDE INFORMAÇÃO DE FIXO

    reservaFixoInfo.style.display =
        "none";


    linhaResumoRecorrencia.style.display =
        "none";



    // RESUMO

    tituloResumoPagamento.textContent =
        "Sua reserva";


    resumoTipo.textContent =
        "Avulsa";


    resumoLabelData.textContent =
        "Data";


    resumoData.textContent =
        formatarDataReserva(
            dataReserva
        );


    resumoHorario.textContent =
        `${inicioReserva} → ${fimReserva}`;



    // VALOR

    labelValorTotal.textContent =
        "Valor da reserva";


    descricaoValorTotal.textContent =
        "Pagamento único";


    reservaValor.textContent =
        formatarValorReserva(
            valorReserva
        );


    textoReservaAviso.textContent =
        "O horário será confirmado somente após a aprovação do pagamento.";


    btnContinuarReserva.textContent =
        "Continuar reserva";

}



// ======================================================
// 13. MONTAR TELA DO HORÁRIO FIXO
// ======================================================

function configurarHorarioFixo() {

    const diaSemana =
        obterDiaSemana(
            dataReserva
        );


    const mesReferencia =
        obterMesReferencia(
            dataReserva
        );


    const quantidadeJogos =
        contarOcorrenciasNoMes(
            dataReserva
        );



    if (reservaTipoBanner) {

        reservaTipoBanner.classList.add(
            "tipo-fixo"
        );

    }



    reservaEtiqueta.textContent =
        "HORÁRIO FIXO";


    reservaTitulo.textContent =
        "Confirme seu horário fixo mensal";


    reservaDescricao.textContent =
        "Confira os dados do horário semanal e da mensalidade antes de continuar.";



    reservaTipoIcone.textContent =
        "🔁";


    reservaTipoTexto.textContent =
        "Horário fixo mensal";


    reservaTipoDescricao.textContent =
        `Seu grupo ficará com este horário toda ${diaSemana} durante o mês.`;



    // DADOS

    labelReservaData.textContent =
        "Primeira referência";


    reservaData.textContent =
        formatarDataReserva(
            dataReserva
        );


    reservaHorario.textContent =
        `${inicioReserva} → ${fimReserva}`;


    reservaDuracao.textContent =
        calcularDuracaoReserva(
            inicioReserva,
            fimReserva
        );



    // BLOCO FIXO

    reservaFixoInfo.style.display =
        "block";


    fixoDiaSemana.textContent =
        diaSemana;


    fixoMesReferencia.textContent =
        mesReferencia;


    fixoQuantidadeJogos.textContent =
        quantidadeJogos;



    // RESUMO

    tituloResumoPagamento.textContent =
        "Sua mensalidade";


    resumoTipo.textContent =
        "Horário fixo";


    resumoLabelData.textContent =
        "Mês";


    resumoData.textContent =
        mesReferencia;


    resumoHorario.textContent =
        `${inicioReserva} → ${fimReserva}`;


    linhaResumoRecorrencia.style.display =
        "flex";


    resumoRecorrencia.textContent =
        `Toda ${diaSemana}`;



    // VALOR

    labelValorTotal.textContent =
        "Mensalidade";


    descricaoValorTotal.textContent =
        "Valor referente ao mês";


    reservaValor.textContent =
        formatarValorReserva(
            valorReserva
        );


    textoReservaAviso.textContent =
        "Após o pagamento, este horário ficará reservado para seu grupo durante o mês. A renovação do próximo mês será feita separadamente.";


    btnContinuarReserva.textContent =
        "Continuar contratação";

}



// ======================================================
// 14. CONTINUAR PARA IDENTIFICAÇÃO
// ======================================================

if (btnContinuarReserva) {

    btnContinuarReserva.addEventListener(
        "click",
        () => {

            const parametros =
                new URLSearchParams();


            parametros.set(
                "tipo",
                tipoReserva
            );


            parametros.set(
                "data",
                dataReserva
            );


            parametros.set(
                "inicio",
                inicioReserva
            );


            parametros.set(
                "fim",
                fimReserva
            );


            parametros.set(
                "valor",
                valorReserva
            );


            if (horarioIdReserva) {

                parametros.set(
                    "horarioId",
                    horarioIdReserva
                );

            }


            window.location.href =
                `login.html?${parametros.toString()}`;

        }
    );

}



// ======================================================
// 15. INICIALIZAR
// ======================================================

function iniciarReserva() {

    if (!dadosReservaValidos()) {

        alert(
            "Não foi possível identificar o horário selecionado."
        );


        window.location.href =
            "agenda.html";


        return;

    }


    if (
        tipoReserva ===
        "fixo"
    ) {

        configurarHorarioFixo();

    } else {

        configurarReservaAvulsa();

    }

}



iniciarReserva();