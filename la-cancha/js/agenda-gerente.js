// ======================================================
// LA CANCHA FUT 7
// AGENDA DO GERENTE
// ======================================================

(() => {


    // ==================================================
    // STORAGE
    // ==================================================

    const STORAGE_HORARIOS =
        "horariosLaCancha";

    const STORAGE_RESERVAS =
        "reservasLaCancha";

    const STORAGE_PAGAMENTOS =
        "pagamentosLaCancha";


    // ==================================================
    // ELEMENTOS
    // ==================================================

    const inputData =
        document.getElementById(
            "agendaGerenteData"
        );

    const btnAnterior =
        document.getElementById(
            "agendaDiaAnterior"
        );

    const btnProximo =
        document.getElementById(
            "agendaProximoDia"
        );

    const btnHoje =
        document.getElementById(
            "agendaBtnHoje"
        );

    const btnAmanha =
        document.getElementById(
            "agendaBtnAmanha"
        );

    const filtroStatus =
        document.getElementById(
            "agendaFiltroStatus"
        );


    const tituloData =
        document.getElementById(
            "agendaGerenteTituloData"
        );

    const listaTitulo =
        document.getElementById(
            "agendaListaTitulo"
        );


    const totalEl =
        document.getElementById(
            "agendaTotal"
        );

    const disponiveisEl =
        document.getElementById(
            "agendaDisponiveis"
        );

    const reservadosEl =
        document.getElementById(
            "agendaReservados"
        );

    const fixosEl =
        document.getElementById(
            "agendaFixos"
        );

    const bloqueadosEl =
        document.getElementById(
            "agendaBloqueados"
        );


    const quantidadeExibida =
        document.getElementById(
            "agendaQuantidadeExibida"
        );

    const lista =
        document.getElementById(
            "agendaGerenteLista"
        );

    const vazio =
        document.getElementById(
            "agendaGerenteVazio"
        );


    const modal =
        document.getElementById(
            "agendaModal"
        );

    const modalConteudo =
        document.getElementById(
            "agendaModalConteudo"
        );

    const modalFechar =
        document.getElementById(
            "agendaModalFechar"
        );


    // ==================================================
    // STORAGE
    // ==================================================

    function carregarLista(
        chave
    ) {

        try {

            const valor =
                localStorage.getItem(
                    chave
                );


            if (!valor) {
                return [];
            }


            const dados =
                JSON.parse(valor);


            return Array.isArray(dados)
                ? dados
                : [];

        } catch (erro) {

            console.error(
                `Erro ao carregar ${chave}:`,
                erro
            );

            return [];

        }

    }


    // ==================================================
    // DATAS
    // ==================================================

    function dataParaString(
        data
    ) {

        const ano =
            data.getFullYear();

        const mes =
            String(
                data.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const dia =
            String(
                data.getDate()
            ).padStart(
                2,
                "0"
            );


        return `${ano}-${mes}-${dia}`;

    }


    function obterHoje() {

        return dataParaString(
            new Date()
        );

    }


    function criarDataLocal(
        valor
    ) {

        const [
            ano,
            mes,
            dia
        ] =
            valor
                .split("-")
                .map(Number);


        return new Date(
            ano,
            mes - 1,
            dia
        );

    }


    function adicionarDias(
        valor,
        quantidade
    ) {

        const data =
            criarDataLocal(
                valor
            );


        data.setDate(
            data.getDate() +
            quantidade
        );


        return dataParaString(
            data
        );

    }


    function formatarDataCompleta(
        valor
    ) {

        const data =
            criarDataLocal(
                valor
            );


        let texto =
            data.toLocaleDateString(
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


        texto =
            texto.charAt(0)
                .toUpperCase() +
            texto.slice(1);


        return texto;

    }


    function formatarDataCurta(
        valor
    ) {

        return criarDataLocal(
            valor
        ).toLocaleDateString(
            "pt-BR"
        );

    }


    // ==================================================
    // MOEDA
    // ==================================================

    function moeda(
        valor
    ) {

        return Number(
            valor || 0
        ).toLocaleString(
            "pt-BR",
            {
                style:
                    "currency",

                currency:
                    "BRL"
            }
        );

    }


    // ==================================================
    // SEGURANÇA BÁSICA PARA HTML
    // ==================================================

    function escaparHTML(
        valor
    ) {

        return String(
            valor ?? ""
        )
            .replaceAll(
                "&",
                "&amp;"
            )
            .replaceAll(
                "<",
                "&lt;"
            )
            .replaceAll(
                ">",
                "&gt;"
            )
            .replaceAll(
                '"',
                "&quot;"
            )
            .replaceAll(
                "'",
                "&#039;"
            );

    }


    // ==================================================
    // ENCONTRAR RESERVA
    // ==================================================

    function encontrarReserva(
        horario,
        reservas
    ) {

        if (
            !horario.reservaId
        ) {

            return null;

        }


        return reservas.find(
            reserva =>
                reserva.id ===
                horario.reservaId
        ) || null;

    }


    // ==================================================
    // ENCONTRAR PAGAMENTO
    // ==================================================

    function encontrarPagamento(
        reserva,
        pagamentos
    ) {

        if (!reserva) {

            return null;

        }


        return pagamentos.find(
            pagamento =>
                pagamento.reservaId ===
                reserva.id
        ) || null;

    }


    // ==================================================
    // TEXTO DO STATUS
    // ==================================================

    function statusTexto(
        status
    ) {

        const textos =
        {
            disponivel:
                "Disponível",

            reservado:
                "Reservado",

            fixo:
                "Horário fixo",

            bloqueado:
                "Bloqueado"
        };


        return textos[status] ||
            status ||
            "Indefinido";

    }


    // ==================================================
    // PREÇOS DO HORÁRIO LIVRE
    // ==================================================

    function montarPrecosDisponiveis(
        horario
    ) {

        const precos =
            [];


        if (
            horario.aceitaAvulso
        ) {

            precos.push(
                `
                    <span class="agenda-preco avulso">
                        Avulso:
                        <strong>
                            ${moeda(
                                horario.valorAvulso
                            )}
                        </strong>
                    </span>
                `
            );

        }


        if (
            horario.aceitaFixo
        ) {

            precos.push(
                `
                    <span class="agenda-preco fixo">
                        Fixo:
                        <strong>
                            ${moeda(
                                horario.valorFixo
                            )}
                        </strong>
                        / mês
                    </span>
                `
            );

        }


        return precos.join(
            ""
        );

    }


    // ==================================================
    // MODAL
    // ==================================================

    function abrirModal(
        horario,
        reserva,
        pagamento
    ) {

        if (
            !modal ||
            !modalConteudo
        ) {

            return;

        }


        const cliente =
            reserva?.cliente ||
            {};


        let valor =
            reserva?.valor ||
            horario.valorAvulso ||
            horario.valorFixo ||
            0;


        let detalhesCliente =
            `
                <div class="agenda-modal-secao">

                    <span class="agenda-modal-label">
                        Situação
                    </span>

                    <strong>
                        ${escaparHTML(
                            statusTexto(
                                horario.status
                            )
                        )}
                    </strong>

                </div>
            `;


        if (reserva) {

            detalhesCliente += `

                <div class="agenda-modal-grid">

                    <div class="agenda-modal-secao">

                        <span class="agenda-modal-label">
                            Cliente
                        </span>

                        <strong>
                            ${escaparHTML(
                                cliente.nome ||
                                "-"
                            )}
                        </strong>

                    </div>


                    <div class="agenda-modal-secao">

                        <span class="agenda-modal-label">
                            WhatsApp
                        </span>

                        <strong>
                            ${escaparHTML(
                                cliente.whatsapp ||
                                "-"
                            )}
                        </strong>

                    </div>


                    <div class="agenda-modal-secao">

                        <span class="agenda-modal-label">
                            E-mail
                        </span>

                        <strong>
                            ${escaparHTML(
                                cliente.email ||
                                "-"
                            )}
                        </strong>

                    </div>


                    <div class="agenda-modal-secao">

                        <span class="agenda-modal-label">
                            Código da reserva
                        </span>

                        <strong>
                            ${escaparHTML(
                                reserva.codigo ||
                                "-"
                            )}
                        </strong>

                    </div>

                </div>
            `;

        }


        modalConteudo.innerHTML = `

            <div class="agenda-modal-horario">

                <div>

                    <small>
                        DATA
                    </small>

                    <strong>
                        ${formatarDataCurta(
                            horario.data
                        )}
                    </strong>

                </div>


                <div>

                    <small>
                        HORÁRIO
                    </small>

                    <strong>
                        ${escaparHTML(
                            horario.inicio
                        )}
                        →
                        ${escaparHTML(
                            horario.fim
                        )}
                    </strong>

                </div>

            </div>


            ${detalhesCliente}


            <div class="agenda-modal-grid">

                <div class="agenda-modal-secao">

                    <span class="agenda-modal-label">
                        Tipo
                    </span>

                    <strong>
                        ${
                            reserva?.tipo ===
                            "fixo"
                                ? "Horário fixo"
                                : reserva
                                    ? "Reserva avulsa"
                                    : "-"
                        }
                    </strong>

                </div>


                <div class="agenda-modal-secao">

                    <span class="agenda-modal-label">
                        Valor
                    </span>

                    <strong>
                        ${moeda(valor)}
                    </strong>

                </div>


                <div class="agenda-modal-secao">

                    <span class="agenda-modal-label">
                        Pagamento
                    </span>

                    <strong>
                        ${
                            pagamento?.status ===
                            "aprovado"
                                ? "Aprovado"
                                : reserva
                                    ? escaparHTML(
                                        reserva.status ||
                                        "-"
                                    )
                                    : "-"
                        }
                    </strong>

                </div>


                <div class="agenda-modal-secao">

                    <span class="agenda-modal-label">
                        Forma
                    </span>

                    <strong>
                        ${
                            pagamento?.forma
                                ? escaparHTML(
                                    pagamento.forma
                                        .toUpperCase()
                                )
                                : reserva
                                    ?.formaPagamento
                                    ? escaparHTML(
                                        reserva
                                            .formaPagamento
                                            .toUpperCase()
                                    )
                                    : "-"
                        }
                    </strong>

                </div>

            </div>

        `;


        modal.classList.add(
            "aberto"
        );

    }


    function fecharModal() {

        if (!modal) {
            return;
        }


        modal.classList.remove(
            "aberto"
        );

    }


    // ==================================================
    // INDICADORES
    // ==================================================

    function atualizarIndicadores(
        horariosDia
    ) {

        const total =
            horariosDia.length;


        const disponiveis =
            horariosDia.filter(
                horario =>
                    horario.status ===
                    "disponivel"
            ).length;


        const reservados =
            horariosDia.filter(
                horario =>
                    horario.status ===
                    "reservado"
            ).length;


        const fixos =
            horariosDia.filter(
                horario =>
                    horario.status ===
                    "fixo"
            ).length;


        const bloqueados =
            horariosDia.filter(
                horario =>
                    horario.status ===
                    "bloqueado"
            ).length;


        if (totalEl) {
            totalEl.textContent =
                total;
        }


        if (disponiveisEl) {
            disponiveisEl.textContent =
                disponiveis;
        }


        if (reservadosEl) {
            reservadosEl.textContent =
                reservados;
        }


        if (fixosEl) {
            fixosEl.textContent =
                fixos;
        }


        if (bloqueadosEl) {
            bloqueadosEl.textContent =
                bloqueados;
        }

    }


    // ==================================================
    // RENDERIZAR
    // ==================================================

    function renderizar() {

        if (
            !inputData ||
            !lista
        ) {

            return;

        }


        const dataSelecionada =
            inputData.value;


        if (!dataSelecionada) {

            return;

        }


        const horarios =
            carregarLista(
                STORAGE_HORARIOS
            );


        const reservas =
            carregarLista(
                STORAGE_RESERVAS
            );


        const pagamentos =
            carregarLista(
                STORAGE_PAGAMENTOS
            );


        let horariosDia =
            horarios
                .filter(
                    horario =>
                        horario.data ===
                        dataSelecionada
                )
                .sort(
                    (a, b) =>
                        String(
                            a.inicio
                        ).localeCompare(
                            String(
                                b.inicio
                            )
                        )
                );


        atualizarIndicadores(
            horariosDia
        );


        if (tituloData) {

            tituloData.textContent =
                formatarDataCompleta(
                    dataSelecionada
                );

        }


        if (listaTitulo) {

            listaTitulo.textContent =
                formatarDataCompleta(
                    dataSelecionada
                );

        }


        const filtro =
            filtroStatus?.value ||
            "todos";


        if (
            filtro !==
            "todos"
        ) {

            horariosDia =
                horariosDia.filter(
                    horario =>
                        horario.status ===
                        filtro
                );

        }


        lista.innerHTML =
            "";


        if (quantidadeExibida) {

            quantidadeExibida.textContent =
                horariosDia.length === 1
                    ? "1 horário"
                    : `${horariosDia.length} horários`;

        }


        if (
            horariosDia.length ===
            0
        ) {

            lista.style.display =
                "none";


            if (vazio) {

                vazio.style.display =
                    "block";


                const titulo =
                    vazio.querySelector(
                        "h3"
                    );


                const texto =
                    vazio.querySelector(
                        "p"
                    );


                if (
                    filtro !==
                    "todos"
                ) {

                    if (titulo) {

                        titulo.textContent =
                            "Nenhum horário com este status";

                    }


                    if (texto) {

                        texto.textContent =
                            "Altere o filtro para visualizar os outros horários deste dia.";

                    }

                } else {

                    if (titulo) {

                        titulo.textContent =
                            "Nenhum horário encontrado";

                    }


                    if (texto) {

                        texto.textContent =
                            "Não existem horários cadastrados para esta data.";

                    }

                }

            }


            return;

        }


        lista.style.display =
            "block";


        if (vazio) {

            vazio.style.display =
                "none";

        }


        horariosDia.forEach(
            horario => {

                const reserva =
                    encontrarReserva(
                        horario,
                        reservas
                    );


                const pagamento =
                    encontrarPagamento(
                        reserva,
                        pagamentos
                    );


                const cliente =
                    reserva?.cliente ||
                    {};


                let titulo =
                    "Disponível";


                let subtitulo =
                    montarPrecosDisponiveis(
                        horario
                    );


                let meta =
                    "Disponível para reserva";


                // RESERVADO

                if (
                    horario.status ===
                    "reservado"
                ) {

                    titulo =
                        cliente.nome ||
                        "Reserva confirmada";


                    subtitulo = `

                        <span class="agenda-cliente-dado">
                            📱
                            ${escaparHTML(
                                cliente.whatsapp ||
                                "WhatsApp não informado"
                            )}
                        </span>

                    `;


                    meta =
                        reserva?.codigo
                            ? `Reserva ${reserva.codigo}`
                            : "Reserva online";

                }


                // FIXO

                if (
                    horario.status ===
                    "fixo"
                ) {

                    titulo =
                        cliente.nome ||
                        "Horário fixo";


                    subtitulo = `

                        <span class="agenda-cliente-dado">
                            🔁 Contrato mensal
                        </span>

                        <span class="agenda-cliente-dado">
                            📱
                            ${escaparHTML(
                                cliente.whatsapp ||
                                "WhatsApp não informado"
                            )}
                        </span>

                    `;


                    meta =
                        reserva?.codigo
                            ? `Reserva ${reserva.codigo}`
                            : "Horário recorrente";

                }


                // BLOQUEADO

                if (
                    horario.status ===
                    "bloqueado"
                ) {

                    titulo =
                        "Horário bloqueado";


                    subtitulo = `

                        <span class="agenda-cliente-dado">
                            Indisponível para reservas
                        </span>

                    `;


                    meta =
                        "Bloqueio administrativo";

                }


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    `agenda-gerente-item ${horario.status}`;


                card.innerHTML = `

                    <div class="agenda-gerente-hora">

                        <strong>
                            ${escaparHTML(
                                horario.inicio
                            )}
                        </strong>

                        <span>
                            até
                        </span>

                        <strong>
                            ${escaparHTML(
                                horario.fim
                            )}
                        </strong>

                    </div>


                    <div class="agenda-gerente-info">

                        <div class="agenda-gerente-info-topo">

                            <div>

                                <span
                                    class="
                                        agenda-status
                                        ${escaparHTML(
                                            horario.status
                                        )}
                                    "
                                >
                                    ${escaparHTML(
                                        statusTexto(
                                            horario.status
                                        )
                                    )}
                                </span>

                                <h3>
                                    ${escaparHTML(
                                        titulo
                                    )}
                                </h3>

                            </div>

                        </div>


                        <div class="agenda-gerente-dados">

                            ${subtitulo}

                        </div>


                        <small>
                            ${escaparHTML(
                                meta
                            )}
                        </small>

                    </div>


                    <div class="agenda-gerente-acoes">

                        ${
                            horario.status ===
                            "reservado" ||
                            horario.status ===
                            "fixo"

                                ? `

                                    <button
                                        type="button"
                                        class="btn-agenda-detalhes"
                                    >
                                        Ver detalhes
                                    </button>

                                `

                                : ""
                        }


                        ${
                            horario.status ===
                            "disponivel" ||
                            horario.status ===
                            "bloqueado"

                                ? `

                                    <a
                                        href="horarios.html"
                                        class="btn-agenda-editar"
                                    >
                                        Gerenciar
                                    </a>

                                `

                                : ""
                        }

                    </div>

                `;


                const btnDetalhes =
                    card.querySelector(
                        ".btn-agenda-detalhes"
                    );


                if (btnDetalhes) {

                    btnDetalhes.addEventListener(
                        "click",
                        () => {

                            abrirModal(
                                horario,
                                reserva,
                                pagamento
                            );

                        }
                    );

                }


                lista.appendChild(
                    card
                );

            }
        );

    }


    // ==================================================
    // EVENTOS DATA
    // ==================================================

    if (inputData) {

        inputData.addEventListener(
            "change",
            renderizar
        );

    }


    if (btnAnterior) {

        btnAnterior.addEventListener(
            "click",
            () => {

                inputData.value =
                    adicionarDias(
                        inputData.value,
                        -1
                    );


                renderizar();

            }
        );

    }


    if (btnProximo) {

        btnProximo.addEventListener(
            "click",
            () => {

                inputData.value =
                    adicionarDias(
                        inputData.value,
                        1
                    );


                renderizar();

            }
        );

    }


    if (btnHoje) {

        btnHoje.addEventListener(
            "click",
            () => {

                inputData.value =
                    obterHoje();


                renderizar();

            }
        );

    }


    if (btnAmanha) {

        btnAmanha.addEventListener(
            "click",
            () => {

                inputData.value =
                    adicionarDias(
                        obterHoje(),
                        1
                    );


                renderizar();

            }
        );

    }


    if (filtroStatus) {

        filtroStatus.addEventListener(
            "change",
            renderizar
        );

    }


    // ==================================================
    // MODAL
    // ==================================================

    if (modalFechar) {

        modalFechar.addEventListener(
            "click",
            fecharModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modal
                ) {

                    fecharModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                fecharModal();

            }

        }
    );


    // ==================================================
    // INICIAR
    // ==================================================

    function iniciar() {

        if (!inputData) {

            console.error(
                "La Cancha: agendaGerenteData não encontrado."
            );

            return;

        }


        /*
            SE VIER:
            agenda.html?data=2026-08-30

            ABRE DIRETAMENTE ESSA DATA.
        */

        const parametros =
            new URLSearchParams(
                window.location.search
            );


        const dataUrl =
            parametros.get(
                "data"
            );


        if (
            dataUrl &&
            /^\d{4}-\d{2}-\d{2}$/
                .test(
                    dataUrl
                )
        ) {

            inputData.value =
                dataUrl;

        } else {

            inputData.value =
                obterHoje();

        }


        renderizar();


        console.log(
            "La Cancha: agenda-gerente.js carregado."
        );

    }


    iniciar();


})();