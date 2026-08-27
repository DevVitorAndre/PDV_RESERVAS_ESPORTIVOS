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
    // IMAGENS POR CATEGORIA
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
    // CAMPOS QUE SOMEM
    // SERVIÇO / ESPORTIVO
    // ==================================================

    const campoCodigo =
        produtoCodigoEl
            ?.closest(
                ".produto-form-campo"
            );

    const campoEstoque =
        produtoEstoqueEl
            ?.closest(
                ".produto-form-campo"
            );

    const campoEstoqueMinimo =
        produtoEstoqueMinimoEl
            ?.closest(
                ".produto-form-campo"
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

            servico:
                "Serviços",

            outros:
                "Outros"

        };


        return (
            categorias[categoria] ||
            categoria ||
            "Outros"
        );

    }


    // ==================================================
    // CATEGORIAS SEM ESTOQUE
    // ==================================================

    function categoriaSemEstoque(
        categoria
    ) {

        return (
            categoria ===
            "servico"
            ||
            categoria ===
            "esportivo"
        );

    }


    // ==================================================
    // PRODUTO CONTROLA ESTOQUE?
    // ==================================================

    function produtoControlaEstoque(
        produto
    ) {

        /*
            SERVIÇO E ESPORTIVO
            NUNCA CONTROLAM ESTOQUE.

            FAZEMOS ESSA VERIFICAÇÃO
            PRIMEIRO PARA TAMBÉM CORRIGIR
            PRODUTOS ANTIGOS QUE POSSAM
            TER controlaEstoque:true
            SALVO NO localStorage.
        */

        if (
            categoriaSemEstoque(
                produto?.categoria
            )
        ) {

            return false;

        }


        /*
            PARA OUTRAS CATEGORIAS,
            RESPEITA O CAMPO SALVO.
        */

        if (
            typeof produto?.controlaEstoque ===
            "boolean"
        ) {

            return produto.controlaEstoque;

        }


        /*
            PRODUTO ANTIGO SEM O CAMPO
            controlaEstoque:
            ASSUMIMOS PRODUTO FÍSICO.
        */

        return true;

    }


    // ==================================================
    // ESTOQUE BAIXO
    // ==================================================

    function estoqueBaixo(
        produto
    ) {

        if (
            !produtoControlaEstoque(
                produto
            )
        ) {

            return false;

        }


        return (
            Number(
                produto.estoque ||
                0
            )
            <=
            Number(
                produto.estoqueMinimo ||
                0
            )
        );

    }


    // ==================================================
    // FORMULÁRIO POR CATEGORIA
    // ==================================================

    function atualizarFormularioCategoria() {

        const semEstoque =
            categoriaSemEstoque(
                produtoCategoriaEl.value
            );


        // ==============================================
        // CÓDIGO
        // ==============================================

        if (
            campoCodigo
        ) {

            campoCodigo.style.display =
                semEstoque
                    ? "none"
                    : "flex";

        }


        // ==============================================
        // ESTOQUE ATUAL
        // ==============================================

        if (
            campoEstoque
        ) {

            campoEstoque.style.display =
                semEstoque
                    ? "none"
                    : "flex";

        }


        // ==============================================
        // ESTOQUE MÍNIMO
        // ==============================================

        if (
            campoEstoqueMinimo
        ) {

            campoEstoqueMinimo.style.display =
                semEstoque
                    ? "none"
                    : "flex";

        }


        // ==============================================
        // LIMPAR CAMPOS
        // ==============================================

        if (
            semEstoque
        ) {

            produtoCodigoEl.value =
                "";

            produtoEstoqueEl.value =
                0;

            produtoEstoqueMinimoEl.value =
                0;

        }

    }


    // ==================================================
    // NOVO PRODUTO
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


        atualizarFormularioCategoria();


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
            produto.nome ||
            "";


        produtoCategoriaEl.value =
            produto.categoria ||
            "outros";


        produtoCodigoEl.value =
            produto.codigo ||
            "";


        produtoCustoEl.value =
            Number(
                produto.custo ||
                0
            );


        produtoVendaEl.value =
            Number(
                produto.precoVenda ||
                0
            );


        produtoEstoqueEl.value =
            Number(
                produto.estoque ||
                0
            );


        produtoEstoqueMinimoEl.value =
            Number(
                produto.estoqueMinimo ||
                0
            );


        produtoStatusEl.value =
            produto.status ||
            "ativo";


        produtoModalTitulo.textContent =
            "Editar produto";


        produtoFormErro.textContent =
            "";


        atualizarFormularioCategoria();


        produtoModal.classList.add(
            "aberto"
        );

    }


    // ==================================================
    // FECHAR MODAL PRODUTO
    // ==================================================

    function fecharProdutoModal() {

        produtoModal.classList.remove(
            "aberto"
        );

    }


    // ==================================================
    // MOVIMENTAÇÃO DE ESTOQUE
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
    // SALVAR PRODUTO / SERVIÇO / ESPORTIVO
    // ==================================================

    produtoForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            produtoFormErro.textContent =
                "";


            // ==============================================
            // DADOS
            // ==============================================

            const id =
                produtoIdEl.value
                    .trim();


            const nome =
                produtoNomeEl.value
                    .trim();


            const categoria =
                produtoCategoriaEl.value;


            const semEstoque =
                categoriaSemEstoque(
                    categoria
                );


            const controlaEstoque =
                !semEstoque;


            /*
                ESPORTIVO E SERVIÇO
                FUNCIONAM COMO SERVIÇO
                DENTRO DO PDV.
            */

            const tipoItem =
                semEstoque
                    ? "servico"
                    : "produto";


            const codigo =
                controlaEstoque
                    ? produtoCodigoEl.value
                        .trim()
                    : "";


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
                controlaEstoque
                    ? Number(
                        produtoEstoqueEl.value ||
                        0
                    )
                    : 0;


            const estoqueMinimo =
                controlaEstoque
                    ? Number(
                        produtoEstoqueMinimoEl.value ||
                        0
                    )
                    : 0;


            const status =
                produtoStatusEl.value;


            // ==============================================
            // VALIDAÇÕES
            // ==============================================

            if (
                !nome
            ) {

                produtoFormErro.textContent =
                    "Informe o nome do produto ou serviço.";

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
                custo <
                0
                ||
                estoque <
                0
                ||
                estoqueMinimo <
                0
            ) {

                produtoFormErro.textContent =
                    "Os valores não podem ser negativos.";

                return;

            }


            const produtos =
                carregarLista(
                    STORAGE_PRODUTOS
                );


            // ==============================================
            // CÓDIGO DUPLICADO
            // ==============================================

            if (
                controlaEstoque &&
                codigo
            ) {

                const duplicado =
                    produtos.find(
                        produto =>
                            produto.codigo ===
                                codigo
                            &&
                            produto.id !==
                                id
                    );


                if (
                    duplicado
                ) {

                    produtoFormErro.textContent =
                        "Já existe um produto com este código.";

                    return;

                }

            }


            // ==============================================
            // EDITAR
            // ==============================================

            if (
                id
            ) {

                const indice =
                    produtos.findIndex(
                        produto =>
                            produto.id ===
                            id
                    );


                if (
                    indice ===
                    -1
                ) {

                    produtoFormErro.textContent =
                        "Item não encontrado.";

                    return;

                }


                const produtoAnterior =
                    produtos[indice];


                const estoqueAnterior =
                    Number(
                        produtoAnterior
                            .estoque ||
                        0
                    );


                const controlavaAntes =
                    produtoControlaEstoque(
                        produtoAnterior
                    );


                produtos[indice] =
                {

                    ...produtoAnterior,

                    nome,

                    categoria,

                    tipoItem,

                    controlaEstoque,

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


                // ==========================================
                // REGISTRAR AJUSTE
                // ==========================================

                /*
                    SÓ REGISTRA ALTERAÇÃO
                    DE ESTOQUE SE:

                    - ANTES CONTROLAVA ESTOQUE
                    - AGORA CONTINUA CONTROLANDO
                    - QUANTIDADE MUDOU
                */

                if (
                    controlaEstoque
                    &&
                    controlavaAntes
                    &&
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


            // ==============================================
            // NOVO ITEM
            // ==============================================

            else {

                const novoId =
                    gerarId();


                produtos.push(
                    {

                        id:
                            novoId,

                        nome,

                        categoria,

                        tipoItem,

                        controlaEstoque,

                        /*
                            DEIXAMOS PRONTO
                            PARA FUTUROS TIPOS
                            ESPECIAIS.
                        */

                        subtipo:
                            null,

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


                // ==========================================
                // ESTOQUE INICIAL
                // ==========================================

                if (
                    controlaEstoque
                    &&
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


            // ==============================================
            // SALVAR
            // ==============================================

            salvarLista(
                STORAGE_PRODUTOS,
                produtos
            );


            fecharProdutoModal();


            renderizar();

        }
    );


    // ==================================================
    // ABRIR ESTOQUE
    // ==================================================

    function abrirEstoque(
        produto
    ) {

        /*
            SERVIÇOS E ESPORTIVOS
            NÃO PODEM ABRIR
            CONTROLE DE ESTOQUE.
        */

        if (
            !produtoControlaEstoque(
                produto
            )
        ) {

            mostrarErroEstoque(
                "Este item não possui controle de estoque."
            );

            return;

        }


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


    // ==================================================
    // ERRO DE ESTOQUE
    // ==================================================

    function mostrarErroEstoque(
        mensagem
    ) {

        console.warn(
            mensagem
        );

    }


    // ==================================================
    // FECHAR ESTOQUE
    // ==================================================

    function fecharEstoqueModal() {

        estoqueModal.classList.remove(
            "aberto"
        );

    }


    // ==================================================
    // SALVAR ESTOQUE
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


            // ==============================================
            // VALIDAÇÃO QUANTIDADE
            // ==============================================

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


            // ==============================================
            // PRODUTO NÃO ENCONTRADO
            // ==============================================

            if (
                indice ===
                -1
            ) {

                estoqueFormErro.textContent =
                    "Produto não encontrado.";

                return;

            }


            // ==============================================
            // SEM ESTOQUE
            // ==============================================

            if (
                !produtoControlaEstoque(
                    produtos[indice]
                )
            ) {

                estoqueFormErro.textContent =
                    "Serviços e itens esportivos não possuem controle de estoque.";

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


            // ==============================================
            // ENTRADA
            // ==============================================

            if (
                tipo ===
                "entrada"
            ) {

                estoqueAtual +=
                    quantidade;

            }


            // ==============================================
            // SAÍDA
            // ==============================================

            else {

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


            // ==============================================
            // ATUALIZA PRODUTO
            // ==============================================

            produtos[indice].estoque =
                estoqueAtual;


            produtos[indice].atualizadoEm =
                new Date()
                    .toISOString();


            salvarLista(
                STORAGE_PRODUTOS,
                produtos
            );


            // ==============================================
            // REGISTRAR MOVIMENTAÇÃO
            // ==============================================

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
    // STATUS
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
            indice ===
            -1
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


        // ==============================================
        // ATIVOS
        // ==============================================

        const ativos =
            produtos.filter(
                produto =>
                    produto.status ===
                    "ativo"
            );


        // ==============================================
        // SOMENTE PRODUTOS FÍSICOS
        // ==============================================

        const produtosFisicos =
            produtos.filter(
                produto =>
                    produtoControlaEstoque(
                        produto
                    )
            );


        // ==============================================
        // TOTAL ESTOQUE
        // ==============================================

        const totalEstoque =
            produtosFisicos.reduce(
                (
                    total,
                    produto
                ) => {

                    return (
                        total +
                        Number(
                            produto.estoque ||
                            0
                        )
                    );

                },
                0
            );


        // ==============================================
        // ESTOQUE BAIXO
        // ==============================================

        const baixos =
            produtosFisicos.filter(
                produto =>
                    produto.status ===
                        "ativo"
                    &&
                    estoqueBaixo(
                        produto
                    )
            );


        // ==============================================
        // VALOR DO ESTOQUE
        // ==============================================

        const valorEstoque =
            produtosFisicos.reduce(
                (
                    total,
                    produto
                ) => {

                    return (
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
                        )
                    );

                },
                0
            );


        // ==============================================
        // INDICADORES
        // ==============================================

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


        // ==============================================
        // FILTROS
        // ==============================================

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

                    // ======================================
                    // BUSCA
                    // ======================================

                    if (
                        termo
                    ) {

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


                    // ======================================
                    // STATUS
                    // ======================================

                    if (
                        statusFiltro !==
                            "todos"
                        &&
                        produto.status !==
                            statusFiltro
                    ) {

                        return false;

                    }


                    // ======================================
                    // ESTOQUE BAIXO
                    // ======================================

                    if (
                        estoqueFiltro ===
                        "baixo"
                    ) {

                        if (
                            !produtoControlaEstoque(
                                produto
                            )
                            ||
                            !estoqueBaixo(
                                produto
                            )
                        ) {

                            return false;

                        }

                    }


                    // ======================================
                    // ZERADO
                    // ======================================

                    if (
                        estoqueFiltro ===
                        "zerado"
                    ) {

                        if (
                            !produtoControlaEstoque(
                                produto
                            )
                            ||
                            Number(
                                produto.estoque ||
                                0
                            ) !==
                            0
                        ) {

                            return false;

                        }

                    }


                    return true;

                }
            );


        // ==============================================
        // ORDENAR
        // ==============================================

        filtrados.sort(
            (
                a,
                b
            ) =>
                String(
                    a.nome ||
                    ""
                ).localeCompare(
                    String(
                        b.nome ||
                        ""
                    ),
                    "pt-BR"
                )
        );


        // ==============================================
        // QUANTIDADE
        // ==============================================

        quantidadeEl.textContent =
            filtrados.length ===
            1
                ? "1 item"
                : `${filtrados.length} itens`;


        listaEl.innerHTML =
            "";


        // ==============================================
        // VAZIO
        // ==============================================

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


        // ==============================================
        // CARDS
        // ==============================================

        filtrados.forEach(
            produto => {

                const controlaEstoque =
                    produtoControlaEstoque(
                        produto
                    );


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


                // ==========================================
                // SERVIÇO / ESPORTIVO
                // ==========================================

                if (
                    !controlaEstoque
                ) {

                    classeEstoque =
                        "normal";


                    textoEstoque =
                        "Sem controle de estoque";

                }


                // ==========================================
                // ESTOQUE ZERO
                // ==========================================

                else if (
                    qtd ===
                    0
                ) {

                    classeEstoque =
                        "zerado";


                    textoEstoque =
                        "Sem estoque";

                }


                // ==========================================
                // ESTOQUE BAIXO
                // ==========================================

                else if (
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


                // ==========================================
                // TEXTO TIPO
                // ==========================================

                let descricaoSemEstoque =
                    "Serviço sem estoque físico";


                if (
                    produto.categoria ===
                    "esportivo"
                ) {

                    descricaoSemEstoque =
                        "Item esportivo sem estoque físico";

                }


                // ==========================================
                // CARD
                // ==========================================

                card.innerHTML = `

                    <div class="produto-card-principal">

                        <div class="produto-card-icone">

                            <img
                                src="${imagemCategoria(
                                    produto.categoria
                                )}"
                                alt="${escaparHTML(
                                    produto.nome
                                )}"
                            >

                        </div>


                        <div class="produto-card-identidade">

                            <div>

                                <h3>

                                    ${escaparHTML(
                                        produto.nome
                                    )}

                                </h3>


                                <span
                                    class="produto-status ${produto.status}"
                                >

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

                                ${
                                    controlaEstoque

                                        ? `
                                            Código:
                                            ${escaparHTML(
                                                produto.codigo ||
                                                "Não informado"
                                            )}
                                        `

                                        : descricaoSemEstoque
                                }

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


                            <strong
                                class="produto-preco-venda"
                            >

                                ${moeda(
                                    produto.precoVenda
                                )}

                            </strong>

                        </div>

                    </div>


                    <div class="produto-card-estoque">

                        <span>

                            ${
                                controlaEstoque
                                    ? "Estoque"
                                    : "Tipo"
                            }

                        </span>


                        <strong
                            class="${classeEstoque}"
                        >

                            ${textoEstoque}

                        </strong>


                        <small>

                            ${
                                controlaEstoque

                                    ? `Mínimo: ${minimo}`

                                    : (
                                        produto.categoria ===
                                        "esportivo"
                                            ? "Esportivo"
                                            : "Serviço"
                                    )
                            }

                        </small>

                    </div>


                    <div class="produto-card-acoes">

                        ${
                            controlaEstoque

                                ? `

                                    <button
                                        type="button"
                                        class="btn-produto-estoque"
                                    >
                                        Estoque
                                    </button>

                                `

                                : ""
                        }


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


                // ==========================================
                // ESTOQUE
                // ==========================================

                const btnEstoque =
                    card.querySelector(
                        ".btn-produto-estoque"
                    );


                if (
                    btnEstoque
                ) {

                    btnEstoque.addEventListener(
                        "click",
                        () => {

                            abrirEstoque(
                                produto
                            );

                        }
                    );

                }


                // ==========================================
                // EDITAR
                // ==========================================

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


                // ==========================================
                // STATUS
                // ==========================================

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


    // ==================================================
    // TROCAR CATEGORIA
    // ==================================================

    produtoCategoriaEl.addEventListener(
        "change",
        atualizarFormularioCategoria
    );


    // ==================================================
    // FECHAR PRODUTO
    // ==================================================

    produtoModalFechar.addEventListener(
        "click",
        fecharProdutoModal
    );


    btnCancelarProduto.addEventListener(
        "click",
        fecharProdutoModal
    );


    // ==================================================
    // FECHAR ESTOQUE
    // ==================================================

    estoqueModalFechar.addEventListener(
        "click",
        fecharEstoqueModal
    );


    btnCancelarEstoque.addEventListener(
        "click",
        fecharEstoqueModal
    );


    // ==================================================
    // CLICAR FORA PRODUTO
    // ==================================================

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


    // ==================================================
    // CLICAR FORA ESTOQUE
    // ==================================================

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


    // ==================================================
    // BUSCA
    // ==================================================

    buscaEl.addEventListener(
        "input",
        renderizar
    );


    // ==================================================
    // FILTRO STATUS
    // ==================================================

    filtroStatusEl.addEventListener(
        "change",
        renderizar
    );


    // ==================================================
    // FILTRO ESTOQUE
    // ==================================================

    filtroEstoqueEl.addEventListener(
        "change",
        renderizar
    );


    // ==================================================
    // ESC
    // ==================================================

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
        "La Cancha: produtos, esportivos e serviços carregados."
    );

})();