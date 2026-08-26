// ======================================================
// LA CANCHA FUT 7
// JAVASCRIPT PRINCIPAL
// ======================================================



// ======================================================
// 1. MENU MOBILE
// ======================================================

const btnMenuMobile =
    document.getElementById(
        "btnMenuMobile"
    );

const menuMobile =
    document.getElementById(
        "menuMobile"
    );


if (
    btnMenuMobile &&
    menuMobile
) {

    btnMenuMobile.addEventListener(
        "click",
        () => {

            menuMobile.classList.toggle(
                "aberto"
            );

        }
    );

}



// ======================================================
// 2. ELEMENTOS DA AGENDA DA HOME
// ======================================================

const homeListaHorarios =
    document.getElementById(
        "homeListaHorarios"
    );

const homeSemHorarios =
    document.getElementById(
        "homeSemHorarios"
    );

const homeDataHoje =
    document.getElementById(
        "homeDataHoje"
    );



// ======================================================
// 3. CARREGAR HORÁRIOS CADASTRADOS PELO GERENTE
// ======================================================

function carregarHorariosHome() {

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


        return horarios;

    } catch (erro) {

        console.error(
            "Erro ao carregar horários:",
            erro
        );


        return [];

    }

}



// ======================================================
// 4. PEGAR DATA DE HOJE
// FORMATO: YYYY-MM-DD
// ======================================================

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


    return `${ano}-${mes}-${dia}`;

}



// ======================================================
// 5. FORMATAR DATA PARA O CLIENTE
// ======================================================

function formatarDataHome(data) {

    if (!data) {

        return "Hoje";

    }


    const [
        ano,
        mes,
        dia
    ] =
        data
            .split("-")
            .map(Number);


    const dataObjeto =
        new Date(
            ano,
            mes - 1,
            dia
        );


    return dataObjeto
        .toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "long"
            }
        );

}



// ======================================================
// 6. FORMATAR VALOR
// ======================================================

function formatarValorHome(valor) {

    const numero =
        Number(valor);


    if (
        Number.isNaN(numero)
    ) {

        return "R$ 0,00";

    }


    return numero
        .toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

}



// ======================================================
// 7. HORÁRIO PARA MINUTOS
// ======================================================

function horarioParaMinutosHome(
    horario
) {

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



// ======================================================
// 8. VERIFICAR SE HORÁRIO DE HOJE JÁ PASSOU
// ======================================================

function horarioJaPassouHoje(
    horarioInicio
) {

    const agora =
        new Date();


    const minutosAgora =
        (
            agora.getHours() *
            60
        ) +
        agora.getMinutes();


    const minutosHorario =
        horarioParaMinutosHome(
            horarioInicio
        );


    return (
        minutosHorario <=
        minutosAgora
    );

}



// ======================================================
// 9. PEGAR PREÇO PRINCIPAL
// ======================================================

function obterPrecoHome(
    horario
) {

    /*
        Se aceitar reserva avulsa,
        mostramos o preço por jogo
        como preço principal.

        O valor mensal do fixo fica
        para a agenda completa.
    */

    if (
        horario.aceitaAvulso &&
        horario.valorAvulso
    ) {

        return {

            valor:
                horario.valorAvulso,

            complemento:
                "por jogo",

            tipo:
                horario.aceitaFixo
                    ? "Avulso ou fixo"
                    : "Reserva avulsa"

        };

    }



    /*
        Se for SOMENTE fixo,
        mostramos a mensalidade.
    */

    if (
        horario.aceitaFixo &&
        horario.valorFixo
    ) {

        return {

            valor:
                horario.valorFixo,

            complemento:
                "por mês",

            tipo:
                "Horário fixo"

        };

    }


    return null;

}



// ======================================================
// 10. RENDERIZAR HORÁRIOS DE HOJE
// ======================================================

function renderizarHorariosHome() {

    if (!homeListaHorarios) {

        return;

    }


    homeListaHorarios.innerHTML =
        "";


    const hoje =
        obterDataHoje();


    let horarios =
        carregarHorariosHome();



    // ==================================================
    // FILTRAR
    // ==================================================

    horarios =
        horarios.filter(
            (horario) => {

                /*
                    PRECISA:

                    1 - Ser de hoje
                    2 - Estar disponível
                    3 - Ainda não ter passado
                    4 - Aceitar alguma modalidade
                */

                const ehHoje =
                    horario.data ===
                    hoje;


                const estaDisponivel =
                    horario.status ===
                    "disponivel";


                const aindaNaoPassou =
                    !horarioJaPassouHoje(
                        horario.inicio
                    );


                const temModalidade =
                    horario.aceitaAvulso ||
                    horario.aceitaFixo;


                return (
                    ehHoje &&
                    estaDisponivel &&
                    aindaNaoPassou &&
                    temModalidade
                );

            }
        );



    // ==================================================
    // ORDENAR PELO HORÁRIO
    // ==================================================

    horarios.sort(
        (a, b) => {

            return (
                horarioParaMinutosHome(
                    a.inicio
                )
                -
                horarioParaMinutosHome(
                    b.inicio
                )
            );

        }
    );



    // ==================================================
    // DATA EXIBIDA
    // ==================================================

    if (homeDataHoje) {

        homeDataHoje.textContent =
            formatarDataHome(
                hoje
            );

    }



    // ==================================================
    // NÃO EXISTE HORÁRIO HOJE
    // ==================================================

    if (
        horarios.length === 0
    ) {

        if (homeSemHorarios) {

            homeSemHorarios.style.display =
                "flex";

        }


        return;

    }



    if (homeSemHorarios) {

        homeSemHorarios.style.display =
            "none";

    }



    // ==================================================
    // CRIAR HORÁRIOS
    // ==================================================

    horarios.forEach(
        (horario) => {

            const preco =
                obterPrecoHome(
                    horario
                );


            if (!preco) {

                return;

            }



            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "horario-item";



            item.innerHTML = `

                <div class="horario-info">

                    <strong>

                        ${horario.inicio}
                        -
                        ${horario.fim}

                    </strong>


                    <span>

                        ${preco.tipo}

                    </span>

                </div>


                <div class="horario-preco">

                    <strong>

                        ${formatarValorHome(
                            preco.valor
                        )}

                    </strong>


                    <small
                        class="home-tipo-preco"
                    >

                        ${preco.complemento}

                    </small>


                    <span
                        class="status-disponivel"
                    >

                        Disponível

                    </span>

                </div>

            `;


            homeListaHorarios
                .appendChild(
                    item
                );

        }
    );

}



// ======================================================
// 11. INICIAR A HOME
// ======================================================

if (homeListaHorarios) {

    renderizarHorariosHome();

}