// ======================================================
// LA CANCHA FUT 7
// AGENDA DO CLIENTE
// ======================================================



// ======================================================
// ELEMENTOS DA PÁGINA
// ======================================================

const agendaData =
    document.getElementById("agendaData");

const listaAgenda =
    document.getElementById("listaAgenda");

const agendaVazia =
    document.getElementById("agendaVazia");

const quantidadeAgenda =
    document.getElementById("quantidadeAgenda");



// ======================================================
// CARREGAR HORÁRIOS
// ======================================================

function carregarHorariosAgenda() {

    try {

        const dados =
            localStorage.getItem(
                "horariosLaCancha"
            );


        if (!dados) {
            return [];
        }


        const horarios =
            JSON.parse(dados);


        if (!Array.isArray(horarios)) {
            return [];
        }


        return horarios;

    } catch (erro) {

        console.error(
            "Erro ao carregar agenda:",
            erro
        );

        return [];

    }

}



// ======================================================
// FORMATAR DATA
// ======================================================

function formatarDataAgenda(data) {

    if (!data) {
        return "";
    }


    const [ano, mes, dia] =
        data
            .split("-")
            .map(Number);


    const dataFormatada =
        new Date(
            ano,
            mes - 1,
            dia
        );


    return dataFormatada
        .toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "long"
            }
        );

}



// ======================================================
// FORMATAR VALOR
// ======================================================

function formatarValorAgenda(valor) {

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
// HORÁRIO EM MINUTOS
// ======================================================

function horarioParaMinutosAgenda(
    horario
) {

    const [hora, minuto] =
        horario
            .split(":")
            .map(Number);


    return (
        hora * 60 +
        minuto
    );

}



// ======================================================
// CALCULAR DURAÇÃO
// ======================================================

function calcularDuracaoAgenda(
    inicio,
    fim
) {

    const minutos =
        horarioParaMinutosAgenda(fim) -
        horarioParaMinutosAgenda(inicio);


    const horas =
        Math.floor(
            minutos / 60
        );

    const restante =
        minutos % 60;


    if (
        horas > 0 &&
        restante > 0
    ) {

        return `${horas}h ${restante}min`;

    }


    if (horas > 0) {

        return `${horas}h`;

    }


    return `${restante}min`;

}



// ======================================================
// ESCAPAR TEXTO PARA URL
// ======================================================

function criarParametrosReserva(
    horario,
    tipo
) {

    const parametros =
        new URLSearchParams();


    parametros.set(
        "tipo",
        tipo
    );


    parametros.set(
        "data",
        horario.data
    );


    parametros.set(
        "inicio",
        horario.inicio
    );


    parametros.set(
        "fim",
        horario.fim
    );


    if (tipo === "avulso") {

        parametros.set(
            "valor",
            horario.valorAvulso
        );

    }


    if (tipo === "fixo") {

        parametros.set(
            "valor",
            horario.valorFixo
        );

    }


    parametros.set(
        "horarioId",
        horario.id
    );


    return parametros.toString();

}



// ======================================================
// RENDERIZAR AGENDA
// ======================================================

function renderizarAgenda() {

    if (!listaAgenda) {
        return;
    }


    listaAgenda.innerHTML = "";


    let horarios =
        carregarHorariosAgenda();



    // ==================================================
    // MOSTRAR APENAS HORÁRIOS DISPONÍVEIS
    // ==================================================

    horarios =
        horarios.filter(
            (horario) => {

                return (
                    horario.status ===
                    "disponivel"
                );

            }
        );



    // ==================================================
    // FILTRAR PELA DATA
    // ==================================================

    if (
        agendaData &&
        agendaData.value
    ) {

        horarios =
            horarios.filter(
                (horario) => {

                    return (
                        horario.data ===
                        agendaData.value
                    );

                }
            );

    }



    // ==================================================
    // ORDENAR
    // ==================================================

    horarios.sort(
        (a, b) => {

            const horarioA =
                `${a.data} ${a.inicio}`;

            const horarioB =
                `${b.data} ${b.inicio}`;


            return horarioA
                .localeCompare(
                    horarioB
                );

        }
    );



    // ==================================================
    // QUANTIDADE
    // ==================================================

    if (quantidadeAgenda) {

        quantidadeAgenda.textContent =
            horarios.length;

    }



    // ==================================================
    // AGENDA VAZIA
    // ==================================================

    if (
        horarios.length === 0
    ) {

        if (agendaVazia) {

            agendaVazia.style.display =
                "block";

        }


        return;

    }


    if (agendaVazia) {

        agendaVazia.style.display =
            "none";

    }



    // ==================================================
    // CRIAR CARDS
    // ==================================================

    horarios.forEach(
        (horario) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "agenda-horario-card";


            const duracao =
                calcularDuracaoAgenda(
                    horario.inicio,
                    horario.fim
                );



            // ==================================================
            // AVULSO
            // ==================================================

            let blocoAvulso = "";


            if (
                horario.aceitaAvulso &&
                horario.valorAvulso
            ) {

                const parametros =
                    criarParametrosReserva(
                        horario,
                        "avulso"
                    );


                blocoAvulso = `

                    <div class="agenda-modalidade avulso">

                        <div class="agenda-modalidade-info">

                            <span class="agenda-modalidade-tipo">
                                RESERVA AVULSA
                            </span>

                            <strong>
                                ${formatarValorAgenda(
                                    horario.valorAvulso
                                )}
                            </strong>

                            <small>
                                por jogo
                            </small>

                        </div>


                        <a
                            href="reserva.html?${parametros}"
                            class="btn-agenda-avulso"
                        >
                            Reservar este dia
                        </a>

                    </div>

                `;

            }



            // ==================================================
            // FIXO
            // ==================================================

            let blocoFixo = "";


            if (
                horario.aceitaFixo &&
                horario.valorFixo
            ) {

                const parametros =
                    criarParametrosReserva(
                        horario,
                        "fixo"
                    );


                blocoFixo = `

                    <div class="agenda-modalidade fixo">

                        <div class="agenda-modalidade-info">

                            <span class="agenda-modalidade-tipo">
                                🔁 HORÁRIO FIXO
                            </span>

                            <strong>
                                ${formatarValorAgenda(
                                    horario.valorFixo
                                )}
                            </strong>

                            <small>
                                por mês
                            </small>

                        </div>


                        <button
                            type="button"
                            class="btn-agenda-fixo"
                            data-parametros="${parametros}"
                        >
                            Quero este horário fixo
                        </button>

                    </div>

                `;

            }



            // ==================================================
            // CARD
            // ==================================================

            card.innerHTML = `

                <div class="agenda-horario-topo">

                    <div>

                        <span class="agenda-data-label">
                            ${formatarDataAgenda(
                                horario.data
                            )}
                        </span>


                        <h2>
                            ${horario.inicio}
                            →
                            ${horario.fim}
                        </h2>


                        <p>
                            Duração:
                            ${duracao}
                        </p>

                    </div>


                    <span class="agenda-status-disponivel">
                        ● Disponível
                    </span>

                </div>


                <div class="agenda-opcoes">

                    ${blocoAvulso}

                    ${blocoFixo}

                </div>

            `;


            listaAgenda.appendChild(
                card
            );

        }
    );

}



