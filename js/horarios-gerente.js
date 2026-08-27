// ======================================================
// LA CANCHA FUT 7
// GERENCIAMENTO DE DISPONIBILIDADES
// ======================================================

(() => {


    // ==================================================
    // CONFIGURAÇÕES
    // ==================================================

    const STORAGE_KEY =
        "horariosLaCancha";


    const DIAS_SEMANA =
    {
        0: "Domingo",
        1: "Segunda-feira",
        2: "Terça-feira",
        3: "Quarta-feira",
        4: "Quinta-feira",
        5: "Sexta-feira",
        6: "Sábado"
    };



    // ==================================================
    // ELEMENTOS - MODOS
    // ==================================================

    const modoCadastroDia =
        document.getElementById(
            "modoCadastroDia"
        );

    const modoCadastroMes =
        document.getElementById(
            "modoCadastroMes"
        );

    const painelCadastroDia =
        document.getElementById(
            "painelCadastroDia"
        );

    const painelCadastroMes =
        document.getElementById(
            "painelCadastroMes"
        );



    /*
        Se não estiver em horarios.html,
        encerra este script.
    */

    if (
        !modoCadastroDia ||
        !modoCadastroMes ||
        !painelCadastroDia ||
        !painelCadastroMes
    ) {

        return;

    }



    // ==================================================
    // MENSAGEM
    // ==================================================

    const mensagemDisponibilidade =
        document.getElementById(
            "mensagemDisponibilidade"
        );



    // ==================================================
    // ELEMENTOS - CADASTRO POR DIA
    // ==================================================

    const cadastroDiaData =
        document.getElementById(
            "cadastroDiaData"
        );

    const cadastroDiaStatus =
        document.getElementById(
            "cadastroDiaStatus"
        );

    const listaFaixasDia =
        document.getElementById(
            "listaFaixasDia"
        );

    const btnAdicionarFaixaDia =
        document.getElementById(
            "btnAdicionarFaixaDia"
        );

    const btnSalvarDia =
        document.getElementById(
            "btnSalvarDia"
        );

    const btnCancelarEdicao =
        document.getElementById(
            "btnCancelarEdicaoDisponibilidade"
        );

    const tituloCadastroDia =
        document.getElementById(
            "tituloCadastroDia"
        );



    // ==================================================
    // ELEMENTOS - CADASTRO POR MÊS
    // ==================================================

    const cadastroMesReferencia =
        document.getElementById(
            "cadastroMesReferencia"
        );

    const configuracoesMensais =
        document.getElementById(
            "configuracoesMensais"
        );

    const btnGerarMes =
        document.getElementById(
            "btnGerarMes"
        );

    const checkboxesDias =
        document.querySelectorAll(
            "[data-dia-semana]"
        );



    // ==================================================
    // ELEMENTOS - LISTAGEM
    // ==================================================

    const quantidadeDisponibilidades =
        document.getElementById(
            "quantidadeDisponibilidades"
        );

    const listaDisponibilidades =
        document.getElementById(
            "listaDisponibilidades"
        );

    const disponibilidadesVazio =
        document.getElementById(
            "disponibilidadesVazio"
        );

    const filtroData =
        document.getElementById(
            "filtroDisponibilidadeData"
        );

    const filtroMes =
        document.getElementById(
            "filtroDisponibilidadeMes"
        );

    const btnLimparFiltros =
        document.getElementById(
            "btnLimparFiltrosDisponibilidade"
        );



    // ==================================================
    // ESTADO
    // ==================================================

    let horariosLaCancha =
        carregarHorarios();


    let editandoId =
        null;



    // ==================================================
    // CARREGAR HORÁRIOS
    // ==================================================

    function carregarHorarios() {

        try {

            const dados =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (!dados) {

                return [];

            }


            const lista =
                JSON.parse(
                    dados
                );


            if (!Array.isArray(lista)) {

                return [];

            }



            /*
                MIGRAÇÃO DOS HORÁRIOS ANTIGOS.

                Se existirem horários criados
                na versão anterior, eles continuam
                funcionando.
            */

            return lista.map(
                (horario) => {

                    return {

                        ...horario,


                        aceitaAvulso:
                            horario.aceitaAvulso
                            ??
                            true,


                        aceitaFixo:
                            horario.aceitaFixo
                            ??
                            false,


                        valorAvulso:
                            horario.valorAvulso
                            ??
                            (
                                horario.valor !==
                                undefined
                                    ? Number(
                                        horario.valor
                                    )
                                    : null
                            ),


                        valorFixo:
                            horario.valorFixo
                            ??
                            null,


                        status:
                            horario.status
                            ||
                            "disponivel",


                        origem:
                            horario.origem
                            ||
                            "dia",


                        loteId:
                            horario.loteId
                            ||
                            null,


                        serieId:
                            horario.serieId
                            ||
                            null

                    };

                }
            );

        } catch (erro) {

            console.error(
                "Erro ao carregar horários:",
                erro
            );


            return [];

        }

    }



    // ==================================================
    // SALVAR
    // ==================================================

    function salvarHorarios() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                horariosLaCancha
            )
        );

    }



    // ==================================================
    // GERAR ID
    // ==================================================

    function gerarId() {

        if (
            window.crypto &&
            window.crypto.randomUUID
        ) {

            return (
                window.crypto.randomUUID()
            );

        }


        return (
            Date.now().toString() +
            "-" +
            Math.random()
                .toString(16)
                .slice(2)
        );

    }



    // ==================================================
    // DATA DE HOJE
    // ==================================================

    function obterDataHoje() {

        const hoje =
            new Date();


        const ano =
            hoje.getFullYear();


        const mes =
            String(
                hoje.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const dia =
            String(
                hoje.getDate()
            ).padStart(
                2,
                "0"
            );


        return (
            `${ano}-${mes}-${dia}`
        );

    }



    // ==================================================
    // MÊS ATUAL
    // ==================================================

    function obterMesAtual() {

        return (
            obterDataHoje()
                .substring(
                    0,
                    7
                )
        );

    }



    // ==================================================
    // CRIAR DATA LOCAL
    // ==================================================

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



    // ==================================================
    // FORMATAR DATA
    // ==================================================

    function formatarData(
        data
    ) {

        return criarDataLocal(
            data
        ).toLocaleDateString(
            "pt-BR"
        );

    }



    // ==================================================
    // DIA DA SEMANA
    // ==================================================

    function obterNomeDia(
        data
    ) {

        return criarDataLocal(
            data
        ).toLocaleDateString(
            "pt-BR",
            {
                weekday:
                    "long"
            }
        );

    }



    // ==================================================
    // FORMATAR MOEDA
    // ==================================================

    function formatarMoeda(
        valor
    ) {

        if (
            valor === null ||
            valor === undefined
        ) {

            return "-";

        }


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



    // ==================================================
    // HORÁRIO → MINUTOS
    // ==================================================

    function horarioParaMinutos(
        horario
    ) {

        if (!horario) {

            return 0;

        }


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



    // ==================================================
    // VERIFICAR SE DOIS HORÁRIOS SE SOBREPÕEM
    // ==================================================

    function faixasConflitam(
        inicioA,
        fimA,
        inicioB,
        fimB
    ) {

        const inicioAMin =
            horarioParaMinutos(
                inicioA
            );

        const fimAMin =
            horarioParaMinutos(
                fimA
            );

        const inicioBMin =
            horarioParaMinutos(
                inicioB
            );

        const fimBMin =
            horarioParaMinutos(
                fimB
            );


        return (
            inicioAMin < fimBMin &&
            fimAMin > inicioBMin
        );

    }



    // ==================================================
    // VERIFICAR CONFLITO COM HORÁRIOS CADASTRADOS
    // ==================================================

    function existeConflito(
        lista,
        data,
        inicio,
        fim,
        ignorarId = null
    ) {

        return lista.some(
            (horario) => {


                // IGNORA O PRÓPRIO NA EDIÇÃO

                if (
                    ignorarId &&
                    horario.id ===
                    ignorarId
                ) {

                    return false;

                }



                // DATA DIFERENTE

                if (
                    horario.data !==
                    data
                ) {

                    return false;

                }



                return faixasConflitam(
                    inicio,
                    fim,
                    horario.inicio,
                    horario.fim
                );

            }
        );

    }



    // ==================================================
    // MOSTRAR MENSAGEM
    // ==================================================

    function mostrarMensagem(
        texto,
        tipo = "sucesso"
    ) {

        if (
            !mensagemDisponibilidade
        ) {

            return;

        }


        mensagemDisponibilidade
            .textContent =
            texto;


        mensagemDisponibilidade
            .className =
            `disp-mensagem ativo ${tipo}`;

    }



    // ==================================================
    // LIMPAR MENSAGEM
    // ==================================================

    function limparMensagem() {

        if (
            !mensagemDisponibilidade
        ) {

            return;

        }


        mensagemDisponibilidade
            .textContent =
            "";


        mensagemDisponibilidade
            .className =
            "disp-mensagem";

    }



    // ==================================================
    // TROCAR MODO
    // ==================================================

    function trocarModo(
        modo
    ) {

        limparMensagem();


        const usarDia =
            modo ===
            "dia";


        modoCadastroDia.classList.toggle(
            "ativo",
            usarDia
        );


        modoCadastroMes.classList.toggle(
            "ativo",
            !usarDia
        );


        painelCadastroDia.classList.toggle(
            "ativo",
            usarDia
        );


        painelCadastroMes.classList.toggle(
            "ativo",
            !usarDia
        );

    }



    modoCadastroDia.addEventListener(
        "click",
        () => {

            trocarModo(
                "dia"
            );

        }
    );



    modoCadastroMes.addEventListener(
        "click",
        () => {

            if (editandoId) {

                cancelarEdicao();

            }


            trocarModo(
                "mes"
            );

        }
    );



    // ==================================================
    // CRIAR UM BLOCO DE HORÁRIO
    // ==================================================

    function adicionarFaixa(
        container,
        dados = {}
    ) {

        const faixa =
            document.createElement(
                "div"
            );


        faixa.className =
            "disp-faixa";



        const aceitaAvulso =
            dados.aceitaAvulso
            ??
            true;


        const aceitaFixo =
            dados.aceitaFixo
            ??
            false;



        faixa.innerHTML =
        `

            <!-- TOPO -->

            <div class="disp-faixa-topo">

                <strong class="disp-faixa-titulo">
                    Horário
                </strong>


                <button
                    type="button"
                    class="disp-remover-faixa"
                >
                    Remover
                </button>

            </div>



            <!-- INÍCIO / FIM -->

            <div class="disp-faixa-grid">


                <div class="disp-campo">

                    <label>
                        Início
                    </label>

                    <input
                        type="time"
                        data-campo="inicio"
                        value="${dados.inicio || ""}"
                    >

                </div>



                <div class="disp-campo">

                    <label>
                        Fim
                    </label>

                    <input
                        type="time"
                        data-campo="fim"
                        value="${dados.fim || ""}"
                    >

                </div>


            </div>



            <!-- MODALIDADES -->

            <div class="disp-modalidades">


                <!-- AVULSO -->

                <div class="disp-modalidade avulso">


                    <label class="disp-check-modalidade">

                        <input
                            type="checkbox"
                            data-campo="avulso"
                            ${aceitaAvulso ? "checked" : ""}
                        >


                        <div>

                            <strong>
                                Reserva avulsa
                            </strong>

                            <small>
                                Cliente paga por jogo
                            </small>

                        </div>

                    </label>



                    <div
                        class="
                            disp-preco-modalidade
                            ${aceitaAvulso ? "" : "disp-escondido"}
                        "
                        data-bloco="valorAvulso"
                    >

                        <label>
                            Valor por jogo
                        </label>


                        <div class="disp-input-moeda">

                            <span>
                                R$
                            </span>


                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="150,00"
                                data-campo="valorAvulso"
                                value="${
                                    dados.valorAvulso
                                    ??
                                    ""
                                }"
                            >

                        </div>

                    </div>

                </div>



                <!-- FIXO -->

                <div class="disp-modalidade fixo">


                    <label class="disp-check-modalidade">

                        <input
                            type="checkbox"
                            data-campo="fixo"
                            ${aceitaFixo ? "checked" : ""}
                        >


                        <div>

                            <strong>
                                Horário fixo
                            </strong>

                            <small>
                                Cliente paga mensalmente
                            </small>

                        </div>

                    </label>



                    <div
                        class="
                            disp-preco-modalidade
                            ${aceitaFixo ? "" : "disp-escondido"}
                        "
                        data-bloco="valorFixo"
                    >

                        <label>
                            Mensalidade
                        </label>


                        <div class="disp-input-moeda">

                            <span>
                                R$
                            </span>


                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="550,00"
                                data-campo="valorFixo"
                                value="${
                                    dados.valorFixo
                                    ??
                                    ""
                                }"
                            >

                        </div>

                    </div>

                </div>


            </div>

        `;



        container.appendChild(
            faixa
        );


        configurarEventosFaixa(
            faixa,
            container
        );


        atualizarTitulosFaixas(
            container
        );


        return faixa;

    }



    // ==================================================
    // EVENTOS DO BLOCO
    // ==================================================

    function configurarEventosFaixa(
        faixa,
        container
    ) {

        const campoAvulso =
            faixa.querySelector(
                '[data-campo="avulso"]'
            );


        const campoFixo =
            faixa.querySelector(
                '[data-campo="fixo"]'
            );


        const blocoAvulso =
            faixa.querySelector(
                '[data-bloco="valorAvulso"]'
            );


        const blocoFixo =
            faixa.querySelector(
                '[data-bloco="valorFixo"]'
            );



        // AVULSO

        campoAvulso.addEventListener(
            "change",
            () => {

                blocoAvulso.classList.toggle(
                    "disp-escondido",
                    !campoAvulso.checked
                );

            }
        );



        // FIXO

        campoFixo.addEventListener(
            "change",
            () => {

                blocoFixo.classList.toggle(
                    "disp-escondido",
                    !campoFixo.checked
                );

            }
        );



        // REMOVER

        const btnRemover =
            faixa.querySelector(
                ".disp-remover-faixa"
            );


        btnRemover.addEventListener(
            "click",
            () => {

                const total =
                    container.querySelectorAll(
                        ".disp-faixa"
                    ).length;


                if (
                    total <= 1
                ) {

                    mostrarMensagem(
                        "Mantenha pelo menos um horário.",
                        "erro"
                    );


                    return;

                }


                faixa.remove();


                atualizarTitulosFaixas(
                    container
                );

            }
        );

    }



    // ==================================================
    // NUMERAR HORÁRIOS
    // ==================================================

    function atualizarTitulosFaixas(
        container
    ) {

        const faixas =
            container.querySelectorAll(
                ".disp-faixa"
            );


        faixas.forEach(
            (
                faixa,
                indice
            ) => {

                const titulo =
                    faixa.querySelector(
                        ".disp-faixa-titulo"
                    );


                if (titulo) {

                    titulo.textContent =
                        `Horário ${indice + 1}`;

                }

            }
        );

    }



    // ==================================================
    // PEGAR DADOS DAS FAIXAS
    // ==================================================

    function coletarFaixas(
        container
    ) {

        const elementos =
            [
                ...container.querySelectorAll(
                    ".disp-faixa"
                )
            ];


        return elementos.map(
            (faixa) => {

                const aceitaAvulso =
                    faixa.querySelector(
                        '[data-campo="avulso"]'
                    ).checked;


                const aceitaFixo =
                    faixa.querySelector(
                        '[data-campo="fixo"]'
                    ).checked;


                const valorAvulsoCampo =
                    faixa.querySelector(
                        '[data-campo="valorAvulso"]'
                    );


                const valorFixoCampo =
                    faixa.querySelector(
                        '[data-campo="valorFixo"]'
                    );


                return {

                    inicio:
                        faixa.querySelector(
                            '[data-campo="inicio"]'
                        ).value,


                    fim:
                        faixa.querySelector(
                            '[data-campo="fim"]'
                        ).value,


                    aceitaAvulso,


                    aceitaFixo,


                    valorAvulso:
                        aceitaAvulso
                            ? Number(
                                valorAvulsoCampo.value
                            )
                            : null,


                    valorFixo:
                        aceitaFixo
                            ? Number(
                                valorFixoCampo.value
                            )
                            : null

                };

            }
        );

    }



    // ==================================================
    // VALIDAR FAIXAS
    // ==================================================

    function validarFaixas(
        faixas
    ) {

        if (
            faixas.length === 0
        ) {

            return (
                "Adicione pelo menos um horário."
            );

        }



        // VALIDAR CADA HORÁRIO

        for (
            let i = 0;
            i < faixas.length;
            i++
        ) {

            const faixa =
                faixas[i];


            const numero =
                i + 1;



            if (
                !faixa.inicio ||
                !faixa.fim
            ) {

                return (
                    `Preencha início e fim do horário ${numero}.`
                );

            }



            if (
                horarioParaMinutos(
                    faixa.fim
                )
                <=
                horarioParaMinutos(
                    faixa.inicio
                )
            ) {

                return (
                    `O horário ${numero} possui início/fim inválido.`
                );

            }



            if (
                !faixa.aceitaAvulso &&
                !faixa.aceitaFixo
            ) {

                return (
                    `Escolha avulso, fixo ou ambos no horário ${numero}.`
                );

            }



            if (
                faixa.aceitaAvulso &&
                (
                    !faixa.valorAvulso ||
                    faixa.valorAvulso <= 0
                )
            ) {

                return (
                    `Informe o valor avulso do horário ${numero}.`
                );

            }



            if (
                faixa.aceitaFixo &&
                (
                    !faixa.valorFixo ||
                    faixa.valorFixo <= 0
                )
            ) {

                return (
                    `Informe a mensalidade do horário ${numero}.`
                );

            }

        }



        // ==================================================
        // CONFLITO ENTRE OS HORÁRIOS DO PRÓPRIO FORM
        // ==================================================

        for (
            let i = 0;
            i < faixas.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < faixas.length;
                j++
            ) {

                if (
                    faixasConflitam(
                        faixas[i].inicio,
                        faixas[i].fim,
                        faixas[j].inicio,
                        faixas[j].fim
                    )
                ) {

                    return (
                        `Os horários ${i + 1} e ${j + 1} estão se sobrepondo.`
                    );

                }

            }

        }



        return null;

    }



    // ==================================================
    // ADICIONAR HORÁRIO POR DIA
    // ==================================================

    btnAdicionarFaixaDia.addEventListener(
        "click",
        () => {

            limparMensagem();


            adicionarFaixa(
                listaFaixasDia
            );

        }
    );



    // ==================================================
    // SALVAR CADASTRO POR DIA
    // ==================================================

    btnSalvarDia.addEventListener(
        "click",
        () => {

            limparMensagem();


            const data =
                cadastroDiaData.value;


            const status =
                cadastroDiaStatus.value;



            if (!data) {

                mostrarMensagem(
                    "Escolha a data.",
                    "erro"
                );


                return;

            }



            const faixas =
                coletarFaixas(
                    listaFaixasDia
                );


            const erro =
                validarFaixas(
                    faixas
                );


            if (erro) {

                mostrarMensagem(
                    erro,
                    "erro"
                );


                return;

            }



            // ==================================================
            // EDIÇÃO
            // ==================================================

            if (editandoId) {

                const faixa =
                    faixas[0];


                const conflito =
                    existeConflito(
                        horariosLaCancha,
                        data,
                        faixa.inicio,
                        faixa.fim,
                        editandoId
                    );


                if (conflito) {

                    mostrarMensagem(
                        "Esse horário entra em conflito com outro horário cadastrado.",
                        "erro"
                    );


                    return;

                }



                const indice =
                    horariosLaCancha
                        .findIndex(
                            (horario) =>
                                horario.id ===
                                editandoId
                        );


                if (
                    indice === -1
                ) {

                    return;

                }



                const horarioAnterior =
                    horariosLaCancha[
                        indice
                    ];



                horariosLaCancha[
                    indice
                ] =
                {

                    ...horarioAnterior,


                    data,


                    inicio:
                        faixa.inicio,


                    fim:
                        faixa.fim,


                    aceitaAvulso:
                        faixa.aceitaAvulso,


                    aceitaFixo:
                        faixa.aceitaFixo,


                    valorAvulso:
                        faixa.valorAvulso,


                    valorFixo:
                        faixa.valorFixo,


                    status,


                    alteradoIndividualmente:
                        horarioAnterior.origem ===
                        "mensal"
                            ? true
                            : (
                                horarioAnterior
                                    .alteradoIndividualmente
                                ||
                                false
                            )

                };



                salvarHorarios();


                cancelarEdicao();


                renderizarLista();



                mostrarMensagem(
                    "Horário atualizado com sucesso.",
                    "sucesso"
                );


                return;

            }



            // ==================================================
            // NOVOS HORÁRIOS
            // ==================================================

            const novosHorarios =
                [];



            for (
                const faixa
                of faixas
            ) {

                const listaTeste =
                    [
                        ...horariosLaCancha,
                        ...novosHorarios
                    ];



                const conflito =
                    existeConflito(
                        listaTeste,
                        data,
                        faixa.inicio,
                        faixa.fim
                    );



                if (conflito) {

                    mostrarMensagem(
                        `O horário ${faixa.inicio} → ${faixa.fim} entra em conflito com outro horário desta data.`,
                        "erro"
                    );


                    return;

                }



                novosHorarios.push(
                    {

                        id:
                            gerarId(),


                        data,


                        inicio:
                            faixa.inicio,


                        fim:
                            faixa.fim,


                        aceitaAvulso:
                            faixa.aceitaAvulso,


                        aceitaFixo:
                            faixa.aceitaFixo,


                        valorAvulso:
                            faixa.valorAvulso,


                        valorFixo:
                            faixa.valorFixo,


                        status,


                        origem:
                            "dia",


                        loteId:
                            null,


                        serieId:
                            null

                    }
                );

            }



            horariosLaCancha.push(
                ...novosHorarios
            );


            salvarHorarios();


            renderizarLista();



            // LIMPA HORÁRIOS,
            // MAS MANTÉM A DATA

            listaFaixasDia.innerHTML =
                "";


            adicionarFaixa(
                listaFaixasDia
            );



            mostrarMensagem(
                `${novosHorarios.length} horário(s) cadastrado(s) para ${formatarData(data)}.`,
                "sucesso"
            );

        }
    );



    // ==================================================
    // GERAR DATAS DO DIA DA SEMANA NO MÊS
    // ==================================================

    function obterDatasDoMes(
        mesReferencia,
        diaSemana
    ) {

        const [
            ano,
            mes
        ] =
            mesReferencia
                .split("-")
                .map(Number);



        const ultimoDia =
            new Date(
                ano,
                mes,
                0
            ).getDate();



        const datas =
            [];



        for (
            let dia = 1;
            dia <= ultimoDia;
            dia++
        ) {

            const dataObjeto =
                new Date(
                    ano,
                    mes - 1,
                    dia
                );


            if (
                dataObjeto.getDay() ===
                Number(
                    diaSemana
                )
            ) {

                const mesTexto =
                    String(mes)
                        .padStart(
                            2,
                            "0"
                        );


                const diaTexto =
                    String(dia)
                        .padStart(
                            2,
                            "0"
                        );


                datas.push(
                    `${ano}-${mesTexto}-${diaTexto}`
                );

            }

        }


        return datas;

    }



    // ==================================================
    // CRIAR CONFIGURAÇÃO DE UM DIA DO MÊS
    // ==================================================

    function criarConfiguracaoDia(
        diaSemana
    ) {

        const painel =
            document.createElement(
                "div"
            );


        painel.className =
            "disp-config-dia";


        painel.dataset.dia =
            String(
                diaSemana
            );



        painel.innerHTML =
        `

            <div class="disp-config-dia-topo">


                <div>

                    <span>
                        DIA DA SEMANA
                    </span>


                    <h3>
                        ${DIAS_SEMANA[diaSemana]}
                    </h3>


                    <p>
                        Configure horários e valores
                        específicos para este dia.
                    </p>

                </div>



                <button
                    type="button"
                    class="
                        disp-btn-adicionar
                        disp-adicionar-mensal
                    "
                >
                    + Adicionar horário
                </button>

            </div>



            <div class="disp-faixas-mensal">
            </div>

        `;



        configuracoesMensais
            .appendChild(
                painel
            );



        const container =
            painel.querySelector(
                ".disp-faixas-mensal"
            );



        // PRIMEIRO HORÁRIO

        adicionarFaixa(
            container
        );



        // NOVOS HORÁRIOS

        const btnAdicionar =
            painel.querySelector(
                ".disp-adicionar-mensal"
            );


        btnAdicionar.addEventListener(
            "click",
            () => {

                limparMensagem();


                adicionarFaixa(
                    container
                );

            }
        );

    }



    // ==================================================
    // SINCRONIZAR DIAS MARCADOS
    // ==================================================

    function sincronizarDiasSelecionados() {

        const diasSelecionados =
            [
                ...checkboxesDias
            ]
            .filter(
                (checkbox) =>
                    checkbox.checked
            )
            .map(
                (checkbox) =>
                    checkbox.dataset
                        .diaSemana
            );



        // ==================================================
        // REMOVER DIA QUE FOI DESMARCADO
        // ==================================================

        const paineisAtuais =
            configuracoesMensais
                .querySelectorAll(
                    ".disp-config-dia"
                );


        paineisAtuais.forEach(
            (painel) => {

                if (
                    !diasSelecionados.includes(
                        painel.dataset.dia
                    )
                ) {

                    painel.remove();

                }

            }
        );



        // ==================================================
        // CRIAR DIA NOVO
        // ==================================================

        diasSelecionados.forEach(
            (dia) => {

                const existente =
                    configuracoesMensais
                        .querySelector(
                            `.disp-config-dia[data-dia="${dia}"]`
                        );


                if (!existente) {

                    criarConfiguracaoDia(
                        Number(dia)
                    );

                }

            }
        );



        // ==================================================
        // ESTADO VAZIO
        // ==================================================

        if (
            diasSelecionados.length === 0
        ) {

            configuracoesMensais.innerHTML =
            `

                <div class="disp-mes-vazio">

                    <span>
                        👆
                    </span>

                    <strong>
                        Selecione os dias da semana
                    </strong>

                    <p>
                        Os horários e valores de cada
                        dia aparecerão aqui.
                    </p>

                </div>

            `;


            return;

        }



        const vazio =
            configuracoesMensais
                .querySelector(
                    ".disp-mes-vazio"
                );


        if (vazio) {

            vazio.remove();

        }

    }



    // EVENTOS DOS DIAS

    checkboxesDias.forEach(
        (checkbox) => {

            checkbox.addEventListener(
                "change",
                sincronizarDiasSelecionados
            );

        }
    );



    // ==================================================
    // GERAR HORÁRIOS DO MÊS
    // ==================================================

    btnGerarMes.addEventListener(
        "click",
        () => {

            limparMensagem();



            const mesReferencia =
                cadastroMesReferencia.value;



            if (!mesReferencia) {

                mostrarMensagem(
                    "Escolha o mês de referência.",
                    "erro"
                );


                return;

            }



            const paineis =
                [
                    ...configuracoesMensais
                        .querySelectorAll(
                            ".disp-config-dia"
                        )
                ];



            if (
                paineis.length === 0
            ) {

                mostrarMensagem(
                    "Selecione pelo menos um dia da semana.",
                    "erro"
                );


                return;

            }



            // ==================================================
            // COLETAR CONFIGURAÇÕES
            // ==================================================

            const configuracoes =
                [];



            for (
                const painel
                of paineis
            ) {

                const diaSemana =
                    Number(
                        painel.dataset.dia
                    );


                const container =
                    painel.querySelector(
                        ".disp-faixas-mensal"
                    );


                const faixas =
                    coletarFaixas(
                        container
                    );


                const erro =
                    validarFaixas(
                        faixas
                    );



                if (erro) {

                    mostrarMensagem(
                        `${DIAS_SEMANA[diaSemana]}: ${erro}`,
                        "erro"
                    );


                    return;

                }



                configuracoes.push(
                    {

                        diaSemana,

                        faixas

                    }
                );

            }



            // ==================================================
            // GERAR
            // ==================================================

            const loteId =
                gerarId();


            const novos =
                [];


            let conflitos =
                0;


            let ocorrenciasPassadas =
                0;


            const hoje =
                obterDataHoje();



            configuracoes.forEach(
                (configuracao) => {


                    configuracao
                        .faixas
                        .forEach(
                            (faixa) => {


                                /*
                                    A série representa:

                                    exemplo:
                                    TODA SEGUNDA
                                    18:00 → 19:00
                                    SETEMBRO

                                    Isso será importante
                                    para horário fixo.
                                */

                                const serieId =
                                    gerarId();



                                const datas =
                                    obterDatasDoMes(
                                        mesReferencia,
                                        configuracao
                                            .diaSemana
                                    );



                                datas.forEach(
                                    (data) => {


                                        // NÃO CRIAR DATA PASSADA

                                        if (
                                            data < hoje
                                        ) {

                                            ocorrenciasPassadas++;

                                            return;

                                        }



                                        const listaTeste =
                                            [
                                                ...horariosLaCancha,
                                                ...novos
                                            ];



                                        const conflito =
                                            existeConflito(
                                                listaTeste,
                                                data,
                                                faixa.inicio,
                                                faixa.fim
                                            );



                                        if (conflito) {

                                            conflitos++;

                                            return;

                                        }



                                        novos.push(
                                            {

                                                id:
                                                    gerarId(),


                                                data,


                                                inicio:
                                                    faixa.inicio,


                                                fim:
                                                    faixa.fim,


                                                aceitaAvulso:
                                                    faixa
                                                        .aceitaAvulso,


                                                aceitaFixo:
                                                    faixa
                                                        .aceitaFixo,


                                                valorAvulso:
                                                    faixa
                                                        .valorAvulso,


                                                valorFixo:
                                                    faixa
                                                        .valorFixo,


                                                status:
                                                    "disponivel",


                                                origem:
                                                    "mensal",


                                                loteId,


                                                serieId,


                                                mesReferencia,


                                                diaSemanaOrigem:
                                                    configuracao
                                                        .diaSemana

                                            }
                                        );

                                    }
                                );

                            }
                        );

                }
            );



            // ==================================================
            // NADA CRIADO
            // ==================================================

            if (
                novos.length === 0
            ) {

                mostrarMensagem(
                    "Nenhum novo horário foi criado. Verifique se os horários já existem ou entram em conflito.",
                    "erro"
                );


                return;

            }



            // ==================================================
            // SALVAR
            // ==================================================

            horariosLaCancha.push(
                ...novos
            );


            salvarHorarios();



            // MOSTRA O MÊS GERADO NA LISTA

            filtroData.value =
                "";


            filtroMes.value =
                mesReferencia;


            renderizarLista();



            // ==================================================
            // MENSAGEM
            // ==================================================

            let mensagem =
                `${novos.length} horário(s) criado(s) com sucesso.`;



            if (
                conflitos > 0
            ) {

                mensagem +=
                    ` ${conflitos} ocorrência(s) foram ignoradas por conflito.`;

            }



            if (
                ocorrenciasPassadas > 0
            ) {

                mensagem +=
                    ` ${ocorrenciasPassadas} ocorrência(s) de datas passadas foram ignoradas.`;

            }



            mostrarMensagem(
                mensagem,
                conflitos > 0
                    ? "aviso"
                    : "sucesso"
            );

        }
    );



    // ==================================================
    // EDITAR UM HORÁRIO
    // ==================================================

    function editarHorario(
        id
    ) {

        const horario =
            horariosLaCancha.find(
                (item) =>
                    item.id === id
            );


        if (!horario) {

            return;

        }



        editandoId =
            horario.id;



        // MUDA PARA ABA POR DIA

        trocarModo(
            "dia"
        );



        cadastroDiaData.value =
            horario.data;


        cadastroDiaStatus.value =
            horario.status;



        listaFaixasDia.innerHTML =
            "";



        adicionarFaixa(
            listaFaixasDia,
            horario
        );



        tituloCadastroDia.textContent =
            "Editar horário";


        btnSalvarDia.textContent =
            "Salvar alteração";


        btnAdicionarFaixaDia.classList.add(
            "disp-escondido"
        );


        btnCancelarEdicao.classList.remove(
            "disp-escondido"
        );



        window.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            }
        );

    }



    // ==================================================
    // CANCELAR EDIÇÃO
    // ==================================================

    function cancelarEdicao() {

        editandoId =
            null;


        tituloCadastroDia.textContent =
            "Nova disponibilidade";


        btnSalvarDia.textContent =
            "Salvar disponibilidade";


        btnAdicionarFaixaDia.classList.remove(
            "disp-escondido"
        );


        btnCancelarEdicao.classList.add(
            "disp-escondido"
        );


        cadastroDiaStatus.value =
            "disponivel";


        listaFaixasDia.innerHTML =
            "";


        adicionarFaixa(
            listaFaixasDia
        );

    }



    btnCancelarEdicao.addEventListener(
        "click",
        () => {

            cancelarEdicao();

            limparMensagem();

        }
    );



    // ==================================================
    // BLOQUEAR / DESBLOQUEAR
    // ==================================================

    function alternarBloqueio(
        id
    ) {

        const horario =
            horariosLaCancha.find(
                (item) =>
                    item.id === id
            );


        if (!horario) {

            return;

        }



        if (
            horario.status ===
            "bloqueado"
        ) {

            horario.status =
                "disponivel";

        } else {

            horario.status =
                "bloqueado";

        }



        /*
            IMPORTANTE:

            NÃO apagamos preços nem
            modalidades ao bloquear.

            Assim, quando desbloquear,
            tudo continua configurado.
        */

        salvarHorarios();


        renderizarLista();

    }



    // ==================================================
    // EXCLUIR
    // ==================================================

    function excluirHorario(
        id
    ) {

        const horario =
            horariosLaCancha.find(
                (item) =>
                    item.id === id
            );


        if (!horario) {

            return;

        }



        const confirmar =
            confirm(
                `Excluir ${formatarData(horario.data)} - ${horario.inicio} → ${horario.fim}?`
            );



        if (!confirmar) {

            return;

        }



        horariosLaCancha =
            horariosLaCancha.filter(
                (item) =>
                    item.id !== id
            );



        salvarHorarios();


        renderizarLista();



        mostrarMensagem(
            "Horário excluído.",
            "sucesso"
        );

    }



    // ==================================================
    // CRIAR PREÇOS DO CARD
    // ==================================================

    function montarPrecos(
        horario
    ) {

        let html =
            "";



        if (
            horario.aceitaAvulso
        ) {

            html +=
            `

                <div class="disp-preco avulso">

                    <span>
                        AVULSO
                    </span>

                    <strong>
                        ${formatarMoeda(
                            horario.valorAvulso
                        )}
                    </strong>

                    <small>
                        por jogo
                    </small>

                </div>

            `;

        }



        if (
            horario.aceitaFixo
        ) {

            html +=
            `

                <div class="disp-preco fixo">

                    <span>
                        FIXO
                    </span>

                    <strong>
                        ${formatarMoeda(
                            horario.valorFixo
                        )}
                    </strong>

                    <small>
                        por mês
                    </small>

                </div>

            `;

        }



        return html;

    }



    // ==================================================
    // RENDERIZAR LISTA
    // ==================================================

    function renderizarLista() {

        if (
            !listaDisponibilidades
        ) {

            return;

        }



        listaDisponibilidades.innerHTML =
            "";



        let lista =
            [
                ...horariosLaCancha
            ];



        // ==================================================
        // FILTRO POR DATA
        // ==================================================

        if (
            filtroData.value
        ) {

            lista =
                lista.filter(
                    (horario) =>
                        horario.data ===
                        filtroData.value
                );

        }



        // ==================================================
        // FILTRO POR MÊS
        // ==================================================

        if (
            filtroMes.value
        ) {

            lista =
                lista.filter(
                    (horario) =>
                        horario.data
                            .startsWith(
                                filtroMes.value
                            )
                );

        }



        // ==================================================
        // ORDENAR
        // ==================================================

        lista.sort(
            (
                a,
                b
            ) => {

                const aTexto =
                    `${a.data} ${a.inicio}`;


                const bTexto =
                    `${b.data} ${b.inicio}`;


                return (
                    aTexto.localeCompare(
                        bTexto
                    )
                );

            }
        );



        // ==================================================
        // CONTADOR
        // ==================================================

        quantidadeDisponibilidades
            .textContent =
            lista.length;



        // ==================================================
        // VAZIO
        // ==================================================

        if (
            lista.length === 0
        ) {

            disponibilidadesVazio
                .style
                .display =
                "block";


            return;

        }



        disponibilidadesVazio
            .style
            .display =
            "none";



        // ==================================================
        // CARDS
        // ==================================================

        lista.forEach(
            (horario) => {


                const card =
                    document.createElement(
                        "article"
                    );



                card.className =
                    `disp-horario-card ${horario.status}`;



                const origemTexto =
                    horario.origem ===
                    "mensal"
                        ? "Cadastro mensal"
                        : "Cadastro por dia";



                const statusTexto =
                    horario.status ===
                    "bloqueado"
                        ? "Bloqueado"
                        : "Disponível";



                const textoBotaoBloqueio =
                    horario.status ===
                    "bloqueado"
                        ? "Desbloquear"
                        : "Bloquear";



                card.innerHTML =
                `

                    <!-- DATA -->

                    <div class="disp-horario-data">

                        <span>
                            ${obterNomeDia(
                                horario.data
                            )}
                        </span>


                        <strong>
                            ${formatarData(
                                horario.data
                            )}
                        </strong>


                        <small>
                            ${origemTexto}
                        </small>

                    </div>



                    <!-- HORÁRIO -->

                    <div class="disp-horario-periodo">

                        <strong>

                            ${horario.inicio}
                            →
                            ${horario.fim}

                        </strong>


                        <span
                            class="
                                disp-status
                                ${horario.status}
                            "
                        >

                            ${statusTexto}

                        </span>

                    </div>



                    <!-- PREÇOS -->

                    <div class="disp-horario-precos">

                        ${montarPrecos(
                            horario
                        )}

                    </div>



                    <!-- AÇÕES -->

                    <div class="disp-horario-acoes">


                        <button
                            type="button"
                            data-acao="editar"
                            data-id="${horario.id}"
                        >
                            Editar
                        </button>



                        <button
                            type="button"
                            data-acao="bloquear"
                            data-id="${horario.id}"
                        >
                            ${textoBotaoBloqueio}
                        </button>



                        <button
                            type="button"
                            class="perigo"
                            data-acao="excluir"
                            data-id="${horario.id}"
                        >
                            Excluir
                        </button>

                    </div>

                `;



                listaDisponibilidades
                    .appendChild(
                        card
                    );

            }
        );

    }



    // ==================================================
    // EVENTOS DOS CARDS
    // ==================================================

    listaDisponibilidades.addEventListener(
        "click",
        (event) => {

            const botao =
                event.target.closest(
                    "button[data-acao]"
                );


            if (!botao) {

                return;

            }



            const id =
                botao.dataset.id;


            const acao =
                botao.dataset.acao;



            if (
                acao ===
                "editar"
            ) {

                editarHorario(
                    id
                );

            }



            if (
                acao ===
                "bloquear"
            ) {

                alternarBloqueio(
                    id
                );

            }



            if (
                acao ===
                "excluir"
            ) {

                excluirHorario(
                    id
                );

            }

        }
    );



    // ==================================================
    // FILTRO DATA
    // ==================================================

    filtroData.addEventListener(
        "change",
        () => {

            renderizarLista();

        }
    );



    // ==================================================
    // FILTRO MÊS
    // ==================================================

    filtroMes.addEventListener(
        "change",
        () => {

            renderizarLista();

        }
    );



    // ==================================================
    // LIMPAR FILTROS
    // ==================================================

    btnLimparFiltros.addEventListener(
        "click",
        () => {

            filtroData.value =
                "";


            filtroMes.value =
                "";


            renderizarLista();

        }
    );



    // ==================================================
    // INICIALIZAÇÃO
    // ==================================================

    function iniciar() {


        // DATA DE HOJE

        cadastroDiaData.value =
            obterDataHoje();



        // MÊS ATUAL

        cadastroMesReferencia.value =
            obterMesAtual();



        // PRIMEIRO HORÁRIO DO CADASTRO DIÁRIO

        adicionarFaixa(
            listaFaixasDia
        );



        /*
            SALVA NOVAMENTE PARA CONVERTER
            EVENTUAIS HORÁRIOS DA VERSÃO
            ANTIGA PARA A NOVA ESTRUTURA.
        */

        salvarHorarios();



        // LISTAR

        renderizarLista();

    }



    iniciar();


})();