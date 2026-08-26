// ======================================================
// LA CANCHA FUT 7
// PAINEL DO GERENTE
// ======================================================



// ======================================================
// 1. MENU LATERAL MOBILE
// ======================================================

const btnSidebar =
    document.getElementById("btnSidebar");

const sidebar =
    document.getElementById("sidebar");


if (btnSidebar && sidebar) {

    btnSidebar.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle("aberta");

        }
    );

}



// ======================================================
// 2. LOGIN DO GERENTE
// ======================================================

const formLoginGerente =
    document.getElementById("formLoginGerente");

const emailGerente =
    document.getElementById("emailGerente");

const senhaGerente =
    document.getElementById("senhaGerente");

const btnMostrarSenha =
    document.getElementById("btnMostrarSenha");



// ======================================================
// MOSTRAR / ESCONDER SENHA
// ======================================================

if (btnMostrarSenha && senhaGerente) {

    btnMostrarSenha.addEventListener(
        "click",
        () => {

            const senhaVisivel =
                senhaGerente.type === "text";


            senhaGerente.type =
                senhaVisivel
                    ? "password"
                    : "text";


            btnMostrarSenha.textContent =
                senhaVisivel
                    ? "👁"
                    : "🙈";

        }
    );

}



// ======================================================
// LOGIN TEMPORÁRIO
// ======================================================

if (
    formLoginGerente &&
    emailGerente &&
    senhaGerente
) {

    formLoginGerente.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const erroEmail =
                document.getElementById(
                    "erroEmailGerente"
                );

            const erroSenha =
                document.getElementById(
                    "erroSenhaGerente"
                );


            if (erroEmail) {
                erroEmail.textContent = "";
            }

            if (erroSenha) {
                erroSenha.textContent = "";
            }


            emailGerente.classList.remove(
                "campo-erro"
            );

            senhaGerente.classList.remove(
                "campo-erro"
            );


            let valido = true;



            // EMAIL

            if (!emailGerente.value.trim()) {

                if (erroEmail) {

                    erroEmail.textContent =
                        "Informe seu e-mail.";

                }

                emailGerente.classList.add(
                    "campo-erro"
                );

                valido = false;

            }



            // SENHA

            if (senhaGerente.value.length < 4) {

                if (erroSenha) {

                    erroSenha.textContent =
                        "Informe sua senha.";

                }

                senhaGerente.classList.add(
                    "campo-erro"
                );

                valido = false;

            }



            if (!valido) {
                return;
            }



            /*
                LOGIN TEMPORÁRIO.

                Isso serve apenas para demonstrar
                o fluxo enquanto ainda não temos
                backend.

                A autenticação real será feita
                futuramente no servidor.
            */

            sessionStorage.setItem(
                "gerenteDemo",
                "true"
            );


            window.location.href =
                "dashboard.html";

        }
    );

}



// ======================================================
// 3. GERENCIAMENTO DE HORÁRIOS
// ======================================================

const formHorario =
    document.getElementById("formHorario");

const horarioId =
    document.getElementById("horarioId");

const horarioData =
    document.getElementById("horarioData");

const horarioInicio =
    document.getElementById("horarioInicio");

const horarioFim =
    document.getElementById("horarioFim");

const horarioStatus =
    document.getElementById("horarioStatus");



// ======================================================
// MODALIDADES
// ======================================================

const aceitaAvulso =
    document.getElementById("aceitaAvulso");

const aceitaFixo =
    document.getElementById("aceitaFixo");

const valorAvulso =
    document.getElementById("valorAvulso");

const valorFixo =
    document.getElementById("valorFixo");

const campoValorAvulso =
    document.getElementById("campoValorAvulso");

const campoValorFixo =
    document.getElementById("campoValorFixo");



// ======================================================
// LISTAGEM
// ======================================================

const listaHorarios =
    document.getElementById("listaHorarios");

const horariosVazio =
    document.getElementById("horariosVazio");

const quantidadeHorarios =
    document.getElementById("quantidadeHorarios");



// ======================================================
// FORMULÁRIO / MENSAGENS
// ======================================================

const mensagemHorario =
    document.getElementById("mensagemHorario");

const btnSalvarHorario =
    document.getElementById("btnSalvarHorario");

const btnCancelarEdicao =
    document.getElementById("btnCancelarEdicao");

const tituloFormularioHorario =
    document.getElementById(
        "tituloFormularioHorario"
    );



