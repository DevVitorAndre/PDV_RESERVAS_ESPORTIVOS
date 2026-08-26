// ======================================================
// LA CANCHA FUT 7
// PAGAMENTO DA RESERVA
// ======================================================

(() => {


    // ==================================================
    // CONFIGURAÇÕES
    // ==================================================

    const TEMPO_PAGAMENTO_MINUTOS =
        10;

    const ANTECEDENCIA_MINIMA_MINUTOS =
        60;


    const STORAGE_HORARIOS =
        "horariosLaCancha";

    const STORAGE_RESERVAS =
        "reservasLaCancha";

    const STORAGE_PAGAMENTOS =
        "pagamentosLaCancha";

    const STORAGE_FIXOS =
        "horariosFixosLaCancha";


    const SESSION_CLIENTE =
        "clienteLaCanchaAtual";

    const SESSION_RESERVA =
        "reservaLaCanchaAtual";

    const SESSION_PAGAMENTO =
        "pagamentoLaCanchaPendente";

    const SESSION_CONFIRMADA =
        "reservaConfirmadaLaCancha";



    // ==================================================
    // ELEMENTOS
    // ==================================================

    const conteudo =
        document.getElementById(
            "pagamentoConteudo"
        );

    const erroGeral =
        document.getElementById(
            "pagamentoErroGeral"
        );

    const erroTexto =
        document.getElementById(
            "pagamentoErroTexto"
        );

    const contador =
        document.getElementById(
            "pagamentoContador"
        );


    const btnPix =
        document.getElementById(
            "btnPagamentoPix"
        );

    const btnCartao =
        document.getElementById(
            "btnPagamentoCartao"
        );

    const painelPix =
        document.getElementById(
            "painelPix"
        );

    const painelCartao =
        document.getElementById(
            "painelCartao"
        );


    const pixValor =
        document.getElementById(
            "pixValor"
        );

    const pixCodigo =
        document.getElementById(
            "pixCodigo"
        );

    const btnCopiarPix =
        document.getElementById(
            "btnCopiarPix"
        );

    const btnSimularPix =
        document.getElementById(
            "btnSimularPix"
        );


    const formCartao =
        document.getElementById(
            "formCartao"
        );

    const mensagemCartao =
        document.getElementById(
            "mensagemCartao"
        );


    const resumoTipo =
        document.getElementById(
            "resumoTipo"
        );

    const resumoTipoIcone =
        document.getElementById(
            "resumoTipoIcone"
        );

    const resumoData =
        document.getElementById(
            "resumoData"
        );

    const resumoHorario =
        document.getElementById(
            "resumoHorario"
        );

    const resumoRecorrenciaLinha =
        document.getElementById(
            "resumoRecorrenciaLinha"
        );

    const resumoRecorrencia =
        document.getElementById(
            "resumoRecorrencia"
        );

    const resumoClienteNome =
        document.getElementById(
            "resumoClienteNome"
        );

    const resumoClienteWhatsapp =
        document.getElementById(
            "resumoClienteWhatsapp"
        );

    const resumoClienteEmail =
        document.getElementById(
            "resumoClienteEmail"
        );

    const resumoValor =
        document.getElementById(
            "resumoValor"
        );

    const resumoTotalDescricao =
        document.getElementById(
            "resumoTotalDescricao"
        );


    const pagamentoSucesso =
        document.getElementById(
            "pagamentoSucesso"
        );

    const codigoReservaSucesso =
        document.getElementById(
            "codigoReservaSucesso"
        );



    // ==================================================
    // DADOS
    // ==================================================

    let cliente =
        carregarSession(
            SESSION_CLIENTE
        );

    let reserva =
        carregarSession(
            SESSION_RESERVA
        );

    let horarioAtual =
        null;

    let pagamentoExpirado =
        false;

    let intervaloContador =
        null;



    // ==================================================
    // UTILITÁRIOS
    // ==================================================

    function carregarSession(
        chave
    ) {

        try {

            const valor =
                sessionStorage.getItem(
                    chave
                );


            return valor
                ? JSON.parse(valor)
                : null;

        } catch (erro) {

            console.error(
                `Erro ao carregar ${chave}:`,
                erro
            );

            return null;

        }

    }



    function carregarLocal(
        chave
    ) {

        try {

            const valor =
                localStorage.getItem(
                    chave
                );


            const dados =
                valor
                    ? JSON.parse(valor)
                    : [];


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



    function salvarLocal(
        chave,
        dados
    ) {

        localStorage.setItem(
            chave,
            JSON.stringify(dados)
        );

    }



    function gerarId() {

        if (
            window.crypto &&
            typeof window.crypto.randomUUID ===
            "function"
        ) {

            return window.crypto.randomUUID();

        }


        return (
            Date.now().toString() +
            "-" +
            Math.random()
                .toString(16)
                .slice(2)
        );

    }



    function gerarCodigoReserva() {

        const numero =
            Math.floor(
                100000 +
                Math.random() *
                900000
            );


        return (
            `LC-${numero}`
        );

    }



    function formatarValor(
        valor
    ) {

        return Number(valor)
            .toLocaleString(
                "pt-BR",
                {
                    style:
                        "currency",

                    currency:
                        "BRL"
                }
            );

    }



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



    function formatarData(
        data
    ) {

        return criarDataLocal(
            data
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



    // ==================================================
    // ERRO
    // ==================================================

    function mostrarErro(
        mensagem
    ) {

        if (conteudo) {

            conteudo.style.display =
                "none";

        }


        if (pagamentoSucesso) {

            pagamentoSucesso.style.display =
                "none";

        }


        erroTexto.textContent =
            mensagem;


        erroGeral.style.display =
            "block";

    }



    // ==================================================
    // ANTECEDÊNCIA
    // ==================================================

    function possuiAntecedencia(
        horario
    ) {

        const [
            ano,
            mes,
            dia
        ] =
            horario.data
                .split("-")
                .map(Number);


        const [
            hora,
            minuto
        ] =
            horario.inicio
                .split(":")
                .map(Number);


        const inicio =
            new Date(
                ano,
                mes - 1,
                dia,
                hora,
                minuto
            );


        const agora =
            new Date();


        const diferenca =
            (
                inicio.getTime() -
                agora.getTime()
            )
            /
            60000;


        return (
            diferenca >=
            ANTECEDENCIA_MINIMA_MINUTOS
        );

    }



    // ==================================================
    // VALIDAR RESERVA NOVAMENTE
    // ==================================================

    function validarReservaAtual() {

        if (
            !cliente ||
            !reserva
        ) {

            return {
                ok: false,
                erro:
                    "Os dados da reserva não foram encontrados. Escolha o horário novamente."
            };

        }


        if (
            !reserva.horarioId
        ) {

            return {
                ok: false,
                erro:
                    "O horário selecionado não possui identificação válida."
            };

        }


        const horarios =
            carregarLocal(
                STORAGE_HORARIOS
            );


        horarioAtual =
            horarios.find(
                (horario) =>
                    horario.id ===
                    reserva.horarioId
            );


        if (!horarioAtual) {

            return {
                ok: false,
                erro:
                    "Este horário não existe mais na agenda."
            };

        }


        if (
            horarioAtual.status !==
            "disponivel"
        ) {

            return {
                ok: false,
                erro:
                    "Este horário não está mais disponível."
            };

        }



        // AVULSO

        if (
            reserva.tipo ===
            "avulso"
        ) {

            if (
                !horarioAtual.aceitaAvulso ||
                !Number(
                    horarioAtual.valorAvulso
                )
            ) {

                return {
                    ok: false,
                    erro:
                        "Este horário não aceita mais reserva avulsa."
                };

            }


            reserva.valor =
                Number(
                    horarioAtual.valorAvulso
                );

        }



        // FIXO

        else if (
            reserva.tipo ===
            "fixo"
        ) {

            if (
                !horarioAtual.aceitaFixo ||
                !Number(
                    horarioAtual.valorFixo
                )
            ) {

                return {
                    ok: false,
                    erro:
                        "Este horário não está mais disponível como horário fixo."
                };

            }


            reserva.valor =
                Number(
                    horarioAtual.valorFixo
                );

        }


        else {

            return {
                ok: false,
                erro:
                    "O tipo da reserva é inválido."
            };

        }



        if (
            !possuiAntecedencia(
                horarioAtual
            )
        ) {

            return {
                ok: false,
                erro:
                    "Este horário já está dentro do limite mínimo de 1 hora para reserva."
            };

        }



        /*
            ATUALIZA OS DADOS COM
            O QUE REALMENTE ESTÁ CADASTRADO
            PELO GERENTE.
        */

        reserva.data =
            horarioAtual.data;

        reserva.inicio =
            horarioAtual.inicio;

        reserva.fim =
            horarioAtual.fim;


        sessionStorage.setItem(
            SESSION_RESERVA,
            JSON.stringify(
                reserva
            )
        );


        return {
            ok: true
        };

    }



    // ==================================================
    // RESUMO
    // ==================================================

    function preencherResumo() {

        const ehFixo =
            reserva.tipo ===
            "fixo";


        resumoTipo.textContent =
            ehFixo
                ? "Horário fixo mensal"
                : "Reserva avulsa";


        resumoTipoIcone.textContent =
            ehFixo
                ? "🔁"
                : "⚽";


        resumoData.textContent =
            formatarData(
                reserva.data
            );


        resumoHorario.textContent =
            `${reserva.inicio} → ${reserva.fim}`;


        if (ehFixo) {

            resumoRecorrenciaLinha
                .style
                .display =
                "flex";


            const diaSemana =
                criarDataLocal(
                    reserva.data
                )
                .toLocaleDateString(
                    "pt-BR",
                    {
                        weekday:
                            "long"
                    }
                );


            resumoRecorrencia.textContent =
                `Toda ${diaSemana}`;

        } else {

            resumoRecorrenciaLinha
                .style
                .display =
                "none";

        }


        resumoClienteNome.textContent =
            cliente.nome ||
            "-";


        resumoClienteWhatsapp.textContent =
            cliente.whatsapp ||
            "-";


        resumoClienteEmail.textContent =
            cliente.email ||
            "-";


        resumoValor.textContent =
            formatarValor(
                reserva.valor
            );


        pixValor.textContent =
            formatarValor(
                reserva.valor
            );


        resumoTotalDescricao.textContent =
            ehFixo
                ? "mensalidade"
                : "por jogo";

    }



    // ==================================================
    // PIX FAKE
    // ==================================================

    function criarCodigoPix() {

        pixCodigo.value =
            (
                "00020126580014BR.GOV.BCB.PIX" +
                "0136LA-CANCHA-FUT7-" +
                reserva.horarioId +
                "-VALOR-" +
                Number(
                    reserva.valor
                ).toFixed(2)
            );

    }



    // ==================================================
    // MÉTODOS
    // ==================================================

    function selecionarMetodo(
        metodo
    ) {

        const usarPix =
            metodo ===
            "pix";


        btnPix.classList.toggle(
            "ativo",
            usarPix
        );


        btnCartao.classList.toggle(
            "ativo",
            !usarPix
        );


        painelPix.classList.toggle(
            "ativo",
            usarPix
        );


        painelCartao.classList.toggle(
            "ativo",
            !usarPix
        );

    }



    btnPix.addEventListener(
        "click",
        () => {

            selecionarMetodo(
                "pix"
            );

        }
    );



    btnCartao.addEventListener(
        "click",
        () => {

            selecionarMetodo(
                "cartao"
            );

        }
    );



    // ==================================================
    // COPIAR PIX
    // ==================================================

    btnCopiarPix.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard
                    .writeText(
                        pixCodigo.value
                    );


                btnCopiarPix.textContent =
                    "Copiado ✓";


                setTimeout(
                    () => {

                        btnCopiarPix.textContent =
                            "Copiar";

                    },
                    1500
                );

            } catch {

                pixCodigo.select();

                document.execCommand(
                    "copy"
                );

            }

        }
    );



    // ==================================================
    // CRONÔMETRO
    // ==================================================

    function iniciarContador() {

        const chavePagamento =
            (
                reserva.horarioId +
                "-" +
                reserva.tipo
            );


        let pagamentoPendente =
            carregarSession(
                SESSION_PAGAMENTO
            );


        if (
            !pagamentoPendente ||
            pagamentoPendente.chave !==
            chavePagamento
        ) {

            pagamentoPendente =
            {
                chave:
                    chavePagamento,

                expiraEm:
                    Date.now() +
                    (
                        TEMPO_PAGAMENTO_MINUTOS *
                        60 *
                        1000
                    )
            };


            sessionStorage.setItem(
                SESSION_PAGAMENTO,
                JSON.stringify(
                    pagamentoPendente
                )
            );

        }



        function atualizar() {

            const restante =
                pagamentoPendente
                    .expiraEm -
                Date.now();


            if (
                restante <= 0
            ) {

                pagamentoExpirado =
                    true;


                contador.textContent =
                    "00:00";


                btnSimularPix.disabled =
                    true;


                const submit =
                    formCartao
                        .querySelector(
                            'button[type="submit"]'
                        );


                submit.disabled =
                    true;


                clearInterval(
                    intervaloContador
                );


                mostrarErro(
                    "O tempo para pagamento terminou. Escolha o horário novamente."
                );


                return;

            }


            const segundos =
                Math.floor(
                    restante /
                    1000
                );


            const minutos =
                Math.floor(
                    segundos /
                    60
                );


            const segundosRestantes =
                segundos %
                60;


            contador.textContent =
                (
                    String(minutos)
                        .padStart(
                            2,
                            "0"
                        )
                    +
                    ":"
                    +
                    String(
                        segundosRestantes
                    )
                    .padStart(
                        2,
                        "0"
                    )
                );

        }


        atualizar();


        intervaloContador =
            setInterval(
                atualizar,
                1000
            );

    }



    // ==================================================
    // BLOQUEAR HORÁRIO AVULSO
    // ==================================================

    function confirmarAvulso(
        reservaId
    ) {

        const horarios =
            carregarLocal(
                STORAGE_HORARIOS
            );


        const indice =
            horarios.findIndex(
                (horario) =>
                    horario.id ===
                    horarioAtual.id
            );


        if (
            indice === -1
        ) {

            return false;

        }


        horarios[indice].status =
            "reservado";


        horarios[indice].reservaId =
            reservaId;


        salvarLocal(
            STORAGE_HORARIOS,
            horarios
        );


        return true;

    }



    // ==================================================
    // BLOQUEAR HORÁRIO FIXO
    // ==================================================

    function confirmarFixo(
        reservaId
    ) {

        const horarios =
            carregarLocal(
                STORAGE_HORARIOS
            );


        const dataInicial =
            criarDataLocal(
                horarioAtual.data
            );


        const mes =
            dataInicial.getMonth();


        const ano =
            dataInicial.getFullYear();


        const diaSemana =
            dataInicial.getDay();


        const contratoId =
            gerarId();


        const bloqueados =
            [];



        horarios.forEach(
            (horario) => {

                if (
                    horario.status !==
                    "disponivel"
                ) {

                    return;

                }


                if (
                    horario.data <
                    horarioAtual.data
                ) {

                    return;

                }


                const dataHorario =
                    criarDataLocal(
                        horario.data
                    );


                if (
                    dataHorario.getMonth() !==
                    mes ||
                    dataHorario.getFullYear() !==
                    ano
                ) {

                    return;

                }



                let pertenceSerie =
                    false;



                // CADASTRO MENSAL

                if (
                    horarioAtual.serieId &&
                    horario.serieId ===
                    horarioAtual.serieId
                ) {

                    pertenceSerie =
                        true;

                }



                // FALLBACK PARA CADASTRO MANUAL

                if (
                    !horarioAtual.serieId &&
                    dataHorario.getDay() ===
                    diaSemana &&
                    horario.inicio ===
                    horarioAtual.inicio &&
                    horario.fim ===
                    horarioAtual.fim &&
                    horario.aceitaFixo
                ) {

                    pertenceSerie =
                        true;

                }



                if (!pertenceSerie) {

                    return;

                }



                horario.status =
                    "fixo";


                horario.reservaId =
                    reservaId;


                horario.contratoFixoId =
                    contratoId;


                bloqueados.push(
                    horario.data
                );

            }
        );



        if (
            bloqueados.length === 0
        ) {

            return false;

        }



        salvarLocal(
            STORAGE_HORARIOS,
            horarios
        );



        const contratos =
            carregarLocal(
                STORAGE_FIXOS
            );


        contratos.push(
            {

                id:
                    contratoId,

                reservaId,

                serieId:
                    horarioAtual.serieId ||
                    null,

                cliente:
                    cliente,

                diaSemana,

                inicio:
                    horarioAtual.inicio,

                fim:
                    horarioAtual.fim,

                valorMensal:
                    Number(
                        horarioAtual.valorFixo
                    ),

                mesReferencia:
                    horarioAtual.data
                        .substring(
                            0,
                            7
                        ),

                dataInicio:
                    horarioAtual.data,

                datas:
                    bloqueados,

                status:
                    "ativo",

                criadoEm:
                    new Date()
                        .toISOString()

            }
        );


        salvarLocal(
            STORAGE_FIXOS,
            contratos
        );


        return bloqueados;

    }



    // ==================================================
    // FINALIZAR PAGAMENTO
    // ==================================================

    function finalizarPagamento(
        formaPagamento
    ) {

        if (
            pagamentoExpirado
        ) {

            return;

        }



        // REVALIDA ANTES DE CONFIRMAR

        const validacao =
            validarReservaAtual();


        if (!validacao.ok) {

            mostrarErro(
                validacao.erro
            );

            return;

        }



        const reservaId =
            gerarId();


        const codigo =
            gerarCodigoReserva();


        let datasFixas =
            null;



        if (
            reserva.tipo ===
            "avulso"
        ) {

            const sucesso =
                confirmarAvulso(
                    reservaId
                );


            if (!sucesso) {

                mostrarErro(
                    "Não foi possível confirmar este horário."
                );

                return;

            }

        } else {

            datasFixas =
                confirmarFixo(
                    reservaId
                );


            if (!datasFixas) {

                mostrarErro(
                    "Não foi possível gerar o horário fixo deste mês."
                );

                return;

            }

        }



        // ==================================================
        // REGISTRAR RESERVA
        // ==================================================

        const reservas =
            carregarLocal(
                STORAGE_RESERVAS
            );


        const novaReserva =
        {

            id:
                reservaId,

            codigo,

            horarioId:
                horarioAtual.id,

            tipo:
                reserva.tipo,

            data:
                horarioAtual.data,

            inicio:
                horarioAtual.inicio,

            fim:
                horarioAtual.fim,

            valor:
                Number(
                    reserva.valor
                ),

            cliente,

            status:
                "paga",

            formaPagamento,

            datasFixas,

            criadoEm:
                new Date()
                    .toISOString(),

            pagoEm:
                new Date()
                    .toISOString()

        };


        reservas.push(
            novaReserva
        );


        salvarLocal(
            STORAGE_RESERVAS,
            reservas
        );



        // ==================================================
        // REGISTRAR PAGAMENTO
        // ==================================================

        const pagamentos =
            carregarLocal(
                STORAGE_PAGAMENTOS
            );


        const pagamento =
        {

            id:
                gerarId(),

            reservaId,

            codigoReserva:
                codigo,

            valor:
                Number(
                    reserva.valor
                ),

            forma:
                formaPagamento,

            status:
                "aprovado",

            pagoEm:
                new Date()
                    .toISOString()

        };


        pagamentos.push(
            pagamento
        );


        salvarLocal(
            STORAGE_PAGAMENTOS,
            pagamentos
        );



        // ==================================================
        // CONFIRMAÇÃO EM SESSION
        // ==================================================

        sessionStorage.setItem(
            SESSION_CONFIRMADA,
            JSON.stringify(
                {
                    reserva:
                        novaReserva,

                    pagamento
                }
            )
        );


        sessionStorage.removeItem(
            SESSION_PAGAMENTO
        );



        if (intervaloContador) {

            clearInterval(
                intervaloContador
            );

        }



        // ==================================================
        // MOSTRAR SUCESSO
        // ==================================================

        conteudo.style.display =
            "none";


        erroGeral.style.display =
            "none";


        codigoReservaSucesso
            .textContent =
            codigo;


        pagamentoSucesso
            .style
            .display =
            "block";


        window.scrollTo(
            {
                top: 0,
                behavior:
                    "smooth"
            }
        );

    }



    // ==================================================
    // PIX APROVADO
    // ==================================================

    btnSimularPix.addEventListener(
        "click",
        () => {

            finalizarPagamento(
                "pix"
            );

        }
    );



    // ==================================================
    // CARTÃO
    // ==================================================

    formCartao.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            mensagemCartao.textContent =
                "";


            const numero =
                document.getElementById(
                    "cartaoNumero"
                ).value.trim();


            const validade =
                document.getElementById(
                    "cartaoValidade"
                ).value.trim();


            const cvv =
                document.getElementById(
                    "cartaoCvv"
                ).value.trim();


            const nome =
                document.getElementById(
                    "cartaoNome"
                ).value.trim();



            if (
                !numero ||
                !validade ||
                !cvv ||
                !nome
            ) {

                mensagemCartao.textContent =
                    "Preencha os dados do cartão para simular o pagamento.";

                return;

            }


            finalizarPagamento(
                "cartao"
            );

        }
    );



    // ==================================================
    // MÁSCARA CARTÃO
    // ==================================================

    const cartaoNumero =
        document.getElementById(
            "cartaoNumero"
        );


    cartaoNumero.addEventListener(
        "input",
        () => {

            let valor =
                cartaoNumero.value
                    .replace(
                        /\D/g,
                        ""
                    )
                    .substring(
                        0,
                        16
                    );


            valor =
                valor.replace(
                    /(\d{4})(?=\d)/g,
                    "$1 "
                );


            cartaoNumero.value =
                valor;

        }
    );



    const cartaoValidade =
        document.getElementById(
            "cartaoValidade"
        );


    cartaoValidade.addEventListener(
        "input",
        () => {

            let valor =
                cartaoValidade.value
                    .replace(
                        /\D/g,
                        ""
                    )
                    .substring(
                        0,
                        4
                    );


            if (
                valor.length > 2
            ) {

                valor =
                    valor.substring(
                        0,
                        2
                    )
                    +
                    "/"
                    +
                    valor.substring(
                        2
                    );

            }


            cartaoValidade.value =
                valor;

        }
    );



    // ==================================================
    // INICIAR
    // ==================================================

    function iniciar() {

        const validacao =
            validarReservaAtual();


        if (!validacao.ok) {

            mostrarErro(
                validacao.erro
            );

            return;

        }


        preencherResumo();

        criarCodigoPix();

        iniciarContador();


        console.log(
            "La Cancha: pagamento.js carregado."
        );

    }



    iniciar();


})();