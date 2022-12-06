$(document).ready(() => {
    window.onscroll = function () { stickyHeader() };

    var header = document.getElementById("header");
    var shoppingCart= document.getElementById("shopping-cart")
    var sticky = header.offsetTop;

    function stickyHeader() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky")
            shoppingCart.classList.add("sticky")
        } else {
            header.classList.remove("sticky");
            shoppingCart.classList.remove("sticky");
        }
    }
    // $("#cart").click(function () {
    //     let cart = $(".shopping-cart")
    //     if ($(".shopping-cart").hasClass("hide")) {
    //         cart.removeClass("hide")
    //     } else {
    //         cart.addClass("hide")
    //     }
    // });
    // new Cuttr(".item-name", {
    //     truncate: 'characters',
    //     length: 4,
    //     ending: '...',
    //     readMoreBtnTag: 'button',
    // });
    let getAuth = () => {

        let cookie = true
        let content = ""
        if (cookie) {
            content += `<a href="" class="btn btn--yellow ">
        Nhat Vuong
    </a>`;
        } else {
            content += `<a href="" class="btn btn--yellow ">
            Sign in
        </a>`;
        }
        $("#auth").html(content)
        // document.getElementsById("auth").innerHTML = content
        // console.log(content);
    }
    // getAuth()

    $(".header__buy").on("click", () => {
        $(".shopping-cart").toggleClass("shopping-cart--active")
    });

})