// ======================================================
// FILTRO
// ======================================================

const filtroDataHorario =
    document.getElementById(
        "filtroDataHorario"
    );

const btnLimparFiltroHorario =
    document.getElementById(
        "btnLimparFiltroHorario"
    );



// ======================================================
// 4. CARREGAR HORÁRIOS DO LOCALSTORAGE
// ======================================================

let horariosLaCancha =
    carregarHorariosLocal();



// ======================================================
// CARREGAR DADOS
// ======================================================

function carregarHorariosLocal() {

    try {

        const dados =
            localStorage.getItem(
                "horariosLaCancha"
            );


        if (!dados) {
            return [];
        }


        const horarios =
            JSON.parse(dados);


        if (!Array.isArray(horarios)) {
            return [];
        }


        /*
            MIGRAÇÃO DOS HORÁRIOS ANTIGOS.

            Antes usávamos:

            valor: 150

            Agora usamos:

            aceitaAvulso
            aceitaFixo
            valorAvulso
            valorFixo
        */

        return horarios.map(
            (horario) => {

                const horarioAtualizado =
                    {
                        ...horario
                    };


                // HORÁRIO ANTIGO

                if (
                    horarioAtualizado
                        .aceitaAvulso ===
                    undefined
                ) {

                    horarioAtualizado
                        .aceitaAvulso =
                        true;

                }


                if (
                    horarioAtualizado
                        .aceitaFixo ===
                    undefined
                ) {

                    horarioAtualizado
                        .aceitaFixo =
                        false;

                }


                if (
                    horarioAtualizado
                        .valorAvulso ===
                        undefined &&
                    horarioAtualizado
                        .valor !==
                        undefined
                ) {

                    horarioAtualizado
                        .valorAvulso =
                        Number(
                            horarioAtualizado
                                .valor
                        );

                }


                if (
                    horarioAtualizado
                        .valorFixo ===
                    undefined
                ) {

                    horarioAtualizado
                        .valorFixo =
                        null;

                }


                return horarioAtualizado;

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



// ======================================================
// 5. SALVAR HORÁRIOS
// ======================================================

function salvarHorariosLocal() {

    localStorage.setItem(
        "horariosLaCancha",
        JSON.stringify(
            horariosLaCancha
        )
    );

}



// ======================================================
// 6. GERAR ID
// ======================================================

function gerarIdHorario() {

    if (
        window.crypto &&
        typeof window.crypto.randomUUID
            === "function"
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



// ======================================================
// 7. HORÁRIO PARA MINUTOS
// ======================================================

function horarioParaMinutos(horario) {

    if (!horario) {
        return 0;
    }


    const [hora, minuto] =
        horario
            .split(":")
            .map(Number);


    return (
        hora * 60 +
        minuto
    );

}



// ======================================================
// 8. CALCULAR DURAÇÃO
// ======================================================

function calcularDuracaoHorario(
    inicio,
    fim
) {

    const inicioMinutos =
        horarioParaMinutos(inicio);

    const fimMinutos =
        horarioParaMinutos(fim);


    const totalMinutos =
        fimMinutos -
        inicioMinutos;


    const horas =
        Math.floor(
            totalMinutos / 60
        );

    const minutos =
        totalMinutos % 60;


    if (
        horas > 0 &&
        minutos > 0
    ) {

        return `${horas}h ${minutos}min`;

    }


    if (horas > 0) {

        return `${horas}h`;

    }


    return `${minutos}min`;

}



// ======================================================
// 9. VERIFICAR CONFLITO
// ======================================================

function existeConflito(
    data,
    inicio,
    fim,
    ignorarId = null
) {

    const novoInicio =
        horarioParaMinutos(inicio);

    const novoFim =
        horarioParaMinutos(fim);


    return horariosLaCancha.some(
        (horario) => {

            // IGNORAR O PRÓPRIO HORÁRIO
            // QUANDO ESTIVER EDITANDO

            if (
                ignorarId &&
                horario.id === ignorarId
            ) {

                return false;

            }


            // OUTRO DIA NÃO É CONFLITO

            if (
                horario.data !== data
            ) {

                return false;

            }


            const existenteInicio =
                horarioParaMinutos(
                    horario.inicio
                );

            const existenteFim =
                horarioParaMinutos(
                    horario.fim
                );


            /*
                EXEMPLO:

                EXISTENTE
                16:15 → 17:15

                NOVO
                16:30 → 18:00

                CONFLITO

                ----------------

                EXISTENTE
                16:15 → 17:15

                NOVO
                17:15 → 18:15

                PERMITIDO
            */

            return (
                novoInicio <
                    existenteFim &&
                novoFim >
                    existenteInicio
            );

        }
    );

}



// ======================================================
// 10. FORMATAR DATA
// ======================================================

function formatarDataAdmin(data) {

    if (!data) {
        return "-";
    }


    const partes =
        data.split("-");


    if (partes.length !== 3) {

        return data;

    }


    return (
        `${partes[2]}/` +
        `${partes[1]}/` +
        `${partes[0]}`
    );

}



// ======================================================
// 11. FORMATAR VALOR
// ======================================================

function formatarValorAdmin(valor) {

    const numero =
        Number(valor);


    if (
        valor === null ||
        valor === undefined ||
        Number.isNaN(numero)
    ) {

        return "R$ 0,00";

    }


    return numero.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}



// ======================================================
// 12. MODALIDADES AVULSO / FIXO
// ======================================================

function atualizarCamposTipoReserva() {

    if (
        !aceitaAvulso ||
        !aceitaFixo
    ) {

        return;

    }



    // RESERVA AVULSA

    if (aceitaAvulso.checked) {

        if (campoValorAvulso) {

            campoValorAvulso
                .classList
                .remove(
                    "campo-oculto"
                );

        }

    } else {

        if (campoValorAvulso) {

            campoValorAvulso
                .classList
                .add(
                    "campo-oculto"
                );

        }


        if (valorAvulso) {

            valorAvulso.value = "";

        }

    }



    // HORÁRIO FIXO

    if (aceitaFixo.checked) {

        if (campoValorFixo) {

            campoValorFixo
                .classList
                .remove(
                    "campo-oculto"
                );

        }

    } else {

        if (campoValorFixo) {

            campoValorFixo
                .classList
                .add(
                    "campo-oculto"
                );

        }


        if (valorFixo) {

            valorFixo.value = "";

        }

    }

}



// ======================================================
// EVENTOS DAS MODALIDADES
// ======================================================

if (aceitaAvulso) {

    aceitaAvulso.addEventListener(
        "change",
        atualizarCamposTipoReserva
    );

}


if (aceitaFixo) {

    aceitaFixo.addEventListener(
        "change",
        atualizarCamposTipoReserva
    );

}



// ======================================================
// 13. MOSTRAR MENSAGEM
// ======================================================

function mostrarMensagemHorario(
    texto,
    tipo = "erro"
) {

    if (!mensagemHorario) {
        return;
    }


    mensagemHorario.textContent =
        texto;


    mensagemHorario.className =
        `mensagem-horario ${tipo} ativo`;

}



// ======================================================
// 14. LIMPAR MENSAGEM
// ======================================================

function limparMensagemHorario() {

    if (!mensagemHorario) {
        return;
    }


    mensagemHorario.textContent =
        "";


    mensagemHorario.className =
        "mensagem-horario";

}



// ======================================================
// 15. LIMPAR FORMULÁRIO
// ======================================================

function limparFormularioHorario() {

    if (!formHorario) {
        return;
    }


    formHorario.reset();


    if (horarioId) {

        horarioId.value = "";

    }


    // CONFIGURAÇÃO PADRÃO

    if (aceitaAvulso) {

        aceitaAvulso.checked =
            true;

    }


    if (aceitaFixo) {

        aceitaFixo.checked =
            false;

    }


    if (valorAvulso) {

        valorAvulso.value =
            "";

    }


    if (valorFixo) {

        valorFixo.value =
            "";

    }


    if (horarioStatus) {

        horarioStatus.value =
            "disponivel";

    }


    if (btnSalvarHorario) {

        btnSalvarHorario.textContent =
            "Salvar horário";

    }


    if (btnCancelarEdicao) {

        btnCancelarEdicao
            .style
            .display =
            "none";

    }


    if (tituloFormularioHorario) {

        tituloFormularioHorario
            .textContent =
            "Cadastrar disponibilidade";

    }


    atualizarCamposTipoReserva();

}



// ======================================================
// 16. RENDERIZAR HORÁRIOS
// ======================================================

function renderizarHorarios() {

    if (!listaHorarios) {
        return;
    }


    listaHorarios.innerHTML =
        "";


    let lista =
        [...horariosLaCancha];



    // FILTRO POR DATA

    if (
        filtroDataHorario &&
        filtroDataHorario.value
    ) {

        lista =
            lista.filter(
                (horario) => {

                    return (
                        horario.data ===
                        filtroDataHorario.value
                    );

                }
            );

    }



    // ORDENAR POR DATA + HORÁRIO

    lista.sort(
        (a, b) => {

            const dataA =
                `${a.data} ${a.inicio}`;

            const dataB =
                `${b.data} ${b.inicio}`;


            return dataA.localeCompare(
                dataB
            );

        }
    );



    // CONTADOR

    if (quantidadeHorarios) {

        quantidadeHorarios.textContent =
            lista.length;

    }



    // LISTA VAZIA

    if (lista.length === 0) {

        if (horariosVazio) {

            horariosVazio
                .style
                .display =
                "block";

        }


        return;

    }


    if (horariosVazio) {

        horariosVazio
            .style
            .display =
            "none";

    }



    // CRIAR CARDS

    lista.forEach(
        (horario) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "horario-admin-card";



            // STATUS

            const bloqueado =
                horario.status ===
                "bloqueado";


            const statusTexto =
                bloqueado
                    ? "Bloqueado"
                    : "Disponível";



            // PREÇO AVULSO

            let htmlAvulso = "";


            if (
                horario.aceitaAvulso
            ) {

                htmlAvulso = `

                    <span class="preco-avulso">

                        Avulso:
                        ${formatarValorAdmin(
                            horario.valorAvulso
                        )}

                        / jogo

                    </span>

                `;

            }



            // PREÇO FIXO

            let htmlFixo = "";


            if (
                horario.aceitaFixo
            ) {

                htmlFixo = `

                    <span class="preco-fixo">

                        Fixo:
                        ${formatarValorAdmin(
                            horario.valorFixo
                        )}

                        / mês

                    </span>

                `;

            }



            // CASO BLOQUEADO

            if (bloqueado) {

                htmlAvulso = "";
                htmlFixo = "";

            }



            const duracao =
                calcularDuracaoHorario(
                    horario.inicio,
                    horario.fim
                );



            card.innerHTML = `

                <div class="horario-admin-data">

                    <strong>
                        ${formatarDataAdmin(
                            horario.data
                        )}
                    </strong>

                    <span>
                        La Cancha Fut 7
                    </span>

                </div>


                <div class="horario-admin-info">

                    <h3>
                        ${horario.inicio}
                        →
                        ${horario.fim}
                    </h3>


                    <small>
                        Duração:
                        ${duracao}
                    </small>


                    <div class="horario-admin-precos">

                        ${htmlAvulso}

                        ${htmlFixo}

                    </div>


                    <div
                        class="
                            status-horario-admin
                            ${horario.status}
                        "
                    >
                        ${statusTexto}
                    </div>

                </div>


                <div class="horario-admin-acoes">

                    <button
                        type="button"
                        class="
                            btn-horario-acao
                            btn-editar-horario
                        "
                        data-id="${horario.id}"
                        title="Editar horário"
                    >
                        ✏️
                    </button>


                    <button
                        type="button"
                        class="
                            btn-horario-acao
                            excluir
                            btn-excluir-horario
                        "
                        data-id="${horario.id}"
                        title="Excluir horário"
                    >
                        🗑️
                    </button>

                </div>

            `;


            listaHorarios.appendChild(
                card
            );

        }
    );

}



// ======================================================
// 17. CADASTRAR / EDITAR HORÁRIO
// ======================================================

if (formHorario) {

    formHorario.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            limparMensagemHorario();



            // ==================================================
            // DADOS PRINCIPAIS
            // ==================================================

            const data =
                horarioData
                    ? horarioData.value
                    : "";

            const inicio =
                horarioInicio
                    ? horarioInicio.value
                    : "";

            const fim =
                horarioFim
                    ? horarioFim.value
                    : "";

            const status =
                horarioStatus
                    ? horarioStatus.value
                    : "disponivel";



            // ==================================================
            // MODALIDADES
            // ==================================================

            const permiteAvulso =
                aceitaAvulso
                    ? aceitaAvulso.checked
                    : false;

            const permiteFixo =
                aceitaFixo
                    ? aceitaFixo.checked
                    : false;



            const precoAvulso =
                permiteAvulso &&
                valorAvulso
                    ? Number(
                        valorAvulso.value
                    )
                    : null;


            const precoFixo =
                permiteFixo &&
                valorFixo
                    ? Number(
                        valorFixo.value
                    )
                    : null;



            // ==================================================
            // DATA / HORÁRIO
            // ==================================================

            if (
                !data ||
                !inicio ||
                !fim
            ) {

                mostrarMensagemHorario(
                    "Preencha a data, a hora inicial e a hora final.",
                    "erro"
                );

                return;

            }



            const inicioMinutos =
                horarioParaMinutos(
                    inicio
                );

            const fimMinutos =
                horarioParaMinutos(
                    fim
                );


            if (
                fimMinutos <=
                inicioMinutos
            ) {

                mostrarMensagemHorario(
                    "A hora final precisa ser maior que a hora inicial.",
                    "erro"
                );

                return;

            }



            // ==================================================
            // VALIDAÇÕES SE ESTIVER DISPONÍVEL
            // ==================================================

            if (
                status ===
                "disponivel"
            ) {

                // PRECISA DE ALGUMA MODALIDADE

                if (
                    !permiteAvulso &&
                    !permiteFixo
                ) {

                    mostrarMensagemHorario(
                        "Escolha se o horário aceita reserva avulsa, horário fixo ou os dois.",
                        "erro"
                    );

                    return;

                }



                // AVULSO

                if (
                    permiteAvulso &&
                    (
                        !precoAvulso ||
                        precoAvulso <= 0
                    )
                ) {

                    mostrarMensagemHorario(
                        "Informe o valor da reserva avulsa.",
                        "erro"
                    );

                    return;

                }



                // FIXO

                if (
                    permiteFixo &&
                    (
                        !precoFixo ||
                        precoFixo <= 0
                    )
                ) {

                    mostrarMensagemHorario(
                        "Informe o valor mensal do horário fixo.",
                        "erro"
                    );

                    return;

                }

            }



            // ==================================================
            // CONFLITO
            // ==================================================

            const idAtual =
                horarioId &&
                horarioId.value
                    ? horarioId.value
                    : null;


            if (
                existeConflito(
                    data,
                    inicio,
                    fim,
                    idAtual
                )
            ) {

                mostrarMensagemHorario(
                    "Conflito de horário: já existe outro período cadastrado dentro deste intervalo.",
                    "erro"
                );

                return;

            }



            // ==================================================
            // OBJETO DO HORÁRIO
            // ==================================================

            const dadosHorario =
            {
                data:
                    data,

                inicio:
                    inicio,

                fim:
                    fim,

                aceitaAvulso:
                    status ===
                    "disponivel"
                        ? permiteAvulso
                        : false,

                aceitaFixo:
                    status ===
                    "disponivel"
                        ? permiteFixo
                        : false,

                valorAvulso:
                    status ===
                    "disponivel" &&
                    permiteAvulso
                        ? precoAvulso
                        : null,

                valorFixo:
                    status ===
                    "disponivel" &&
                    permiteFixo
                        ? precoFixo
                        : null,

                status:
                    status
            };



            // ==================================================
            // EDITANDO
            // ==================================================

            if (idAtual) {

                const indice =
                    horariosLaCancha
                        .findIndex(
                            (horario) => {

                                return (
                                    horario.id ===
                                    idAtual
                                );

                            }
                        );


                if (indice === -1) {

                    mostrarMensagemHorario(
                        "Não foi possível encontrar o horário para edição.",
                        "erro"
                    );

                    return;

                }


                horariosLaCancha[indice] =
                {
                    id:
                        idAtual,

                    ...dadosHorario
                };


                salvarHorariosLocal();

                renderizarHorarios();

                limparFormularioHorario();


                mostrarMensagemHorario(
                    "Horário atualizado com sucesso.",
                    "sucesso"
                );


                return;

            }



            // ==================================================
            // NOVO HORÁRIO
            // ==================================================

            const novoHorario =
            {
                id:
                    gerarIdHorario(),

                ...dadosHorario
            };


            horariosLaCancha.push(
                novoHorario
            );


            salvarHorariosLocal();

            renderizarHorarios();

            limparFormularioHorario();


            mostrarMensagemHorario(
                "Horário cadastrado com sucesso.",
                "sucesso"
            );

        }
    );

}



// ======================================================
// 18. EDITAR HORÁRIO
// ======================================================

function editarHorario(id) {

    const horario =
        horariosLaCancha.find(
            (item) => {

                return (
                    item.id === id
                );

            }
        );


    if (!horario) {

        mostrarMensagemHorario(
            "Horário não encontrado.",
            "erro"
        );

        return;

    }



    // ID

    if (horarioId) {

        horarioId.value =
            horario.id;

    }



    // DATA

    if (horarioData) {

        horarioData.value =
            horario.data;

    }



    // INÍCIO

    if (horarioInicio) {

        horarioInicio.value =
            horario.inicio;

    }



    // FIM

    if (horarioFim) {

        horarioFim.value =
            horario.fim;

    }



    // STATUS

    if (horarioStatus) {

        horarioStatus.value =
            horario.status ||
            "disponivel";

    }



    // MODALIDADES

    if (aceitaAvulso) {

        aceitaAvulso.checked =
            horario.aceitaAvulso ??
            true;

    }


    if (aceitaFixo) {

        aceitaFixo.checked =
            horario.aceitaFixo ??
            false;

    }



    // PREÇOS

    if (valorAvulso) {

        valorAvulso.value =
            horario.valorAvulso ??
            horario.valor ??
            "";

    }


    if (valorFixo) {

        valorFixo.value =
            horario.valorFixo ??
            "";

    }



    atualizarCamposTipoReserva();



    // TEXTO DO FORMULÁRIO

    if (tituloFormularioHorario) {

        tituloFormularioHorario
            .textContent =
            "Editar horário";

    }


    if (btnSalvarHorario) {

        btnSalvarHorario.textContent =
            "Salvar alterações";

    }


    if (btnCancelarEdicao) {

        btnCancelarEdicao
            .style
            .display =
            "flex";

    }


    limparMensagemHorario();



    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

}



// ======================================================
// 19. EXCLUIR HORÁRIO
// ======================================================

function excluirHorario(id) {

    const horario =
        horariosLaCancha.find(
            (item) => {

                return (
                    item.id === id
                );

            }
        );


    if (!horario) {

        mostrarMensagemHorario(
            "Horário não encontrado.",
            "erro"
        );

        return;

    }


    const confirmar =
        window.confirm(
            `Deseja excluir o horário ${horario.inicio} → ${horario.fim} do dia ${formatarDataAdmin(horario.data)}?`
        );


    if (!confirmar) {
        return;
    }


    horariosLaCancha =
        horariosLaCancha.filter(
            (item) => {

                return (
                    item.id !== id
                );

            }
        );


    salvarHorariosLocal();

    renderizarHorarios();


    mostrarMensagemHorario(
        "Horário excluído com sucesso.",
        "sucesso"
    );

}



// ======================================================
// 20. CLIQUES NA LISTA
// ======================================================

if (listaHorarios) {

    listaHorarios.addEventListener(
        "click",
        (event) => {

            const btnEditar =
                event.target.closest(
                    ".btn-editar-horario"
                );


            if (btnEditar) {

                editarHorario(
                    btnEditar.dataset.id
                );

                return;

            }



            const btnExcluir =
                event.target.closest(
                    ".btn-excluir-horario"
                );


            if (btnExcluir) {

                excluirHorario(
                    btnExcluir.dataset.id
                );

            }

        }
    );

}



// ======================================================
// 21. CANCELAR EDIÇÃO
// ======================================================

if (btnCancelarEdicao) {

    btnCancelarEdicao.addEventListener(
        "click",
        () => {

            limparFormularioHorario();

            limparMensagemHorario();

        }
    );

}



// ======================================================
// 22. FILTRO
// ======================================================

if (filtroDataHorario) {

    filtroDataHorario.addEventListener(
        "change",
        () => {

            renderizarHorarios();

        }
    );

}



if (btnLimparFiltroHorario) {

    btnLimparFiltroHorario.addEventListener(
        "click",
        () => {

            if (filtroDataHorario) {

                filtroDataHorario.value =
                    "";

            }


            renderizarHorarios();

        }
    );

}



// ======================================================
// 23. INICIALIZAÇÃO DA PÁGINA DE HORÁRIOS
// ======================================================

if (formHorario) {

    atualizarCamposTipoReserva();

}


if (listaHorarios) {

    /*
        Salva novamente para converter
        eventuais registros antigos para
        o novo formato.
    */

    salvarHorariosLocal();

    renderizarHorarios();

}