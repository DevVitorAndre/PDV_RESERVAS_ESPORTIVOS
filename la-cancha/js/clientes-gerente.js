// ======================================================
// LA CANCHA FUT 7
// CLIENTES - GERENTE
// ======================================================

(() => {

    // ==================================================
    // STORAGE
    // ==================================================

    const STORAGE_RESERVAS =
        "reservasLaCancha";

    const STORAGE_PAGAMENTOS =
        "pagamentosLaCancha";

    const STORAGE_FIXOS =
        "horariosFixosLaCancha";


    // ==================================================
    // ELEMENTOS
    // ==================================================

    const totalEl =
        document.getElementById(
            "clientesTotal"
        );

    const fixosEl =
        document.getElementById(
            "clientesFixos"
        );

    const reservasEl =
        document.getElementById(
            "clientesReservas"
        );

    const receitaEl =
        document.getElementById(
            "clientesReceita"
        );


    const buscaEl =
        document.getElementById(
            "clientesBusca"
        );

    const filtroEl =
        document.getElementById(
            "clientesFiltro"
        );

    const ordenacaoEl =
        document.getElementById(
            "clientesOrdenacao"
        );


    const quantidadeEl =
        document.getElementById(
            "clientesQuantidade"
        );

    const listaEl =
        document.getElementById(
            "clientesLista"
        );

    const vazioEl =
        document.getElementById(
            "clientesVazio"
        );


    const modal =
        document.getElementById(
            "clientesModal"
        );

    const modalConteudo =
        document.getElementById(
            "clientesModalConteudo"
        );

    const modalFechar =
        document.getElementById(
            "clientesModalFechar"
        );


    // ==================================================
    // CARREGAR LOCAL STORAGE
    // ==================================================

    function carregarLista(chave) {

        try {

            const valor =
                localStorage.getItem(
                    chave
                );


            if (!valor) {
                return [];
            }


            const dados =
                JSON.parse(
                    valor
                );


            return Array.isArray(
                dados
            )
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
    // UTILIDADES
    // ==================================================

    function moeda(valor) {

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


    function escaparHTML(valor) {

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


    function formatarData(
        data
    ) {

        if (!data) {
            return "-";
        }


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
        ).toLocaleDateString(
            "pt-BR"
        );

    }


    function formatarDataHora(
        data
    ) {

        if (!data) {
            return "-";
        }


        const objeto =
            new Date(
                data
            );


        if (
            Number.isNaN(
                objeto.getTime()
            )
        ) {

            return "-";

        }


        return objeto
            .toLocaleString(
                "pt-BR",
                {
                    dateStyle:
                        "short",

                    timeStyle:
                        "short"
                }
            );

    }


    // ==================================================
    // IDENTIFICAR CLIENTE
    // ==================================================

    /*
        PRIORIDADE:

        1. WHATSAPP
        2. EMAIL
        3. NOME

        COMO AINDA NÃO TEMOS BANCO,
        PRECISAMOS DE UMA CHAVE PARA
        AGRUPAR RESERVAS DO MESMO CLIENTE.
    */

    function criarChaveCliente(
        cliente
    ) {

        const whatsapp =
            String(
                cliente?.whatsapp ||
                ""
            )
            .replace(
                /\D/g,
                ""
            );


        if (whatsapp) {

            return (
                "whatsapp:" +
                whatsapp
            );

        }


        const email =
            String(
                cliente?.email ||
                ""
            )
            .trim()
            .toLowerCase();


        if (email) {

            return (
                "email:" +
                email
            );

        }


        return (
            "nome:" +
            String(
                cliente?.nome ||
                "cliente"
            )
            .trim()
            .toLowerCase()
        );

    }


    // ==================================================
    // MONTAR BASE DE CLIENTES
    // ==================================================

    function montarClientes() {

        const reservas =
            carregarLista(
                STORAGE_RESERVAS
            );


        const pagamentos =
            carregarLista(
                STORAGE_PAGAMENTOS
            );


        const fixos =
            carregarLista(
                STORAGE_FIXOS
            );


        const mapa =
            new Map();


        /*
            SOMENTE RESERVAS PAGAS
            ENTRAM NA BASE PRINCIPAL.
        */

        reservas
            .filter(
                reserva =>
                    reserva.status ===
                    "paga"
            )
            .forEach(
                reserva => {

                    const clienteReserva =
                        reserva.cliente ||
                        {};


                    const chave =
                        criarChaveCliente(
                            clienteReserva
                        );


                    if (
                        !mapa.has(
                            chave
                        )
                    ) {

                        mapa.set(
                            chave,
                            {
                                chave,

                                nome:
                                    clienteReserva.nome ||
                                    "Cliente",

                                whatsapp:
                                    clienteReserva.whatsapp ||
                                    "",

                                email:
                                    clienteReserva.email ||
                                    "",

                                reservas:
                                    [],

                                quantidadeReservas:
                                    0,

                                totalGasto:
                                    0,

                                ultimaReserva:
                                    null,

                                possuiFixo:
                                    false,

                                contratosFixos:
                                    []
                            }
                        );

                    }


                    const cliente =
                        mapa.get(
                            chave
                        );


                    /*
                        ATUALIZA OS DADOS CASO
                        UMA RESERVA MAIS NOVA TENHA
                        INFORMAÇÃO MAIS COMPLETA.
                    */

                    if (
                        clienteReserva.nome
                    ) {

                        cliente.nome =
                            clienteReserva.nome;

                    }


                    if (
                        clienteReserva.whatsapp
                    ) {

                        cliente.whatsapp =
                            clienteReserva.whatsapp;

                    }


                    if (
                        clienteReserva.email
                    ) {

                        cliente.email =
                            clienteReserva.email;

                    }


                    const pagamento =
                        pagamentos.find(
                            item =>
                                item.reservaId ===
                                reserva.id
                        ) ||
                        null;


                    cliente.reservas.push(
                        {
                            ...reserva,
                            pagamento
                        }
                    );


                    cliente.quantidadeReservas +=
                        1;


                    cliente.totalGasto +=
                        Number(
                            reserva.valor ||
                            0
                        );


                    const referenciaAtual =
                        reserva.pagoEm ||
                        reserva.criadoEm ||
                        `${reserva.data}T${reserva.inicio || "00:00"}`;


                    if (
                        !cliente.ultimaReserva ||
                        new Date(
                            referenciaAtual
                        ).getTime() >
                        new Date(
                            cliente.ultimaReserva
                        ).getTime()
                    ) {

                        cliente.ultimaReserva =
                            referenciaAtual;

                    }

                }
            );


        // ==================================================
        // RELACIONAR HORÁRIO FIXO
        // ==================================================

        fixos
            .filter(
                contrato =>
                    contrato.status ===
                    "ativo"
            )
            .forEach(
                contrato => {

                    const clienteContrato =
                        contrato.cliente ||
                        {};


                    const chave =
                        criarChaveCliente(
                            clienteContrato
                        );


                    /*
                        NORMALMENTE O CLIENTE
                        JÁ EXISTE PORQUE O FIXO
                        NASCE DE UMA RESERVA PAGA.

                        MAS DEIXAMOS FALLBACK.
                    */

                    if (
                        !mapa.has(
                            chave
                        )
                    ) {

                        mapa.set(
                            chave,
                            {
                                chave,

                                nome:
                                    clienteContrato.nome ||
                                    "Cliente",

                                whatsapp:
                                    clienteContrato.whatsapp ||
                                    "",

                                email:
                                    clienteContrato.email ||
                                    "",

                                reservas:
                                    [],

                                quantidadeReservas:
                                    0,

                                totalGasto:
                                    0,

                                ultimaReserva:
                                    contrato.criadoEm ||
                                    null,

                                possuiFixo:
                                    true,

                                contratosFixos:
                                    []
                            }
                        );

                    }


                    const cliente =
                        mapa.get(
                            chave
                        );


                    cliente.possuiFixo =
                        true;


                    cliente.contratosFixos.push(
                        contrato
                    );

                }
            );


        return Array.from(
            mapa.values()
        );

    }


    // ==================================================
    // MODAL
    // ==================================================

    function abrirModal(
        cliente
    ) {

        if (
            !modal ||
            !modalConteudo
        ) {

            return;

        }


        const reservasOrdenadas =
            [...cliente.reservas]
                .sort(
                    (a, b) => {

                        const dataA =
                            new Date(
                                a.pagoEm ||
                                a.criadoEm ||
                                `${a.data}T${a.inicio}`
                            );


                        const dataB =
                            new Date(
                                b.pagoEm ||
                                b.criadoEm ||
                                `${b.data}T${b.inicio}`
                            );


                        return (
                            dataB -
                            dataA
                        );

                    }
                );


        let historicoHTML =
            "";


        if (
            reservasOrdenadas.length ===
            0
        ) {

            historicoHTML = `

                <div class="clientes-historico-vazio">
                    Nenhuma reserva encontrada.
                </div>

            `;

        } else {

            historicoHTML =
                reservasOrdenadas
                    .map(
                        reserva => {

                            const forma =
                                reserva.pagamento
                                    ?.forma ||
                                reserva
                                    .formaPagamento ||
                                "-";


                            return `

                                <article class="cliente-historico-item">


                                    <div class="cliente-historico-topo">

                                        <div>

                                            <span class="cliente-historico-codigo">
                                                ${escaparHTML(
                                                    reserva.codigo ||
                                                    "-"
                                                )}
                                            </span>

                                            <strong>
                                                ${
                                                    reserva.tipo ===
                                                    "fixo"
                                                        ? "🔁 Horário fixo"
                                                        : "⚽ Reserva avulsa"
                                                }
                                            </strong>

                                        </div>


                                        <span class="cliente-historico-status">
                                            ● PAGO
                                        </span>

                                    </div>


                                    <div class="cliente-historico-grid">

                                        <div>

                                            <span>
                                                Data
                                            </span>

                                            <strong>
                                                ${formatarData(
                                                    reserva.data
                                                )}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Horário
                                            </span>

                                            <strong>
                                                ${escaparHTML(
                                                    reserva.inicio ||
                                                    "-"
                                                )}
                                                →
                                                ${escaparHTML(
                                                    reserva.fim ||
                                                    "-"
                                                )}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Valor
                                            </span>

                                            <strong>
                                                ${moeda(
                                                    reserva.valor
                                                )}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Pagamento
                                            </span>

                                            <strong>
                                                ${escaparHTML(
                                                    String(
                                                        forma
                                                    )
                                                    .toUpperCase()
                                                )}
                                            </strong>

                                        </div>

                                    </div>

                                </article>

                            `;

                        }
                    )
                    .join("");

        }


        let fixosHTML =
            "";


        if (
            cliente.contratosFixos
                .length >
            0
        ) {

            fixosHTML = `

                <div class="cliente-modal-fixos">

                    <span class="cliente-modal-titulo-secao">
                        HORÁRIOS FIXOS
                    </span>

                    ${

                        cliente
                            .contratosFixos
                            .map(
                                contrato => `

                                    <div class="cliente-modal-fixo-item">

                                        <span>
                                            🔁
                                        </span>

                                        <div>

                                            <strong>
                                                ${escaparHTML(
                                                    contrato.inicio ||
                                                    "-"
                                                )}
                                                →
                                                ${escaparHTML(
                                                    contrato.fim ||
                                                    "-"
                                                )}
                                            </strong>

                                            <small>
                                                ${moeda(
                                                    contrato.valorMensal
                                                )}
                                                / mês
                                            </small>

                                        </div>

                                    </div>

                                `
                            )
                            .join("")

                    }

                </div>

            `;

        }


        modalConteudo.innerHTML = `

            <section class="cliente-modal-perfil">

                <div class="cliente-modal-avatar">

                    ${escaparHTML(
                        cliente.nome
                            .charAt(0)
                            .toUpperCase()
                    )}

                </div>


                <div>

                    <div class="cliente-modal-nome">

                        <h3>
                            ${escaparHTML(
                                cliente.nome
                            )}
                        </h3>


                        ${
                            cliente.possuiFixo
                                ? `
                                    <span class="cliente-badge-fixo">
                                        🔁 HORÁRIO FIXO
                                    </span>
                                `
                                : ""
                        }

                    </div>


                    <span>
                        📱
                        ${escaparHTML(
                            cliente.whatsapp ||
                            "Não informado"
                        )}
                    </span>

                    <span>
                        ✉
                        ${escaparHTML(
                            cliente.email ||
                            "Não informado"
                        )}
                    </span>

                </div>

            </section>



            <section class="cliente-modal-resumo">

                <div>

                    <span>
                        Reservas
                    </span>

                    <strong>
                        ${cliente.quantidadeReservas}
                    </strong>

                </div>


                <div>

                    <span>
                        Total movimentado
                    </span>

                    <strong>
                        ${moeda(
                            cliente.totalGasto
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Última atividade
                    </span>

                    <strong>
                        ${formatarDataHora(
                            cliente.ultimaReserva
                        )}
                    </strong>

                </div>

            </section>


            ${fixosHTML}


            <section class="cliente-modal-historico">

                <span class="cliente-modal-titulo-secao">
                    HISTÓRICO DE RESERVAS
                </span>

                ${historicoHTML}

            </section>

        `;


        modal.classList.add(
            "aberto"
        );

    }


    function fecharModal() {

        if (modal) {

            modal.classList.remove(
                "aberto"
            );

        }

    }


    // ==================================================
    // RENDERIZAR
    // ==================================================

    function renderizar() {

        const clientes =
            montarClientes();


        // ==================================================
        // INDICADORES GERAIS
        // ==================================================

        const totalFixos =
            clientes.filter(
                cliente =>
                    cliente.possuiFixo
            ).length;


        const totalReservas =
            clientes.reduce(
                (
                    total,
                    cliente
                ) =>
                    total +
                    cliente.quantidadeReservas,
                0
            );


        const totalReceita =
            clientes.reduce(
                (
                    total,
                    cliente
                ) =>
                    total +
                    cliente.totalGasto,
                0
            );


        if (totalEl) {

            totalEl.textContent =
                clientes.length;

        }


        if (fixosEl) {

            fixosEl.textContent =
                totalFixos;

        }


        if (reservasEl) {

            reservasEl.textContent =
                totalReservas;

        }


        if (receitaEl) {

            receitaEl.textContent =
                moeda(
                    totalReceita
                );

        }


        // ==================================================
        // FILTROS
        // ==================================================

        const termo =
            buscaEl
                ?.value
                .trim()
                .toLowerCase() ||
            "";


        const filtro =
            filtroEl
                ?.value ||
            "todos";


        const ordenacao =
            ordenacaoEl
                ?.value ||
            "recente";


        let filtrados =
            clientes.filter(
                cliente => {

                    if (termo) {

                        const texto =
                            (
                                `${cliente.nome} ` +
                                `${cliente.whatsapp} ` +
                                `${cliente.email}`
                            )
                            .toLowerCase();


                        if (
                            !texto.includes(
                                termo
                            )
                        ) {

                            return false;

                        }

                    }


                    if (
                        filtro ===
                        "fixo" &&
                        !cliente.possuiFixo
                    ) {

                        return false;

                    }


                    if (
                        filtro ===
                        "avulso" &&
                        cliente.possuiFixo
                    ) {

                        return false;

                    }


                    return true;

                }
            );


        // ==================================================
        // ORDENAÇÃO
        // ==================================================

        filtrados.sort(
            (a, b) => {

                if (
                    ordenacao ===
                    "reservas"
                ) {

                    return (
                        b.quantidadeReservas -
                        a.quantidadeReservas
                    );

                }


                if (
                    ordenacao ===
                    "valor"
                ) {

                    return (
                        b.totalGasto -
                        a.totalGasto
                    );

                }


                if (
                    ordenacao ===
                    "nome"
                ) {

                    return a.nome.localeCompare(
                        b.nome,
                        "pt-BR"
                    );

                }


                // MAIS RECENTE

                return (
                    new Date(
                        b.ultimaReserva ||
                        0
                    ) -
                    new Date(
                        a.ultimaReserva ||
                        0
                    )
                );

            }
        );


        // ==================================================
        // QUANTIDADE
        // ==================================================

        if (quantidadeEl) {

            quantidadeEl.textContent =
                filtrados.length ===
                1
                    ? "1 cliente"
                    : `${filtrados.length} clientes`;

        }


        // ==================================================
        // LIMPAR
        // ==================================================

        if (listaEl) {

            listaEl.innerHTML =
                "";

        }


        // ==================================================
        // VAZIO
        // ==================================================

        if (
            filtrados.length ===
            0
        ) {

            if (listaEl) {

                listaEl.style.display =
                    "none";

            }


            if (vazioEl) {

                vazioEl.style.display =
                    "block";

            }


            return;

        }


        if (listaEl) {

            listaEl.style.display =
                "grid";

        }


        if (vazioEl) {

            vazioEl.style.display =
                "none";

        }


        // ==================================================
        // CARDS
        // ==================================================

        filtrados.forEach(
            cliente => {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "cliente-card";


                card.innerHTML = `

                    <div class="cliente-card-topo">

                        <div class="cliente-card-avatar">

                            ${escaparHTML(
                                cliente.nome
                                    .charAt(0)
                                    .toUpperCase()
                            )}

                        </div>


                        <div class="cliente-card-identidade">

                            <div>

                                <h3>
                                    ${escaparHTML(
                                        cliente.nome
                                    )}
                                </h3>


                                ${
                                    cliente.possuiFixo
                                        ? `
                                            <span class="cliente-badge-fixo">
                                                🔁 FIXO
                                            </span>
                                        `
                                        : `
                                            <span class="cliente-badge-avulso">
                                                ⚽ AVULSO
                                            </span>
                                        `
                                }

                            </div>


                            <span>
                                📱
                                ${escaparHTML(
                                    cliente.whatsapp ||
                                    "-"
                                )}
                            </span>

                            <span>
                                ✉
                                ${escaparHTML(
                                    cliente.email ||
                                    "-"
                                )}
                            </span>

                        </div>

                    </div>


                    <div class="cliente-card-estatisticas">

                        <div>

                            <span>
                                Reservas
                            </span>

                            <strong>
                                ${cliente.quantidadeReservas}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Total gasto
                            </span>

                            <strong>
                                ${moeda(
                                    cliente.totalGasto
                                )}
                            </strong>

                        </div>

                    </div>


                    <div class="cliente-card-ultima">

                        <span>
                            Última reserva
                        </span>

                        <strong>
                            ${
                                cliente.ultimaReserva
                                    ? formatarDataHora(
                                        cliente.ultimaReserva
                                    )
                                    : "-"
                            }
                        </strong>

                    </div>


                    <button
                        type="button"
                        class="btn-cliente-historico"
                    >
                        Ver histórico
                        <span>→</span>
                    </button>

                `;


                const botao =
                    card.querySelector(
                        ".btn-cliente-historico"
                    );


                botao.addEventListener(
                    "click",
                    () => {

                        abrirModal(
                            cliente
                        );

                    }
                );


                listaEl.appendChild(
                    card
                );

            }
        );

    }


    // ==================================================
    // EVENTOS
    // ==================================================

    if (buscaEl) {

        buscaEl.addEventListener(
            "input",
            renderizar
        );

    }


    if (filtroEl) {

        filtroEl.addEventListener(
            "change",
            renderizar
        );

    }


    if (ordenacaoEl) {

        ordenacaoEl.addEventListener(
            "change",
            renderizar
        );

    }


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

    renderizar();


    console.log(
        "La Cancha: clientes carregados."
    );

})();