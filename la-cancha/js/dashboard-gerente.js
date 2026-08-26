// ======================================================
// LA CANCHA FUT 7
// DASHBOARD DO GERENTE
// ======================================================

(() => {

    const STORAGE_HORARIOS =
        "horariosLaCancha";

    const STORAGE_RESERVAS =
        "reservasLaCancha";

    const STORAGE_PAGAMENTOS =
        "pagamentosLaCancha";

    const STORAGE_FIXOS =
        "horariosFixosLaCancha";


    // ==================================================
    // ELEMENTOS
    // ==================================================

    const dashboardDataHoje =
        document.getElementById(
            "dashboardDataHoje"
        );

    const dashboardReservasHoje =
        document.getElementById(
            "dashboardReservasHoje"
        );

    const dashboardReceitaHoje =
        document.getElementById(
            "dashboardReceitaHoje"
        );

    const dashboardHorariosLivres =
        document.getElementById(
            "dashboardHorariosLivres"
        );

    const dashboardFixosAtivos =
        document.getElementById(
            "dashboardFixosAtivos"
        );

    const dashboardAgendaHoje =
        document.getElementById(
            "dashboardAgendaHoje"
        );

    const dashboardAgendaVazia =
        document.getElementById(
            "dashboardAgendaVazia"
        );

    const dashboardUltimasReservas =
        document.getElementById(
            "dashboardUltimasReservas"
        );

    const dashboardUltimasReservasVazio =
        document.getElementById(
            "dashboardUltimasReservasVazio"
        );

    const dashboardReservasMes =
        document.getElementById(
            "dashboardReservasMes"
        );

    const dashboardPdvMes =
        document.getElementById(
            "dashboardPdvMes"
        );

    const dashboardDespesasMes =
        document.getElementById(
            "dashboardDespesasMes"
        );

    const dashboardResultadoMes =
        document.getElementById(
            "dashboardResultadoMes"
        );


    // ==================================================
    // LOCALSTORAGE
    // ==================================================

    function carregarLista(chave) {

        try {

            const dados =
                localStorage.getItem(
                    chave
                );

            if (!dados) {
                return [];
            }

            const lista =
                JSON.parse(dados);

            return Array.isArray(lista)
                ? lista
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
    // DATA LOCAL
    // ==================================================

    function obterDataHoje() {

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

        const dia =
            String(
                agora.getDate()
            ).padStart(
                2,
                "0"
            );

        return `${ano}-${mes}-${dia}`;

    }


    function formatarData(
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
        ).toLocaleDateString(
            "pt-BR"
        );

    }


    function formatarDataCompleta(
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
        ).toLocaleDateString(
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


    function dataLocalDoISO(
        iso
    ) {

        if (!iso) {
            return "";
        }

        const data =
            new Date(iso);

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


    // ==================================================
    // MOEDA
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


    // ==================================================
    // CARREGAR DADOS
    // ==================================================

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

    const horariosFixos =
        carregarLista(
            STORAGE_FIXOS
        );


    const hoje =
        obterDataHoje();

    const mesAtual =
        hoje.substring(
            0,
            7
        );


    // ==================================================
    // DATA NO TOPO
    // ==================================================

    if (dashboardDataHoje) {

        dashboardDataHoje.textContent =
            `📅 ${formatarData(hoje)}`;

    }


    // ==================================================
    // HORÁRIOS DE HOJE
    // ==================================================

    const horariosHoje =
        horarios
            .filter(
                horario =>
                    horario.data ===
                    hoje
            )
            .sort(
                (a, b) =>
                    a.inicio.localeCompare(
                        b.inicio
                    )
            );


    const horariosReservadosHoje =
        horariosHoje.filter(
            horario =>
                horario.status ===
                    "reservado" ||
                horario.status ===
                    "fixo"
        );


    const horariosLivresHoje =
        horariosHoje.filter(
            horario =>
                horario.status ===
                "disponivel"
        );


    // ==================================================
    // RESERVAS HOJE
    // ==================================================

    if (dashboardReservasHoje) {

        dashboardReservasHoje.textContent =
            horariosReservadosHoje.length;

    }


    // ==================================================
    // HORÁRIOS LIVRES
    // ==================================================

    if (dashboardHorariosLivres) {

        dashboardHorariosLivres.textContent =
            horariosLivresHoje.length;

    }


    // ==================================================
    // FIXOS
    // ==================================================

    const fixosAtivos =
        horariosFixos.filter(
            fixo =>
                fixo.status ===
                "ativo"
        );


    if (dashboardFixosAtivos) {

        dashboardFixosAtivos.textContent =
            fixosAtivos.length;

    }


    // ==================================================
    // RECEITA HOJE
    // ==================================================

    const pagamentosHoje =
        pagamentos.filter(
            pagamento =>
                pagamento.status ===
                    "aprovado" &&
                dataLocalDoISO(
                    pagamento.pagoEm
                ) === hoje
        );


    const receitaHoje =
        pagamentosHoje.reduce(
            (total, pagamento) =>
                total +
                Number(
                    pagamento.valor || 0
                ),
            0
        );


    if (dashboardReceitaHoje) {

        dashboardReceitaHoje.textContent =
            moeda(
                receitaHoje
            );

    }


    // ==================================================
    // ACHAR RESERVA
    // ==================================================

    function encontrarReserva(
        horario
    ) {

        if (!horario.reservaId) {
            return null;
        }

        return reservas.find(
            reserva =>
                reserva.id ===
                horario.reservaId
        ) || null;

    }


    // ==================================================
    // AGENDA DE HOJE
    // ==================================================

    function montarAgendaHoje() {

        if (!dashboardAgendaHoje) {
            return;
        }


        dashboardAgendaHoje.innerHTML =
            "";


        if (
            horariosHoje.length === 0
        ) {

            if (
                dashboardAgendaVazia
            ) {

                dashboardAgendaVazia
                    .style
                    .display =
                    "block";

            }

            return;

        }


        if (
            dashboardAgendaVazia
        ) {

            dashboardAgendaVazia
                .style
                .display =
                "none";

        }


        horariosHoje.forEach(
            horario => {

                const reserva =
                    encontrarReserva(
                        horario
                    );


                let nome =
                    "Disponível";

                let descricao =
                    "";

                let badge =
                    "Livre";

                let badgeClasse =
                    "livre";


                // DISPONÍVEL

                if (
                    horario.status ===
                    "disponivel"
                ) {

                    const valor =
                        horario.valorAvulso ||
                        horario.valorFixo ||
                        0;

                    descricao =
                        moeda(valor);

                }


                // RESERVADO

                if (
                    horario.status ===
                    "reservado"
                ) {

                    nome =
                        reserva?.cliente?.nome ||
                        "Reserva confirmada";

                    descricao =
                        reserva?.tipo ===
                            "fixo"
                            ? "Horário fixo"
                            : "Reserva online";

                    badge =
                        "Pago";

                    badgeClasse =
                        "confirmado";

                }


                // FIXO

                if (
                    horario.status ===
                    "fixo"
                ) {

                    nome =
                        reserva?.cliente?.nome ||
                        "Horário fixo";

                    descricao =
                        "Horário recorrente";

                    badge =
                        "Fixo";

                    badgeClasse =
                        "fixo";

                }


                // BLOQUEADO

                if (
                    horario.status ===
                    "bloqueado"
                ) {

                    nome =
                        "Bloqueado";

                    descricao =
                        "Indisponível";

                    badge =
                        "Bloqueado";

                    badgeClasse =
                        "fixo";

                }


                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "agenda-admin-item";


                item.innerHTML = `

                    <div class="agenda-admin-hora">

                        ${horario.inicio}

                        <span>
                            ${horario.fim}
                        </span>

                    </div>


                    <div class="agenda-admin-cliente">

                        <strong>
                            ${nome}
                        </strong>

                        <span>
                            ${descricao}
                        </span>

                    </div>


                    <span
                        class="
                            badge
                            ${badgeClasse}
                        "
                    >
                        ${badge}
                    </span>

                `;


                dashboardAgendaHoje
                    .appendChild(
                        item
                    );

            }
        );

    }


    // ==================================================
    // ÚLTIMAS RESERVAS
    // ==================================================

    function montarUltimasReservas() {

        if (
            !dashboardUltimasReservas
        ) {

            return;

        }


        dashboardUltimasReservas
            .innerHTML =
            "";


        const ultimas =
            [...reservas]
                .sort(
                    (a, b) => {

                        const dataA =
                            new Date(
                                a.criadoEm || 0
                            );

                        const dataB =
                            new Date(
                                b.criadoEm || 0
                            );

                        return (
                            dataB -
                            dataA
                        );

                    }
                )
                .slice(
                    0,
                    5
                );


        if (
            ultimas.length === 0
        ) {

            if (
                dashboardUltimasReservasVazio
            ) {

                dashboardUltimasReservasVazio
                    .style
                    .display =
                    "block";

            }

            return;

        }


        if (
            dashboardUltimasReservasVazio
        ) {

            dashboardUltimasReservasVazio
                .style
                .display =
                "none";

        }


        ultimas.forEach(
            reserva => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "comanda-item";


                const clienteNome =
                    reserva.cliente?.nome ||
                    "Cliente";


                item.innerHTML = `

                    <div>

                        <strong>
                            ${reserva.codigo || "Reserva"}
                        </strong>

                        <span>
                            ${clienteNome}
                            •
                            ${formatarData(reserva.data)}
                            •
                            ${reserva.inicio}
                        </span>

                    </div>


                    <strong>
                        ${moeda(
                            reserva.valor
                        )}
                    </strong>

                `;


                dashboardUltimasReservas
                    .appendChild(
                        item
                    );

            }
        );

    }


    // ==================================================
    // RECEITA DO MÊS
    // ==================================================

    const pagamentosMes =
        pagamentos.filter(
            pagamento => {

                if (
                    pagamento.status !==
                    "aprovado"
                ) {

                    return false;

                }


                const dataPagamento =
                    dataLocalDoISO(
                        pagamento.pagoEm
                    );


                return (
                    dataPagamento
                        .startsWith(
                            mesAtual
                        )
                );

            }
        );


    const receitaReservasMes =
        pagamentosMes.reduce(
            (total, pagamento) =>
                total +
                Number(
                    pagamento.valor || 0
                ),
            0
        );


    /*
        PDV E DESPESAS AINDA NÃO
        FORAM IMPLEMENTADOS.
    */

    const receitaPdvMes =
        0;

    const despesasMes =
        0;


    const resultadoMes =
        receitaReservasMes +
        receitaPdvMes -
        despesasMes;


    if (dashboardReservasMes) {

        dashboardReservasMes.textContent =
            moeda(
                receitaReservasMes
            );

    }


    if (dashboardPdvMes) {

        dashboardPdvMes.textContent =
            moeda(
                receitaPdvMes
            );

    }


    if (dashboardDespesasMes) {

        dashboardDespesasMes.textContent =
            despesasMes > 0
                ? `- ${moeda(despesasMes)}`
                : moeda(0);

    }


    if (dashboardResultadoMes) {

        dashboardResultadoMes.textContent =
            moeda(
                resultadoMes
            );

    }


    // ==================================================
    // INICIAR
    // ==================================================

    montarAgendaHoje();

    montarUltimasReservas();


    console.log(
        "La Cancha: dashboard conectado."
    );

})();