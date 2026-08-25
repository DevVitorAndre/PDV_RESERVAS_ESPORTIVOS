const btnMenuMobile =
    document.getElementById("btnMenuMobile");

const menuMobile =
    document.getElementById("menuMobile");


if (btnMenuMobile && menuMobile) {

    btnMenuMobile.addEventListener("click", () => {

        menuMobile.classList.toggle("aberto");

    });

}