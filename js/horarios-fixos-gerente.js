// ======================================================
// LA CANCHA FUT 7
// HORÁRIOS FIXOS - GERENTE
// ======================================================

(() => {

    const STORAGE_FIXOS =
        "horariosFixosLaCancha";

    const STORAGE_RESERVAS =
        "reservasLaCancha";

    const STORAGE_PAGAMENTOS =
        "pagamentosLaCancha";


    // ==================================================
    // ELEMENTOS
    // ==================================================

    const totalAtivosEl =
        document.getElementById(
            "fixosTotalAtivos"
        );

    const receitaEl =
        document.getElementById(
            "fixosReceitaMensal"
        );

    const partidasEl =
        document.getElementById(
            "fixosPartidas"
        );

    const filtroMes =
        document.getElementById(
            "fixosFiltroMes"
        );

    const filtroStatus =
        document.getElementById(
            "fixosFiltroStatus"
        );

    const busca =
        document.getElementById(
            "fixosBusca"
        );

    const quantidadeEl =
        document.getElementById(
            "fixosQuantidade"
        );

    const listaEl =
        document.getElementById(
            "fixosLista"
        );

    const vazioEl =
        document.getElementById(
            "fixosVazio"
        );

    const modal =
        document.getElementById(
            "fixosModal"
        );

    const modalConteudo =
        document.getElementById(
            "fixosModalConteudo"
        );

    const modalFechar =
        document.getElementById(
            "fixosModalFechar"
        );


    // ==================================================
    // LOCAL STORAGE
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
    // UTILIDADES
    // ==================================================

    function moeda(valor) {

        return Number(
            valor || 0
        ).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

    }


    function escaparHTML(valor) {

        return String(
            valor ?? ""
        )
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    function formatarData(data) {

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


    function formatarMes(
        referencia
    ) {

        if (!referencia) {
            return "-";
        }

        const [
            ano,
            mes
        ] =
            referencia
                .split("-")
                .map(Number);

        const texto =
            new Date(
                ano,
                mes - 1,
                1
            )
            .toLocaleDateString(
                "pt-BR",
                {
                    month: "long",
                    year: "numeric"
                }
            );

        return (
            texto.charAt(0)
                .toUpperCase() +
            texto.slice(1)
        );

    }


    function nomeDiaSemana(
        dia
    ) {

        const dias =
        [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado"
        ];

        return dias[
            Number(dia)
        ] || "-";

    }


    function mesAtual() {

        const agora =
            new Date();

        const ano =
            agora.getFullYear();

        const mes =
            String(
                agora.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        return `${ano}-${mes}`;

    }


    // ==================================================
    // LOCALIZAR RESERVA
    // ==================================================

    function encontrarReserva(
        contrato,
        reservas
    ) {

        return reservas.find(
            reserva =>
                reserva.id ===
                contrato.reservaId
        ) || null;

    }


    // ==================================================
    // LOCALIZAR PAGAMENTO
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
    // MODAL
    // ==================================================

    function abrirModal(
        contrato,
        reserva,
        pagamento
    ) {

        const cliente =
            contrato.cliente ||
            reserva?.cliente ||
            {};


        const datas =
            Array.isArray(
                contrato.datas
            )
                ? contrato.datas
                : [];


        const htmlDatas =
            datas.length
                ? datas
                    .map(
                        data => `

                            <span class="fixos-data-badge">
                                ${formatarData(data)}
                            </span>

                        `
                    )
                    .join("")
                : "<span>-</span>";


        modalConteudo.innerHTML = `

            <div class="fixos-modal-cliente">

                <strong>
                    ${escaparHTML(
                        cliente.nome ||
                        "Cliente"
                    )}
                </strong>

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


            <div class="fixos-modal-grid">

                <div>

                    <span>
                        Dia da semana
                    </span>

                    <strong>
                        ${nomeDiaSemana(
                            contrato.diaSemana
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Horário
                    </span>

                    <strong>
                        ${escaparHTML(
                            contrato.inicio
                        )}
                        →
                        ${escaparHTML(
                            contrato.fim
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Mensalidade
                    </span>

                    <strong>
                        ${moeda(
                            contrato.valorMensal
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Mês
                    </span>

                    <strong>
                        ${formatarMes(
                            contrato.mesReferencia
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Código da reserva
                    </span>

                    <strong>
                        ${escaparHTML(
                            reserva?.codigo ||
                            "-"
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Pagamento
                    </span>

                    <strong class="fixos-pago">
                        ${
                            pagamento?.status ===
                            "aprovado"
                                ? "● Pago"
                                : "-"
                        }
                    </strong>

                </div>

            </div>


            <div class="fixos-modal-datas">

                <span>
                    PARTIDAS RESERVADAS
                </span>

                <div>
                    ${htmlDatas}
                </div>

            </div>

        `;


        modal.classList.add(
            "aberto"
        );

    }


    function fecharModal() {

        modal.classList.remove(
            "aberto"
        );

    }


    // ==================================================
    // RENDER
    // ==================================================

    function renderizar() {

        const contratos =
            carregarLista(
                STORAGE_FIXOS
            );

        const reservas =
            carregarLista(
                STORAGE_RESERVAS
            );

        const pagamentos =
            carregarLista(
                STORAGE_PAGAMENTOS
            );


        const mesSelecionado =
            filtroMes.value;


        const statusSelecionado =
            filtroStatus.value;


        const termoBusca =
            busca.value
                .trim()
                .toLowerCase();


        let filtrados =
            contratos.filter(
                contrato => {

                    if (
                        mesSelecionado &&
                        contrato.mesReferencia !==
                        mesSelecionado
                    ) {

                        return false;

                    }


                    if (
                        statusSelecionado !==
                        "todos" &&
                        contrato.status !==
                        statusSelecionado
                    ) {

                        return false;

                    }


                    if (termoBusca) {

                        const cliente =
                            contrato.cliente ||
                            {};

                        const texto =
                            (
                                `${cliente.nome || ""} ` +
                                `${cliente.whatsapp || ""} ` +
                                `${cliente.email || ""}`
                            )
                            .toLowerCase();


                        if (
                            !texto.includes(
                                termoBusca
                            )
                        ) {

                            return false;

                        }

                    }


                    return true;

                }
            );


        filtrados.sort(
            (a, b) => {

                if (
                    a.diaSemana !==
                    b.diaSemana
                ) {

                    return (
                        a.diaSemana -
                        b.diaSemana
                    );

                }

                return String(
                    a.inicio
                ).localeCompare(
                    String(
                        b.inicio
                    )
                );

            }
        );


        // ==================================================
        // INDICADORES
        // ==================================================

        const ativos =
            contratos.filter(
                contrato =>
                    contrato.status ===
                        "ativo" &&
                    (
                        !mesSelecionado ||
                        contrato.mesReferencia ===
                            mesSelecionado
                    )
            );


        const receita =
            ativos.reduce(
                (total, contrato) =>
                    total +
                    Number(
                        contrato.valorMensal ||
                        0
                    ),
                0
            );


        const partidas =
            ativos.reduce(
                (total, contrato) =>
                    total +
                    (
                        Array.isArray(
                            contrato.datas
                        )
                            ? contrato
                                .datas
                                .length
                            : 0
                    ),
                0
            );


        totalAtivosEl.textContent =
            ativos.length;


        receitaEl.textContent =
            moeda(receita);


        partidasEl.textContent =
            partidas;


        quantidadeEl.textContent =
            filtrados.length === 1
                ? "1 contrato"
                : `${filtrados.length} contratos`;


        // ==================================================
        // VAZIO
        // ==================================================

        listaEl.innerHTML = "";


        if (
            filtrados.length ===
            0
        ) {

            listaEl.style.display =
                "none";

            vazioEl.style.display =
                "block";

            return;

        }


        listaEl.style.display =
            "flex";

        vazioEl.style.display =
            "none";


        // ==================================================
        // CARDS
        // ==================================================

        filtrados.forEach(
            contrato => {

                const reserva =
                    encontrarReserva(
                        contrato,
                        reservas
                    );


                const pagamento =
                    encontrarPagamento(
                        reserva,
                        pagamentos
                    );


                const cliente =
                    contrato.cliente ||
                    reserva?.cliente ||
                    {};


                const quantidadeDatas =
                    Array.isArray(
                        contrato.datas
                    )
                        ? contrato
                            .datas
                            .length
                        : 0;


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "fixos-card";


                card.innerHTML = `

                    <div class="fixos-card-dia">

                        <span>
                            🔁
                        </span>

                        <strong>
                            ${nomeDiaSemana(
                                contrato.diaSemana
                            )}
                        </strong>

                        <small>
                            ${escaparHTML(
                                contrato.inicio
                            )}
                            →
                            ${escaparHTML(
                                contrato.fim
                            )}
                        </small>

                    </div>


                    <div class="fixos-card-info">

                        <div class="fixos-card-topo">

                            <div>

                                <span class="fixos-status ativo">
                                    ● ATIVO
                                </span>

                                <h3>
                                    ${escaparHTML(
                                        cliente.nome ||
                                        "Cliente"
                                    )}
                                </h3>

                            </div>

                        </div>


                        <div class="fixos-card-dados">

                            <span>
                                📱
                                ${escaparHTML(
                                    cliente.whatsapp ||
                                    "-"
                                )}
                            </span>

                            <span>
                                📅
                                ${formatarMes(
                                    contrato.mesReferencia
                                )}
                            </span>

                        </div>


                        <small>

                            ${
                                quantidadeDatas === 1
                                    ? "1 partida reservada"
                                    : `${quantidadeDatas} partidas reservadas`
                            }

                        </small>

                    </div>


                    <div class="fixos-card-valor">

                        <span>
                            Mensalidade
                        </span>

                        <strong>
                            ${moeda(
                                contrato.valorMensal
                            )}
                        </strong>

                        <small>
                            ${
                                pagamento?.status ===
                                "aprovado"
                                    ? "✓ Pago"
                                    : ""
                            }
                        </small>

                    </div>


                    <div class="fixos-card-acoes">

                        <button
                            type="button"
                            class="btn-fixo-detalhes"
                        >
                            Ver detalhes
                        </button>

                    </div>

                `;


                card
                    .querySelector(
                        ".btn-fixo-detalhes"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            abrirModal(
                                contrato,
                                reserva,
                                pagamento
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

    filtroMes.addEventListener(
        "change",
        renderizar
    );


    filtroStatus.addEventListener(
        "change",
        renderizar
    );


    busca.addEventListener(
        "input",
        renderizar
    );


    modalFechar.addEventListener(
        "click",
        fecharModal
    );


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

    filtroMes.value =
        mesAtual();


    renderizar();


    console.log(
        "La Cancha: horários fixos carregados."
    );

})();