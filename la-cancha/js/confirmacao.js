// ======================================================
// LA CANCHA FUT 7
// CONFIRMAÇÃO DA RESERVA
// ======================================================

(() => {

    const SESSION_CONFIRMADA =
        "reservaConfirmadaLaCancha";


    const confirmacaoConteudo =
        document.getElementById(
            "confirmacaoConteudo"
        );

    const confirmacaoInvalida =
        document.getElementById(
            "confirmacaoInvalida"
        );


    // ==================================================
    // ELEMENTOS
    // ==================================================

    const codigoEl =
        document.getElementById(
            "confirmacaoCodigo"
        );

    const tipoEl =
        document.getElementById(
            "confirmacaoTipo"
        );

    const dataEl =
        document.getElementById(
            "confirmacaoData"
        );

    const horarioEl =
        document.getElementById(
            "confirmacaoHorario"
        );

    const valorEl =
        document.getElementById(
            "confirmacaoValor"
        );


    const clienteNomeEl =
        document.getElementById(
            "confirmacaoClienteNome"
        );

    const clienteWhatsappEl =
        document.getElementById(
            "confirmacaoClienteWhatsapp"
        );

    const clienteEmailEl =
        document.getElementById(
            "confirmacaoClienteEmail"
        );


    const formaPagamentoEl =
        document.getElementById(
            "confirmacaoFormaPagamento"
        );

    const dataPagamentoEl =
        document.getElementById(
            "confirmacaoDataPagamento"
        );


    const fixoEl =
        document.getElementById(
            "confirmacaoFixo"
        );

    const fixoTextoEl =
        document.getElementById(
            "confirmacaoFixoTexto"
        );


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


    function formatarData(
        valor
    ) {

        if (!valor) {

            return "-";

        }


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


    function formatarDataHoraISO(
        valor
    ) {

        if (!valor) {

            return "-";

        }


        const data =
            new Date(valor);


        if (
            Number.isNaN(
                data.getTime()
            )
        ) {

            return "-";

        }


        return data.toLocaleString(
            "pt-BR",
            {
                dateStyle:
                    "short",

                timeStyle:
                    "short"
            }
        );

    }


    function formatarFormaPagamento(
        forma
    ) {

        if (!forma) {

            return "-";

        }


        const formas =
        {
            pix:
                "PIX",

            cartao:
                "Cartão",

            cartão:
                "Cartão",

            dinheiro:
                "Dinheiro"
        };


        return formas[
            String(forma)
                .toLowerCase()
        ] ||
        String(forma);

    }


    // ==================================================
    // CARREGAR
    // ==================================================

    function carregarConfirmacao() {

        let dados;


        try {

            dados =
                JSON.parse(
                    sessionStorage.getItem(
                        SESSION_CONFIRMADA
                    )
                );

        } catch (erro) {

            console.error(
                "Erro ao carregar confirmação:",
                erro
            );

            mostrarInvalida();

            return;

        }


        if (
            !dados ||
            !dados.reserva
        ) {

            mostrarInvalida();

            return;

        }


        const reserva =
            dados.reserva;

        const pagamento =
            dados.pagamento ||
            {};

        const cliente =
            reserva.cliente ||
            {};


        // CÓDIGO

        codigoEl.textContent =
            reserva.codigo ||
            "-";


        // TIPO

        tipoEl.textContent =
            reserva.tipo === "fixo"
                ? "Horário fixo"
                : "Reserva avulsa";


        // DATA

        dataEl.textContent =
            formatarData(
                reserva.data
            );


        // HORÁRIO

        horarioEl.textContent =
            `${reserva.inicio || "-"} → ${reserva.fim || "-"}`;


        // VALOR

        valorEl.textContent =
            moeda(
                reserva.valor
            );


        // CLIENTE

        clienteNomeEl.textContent =
            cliente.nome ||
            "-";


        clienteWhatsappEl.textContent =
            cliente.whatsapp ||
            "-";


        clienteEmailEl.textContent =
            cliente.email ||
            "-";


        // PAGAMENTO

        formaPagamentoEl.textContent =
            formatarFormaPagamento(
                pagamento.forma ||
                reserva.formaPagamento
            );


        dataPagamentoEl.textContent =
            formatarDataHoraISO(
                pagamento.pagoEm ||
                reserva.pagoEm
            );


        // FIXO

        if (
            reserva.tipo ===
            "fixo"
        ) {

            fixoEl.classList.add(
                "ativo"
            );


            const quantidade =
                Array.isArray(
                    reserva.datasFixas
                )
                    ? reserva
                        .datasFixas
                        .length
                    : 0;


            if (
                quantidade > 0
            ) {

                fixoTextoEl.textContent =
                    `${quantidade} ${
                        quantidade === 1
                            ? "partida ficou reservada"
                            : "partidas ficaram reservadas"
                    } neste mês a partir da data escolhida. O valor corresponde à mensalidade do horário fixo.`;

            } else {

                fixoTextoEl.textContent =
                    "Este horário foi contratado na modalidade mensal.";

            }

        } else {

            fixoEl.classList.remove(
                "ativo"
            );

        }


        confirmacaoConteudo.style.display =
            "block";


        confirmacaoInvalida.classList.remove(
            "ativo"
        );

    }


    // ==================================================
    // INVÁLIDA
    // ==================================================

    function mostrarInvalida() {

        if (
            confirmacaoConteudo
        ) {

            confirmacaoConteudo.style.display =
                "none";

        }


        if (
            confirmacaoInvalida
        ) {

            confirmacaoInvalida.classList.add(
                "ativo"
            );

        }

    }


    carregarConfirmacao();

})();