// ======================================================
// ESCOLHER HORÁRIO FIXO
// ======================================================

if (listaAgenda) {

    listaAgenda.addEventListener(
        "click",
        (event) => {

            const botaoFixo =
                event.target.closest(
                    ".btn-agenda-fixo"
                );


            if (!botaoFixo) {
                return;
            }


            const parametros =
                botaoFixo.dataset
                    .parametros;


            /*
                Ainda vamos criar a página
                específica de contratação
                do horário fixo.

                Por enquanto já mandamos
                todas as informações pela URL.
            */

            window.location.href =
                `reserva.html?${parametros}`;

        }
    );

}



// ======================================================
// ALTERAR DATA
// ======================================================

if (agendaData) {

    agendaData.addEventListener(
        "change",
        () => {

            renderizarAgenda();

        }
    );

}



// ======================================================
// DATA PADRÃO
// ======================================================

function definirDataInicialAgenda() {

    if (!agendaData) {
        return;
    }


    /*
        Se não houver uma data selecionada,
        procuramos a primeira data cadastrada.
    */

    const horarios =
        carregarHorariosAgenda()
            .filter(
                (horario) => {

                    return (
                        horario.status ===
                        "disponivel"
                    );

                }
            )
            .sort(
                (a, b) => {

                    return a.data
                        .localeCompare(
                            b.data
                        );

                }
            );


    if (
        horarios.length > 0
    ) {

        agendaData.value =
            horarios[0].data;

    }

}



// ======================================================
// INICIALIZAÇÃO
// ======================================================

if (listaAgenda) {

    definirDataInicialAgenda();

    renderizarAgenda();

}