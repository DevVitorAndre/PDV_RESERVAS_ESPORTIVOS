// ======================================================
// LA CANCHA FUT 7
// PAGAMENTO DA RESERVA
// ======================================================

(() => {

    // ==================================================
    // CONFIGURAÇÕES
    // ==================================================

    const TEMPO_PAGAMENTO_MINUTOS = 10;
    const ANTECEDENCIA_MINIMA_MINUTOS = 60;

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


    // MÉTODOS

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


    // PIX

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


    // CARTÃO

    const formCartao =
        document.getElementById(
            "formCartao"
        );

    const mensagemCartao =
        document.getElementById(
            "mensagemCartao"
        );


    // RESUMO

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


    // ==================================================
    // ESTADO
    // ==================================================

    let cliente =
        carregarSession(
            SESSION_CLIENTE
        );

    let reserva =
        carregarSession(
            SESSION_RESERVA
        );

    let horarioAtual = null;

    let pagamentoExpirado = false;

    let pagamentoProcessando = false;

    let intervaloContador = null;


    // ==================================================
    // SESSION STORAGE
    // ==================================================

    function carregarSession(chave) {

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


    // ==================================================
    // LOCAL STORAGE
    // ==================================================

    function carregarLocal(chave) {

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


    function salvarLocal(
        chave,
        dados
    ) {

        localStorage.setItem(
            chave,
            JSON.stringify(dados)
        );

    }


    // ==================================================
    // IDs
    // ==================================================

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

        return `LC-${numero}`;

    }


    // ==================================================
    // MOEDA
    // ==================================================

    function formatarValor(valor) {

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


    // ==================================================
    // DATAS
    // ==================================================

    function criarDataLocal(data) {

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


    function dataParaString(data) {

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


    function formatarData(data) {

        return criarDataLocal(
            data
        ).toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    }


    // ==================================================
    // ERRO
    // ==================================================

    function mostrarErro(mensagem) {

        pagamentoProcessando = false;

        if (conteudo) {

            conteudo.style.display =
                "none";

        }

        if (erroTexto) {

            erroTexto.textContent =
                mensagem;

        }

        if (erroGeral) {

            erroGeral.style.display =
                "block";

        }

    }


    // ==================================================
    // ANTECEDÊNCIA MÍNIMA
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


        const diferencaMinutos =
            (
                inicio.getTime() -
                agora.getTime()
            )
            /
            60000;


        return (
            diferencaMinutos >=
            ANTECEDENCIA_MINIMA_MINUTOS
        );

    }


    // ==================================================
    // VALIDAR RESERVA
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
                horario =>
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


        // ==============================================
        // AVULSO
        // ==============================================

        if (
            reserva.tipo ===
            "avulso"
        ) {

            if (
                !horarioAtual.aceitaAvulso ||
                Number(
                    horarioAtual.valorAvulso
                ) <= 0
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


        // ==============================================
        // FIXO
        // ==============================================

        else if (
            reserva.tipo ===
            "fixo"
        ) {

            if (
                !horarioAtual.aceitaFixo ||
                Number(
                    horarioAtual.valorFixo
                ) <= 0
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


        // ==============================================
        // ANTECEDÊNCIA
        // ==============================================

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
            NÃO CONFIAMOS EM DATA,
            HORÁRIO OU PREÇO DA URL.

            O VALOR CORRETO VEM DO
            CADASTRO DO GERENTE.
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


        if (resumoTipo) {

            resumoTipo.textContent =
                ehFixo
                    ? "Horário fixo mensal"
                    : "Reserva avulsa";

        }


        if (resumoTipoIcone) {

            resumoTipoIcone.textContent =
                ehFixo
                    ? "🔁"
                    : "⚽";

        }


        if (resumoData) {

            resumoData.textContent =
                formatarData(
                    reserva.data
                );

        }


        if (resumoHorario) {

            resumoHorario.textContent =
                `${reserva.inicio} → ${reserva.fim}`;

        }


        if (
            resumoRecorrenciaLinha
        ) {

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


                if (resumoRecorrencia) {

                    resumoRecorrencia
                        .textContent =
                        `Toda ${diaSemana}`;

                }

            } else {

                resumoRecorrenciaLinha
                    .style
                    .display =
                    "none";

            }

        }


        if (resumoClienteNome) {

            resumoClienteNome.textContent =
                cliente.nome ||
                "-";

        }


        if (resumoClienteWhatsapp) {

            resumoClienteWhatsapp.textContent =
                cliente.whatsapp ||
                "-";

        }


        if (resumoClienteEmail) {

            resumoClienteEmail.textContent =
                cliente.email ||
                "-";

        }


        if (resumoValor) {

            resumoValor.textContent =
                formatarValor(
                    reserva.valor
                );

        }


        if (pixValor) {

            pixValor.textContent =
                formatarValor(
                    reserva.valor
                );

        }


        if (resumoTotalDescricao) {

            resumoTotalDescricao.textContent =
                ehFixo
                    ? "mensalidade"
                    : "por jogo";

        }

    }


    // ==================================================
    // PIX FAKE
    // ==================================================

    function criarCodigoPix() {

        if (!pixCodigo) {
            return;
        }


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
    // MÉTODO DE PAGAMENTO
    // ==================================================

    function selecionarMetodo(
        metodo
    ) {

        const usarPix =
            metodo ===
            "pix";


        if (btnPix) {

            btnPix.classList.toggle(
                "ativo",
                usarPix
            );

        }


        if (btnCartao) {

            btnCartao.classList.toggle(
                "ativo",
                !usarPix
            );

        }


        if (painelPix) {

            painelPix.classList.toggle(
                "ativo",
                usarPix
            );

        }


        if (painelCartao) {

            painelCartao.classList.toggle(
                "ativo",
                !usarPix
            );

        }

    }


    if (btnPix) {

        btnPix.addEventListener(
            "click",
            () => {

                selecionarMetodo(
                    "pix"
                );

            }
        );

    }


    if (btnCartao) {

        btnCartao.addEventListener(
            "click",
            () => {

                selecionarMetodo(
                    "cartao"
                );

            }
        );

    }


    // ==================================================
    // COPIAR PIX
    // ==================================================

    if (
        btnCopiarPix &&
        pixCodigo
    ) {

        btnCopiarPix.addEventListener(
            "click",
            async () => {

                try {

                    if (
                        navigator.clipboard &&
                        navigator.clipboard.writeText
                    ) {

                        await navigator
                            .clipboard
                            .writeText(
                                pixCodigo.value
                            );

                    } else {

                        pixCodigo.select();

                        document.execCommand(
                            "copy"
                        );

                    }


                    btnCopiarPix.textContent =
                        "Copiado ✓";


                    setTimeout(
                        () => {

                            btnCopiarPix.textContent =
                                "Copiar";

                        },
                        1500
                    );

                } catch (erro) {

                    console.error(
                        "Erro ao copiar PIX:",
                        erro
                    );

                    pixCodigo.select();

                }

            }
        );

    }


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


                if (contador) {

                    contador.textContent =
                        "00:00";

                }


                if (btnSimularPix) {

                    btnSimularPix.disabled =
                        true;

                }


                if (formCartao) {

                    const submit =
                        formCartao
                            .querySelector(
                                'button[type="submit"]'
                            );


                    if (submit) {

                        submit.disabled =
                            true;

                    }

                }


                if (
                    intervaloContador
                ) {

                    clearInterval(
                        intervaloContador
                    );

                }


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


            if (contador) {

                contador.textContent =
                    (
                        String(
                            minutos
                        ).padStart(
                            2,
                            "0"
                        )
                        +
                        ":"
                        +
                        String(
                            segundosRestantes
                        ).padStart(
                            2,
                            "0"
                        )
                    );

            }

        }


        atualizar();


        intervaloContador =
            setInterval(
                atualizar,
                1000
            );

    }


    // ==================================================
    // DESABILITAR BOTÕES DURANTE PROCESSAMENTO
    // ==================================================

    function definirProcessando(
        processando
    ) {

        pagamentoProcessando =
            processando;


        if (btnSimularPix) {

            btnSimularPix.disabled =
                processando;

        }


        if (formCartao) {

            const submit =
                formCartao.querySelector(
                    'button[type="submit"]'
                );


            if (submit) {

                submit.disabled =
                    processando;

            }

        }

    }


    // ==================================================
    // CONFIRMAR AVULSO
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
                horario =>
                    horario.id ===
                    horarioAtual.id
            );


        if (
            indice === -1
        ) {

            return false;

        }


        /*
            REVALIDA MAIS UMA VEZ
            ANTES DE ALTERAR.
        */

        if (
            horarios[indice].status !==
            "disponivel"
        ) {

            return false;

        }


        if (
            !horarios[indice]
                .aceitaAvulso
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
    // GERAR DATAS SEMANAIS DO FIXO
    // ==================================================

    function gerarDatasFixasEsperadas() {

        const inicio =
            criarDataLocal(
                horarioAtual.data
            );


        const mesInicial =
            inicio.getMonth();

        const anoInicial =
            inicio.getFullYear();


        const datas =
            [];


        const atual =
            new Date(
                inicio.getFullYear(),
                inicio.getMonth(),
                inicio.getDate()
            );


        while (
            atual.getMonth() ===
                mesInicial &&
            atual.getFullYear() ===
                anoInicial
        ) {

            datas.push(
                dataParaString(
                    atual
                )
            );


            atual.setDate(
                atual.getDate() +
                7
            );

        }


        return datas;

    }


    // ==================================================
    // CONFIRMAR HORÁRIO FIXO
    // ==================================================

    function confirmarFixo(
        reservaId
    ) {

        const horarios =
            carregarLocal(
                STORAGE_HORARIOS
            );


        const datasEsperadas =
            gerarDatasFixasEsperadas();


        const ocorrencias =
            [];


        /*
            PRIMEIRO ENCONTRAMOS TODAS
            AS OCORRÊNCIAS.

            NÃO ALTERAMOS NADA AINDA.
        */

        for (
            const dataEsperada
            of datasEsperadas
        ) {

            const horario =
                horarios.find(
                    item => {

                        if (
                            item.data !==
                            dataEsperada
                        ) {

                            return false;

                        }


                        // CADASTRO MENSAL

                        if (
                            horarioAtual.serieId
                        ) {

                            return (
                                item.serieId ===
                                horarioAtual.serieId
                            );

                        }


                        // FALLBACK MANUAL

                        return (
                            item.inicio ===
                                horarioAtual.inicio &&
                            item.fim ===
                                horarioAtual.fim &&
                            item.aceitaFixo
                        );

                    }
                );


            if (!horario) {

                return {
                    ok: false,

                    erro:
                        `Não é possível contratar este horário como fixo porque ${formatarData(dataEsperada)} não possui esta disponibilidade cadastrada.`
                };

            }


            ocorrencias.push(
                horario
            );

        }


        /*
            AGORA VERIFICAMOS SE TODAS
            CONTINUAM DISPONÍVEIS.

            ISSO IMPEDE CONTRATO FIXO
            PELA METADE.
        */

        const indisponivel =
            ocorrencias.find(
                horario =>
                    horario.status !==
                        "disponivel" ||
                    !horario.aceitaFixo
            );


        if (indisponivel) {

            return {
                ok: false,

                erro:
                    `Não é possível confirmar o horário fixo porque ${formatarData(indisponivel.data)} já não está disponível.`
            };

        }


        const contratoId =
            gerarId();


        const bloqueados =
            [];


        /*
            SOMENTE AGORA ALTERAMOS
            TODAS AS OCORRÊNCIAS.
        */

        ocorrencias.forEach(
            horario => {

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


        salvarLocal(
            STORAGE_HORARIOS,
            horarios
        );


        // ==============================================
        // CONTRATO FIXO
        // ==============================================

        const contratos =
            carregarLocal(
                STORAGE_FIXOS
            );


        const dataInicial =
            criarDataLocal(
                horarioAtual.data
            );


        contratos.push(
            {

                id:
                    contratoId,

                reservaId:

                    reservaId,

                serieId:
                    horarioAtual.serieId ||
                    null,

                cliente:
                    cliente,

                diaSemana:
                    dataInicial.getDay(),

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


        return {
            ok: true,
            datas: bloqueados
        };

    }


    // ==================================================
    // FINALIZAR PAGAMENTO
    // ==================================================

    function finalizarPagamento(
        formaPagamento
    ) {

        // EVITA CLIQUE DUPLO

        if (
            pagamentoProcessando
        ) {

            return;

        }


        if (
            pagamentoExpirado
        ) {

            return;

        }


        definirProcessando(
            true
        );


        // ==============================================
        // REVALIDAÇÃO
        // ==============================================

        const validacao =
            validarReservaAtual();


        if (
            !validacao.ok
        ) {

            definirProcessando(
                false
            );


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


        // ==============================================
        // AVULSO
        // ==============================================

        if (
            reserva.tipo ===
            "avulso"
        ) {

            const sucesso =
                confirmarAvulso(
                    reservaId
                );


            if (!sucesso) {

                definirProcessando(
                    false
                );


                mostrarErro(
                    "Não foi possível confirmar este horário. Ele pode ter sido reservado por outra pessoa."
                );


                return;

            }

        }


        // ==============================================
        // FIXO
        // ==============================================

        else {

            const resultadoFixo =
                confirmarFixo(
                    reservaId
                );


            if (
                !resultadoFixo.ok
            ) {

                definirProcessando(
                    false
                );


                mostrarErro(
                    resultadoFixo.erro
                );


                return;

            }


            datasFixas =
                resultadoFixo.datas;

        }


        // ==================================================
        // REGISTRAR RESERVA
        // ==================================================

        const agora =
            new Date()
                .toISOString();


        const novaReserva =
        {

            id:
                reservaId,

            codigo:
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

            cliente:
                cliente,

            status:
                "paga",

            formaPagamento:
                formaPagamento,

            datasFixas:
                datasFixas,

            criadoEm:
                agora,

            pagoEm:
                agora

        };


        const reservas =
            carregarLocal(
                STORAGE_RESERVAS
            );


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

        const pagamento =
        {

            id:
                gerarId(),

            reservaId:
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
                agora

        };


        const pagamentos =
            carregarLocal(
                STORAGE_PAGAMENTOS
            );


        pagamentos.push(
            pagamento
        );


        salvarLocal(
            STORAGE_PAGAMENTOS,
            pagamentos
        );


        // ==================================================
        // SALVAR CONFIRMAÇÃO
        // ==================================================

        sessionStorage.setItem(
            SESSION_CONFIRMADA,
            JSON.stringify(
                {
                    reserva:
                        novaReserva,

                    pagamento:
                        pagamento
                }
            )
        );


        // ==================================================
        // LIMPAR PAGAMENTO PENDENTE
        // ==================================================

        sessionStorage.removeItem(
            SESSION_PAGAMENTO
        );


        if (
            intervaloContador
        ) {

            clearInterval(
                intervaloContador
            );


            intervaloContador =
                null;

        }


        // ==================================================
        // REDIRECIONAR
        // ==================================================

        /*
            A RESERVA JÁ ESTÁ:
            ✓ PAGA
            ✓ REGISTRADA
            ✓ HORÁRIO BLOQUEADO
            ✓ DISPONÍVEL NO DASHBOARD
            ✓ DISPONÍVEL NA AGENDA DO GERENTE

            AGORA VAMOS PARA A
            PÁGINA DE CONFIRMAÇÃO.
        */

        window.location.href =
            "confirmacao.html";

    }


    // ==================================================
    // PIX APROVADO
    // ==================================================

    if (btnSimularPix) {

        btnSimularPix.addEventListener(
            "click",
            () => {

                finalizarPagamento(
                    "pix"
                );

            }
        );

    }


    // ==================================================
    // CARTÃO
    // ==================================================

    if (formCartao) {

        formCartao.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (
                    pagamentoProcessando ||
                    pagamentoExpirado
                ) {

                    return;

                }


                if (mensagemCartao) {

                    mensagemCartao.textContent =
                        "";

                }


                const numero =
                    document.getElementById(
                        "cartaoNumero"
                    )
                    ?.value
                    .trim() ||
                    "";


                const validade =
                    document.getElementById(
                        "cartaoValidade"
                    )
                    ?.value
                    .trim() ||
                    "";


                const cvv =
                    document.getElementById(
                        "cartaoCvv"
                    )
                    ?.value
                    .trim() ||
                    "";


                const nome =
                    document.getElementById(
                        "cartaoNome"
                    )
                    ?.value
                    .trim() ||
                    "";


                if (
                    !numero ||
                    !validade ||
                    !cvv ||
                    !nome
                ) {

                    if (
                        mensagemCartao
                    ) {

                        mensagemCartao.textContent =
                            "Preencha os dados do cartão para simular o pagamento.";

                    }


                    return;

                }


                /*
                    PROTÓTIPO.

                    NÃO EXISTE COBRANÇA
                    REAL DE CARTÃO AQUI.
                */

                finalizarPagamento(
                    "cartao"
                );

            }
        );

    }


    // ==================================================
    // MÁSCARA DO NÚMERO DO CARTÃO
    // ==================================================

    const cartaoNumero =
        document.getElementById(
            "cartaoNumero"
        );


    if (cartaoNumero) {

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

    }


    // ==================================================
    // MÁSCARA DA VALIDADE
    // ==================================================

    const cartaoValidade =
        document.getElementById(
            "cartaoValidade"
        );


    if (cartaoValidade) {

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
                    valor.length >
                    2
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

    }


    // ==================================================
    // INICIAR
    // ==================================================

    function iniciar() {

        const validacao =
            validarReservaAtual();


        if (
            !validacao.ok
        ) {

            mostrarErro(
                validacao.erro
            );


            return;

        }


        preencherResumo();

        criarCodigoPix();

        selecionarMetodo(
            "pix"
        );

        iniciarContador();


        console.log(
            "La Cancha: pagamento.js carregado."
        );

    }


    iniciar();

})();