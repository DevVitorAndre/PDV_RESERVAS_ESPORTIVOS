// ======================================================
// LA CANCHA FUT 7
// PRODUTOS + ESTOQUE
// ======================================================

(() => {

    // ==================================================
    // STORAGE
    // ==================================================

    const STORAGE_PRODUTOS =
        "produtosLaCancha";

    const STORAGE_MOVIMENTACOES =
        "movimentacoesEstoqueLaCancha";


    // ==================================================
    // ELEMENTOS
    // ==================================================

    const totalAtivosEl =
        document.getElementById(
            "produtoTotalAtivos"
        );

    const totalEstoqueEl =
        document.getElementById(
            "produtoTotalEstoque"
        );

    const estoqueBaixoEl =
        document.getElementById(
            "produtoEstoqueBaixo"
        );

    const valorEstoqueEl =
        document.getElementById(
            "produtoValorEstoque"
        );


    const buscaEl =
        document.getElementById(
            "produtoBusca"
        );

    const filtroStatusEl =
        document.getElementById(
            "produtoFiltroStatus"
        );

    const filtroEstoqueEl =
        document.getElementById(
            "produtoFiltroEstoque"
        );


    const quantidadeEl =
        document.getElementById(
            "produtoQuantidade"
        );

    const listaEl =
        document.getElementById(
            "produtoLista"
        );

    const vazioEl =
        document.getElementById(
            "produtoVazio"
        );


    // ==================================================
    // MODAL PRODUTO
    // ==================================================

    const produtoModal =
        document.getElementById(
            "produtoModal"
        );

    const produtoModalTitulo =
        document.getElementById(
            "produtoModalTitulo"
        );

    const produtoModalFechar =
        document.getElementById(
            "produtoModalFechar"
        );

    const btnNovoProduto =
        document.getElementById(
            "btnNovoProduto"
        );

    const btnCancelarProduto =
        document.getElementById(
            "btnCancelarProduto"
        );

    const produtoForm =
        document.getElementById(
            "produtoForm"
        );

    const produtoFormErro =
        document.getElementById(
            "produtoFormErro"
        );


    const produtoIdEl =
        document.getElementById(
            "produtoId"
        );

    const produtoNomeEl =
        document.getElementById(
            "produtoNome"
        );

    const produtoCategoriaEl =
        document.getElementById(
            "produtoCategoria"
        );

    const produtoCodigoEl =
        document.getElementById(
            "produtoCodigo"
        );

    const produtoCustoEl =
        document.getElementById(
            "produtoCusto"
        );

    const produtoVendaEl =
        document.getElementById(
            "produtoVenda"
        );

    const produtoEstoqueEl =
        document.getElementById(
            "produtoEstoque"
        );

    const produtoEstoqueMinimoEl =
        document.getElementById(
            "produtoEstoqueMinimo"
        );

    const produtoStatusEl =
        document.getElementById(
            "produtoStatus"
        );


    // ==================================================
    // MODAL ESTOQUE
    // ==================================================

    const estoqueModal =
        document.getElementById(
            "estoqueModal"
        );

    const estoqueModalFechar =
        document.getElementById(
            "estoqueModalFechar"
        );

    const btnCancelarEstoque =
        document.getElementById(
            "btnCancelarEstoque"
        );

    const estoqueForm =
        document.getElementById(
            "estoqueForm"
        );

    const estoqueFormErro =
        document.getElementById(
            "estoqueFormErro"
        );

    const estoqueProdutoInfo =
        document.getElementById(
            "estoqueProdutoInfo"
        );

    const estoqueProdutoIdEl =
        document.getElementById(
            "estoqueProdutoId"
        );

    const estoqueTipoEl =
        document.getElementById(
            "estoqueTipo"
        );

    const estoqueQuantidadeEl =
        document.getElementById(
            "estoqueQuantidade"
        );

    const estoqueObservacaoEl =
        document.getElementById(
            "estoqueObservacao"
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


    function nomeCategoria(
        categoria
    ) {

        const categorias =
        {
            bebidas:
                "Bebidas",

            alimentos:
                "Alimentos",

            doces:
                "Doces",

            esportivo:
                "Esportivo",

            outros:
                "Outros"
        };


        return (
            categorias[categoria] ||
            categoria ||
            "Outros"
        );

    }


    function estoqueBaixo(
        produto
    ) {

        return (
            Number(
                produto.estoque || 0
            )
            <=
            Number(
                produto.estoqueMinimo || 0
            )
        );

    }


    // ==================================================
    // PRODUTO NOVO
    // ==================================================

    function abrirNovoProduto() {

        produtoForm.reset();


        produtoIdEl.value =
            "";

        produtoEstoqueEl.value =
            0;

        produtoEstoqueMinimoEl.value =
            5;

        produtoStatusEl.value =
            "ativo";

        produtoCategoriaEl.value =
            "bebidas";


        produtoModalTitulo.textContent =
            "Novo produto";


        produtoFormErro.textContent =
            "";


        produtoModal.classList.add(
            "aberto"
        );


        setTimeout(
            () => {

                produtoNomeEl.focus();

            },
            100
        );

    }


    // ==================================================
    // EDITAR PRODUTO
    // ==================================================

    function abrirEditarProduto(
        produto
    ) {

        produtoIdEl.value =
            produto.id;

        produtoNomeEl.value =
            produto.nome || "";

        produtoCategoriaEl.value =
            produto.categoria ||
            "outros";

        produtoCodigoEl.value =
            produto.codigo || "";

        produtoCustoEl.value =
            Number(
                produto.custo || 0
            );

        produtoVendaEl.value =
            Number(
                produto.precoVenda || 0
            );

        produtoEstoqueEl.value =
            Number(
                produto.estoque || 0
            );

        produtoEstoqueMinimoEl.value =
            Number(
                produto.estoqueMinimo || 0
            );

        produtoStatusEl.value =
            produto.status ||
            "ativo";


        produtoModalTitulo.textContent =
            "Editar produto";


        produtoFormErro.textContent =
            "";


        produtoModal.classList.add(
            "aberto"
        );

    }


    function fecharProdutoModal() {

        produtoModal.classList.remove(
            "aberto"
        );

    }


    // ==================================================
    // SALVAR PRODUTO
    // ==================================================

    produtoForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            produtoFormErro.textContent =
                "";


            const id =
                produtoIdEl.value
                    .trim();


            const nome =
                produtoNomeEl.value
                    .trim();


            const categoria =
                produtoCategoriaEl.value;


            const codigo =
                produtoCodigoEl.value
                    .trim();


            const custo =
                Number(
                    produtoCustoEl.value ||
                    0
                );


            const precoVenda =
                Number(
                    produtoVendaEl.value ||
                    0
                );


            const estoque =
                Number(
                    produtoEstoqueEl.value ||
                    0
                );


            const estoqueMinimo =
                Number(
                    produtoEstoqueMinimoEl.value ||
                    0
                );


            const status =
                produtoStatusEl.value;


            if (!nome) {

                produtoFormErro.textContent =
                    "Informe o nome do produto.";

                return;

            }


            if (
                precoVenda <=
                0
            ) {

                produtoFormErro.textContent =
                    "Informe um preço de venda válido.";

                return;

            }


            if (
                custo < 0 ||
                estoque < 0 ||
                estoqueMinimo < 0
            ) {

                produtoFormErro.textContent =
                    "Os valores não podem ser negativos.";

                return;

            }


            const produtos =
                carregarLista(
                    STORAGE_PRODUTOS
                );


            // ==================================================
            // CÓDIGO DUPLICADO
            // ==================================================

            if (codigo) {

                const duplicado =
                    produtos.find(
                        produto =>
                            produto.codigo ===
                                codigo &&
                            produto.id !==
                                id
                    );


                if (duplicado) {

                    produtoFormErro.textContent =
                        "Já existe um produto com este código.";

                    return;

                }

            }


            // ==================================================
            // EDITAR
            // ==================================================

            if (id) {

                const indice =
                    produtos.findIndex(
                        produto =>
                            produto.id ===
                            id
                    );


                if (
                    indice === -1
                ) {

                    produtoFormErro.textContent =
                        "Produto não encontrado.";

                    return;

                }


                const estoqueAnterior =
                    Number(
                        produtos[indice]
                            .estoque ||
                        0
                    );


                produtos[indice] =
                {
                    ...produtos[indice],

                    nome,
                    categoria,
                    codigo,
                    custo,
                    precoVenda,
                    estoque,
                    estoqueMinimo,
                    status,

                    atualizadoEm:
                        new Date()
                            .toISOString()
                };


                /*
                    CASO O GERENTE ALTERE
                    O ESTOQUE DIRETAMENTE
                    NA EDIÇÃO, REGISTRAMOS
                    COMO AJUSTE.
                */

                if (
                    estoque !==
                    estoqueAnterior
                ) {

                    registrarMovimentacao(
                        {
                            produtoId:
                                id,

                            tipo:
                                estoque >
                                estoqueAnterior
                                    ? "entrada"
                                    : "saida",

                            quantidade:
                                Math.abs(
                                    estoque -
                                    estoqueAnterior
                                ),

                            estoqueAnterior,

                            estoqueAtual:
                                estoque,

                            origem:
                                "ajuste_manual",

                            observacao:
                                "Ajuste realizado na edição do produto"
                        }
                    );

                }

            }


            // ==================================================
            // NOVO
            // ==================================================

            else {

                const novoId =
                    gerarId();


                produtos.push(
                    {
                        id:
                            novoId,

                        nome,
                        categoria,
                        codigo,
                        custo,
                        precoVenda,
                        estoque,
                        estoqueMinimo,
                        status,

                        criadoEm:
                            new Date()
                                .toISOString(),

                        atualizadoEm:
                            null
                    }
                );


                if (
                    estoque >
                    0
                ) {

                    registrarMovimentacao(
                        {
                            produtoId:
                                novoId,

                            tipo:
                                "entrada",

                            quantidade:
                                estoque,

                            estoqueAnterior:
                                0,

                            estoqueAtual:
                                estoque,

                            origem:
                                "cadastro",

                            observacao:
                                "Estoque inicial do produto"
                        }
                    );

                }

            }


            salvarLista(
                STORAGE_PRODUTOS,
                produtos
            );


            fecharProdutoModal();

            renderizar();

        }
    );


    // ==================================================
    // MOVIMENTAÇÕES
    // ==================================================

    function registrarMovimentacao(
        dados
    ) {

        const movimentacoes =
            carregarLista(
                STORAGE_MOVIMENTACOES
            );


        movimentacoes.push(
            {
                id:
                    gerarId(),

                ...dados,

                criadoEm:
                    new Date()
                        .toISOString()
            }
        );


        salvarLista(
            STORAGE_MOVIMENTACOES,
            movimentacoes
        );

    }


    // ==================================================
    // ABRIR ESTOQUE
    // ==================================================

    function abrirEstoque(
        produto
    ) {

        estoqueForm.reset();


        estoqueProdutoIdEl.value =
            produto.id;


        estoqueTipoEl.value =
            "entrada";


        estoqueProdutoInfo.innerHTML = `

            <strong>
                ${escaparHTML(
                    produto.nome
                )}
            </strong>

            <span>
                Estoque atual:
                <b>
                    ${Number(
                        produto.estoque ||
                        0
                    )}
                </b>
            </span>

        `;


        estoqueFormErro.textContent =
            "";


        estoqueModal.classList.add(
            "aberto"
        );


        setTimeout(
            () => {

                estoqueQuantidadeEl.focus();

            },
            100
        );

    }


    function fecharEstoqueModal() {

        estoqueModal.classList.remove(
            "aberto"
        );

    }


    // ==================================================
    // SALVAR MOVIMENTAÇÃO
    // ==================================================

    estoqueForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            estoqueFormErro.textContent =
                "";


            const produtoId =
                estoqueProdutoIdEl.value;


            const tipo =
                estoqueTipoEl.value;


            const quantidade =
                Number(
                    estoqueQuantidadeEl.value ||
                    0
                );


            const observacao =
                estoqueObservacaoEl.value
                    .trim();


            if (
                quantidade <=
                0
            ) {

                estoqueFormErro.textContent =
                    "Informe uma quantidade válida.";

                return;

            }


            const produtos =
                carregarLista(
                    STORAGE_PRODUTOS
                );


            const indice =
                produtos.findIndex(
                    produto =>
                        produto.id ===
                        produtoId
                );


            if (
                indice === -1
            ) {

                estoqueFormErro.textContent =
                    "Produto não encontrado.";

                return;

            }


            const estoqueAnterior =
                Number(
                    produtos[indice]
                        .estoque ||
                    0
                );


            let estoqueAtual =
                estoqueAnterior;


            if (
                tipo ===
                "entrada"
            ) {

                estoqueAtual +=
                    quantidade;

            } else {

                if (
                    quantidade >
                    estoqueAnterior
                ) {

                    estoqueFormErro.textContent =
                        "A saída não pode ser maior que o estoque atual.";

                    return;

                }


                estoqueAtual -=
                    quantidade;

            }


            produtos[indice].estoque =
                estoqueAtual;


            produtos[indice].atualizadoEm =
                new Date()
                    .toISOString();


            salvarLista(
                STORAGE_PRODUTOS,
                produtos
            );


            registrarMovimentacao(
                {
                    produtoId,

                    tipo,

                    quantidade,

                    estoqueAnterior,

                    estoqueAtual,

                    origem:
                        "manual",

                    observacao:
                        observacao ||
                        (
                            tipo ===
                            "entrada"
                                ? "Entrada manual de estoque"
                                : "Saída manual de estoque"
                        )
                }
            );


            fecharEstoqueModal();

            renderizar();

        }
    );


    // ==================================================
    // ATIVAR / DESATIVAR
    // ==================================================

    function alternarStatus(
        produtoId
    ) {

        const produtos =
            carregarLista(
                STORAGE_PRODUTOS
            );


        const indice =
            produtos.findIndex(
                produto =>
                    produto.id ===
                    produtoId
            );


        if (
            indice === -1
        ) {
            return;
        }


        produtos[indice].status =
            produtos[indice].status ===
            "ativo"
                ? "inativo"
                : "ativo";


        produtos[indice].atualizadoEm =
            new Date()
                .toISOString();


        salvarLista(
            STORAGE_PRODUTOS,
            produtos
        );


        renderizar();

    }


    // ==================================================
    // RENDER
    // ==================================================

    function renderizar() {

        const produtos =
            carregarLista(
                STORAGE_PRODUTOS
            );


        // ==================================================
        // INDICADORES
        // ==================================================

        const ativos =
            produtos.filter(
                produto =>
                    produto.status ===
                    "ativo"
            );


        const totalEstoque =
            produtos.reduce(
                (
                    total,
                    produto
                ) =>
                    total +
                    Number(
                        produto.estoque ||
                        0
                    ),
                0
            );


        const baixos =
            produtos.filter(
                produto =>
                    produto.status ===
                        "ativo" &&
                    estoqueBaixo(
                        produto
                    )
            );


        const valorEstoque =
            produtos.reduce(
                (
                    total,
                    produto
                ) =>
                    total +
                    (
                        Number(
                            produto.custo ||
                            0
                        )
                        *
                        Number(
                            produto.estoque ||
                            0
                        )
                    ),
                0
            );


        totalAtivosEl.textContent =
            ativos.length;


        totalEstoqueEl.textContent =
            totalEstoque;


        estoqueBaixoEl.textContent =
            baixos.length;


        valorEstoqueEl.textContent =
            moeda(
                valorEstoque
            );


        // ==================================================
        // FILTROS
        // ==================================================

        const termo =
            buscaEl.value
                .trim()
                .toLowerCase();


        const statusFiltro =
            filtroStatusEl.value;


        const estoqueFiltro =
            filtroEstoqueEl.value;


        let filtrados =
            produtos.filter(
                produto => {

                    if (termo) {

                        const texto =
                            (
                                `${produto.nome || ""} ` +
                                `${produto.codigo || ""} ` +
                                `${produto.categoria || ""}`
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
                        statusFiltro !==
                            "todos" &&
                        produto.status !==
                            statusFiltro
                    ) {

                        return false;

                    }


                    if (
                        estoqueFiltro ===
                            "baixo" &&
                        !estoqueBaixo(
                            produto
                        )
                    ) {

                        return false;

                    }


                    if (
                        estoqueFiltro ===
                            "zerado" &&
                        Number(
                            produto.estoque ||
                            0
                        ) !==
                            0
                    ) {

                        return false;

                    }


                    return true;

                }
            );


        filtrados.sort(
            (a, b) =>
                String(
                    a.nome || ""
                ).localeCompare(
                    String(
                        b.nome || ""
                    ),
                    "pt-BR"
                )
        );


        quantidadeEl.textContent =
            filtrados.length ===
                1
                ? "1 produto"
                : `${filtrados.length} produtos`;


        listaEl.innerHTML =
            "";


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
            produto => {

                const qtd =
                    Number(
                        produto.estoque ||
                        0
                    );


                const minimo =
                    Number(
                        produto.estoqueMinimo ||
                        0
                    );


                let classeEstoque =
                    "normal";


                let textoEstoque =
                    `${qtd} unidades`;


                if (
                    qtd ===
                    0
                ) {

                    classeEstoque =
                        "zerado";

                    textoEstoque =
                        "Sem estoque";

                } else if (
                    qtd <=
                    minimo
                ) {

                    classeEstoque =
                        "baixo";

                    textoEstoque =
                        `${qtd} unidades • Baixo`;

                }


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "produto-card";


                card.innerHTML = `

                    <div class="produto-card-principal">

                        <div class="produto-card-icone">
                            📦
                        </div>


                        <div class="produto-card-identidade">

                            <div>

                                <h3>
                                    ${escaparHTML(
                                        produto.nome
                                    )}
                                </h3>

                                <span class="produto-status ${produto.status}">
                                    ${
                                        produto.status ===
                                        "ativo"
                                            ? "● ATIVO"
                                            : "● INATIVO"
                                    }
                                </span>

                            </div>


                            <span>
                                ${escaparHTML(
                                    nomeCategoria(
                                        produto.categoria
                                    )
                                )}
                            </span>


                            <small>
                                Código:
                                ${escaparHTML(
                                    produto.codigo ||
                                    "Não informado"
                                )}
                            </small>

                        </div>

                    </div>


                    <div class="produto-card-precos">

                        <div>

                            <span>
                                Custo
                            </span>

                            <strong>
                                ${moeda(
                                    produto.custo
                                )}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Venda
                            </span>

                            <strong class="produto-preco-venda">
                                ${moeda(
                                    produto.precoVenda
                                )}
                            </strong>

                        </div>

                    </div>


                    <div class="produto-card-estoque">

                        <span>
                            Estoque
                        </span>

                        <strong class="${classeEstoque}">
                            ${textoEstoque}
                        </strong>

                        <small>
                            Mínimo:
                            ${minimo}
                        </small>

                    </div>


                    <div class="produto-card-acoes">

                        <button
                            type="button"
                            class="btn-produto-estoque"
                        >
                            Estoque
                        </button>


                        <button
                            type="button"
                            class="btn-produto-editar"
                        >
                            Editar
                        </button>


                        <button
                            type="button"
                            class="btn-produto-status"
                        >
                            ${
                                produto.status ===
                                "ativo"
                                    ? "Desativar"
                                    : "Ativar"
                            }
                        </button>

                    </div>

                `;


                card
                    .querySelector(
                        ".btn-produto-estoque"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            abrirEstoque(
                                produto
                            );

                        }
                    );


                card
                    .querySelector(
                        ".btn-produto-editar"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            abrirEditarProduto(
                                produto
                            );

                        }
                    );


                card
                    .querySelector(
                        ".btn-produto-status"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            alternarStatus(
                                produto.id
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

    btnNovoProduto.addEventListener(
        "click",
        abrirNovoProduto
    );


    produtoModalFechar.addEventListener(
        "click",
        fecharProdutoModal
    );


    btnCancelarProduto.addEventListener(
        "click",
        fecharProdutoModal
    );


    estoqueModalFechar.addEventListener(
        "click",
        fecharEstoqueModal
    );


    btnCancelarEstoque.addEventListener(
        "click",
        fecharEstoqueModal
    );


    produtoModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                produtoModal
            ) {

                fecharProdutoModal();

            }

        }
    );


    estoqueModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                estoqueModal
            ) {

                fecharEstoqueModal();

            }

        }
    );


    buscaEl.addEventListener(
        "input",
        renderizar
    );


    filtroStatusEl.addEventListener(
        "change",
        renderizar
    );


    filtroEstoqueEl.addEventListener(
        "change",
        renderizar
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                fecharProdutoModal();
                fecharEstoqueModal();

            }

        }
    );


    // ==================================================
    // INICIAR
    // ==================================================

    renderizar();


    console.log(
        "La Cancha: produtos e estoque carregados."
    );

})();