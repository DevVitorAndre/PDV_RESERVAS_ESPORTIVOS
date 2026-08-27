// ======================================================
// LA CANCHA FUT 7
// PDV / CAIXA - COMANDAS
// ======================================================

(() => {

    // ==================================================
    // STORAGE
    // ==================================================

    const STORAGE_PRODUTOS =
        "produtosLaCancha";

    const STORAGE_COMANDAS =
        "comandasLaCancha";

    const STORAGE_VENDAS =
        "vendasLaCancha";

    const STORAGE_PAGAMENTOS =
        "pagamentosPdvLaCancha";

    const STORAGE_ESTOQUE =
        "movimentacoesEstoqueLaCancha";

    const STORAGE_FINANCEIRO =
        "movimentosFinanceirosLaCancha";

    const STORAGE_FISCAL =
        "fiscalLaCancha";


    // ==================================================
    // IMAGENS DAS CATEGORIAS
    // ==================================================

    const imagensCategoria = {

        bebidas:
            "../img/produtos/bebida.png",

        alimentos:
            "../img/produtos/alimento.png",

        doces:
            "../img/produtos/doce.png",

        esportivo:
            "../img/produtos/esportivo.png",

        servico:
            "../img/produtos/servico.png",

        outros:
            "../img/produtos/servico.png"

    };


    function imagemCategoria(
        categoria
    ) {

        return (
            imagensCategoria[categoria] ||
            imagensCategoria.outros
        );

    }


    // ==================================================
    // ESTADO
    // ==================================================

    let comandaAtualId =
        null;

    let formaPagamento =
        "pix";

    let timerObservacao =
        null;


    // ==================================================
    // ELEMENTOS - INDICADORES
    // ==================================================

    const abertasEl =
        document.getElementById(
            "pdvComandasAbertas"
        );

    const fechadasHojeEl =
        document.getElementById(
            "pdvFechadasHoje"
        );

    const fiscalPendenteEl =
        document.getElementById(
            "pdvFiscalPendente"
        );

    const quantidadeAbertasEl =
        document.getElementById(
            "pdvQuantidadeAbertas"
        );


    // ==================================================
    // ELEMENTOS - MURAL / HISTÓRICO
    // ==================================================

    const muralEl =
        document.getElementById(
            "pdvMural"
        );

    const vazioEl =
        document.getElementById(
            "pdvVazio"
        );

    const historicoEl =
        document.getElementById(
            "pdvHistorico"
        );

    const historicoVazioEl =
        document.getElementById(
            "pdvHistoricoVazio"
        );

    const painelAbertas =
        document.getElementById(
            "painelComandasAbertas"
        );

    const painelHistorico =
        document.getElementById(
            "painelHistoricoComandas"
        );

    const btnAbaAbertas =
        document.getElementById(
            "btnAbaAbertas"
        );

    const btnAbaHistorico =
        document.getElementById(
            "btnAbaHistorico"
        );


    // ==================================================
    // ELEMENTOS - NOVA COMANDA
    // ==================================================

    const btnNovaComanda =
        document.getElementById(
            "btnNovaComanda"
        );

    const modalNovaComanda =
        document.getElementById(
            "modalNovaComanda"
        );

    const formNovaComanda =
        document.getElementById(
            "formNovaComanda"
        );

    const novaComandaNome =
        document.getElementById(
            "novaComandaNome"
        );

    const novaComandaObservacao =
        document.getElementById(
            "novaComandaObservacao"
        );

    const novaComandaErro =
        document.getElementById(
            "novaComandaErro"
        );

    const btnFecharNovaComanda =
        document.getElementById(
            "btnFecharNovaComanda"
        );

    const btnCancelarNovaComanda =
        document.getElementById(
            "btnCancelarNovaComanda"
        );


    // ==================================================
    // ELEMENTOS - COMANDA
    // ==================================================

    const modalComanda =
        document.getElementById(
            "modalComanda"
        );

    const comandaTitulo =
        document.getElementById(
            "comandaTitulo"
        );

    const comandaNumero =
        document.getElementById(
            "comandaNumero"
        );

    const comandaObservacao =
        document.getElementById(
            "comandaObservacao"
        );

    const comandaItens =
        document.getElementById(
            "comandaItens"
        );

    const comandaSemItens =
        document.getElementById(
            "comandaSemItens"
        );

    const comandaTotal =
        document.getElementById(
            "comandaTotal"
        );

    const btnAdicionarProduto =
        document.getElementById(
            "btnAdicionarProduto"
        );

    const btnFecharComandaModal =
        document.getElementById(
            "btnFecharComandaModal"
        );

    const btnVoltarComanda =
        document.getElementById(
            "btnVoltarComanda"
        );

    const btnIrPagamento =
        document.getElementById(
            "btnIrPagamento"
        );


    // ==================================================
    // ELEMENTOS - PRODUTOS
    // ==================================================

    const modalProdutos =
        document.getElementById(
            "modalProdutos"
        );

    const btnFecharProdutos =
        document.getElementById(
            "btnFecharProdutos"
        );

    const buscaProdutoPdv =
        document.getElementById(
            "buscaProdutoPdv"
        );

    const produtosLista =
        document.getElementById(
            "pdvProdutosLista"
        );

    const produtosVazio =
        document.getElementById(
            "pdvProdutosVazio"
        );


    // ==================================================
    // ELEMENTOS - PAGAMENTO
    // ==================================================

    const modalPagamento =
        document.getElementById(
            "modalPagamento"
        );

    const pagamentoNome =
        document.getElementById(
            "pagamentoComandaNome"
        );

    const pagamentoTotal =
        document.getElementById(
            "pagamentoComandaTotal"
        );

    const pagamentoErro =
        document.getElementById(
            "pagamentoErro"
        );

    const btnConfirmarPagamento =
        document.getElementById(
            "btnConfirmarPagamento"
        );

    const btnFecharPagamento =
        document.getElementById(
            "btnFecharPagamento"
        );

    const btnCancelarPagamento =
        document.getElementById(
            "btnCancelarPagamento"
        );

    const botoesPagamento =
        document.querySelectorAll(
            ".pdv-formas-pagamento button"
        );


    // ==================================================
    // TOAST
    // ==================================================

    const toast =
        document.getElementById(
            "pdvToast"
        );


    // ==================================================
    // LOCAL STORAGE
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


    function salvarLista(
        chave,
        dados
    ) {

        localStorage.setItem(
            chave,
            JSON.stringify(
                dados
            )
        );

    }


    // ==================================================
    // UTILITÁRIOS
    // ==================================================

    function gerarId() {

        if (
            window.crypto &&
            typeof window.crypto.randomUUID ===
            "function"
        ) {

            return window.crypto
                .randomUUID();

        }


        return (
            Date.now().toString() +
            "-" +
            Math.random()
                .toString(16)
                .slice(2)
        );

    }


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


    function horario(
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
            .toLocaleTimeString(
                "pt-BR",
                {
                    hour:
                        "2-digit",

                    minute:
                        "2-digit"
                }
            );

    }


    function dataHora(
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
                "pt-BR"
            );

    }


    function dataLocalISO(
        data = new Date()
    ) {

        const objeto =
            data instanceof Date
                ? data
                : new Date(data);


        const ano =
            objeto.getFullYear();


        const mes =
            String(
                objeto.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const dia =
            String(
                objeto.getDate()
            ).padStart(
                2,
                "0"
            );


        return (
            `${ano}-${mes}-${dia}`
        );

    }


    function mostrarToast(
        mensagem
    ) {

        if (!toast) {

            return;

        }


        toast.textContent =
            mensagem;


        toast.classList.add(
            "mostrar"
        );


        setTimeout(
            () => {

                toast.classList.remove(
                    "mostrar"
                );

            },
            2800
        );

    }


    // ==================================================
    // PRODUTO OU SERVIÇO
    // ==================================================

    function produtoControlaEstoque(
        produto
    ) {

        /*
            PRODUTOS NOVOS JÁ TERÃO
            controlaEstoque TRUE/FALSE.

            PARA OS PRODUTOS ANTIGOS,
            USAMOS A CATEGORIA COMO FALLBACK.
        */

        if (
            typeof produto?.controlaEstoque ===
            "boolean"
        ) {

            return produto.controlaEstoque;

        }


        return (
            produto?.categoria !==
            "servico"
        );

    }


    function tipoItemProduto(
        produto
    ) {

        if (
            produto?.tipoItem
        ) {

            return produto.tipoItem;

        }


        return produtoControlaEstoque(
            produto
        )
            ? "produto"
            : "servico";

    }


    // ==================================================
    // NÚMERO DA COMANDA
    // ==================================================

    function gerarNumeroComanda(
        comandas
    ) {

        let maior =
            0;


        comandas.forEach(
            comanda => {

                const numero =
                    Number(
                        comanda.numero ||
                        0
                    );


                if (
                    numero >
                    maior
                ) {

                    maior =
                        numero;

                }

            }
        );


        return (
            maior + 1
        );

    }


    function numeroFormatado(
        numero
    ) {

        return (
            "#" +
            String(
                numero
            ).padStart(
                4,
                "0"
            )
        );

    }


    // ==================================================
    // TOTAL DA COMANDA
    // ==================================================

    function calcularTotal(
        comanda
    ) {

        return (
            comanda?.itens ||
            []
        ).reduce(
            (
                total,
                item
            ) => {

                return (
                    total +
                    (
                        Number(
                            item.precoUnitario ||
                            0
                        )
                        *
                        Number(
                            item.quantidade ||
                            0
                        )
                    )
                );

            },
            0
        );

    }


    // ==================================================
    // BUSCAR COMANDA
    // ==================================================

    function buscarComanda(
        id
    ) {

        return carregarLista(
            STORAGE_COMANDAS
        ).find(
            comanda =>
                comanda.id ===
                id
        ) || null;

    }


    // ==================================================
    // SALVAR COMANDA
    // ==================================================

    function atualizarComanda(
        comanda
    ) {

        const comandas =
            carregarLista(
                STORAGE_COMANDAS
            );


        const indice =
            comandas.findIndex(
                item =>
                    item.id ===
                    comanda.id
            );


        if (
            indice ===
            -1
        ) {

            return false;

        }


        comanda.total =
            calcularTotal(
                comanda
            );


        comanda.atualizadoEm =
            new Date()
                .toISOString();


        comandas[indice] =
            comanda;


        salvarLista(
            STORAGE_COMANDAS,
            comandas
        );


        return true;

    }


    // ==================================================
    // QUANTIDADE COMPROMETIDA
    // ==================================================

    function quantidadeComprometida(
        produtoId
    ) {

        const produtos =
            carregarLista(
                STORAGE_PRODUTOS
            );


        const produto =
            produtos.find(
                item =>
                    item.id ===
                    produtoId
            );


        /*
            SERVIÇOS NÃO POSSUEM
            ESTOQUE COMPROMETIDO.
        */

        if (
            produto &&
            !produtoControlaEstoque(
                produto
            )
        ) {

            return 0;

        }


        const comandas =
            carregarLista(
                STORAGE_COMANDAS
            );


        return comandas
            .filter(
                comanda =>
                    comanda.status ===
                    "aberta"
            )
            .reduce(
                (
                    total,
                    comanda
                ) => {

                    const item =
                        (
                            comanda.itens ||
                            []
                        ).find(
                            item =>
                                item.produtoId ===
                                produtoId
                        );


                    return (
                        total +
                        Number(
                            item?.quantidade ||
                            0
                        )
                    );

                },
                0
            );

    }


    // ==================================================
    // NOVA COMANDA
    // ==================================================

    function abrirModalNova() {

        formNovaComanda.reset();


        novaComandaErro.textContent =
            "";


        modalNovaComanda
            .classList
            .add(
                "aberto"
            );


        setTimeout(
            () => {

                novaComandaNome.focus();

            },
            100
        );

    }


    function fecharModalNova() {

        modalNovaComanda
            .classList
            .remove(
                "aberto"
            );

    }


    formNovaComanda
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const nome =
                    novaComandaNome
                        .value
                        .trim();


                if (!nome) {

                    novaComandaErro
                        .textContent =
                        "Informe um nome para a comanda.";

                    return;

                }


                const comandas =
                    carregarLista(
                        STORAGE_COMANDAS
                    );


                const agora =
                    new Date()
                        .toISOString();


                const nova =
                {

                    id:
                        gerarId(),

                    numero:
                        gerarNumeroComanda(
                            comandas
                        ),

                    nome,

                    observacao:
                        novaComandaObservacao
                            .value
                            .trim(),

                    status:
                        "aberta",

                    itens:
                        [],

                    total:
                        0,

                    abertoEm:
                        agora,

                    atualizadoEm:
                        agora,

                    fechadoEm:
                        null,

                    vendaId:
                        null
                };


                comandas.push(
                    nova
                );


                salvarLista(
                    STORAGE_COMANDAS,
                    comandas
                );


                fecharModalNova();


                renderizar();


                abrirComanda(
                    nova.id
                );


                mostrarToast(
                    "Comanda aberta."
                );

            }
        );


    // ==================================================
    // ABRIR COMANDA
    // ==================================================

    function abrirComanda(
        id
    ) {

        const comanda =
            buscarComanda(
                id
            );


        if (
            !comanda ||
            comanda.status !==
            "aberta"
        ) {

            return;

        }


        comandaAtualId =
            id;


        comandaTitulo.textContent =
            comanda.nome;


        comandaNumero.textContent =
            (
                `${numeroFormatado(
                    comanda.numero
                )} • aberta às ${horario(
                    comanda.abertoEm
                )}`
            );


        comandaObservacao.value =
            comanda.observacao ||
            "";


        renderizarItensComanda();


        modalComanda
            .classList
            .add(
                "aberto"
            );

    }


    function fecharModalComanda() {

        modalComanda
            .classList
            .remove(
                "aberto"
            );


        comandaAtualId =
            null;


        renderizar();

    }


    // ==================================================
    // OBSERVAÇÃO AUTOMÁTICA
    // ==================================================

    comandaObservacao
        .addEventListener(
            "input",
            () => {

                clearTimeout(
                    timerObservacao
                );


                timerObservacao =
                    setTimeout(
                        () => {

                            if (
                                !comandaAtualId
                            ) {

                                return;

                            }


                            const comanda =
                                buscarComanda(
                                    comandaAtualId
                                );


                            if (!comanda) {

                                return;

                            }


                            comanda.observacao =
                                comandaObservacao
                                    .value
                                    .trim();


                            atualizarComanda(
                                comanda
                            );


                            renderizar();

                        },
                        400
                    );

            }
        );


    // ==================================================
    // ITENS DA COMANDA
    // ==================================================

    function renderizarItensComanda() {

        const comanda =
            buscarComanda(
                comandaAtualId
            );


        if (!comanda) {

            return;

        }


        const itens =
            comanda.itens ||
            [];


        comandaItens.innerHTML =
            "";


        if (
            itens.length ===
            0
        ) {

            comandaItens.style.display =
                "none";

            comandaSemItens.style.display =
                "block";

        } else {

            comandaItens.style.display =
                "flex";

            comandaSemItens.style.display =
                "none";

        }


        itens.forEach(
            item => {

                const subtotal =
                    Number(
                        item.precoUnitario ||
                        0
                    )
                    *
                    Number(
                        item.quantidade ||
                        0
                    );


                const linha =
                    document.createElement(
                        "div"
                    );


                linha.className =
                    "pdv-item";


                const etiqueta =
                    item.tipoItem ===
                    "servico"
                        ? "Serviço"
                        : `${moeda(
                            item.precoUnitario
                        )} cada`;


                linha.innerHTML = `

                    <div class="pdv-item-info">

                        <strong>
                            ${escaparHTML(
                                item.nome
                            )}
                        </strong>

                        <span>
                            ${escaparHTML(
                                etiqueta
                            )}
                        </span>

                    </div>


                    <div class="pdv-item-qtd">

                        <button
                            type="button"
                            class="menos"
                        >
                            −
                        </button>


                        <strong>
                            ${Number(
                                item.quantidade ||
                                0
                            )}
                        </strong>


                        <button
                            type="button"
                            class="mais"
                        >
                            +
                        </button>

                    </div>


                    <strong class="pdv-item-subtotal">

                        ${moeda(
                            subtotal
                        )}

                    </strong>


                    <button
                        type="button"
                        class="pdv-item-remover"
                        title="Remover"
                    >
                        ✕
                    </button>

                `;


                linha
                    .querySelector(
                        ".menos"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            alterarQuantidade(
                                item.produtoId,
                                -1
                            );

                        }
                    );


                linha
                    .querySelector(
                        ".mais"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            alterarQuantidade(
                                item.produtoId,
                                1
                            );

                        }
                    );


                linha
                    .querySelector(
                        ".pdv-item-remover"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            removerProduto(
                                item.produtoId
                            );

                        }
                    );


                comandaItens.appendChild(
                    linha
                );

            }
        );


        comandaTotal.textContent =
            moeda(
                calcularTotal(
                    comanda
                )
            );

    }


    // ==================================================
    // ABRIR PRODUTOS
    // ==================================================

    function abrirProdutos() {

        buscaProdutoPdv.value =
            "";


        renderizarProdutos();


        modalProdutos
            .classList
            .add(
                "aberto"
            );


        setTimeout(
            () => {

                buscaProdutoPdv.focus();

            },
            100
        );

    }


    function fecharProdutos() {

        modalProdutos
            .classList
            .remove(
                "aberto"
            );

    }


    // ==================================================
    // RENDERIZAR PRODUTOS / SERVIÇOS
    // ==================================================

    function renderizarProdutos() {

        const produtos =
            carregarLista(
                STORAGE_PRODUTOS
            )
            .filter(
                produto =>
                    produto.status ===
                    "ativo"
            );


        const termo =
            buscaProdutoPdv
                .value
                .trim()
                .toLowerCase();


        const filtrados =
            produtos.filter(
                produto => {

                    const texto =
                        (
                            `${produto.nome || ""} ` +
                            `${produto.codigo || ""} ` +
                            `${produto.categoria || ""}`
                        )
                        .toLowerCase();


                    return (
                        !termo ||
                        texto.includes(
                            termo
                        )
                    );

                }
            );


        produtosLista.innerHTML =
            "";


        if (
            filtrados.length ===
            0
        ) {

            produtosLista.style.display =
                "none";

            produtosVazio.style.display =
                "block";

            return;

        }


        produtosLista.style.display =
            "grid";

        produtosVazio.style.display =
            "none";


        filtrados.forEach(
            produto => {

                const controlaEstoque =
                    produtoControlaEstoque(
                        produto
                    );


                const estoque =
                    Number(
                        produto.estoque ||
                        0
                    );


                const comprometido =
                    controlaEstoque
                        ? quantidadeComprometida(
                            produto.id
                        )
                        : 0;


                const disponivel =
                    controlaEstoque
                        ? Math.max(
                            0,
                            estoque -
                            comprometido
                        )
                        : Infinity;


                const card =
                    document.createElement(
                        "button"
                    );


                card.type =
                    "button";


                card.className =
                    "pdv-produto-card";


                if (
                    controlaEstoque &&
                    disponivel <=
                    0
                ) {

                    card.disabled =
                        true;

                }


                card.innerHTML = `

                    <div class="pdv-produto-identidade">

                        <div class="pdv-produto-imagem">

                            <img
                                src="${imagemCategoria(
                                    produto.categoria
                                )}"
                                alt="${escaparHTML(
                                    produto.nome
                                )}"
                            >

                        </div>


                        <div>

                            <strong>
                                ${escaparHTML(
                                    produto.nome
                                )}
                            </strong>


                            <span>

                                ${
                                    controlaEstoque

                                        ? escaparHTML(
                                            produto.codigo ||
                                            "Sem código"
                                        )

                                        : "Serviço"
                                }

                            </span>

                        </div>

                    </div>


                    <div>

                        <strong>
                            ${moeda(
                                produto.precoVenda
                            )}
                        </strong>


                        <span>

                            ${
                                controlaEstoque

                                    ? (
                                        disponivel > 0
                                            ? `${disponivel} disponível`
                                            : "Indisponível"
                                    )

                                    : "Disponível"
                            }

                        </span>

                    </div>

                `;


                if (
                    !controlaEstoque ||
                    disponivel >
                    0
                ) {

                    card.addEventListener(
                        "click",
                        () => {

                            adicionarProduto(
                                produto
                            );

                        }
                    );

                }


                produtosLista.appendChild(
                    card
                );

            }
        );

    }


    // ==================================================
    // ADICIONAR PRODUTO / SERVIÇO
    // ==================================================

    function adicionarProduto(
        produto
    ) {

        const comanda =
            buscarComanda(
                comandaAtualId
            );


        if (!comanda) {

            return;

        }


        const controlaEstoque =
            produtoControlaEstoque(
                produto
            );


        // ==============================================
        // VALIDA ESTOQUE SOMENTE PRODUTO FÍSICO
        // ==============================================

        if (
            controlaEstoque
        ) {

            const estoque =
                Number(
                    produto.estoque ||
                    0
                );


            const comprometido =
                quantidadeComprometida(
                    produto.id
                );


            if (
                comprometido >=
                estoque
            ) {

                mostrarToast(
                    "Produto sem estoque disponível."
                );


                renderizarProdutos();


                return;

            }

        }


        const existente =
            (
                comanda.itens ||
                []
            ).find(
                item =>
                    item.produtoId ===
                    produto.id
            );


        if (
            existente
        ) {

            existente.quantidade +=
                1;

        } else {

            comanda.itens.push(
                {

                    produtoId:
                        produto.id,

                    nome:
                        produto.nome,

                    categoria:
                        produto.categoria,

                    tipoItem:
                        tipoItemProduto(
                            produto
                        ),

                    subtipo:
                        produto.subtipo ||
                        null,

                    controlaEstoque,

                    precoUnitario:
                        Number(
                            produto.precoVenda ||
                            0
                        ),

                    quantidade:
                        1

                }
            );

        }


        atualizarComanda(
            comanda
        );


        renderizarItensComanda();

        renderizarProdutos();

        renderizar();


        mostrarToast(
            controlaEstoque
                ? "Produto adicionado."
                : "Serviço adicionado."
        );

    }


    // ==================================================
    // ALTERAR QUANTIDADE
    // ==================================================

    function alterarQuantidade(
        produtoId,
        diferenca
    ) {

        const comanda =
            buscarComanda(
                comandaAtualId
            );


        if (!comanda) {

            return;

        }


        const item =
            (
                comanda.itens ||
                []
            ).find(
                item =>
                    item.produtoId ===
                    produtoId
            );


        if (!item) {

            return;

        }


        // ==============================================
        // BOTÃO +
        // ==============================================

        if (
            diferenca >
            0
        ) {

            const produto =
                carregarLista(
                    STORAGE_PRODUTOS
                ).find(
                    produto =>
                        produto.id ===
                        produtoId
                );


            if (!produto) {

                mostrarToast(
                    "Item não encontrado."
                );

                return;

            }


            const controlaEstoque =
                produtoControlaEstoque(
                    produto
                );


            /*
                SERVIÇO NÃO VALIDA ESTOQUE.
            */

            if (
                controlaEstoque
            ) {

                const estoque =
                    Number(
                        produto.estoque ||
                        0
                    );


                const comprometido =
                    quantidadeComprometida(
                        produtoId
                    );


                if (
                    comprometido >=
                    estoque
                ) {

                    mostrarToast(
                        "Não há mais estoque disponível."
                    );

                    return;

                }

            }

        }


        item.quantidade +=
            diferenca;


        if (
            item.quantidade <=
            0
        ) {

            comanda.itens =
                comanda.itens.filter(
                    item =>
                        item.produtoId !==
                        produtoId
                );

        }


        atualizarComanda(
            comanda
        );


        renderizarItensComanda();

        renderizar();

    }


    // ==================================================
    // REMOVER ITEM
    // ==================================================

    function removerProduto(
        produtoId
    ) {

        const comanda =
            buscarComanda(
                comandaAtualId
            );


        if (!comanda) {

            return;

        }


        comanda.itens =
            (
                comanda.itens ||
                []
            ).filter(
                item =>
                    item.produtoId !==
                    produtoId
            );


        atualizarComanda(
            comanda
        );


        renderizarItensComanda();

        renderizar();

    }


    // ==================================================
    // PAGAMENTO
    // ==================================================

    function abrirPagamento() {

        const comanda =
            buscarComanda(
                comandaAtualId
            );


        if (!comanda) {

            return;

        }


        if (
            !Array.isArray(
                comanda.itens
            ) ||
            comanda.itens.length ===
            0
        ) {

            mostrarToast(
                "Adicione pelo menos um item."
            );

            return;

        }


        const total =
            calcularTotal(
                comanda
            );


        if (
            total <=
            0
        ) {

            mostrarToast(
                "O total da comanda é inválido."
            );

            return;

        }


        pagamentoErro.textContent =
            "";


        formaPagamento =
            "pix";


        botoesPagamento.forEach(
            botao => {

                botao.classList.toggle(
                    "ativo",
                    botao.dataset.forma ===
                    "pix"
                );

            }
        );


        pagamentoNome.textContent =
            (
                `${numeroFormatado(
                    comanda.numero
                )} • ${comanda.nome}`
            );


        pagamentoTotal.textContent =
            moeda(
                total
            );


        modalPagamento
            .classList
            .add(
                "aberto"
            );

    }


    function fecharPagamento() {

        modalPagamento
            .classList
            .remove(
                "aberto"
            );

    }


    botoesPagamento.forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    formaPagamento =
                        botao.dataset.forma;


                    botoesPagamento.forEach(
                        outro => {

                            outro.classList.toggle(
                                "ativo",
                                outro ===
                                botao
                            );

                        }
                    );

                }
            );

        }
    );


    // ==================================================
    // FINALIZAR VENDA
    // ==================================================

    function finalizarVenda() {

        pagamentoErro.textContent =
            "";


        const comanda =
            buscarComanda(
                comandaAtualId
            );


        if (
            !comanda ||
            comanda.status !==
            "aberta"
        ) {

            pagamentoErro.textContent =
                "Comanda não encontrada.";

            return;

        }


        if (
            !Array.isArray(
                comanda.itens
            ) ||
            comanda.itens.length ===
            0
        ) {

            pagamentoErro.textContent =
                "A comanda não possui itens.";

            return;

        }


        const produtos =
            carregarLista(
                STORAGE_PRODUTOS
            );


        // ==================================================
        // REVALIDAR ITENS
        // ==================================================

        for (
            const item
            of comanda.itens
        ) {

            const produto =
                produtos.find(
                    produto =>
                        produto.id ===
                        item.produtoId
                );


            if (!produto) {

                pagamentoErro.textContent =
                    `O item ${item.nome} não existe mais.`;

                return;

            }


            if (
                produto.status !==
                "ativo"
            ) {

                pagamentoErro.textContent =
                    `O item ${item.nome} está inativo.`;

                return;

            }


            /*
                SOMENTE MERCADORIA
                PRECISA TER ESTOQUE.
            */

            if (
                produtoControlaEstoque(
                    produto
                )
                &&
                Number(
                    produto.estoque ||
                    0
                )
                <
                Number(
                    item.quantidade ||
                    0
                )
            ) {

                pagamentoErro.textContent =
                    `Estoque insuficiente para ${item.nome}.`;

                return;

            }

        }


        const agora =
            new Date()
                .toISOString();


        const total =
            calcularTotal(
                comanda
            );


        if (
            total <=
            0
        ) {

            pagamentoErro.textContent =
                "O valor da comanda é inválido.";

            return;

        }


        const vendaId =
            gerarId();


        // ==================================================
        // BAIXAR ESTOQUE
        // ==================================================

        const movimentacoes =
            carregarLista(
                STORAGE_ESTOQUE
            );


        comanda.itens.forEach(
            item => {

                const indice =
                    produtos.findIndex(
                        produto =>
                            produto.id ===
                            item.produtoId
                    );


                if (
                    indice ===
                    -1
                ) {

                    return;

                }


                const produto =
                    produtos[indice];


                /*
                    SERVIÇOS ENTRAM NA VENDA,
                    MAS NÃO POSSUEM ESTOQUE.
                */

                if (
                    !produtoControlaEstoque(
                        produto
                    )
                ) {

                    return;

                }


                const anterior =
                    Number(
                        produto.estoque ||
                        0
                    );


                const atual =
                    anterior -
                    Number(
                        item.quantidade ||
                        0
                    );


                produto.estoque =
                    atual;


                produto.atualizadoEm =
                    agora;


                movimentacoes.push(
                    {

                        id:
                            gerarId(),

                        produtoId:
                            item.produtoId,

                        tipo:
                            "saida",

                        quantidade:
                            Number(
                                item.quantidade ||
                                0
                            ),

                        estoqueAnterior:
                            anterior,

                        estoqueAtual:
                            atual,

                        origem:
                            "pdv",

                        vendaId,

                        comandaId:
                            comanda.id,

                        observacao:
                            `Venda ${numeroFormatado(
                                comanda.numero
                            )}`,

                        criadoEm:
                            agora

                    }
                );

            }
        );


        salvarLista(
            STORAGE_PRODUTOS,
            produtos
        );


        salvarLista(
            STORAGE_ESTOQUE,
            movimentacoes
        );


        // ==================================================
        // VENDA
        // ==================================================

        const vendas =
            carregarLista(
                STORAGE_VENDAS
            );


        const novaVenda =
        {

            id:
                vendaId,

            comandaId:
                comanda.id,

            numeroComanda:
                comanda.numero,

            nomeComanda:
                comanda.nome,

            observacao:
                comanda.observacao ||
                "",

            itens:
                comanda.itens.map(
                    item => ({
                        ...item
                    })
                ),

            total,

            formaPagamento,

            status:
                "paga",

            criadoEm:
                agora,

            pagoEm:
                agora

        };


        vendas.push(
            novaVenda
        );


        salvarLista(
            STORAGE_VENDAS,
            vendas
        );


        // ==================================================
        // PAGAMENTO
        // ==================================================

        const pagamentos =
            carregarLista(
                STORAGE_PAGAMENTOS
            );


        const pagamentoId =
            gerarId();


        pagamentos.push(
            {

                id:
                    pagamentoId,

                vendaId,

                comandaId:
                    comanda.id,

                valor:
                    total,

                forma:
                    formaPagamento,

                status:
                    "aprovado",

                pagoEm:
                    agora

            }
        );


        salvarLista(
            STORAGE_PAGAMENTOS,
            pagamentos
        );


        // ==================================================
        // FINANCEIRO
        // ==================================================

        const financeiro =
            carregarLista(
                STORAGE_FINANCEIRO
            );


        financeiro.push(
            {

                id:
                    gerarId(),

                tipo:
                    "entrada",

                origem:
                    "pdv",

                categoria:
                    "venda_pdv",

                referenciaId:
                    vendaId,

                vendaId,

                comandaId:
                    comanda.id,

                descricao:
                    (
                        `Venda ${numeroFormatado(
                            comanda.numero
                        )} - ${comanda.nome}`
                    ),

                valor:
                    total,

                formaPagamento,

                status:
                    "confirmado",

                criadoEm:
                    agora

            }
        );


        salvarLista(
            STORAGE_FINANCEIRO,
            financeiro
        );


        // ==================================================
        // FILA FISCAL
        // ==================================================

        /*
            IMPORTANTE:

            ESTE REGISTRO NÃO SIGNIFICA
            QUE UMA NOTA FOI EMITIDA.

            ELE SOMENTE REGISTRA QUE
            ESTA VENDA PRECISA SER
            PROCESSADA PELO MÓDULO
            FISCAL FUTURAMENTE.

            DEPOIS O BACKEND/API FISCAL
            DEFINIRÁ O DOCUMENTO CORRETO.
        */

        const fiscal =
            carregarLista(
                STORAGE_FISCAL
            );


        fiscal.push(
            {

                id:
                    gerarId(),

                origem:
                    "pdv",

                vendaId,

                comandaId:
                    comanda.id,

                numeroComanda:
                    comanda.numero,

                valor:
                    total,

                itens:
                    comanda.itens.map(
                        item => ({
                            produtoId:
                                item.produtoId,

                            nome:
                                item.nome,

                            categoria:
                                item.categoria,

                            tipoItem:
                                item.tipoItem,

                            subtipo:
                                item.subtipo ||
                                null,

                            quantidade:
                                Number(
                                    item.quantidade ||
                                    0
                                ),

                            valorUnitario:
                                Number(
                                    item.precoUnitario ||
                                    0
                                )
                        })
                    ),

                status:
                    "pendente_configuracao_fiscal",

                documentoTipo:
                    null,

                numeroNota:
                    null,

                serie:
                    null,

                chave:
                    null,

                xml:
                    null,

                pdf:
                    null,

                erro:
                    null,

                criadoEm:
                    agora

            }
        );


        salvarLista(
            STORAGE_FISCAL,
            fiscal
        );


        // ==================================================
        // FECHAR COMANDA
        // ==================================================

        const comandas =
            carregarLista(
                STORAGE_COMANDAS
            );


        const indiceComanda =
            comandas.findIndex(
                item =>
                    item.id ===
                    comanda.id
            );


        if (
            indiceComanda ===
            -1
        ) {

            /*
                NESTE PROTÓTIPO ESTE CASO
                NÃO DEVE ACONTECER.
            */

            pagamentoErro.textContent =
                "Erro ao localizar a comanda.";

            return;

        }


        comandas[indiceComanda].status =
            "fechada";


        comandas[indiceComanda].total =
            total;


        comandas[indiceComanda].formaPagamento =
            formaPagamento;


        comandas[indiceComanda].vendaId =
            vendaId;


        comandas[indiceComanda].fechadoEm =
            agora;


        comandas[indiceComanda].atualizadoEm =
            agora;


        salvarLista(
            STORAGE_COMANDAS,
            comandas
        );


        // ==================================================
        // FINALIZA INTERFACE
        // ==================================================

        fecharPagamento();


        modalComanda
            .classList
            .remove(
                "aberto"
            );


        comandaAtualId =
            null;


        renderizar();


        mostrarToast(
            "Pagamento aprovado. Comanda fechada."
        );

    }


    // ==================================================
    // RENDER MURAL
    // ==================================================

    function renderizarMural(
        comandas
    ) {

        const abertas =
            comandas
                .filter(
                    comanda =>
                        comanda.status ===
                        "aberta"
                )
                .sort(
                    (
                        a,
                        b
                    ) =>
                        new Date(
                            a.abertoEm
                        )
                        -
                        new Date(
                            b.abertoEm
                        )
                );


        muralEl.innerHTML =
            "";


        quantidadeAbertasEl.textContent =
            abertas.length ===
            1
                ? "1 comanda"
                : `${abertas.length} comandas`;


        if (
            abertas.length ===
            0
        ) {

            muralEl.style.display =
                "none";

            vazioEl.style.display =
                "block";

            return;

        }


        muralEl.style.display =
            "grid";

        vazioEl.style.display =
            "none";


        abertas.forEach(
            (
                comanda,
                indice
            ) => {

                const nota =
                    document.createElement(
                        "button"
                    );


                nota.type =
                    "button";


                nota.className =
                    (
                        "pdv-postit " +
                        `pdv-postit-${(indice % 4) + 1}`
                    );


                /*
                    COMO COMBINAMOS:
                    O MURAL NÃO MOSTRA VALORES.
                */

                nota.innerHTML = `

                    <span class="pdv-postit-numero">

                        ${numeroFormatado(
                            comanda.numero
                        )}

                    </span>


                    <strong>

                        ${escaparHTML(
                            comanda.nome
                        )}

                    </strong>


                    <small>

                        Aberta às
                        ${horario(
                            comanda.abertoEm
                        )}

                    </small>

                `;


                nota.addEventListener(
                    "click",
                    () => {

                        abrirComanda(
                            comanda.id
                        );

                    }
                );


                muralEl.appendChild(
                    nota
                );

            }
        );

    }


    // ==================================================
    // HISTÓRICO
    // ==================================================

    function renderizarHistorico(
        comandas
    ) {

        const fechadas =
            comandas
                .filter(
                    comanda =>
                        comanda.status ===
                        "fechada"
                )
                .sort(
                    (
                        a,
                        b
                    ) =>
                        new Date(
                            b.fechadoEm
                        )
                        -
                        new Date(
                            a.fechadoEm
                        )
                );


        historicoEl.innerHTML =
            "";


        if (
            fechadas.length ===
            0
        ) {

            historicoEl.style.display =
                "none";

            historicoVazioEl.style.display =
                "block";

            return;

        }


        historicoEl.style.display =
            "flex";

        historicoVazioEl.style.display =
            "none";


        fechadas.forEach(
            comanda => {

                const linha =
                    document.createElement(
                        "article"
                    );


                linha.className =
                    "pdv-historico-item";


                linha.innerHTML = `

                    <div>

                        <span>

                            ${numeroFormatado(
                                comanda.numero
                            )}

                        </span>


                        <strong>

                            ${escaparHTML(
                                comanda.nome
                            )}

                        </strong>


                        <small>

                            ${dataHora(
                                comanda.fechadoEm
                            )}

                        </small>

                    </div>


                    <div>

                        <span>
                            Pagamento
                        </span>


                        <strong>

                            ${escaparHTML(
                                String(
                                    comanda.formaPagamento ||
                                    "-"
                                ).toUpperCase()
                            )}

                        </strong>

                    </div>


                    <div>

                        <span>
                            Total
                        </span>


                        <strong>

                            ${moeda(
                                comanda.total
                            )}

                        </strong>

                    </div>


                    <span class="pdv-historico-status">
                        FECHADA
                    </span>

                `;


                historicoEl.appendChild(
                    linha
                );

            }
        );

    }


    // ==================================================
    // INDICADORES
    // ==================================================

    function renderizarIndicadores(
        comandas
    ) {

        const abertas =
            comandas.filter(
                comanda =>
                    comanda.status ===
                    "aberta"
            );


        const hoje =
            dataLocalISO();


        const fechadasHoje =
            comandas.filter(
                comanda => {

                    if (
                        comanda.status !==
                        "fechada" ||
                        !comanda.fechadoEm
                    ) {

                        return false;

                    }


                    return (
                        dataLocalISO(
                            comanda.fechadoEm
                        )
                        ===
                        hoje
                    );

                }
            );


        const fiscais =
            carregarLista(
                STORAGE_FISCAL
            );


        const pendentes =
            fiscais.filter(
                item =>
                    item.status !==
                    "emitida"
            );


        abertasEl.textContent =
            abertas.length;


        fechadasHojeEl.textContent =
            fechadasHoje.length;


        fiscalPendenteEl.textContent =
            pendentes.length;

    }


    // ==================================================
    // RENDER GERAL
    // ==================================================

    function renderizar() {

        const comandas =
            carregarLista(
                STORAGE_COMANDAS
            );


        renderizarIndicadores(
            comandas
        );


        renderizarMural(
            comandas
        );


        renderizarHistorico(
            comandas
        );

    }


    // ==================================================
    // ABAS
    // ==================================================

    btnAbaAbertas
        .addEventListener(
            "click",
            () => {

                btnAbaAbertas
                    .classList
                    .add(
                        "ativo"
                    );


                btnAbaHistorico
                    .classList
                    .remove(
                        "ativo"
                    );


                painelAbertas
                    .style
                    .display =
                    "block";


                painelHistorico
                    .style
                    .display =
                    "none";

            }
        );


    btnAbaHistorico
        .addEventListener(
            "click",
            () => {

                btnAbaHistorico
                    .classList
                    .add(
                        "ativo"
                    );


                btnAbaAbertas
                    .classList
                    .remove(
                        "ativo"
                    );


                painelAbertas
                    .style
                    .display =
                    "none";


                painelHistorico
                    .style
                    .display =
                    "block";

            }
        );


    // ==================================================
    // EVENTOS PRINCIPAIS
    // ==================================================

    btnNovaComanda
        .addEventListener(
            "click",
            abrirModalNova
        );


    btnFecharNovaComanda
        .addEventListener(
            "click",
            fecharModalNova
        );


    btnCancelarNovaComanda
        .addEventListener(
            "click",
            fecharModalNova
        );


    btnFecharComandaModal
        .addEventListener(
            "click",
            fecharModalComanda
        );


    btnVoltarComanda
        .addEventListener(
            "click",
            fecharModalComanda
        );


    btnAdicionarProduto
        .addEventListener(
            "click",
            abrirProdutos
        );


    btnFecharProdutos
        .addEventListener(
            "click",
            fecharProdutos
        );


    buscaProdutoPdv
        .addEventListener(
            "input",
            renderizarProdutos
        );


    btnIrPagamento
        .addEventListener(
            "click",
            abrirPagamento
        );


    btnFecharPagamento
        .addEventListener(
            "click",
            fecharPagamento
        );


    btnCancelarPagamento
        .addEventListener(
            "click",
            fecharPagamento
        );


    btnConfirmarPagamento
        .addEventListener(
            "click",
            finalizarVenda
        );


    // ==================================================
    // CLICAR FORA DOS MODAIS
    // ==================================================

    [
        [
            modalNovaComanda,
            fecharModalNova
        ],

        [
            modalProdutos,
            fecharProdutos
        ],

        [
            modalPagamento,
            fecharPagamento
        ]

    ].forEach(
        (
            [
                modal,
                fechar
            ]
        ) => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        modal
                    ) {

                        fechar();

                    }

                }
            );

        }
    );


    // ==================================================
    // ESC
    // ==================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            if (
                modalProdutos.classList.contains(
                    "aberto"
                )
            ) {

                fecharProdutos();

                return;

            }


            if (
                modalPagamento.classList.contains(
                    "aberto"
                )
            ) {

                fecharPagamento();

                return;

            }


            if (
                modalNovaComanda.classList.contains(
                    "aberto"
                )
            ) {

                fecharModalNova();

                return;

            }

        }
    );


    // ==================================================
    // INICIAR
    // ==================================================

    renderizar();


    console.log(
        "La Cancha: PDV / Comandas carregado."
    );

})();