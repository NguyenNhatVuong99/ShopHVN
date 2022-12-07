$(document).ready(() => {
    window.onscroll = function () { stickyHeader() };

    var header = document.getElementById("header");
    var sticky = header.offsetTop;

    function stickyHeader() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky")
        } else {
            header.classList.remove("sticky");
        }
    }
    $("#cart").click(function () {
        let cart = $(".shopping-cart")
        if ($(".shopping-cart").hasClass("hide")) {
            cart.removeClass("hide")
        } else {
            cart.addClass("hide")
        }
    });
    new Cuttr(".item-name", {
        //options here
        truncate: 'characters',
        length: 4,
        ending: '...',
        readMoreBtnTag: 'button',
    });
})
let checklocalStorage = () => {
    const local = JSON.parse(localStorage.getItem('User'))
    let content = ''
    if (local != null) {
        content += `<a id="shopping_user" href="#home" class="btn btn--yellow" style="background-color: #FFF9EA;">
        Hi, ${local.user}
    </a>
    <div class="list__dropdown">
        <a>Profile</a>
        <a id="button_logout">Log out</a>
    </div>
        `

        document.getElementById('discount-signup').innerHTML = `Hi, ${local.user}`
    } else {
        content += `<a id="sign_in" href="" class="btn btn--yellow btn--animated">
        Sign in
    </a>`
    }
    document.getElementById('signed').classList.add("signin_user")
    document.getElementById('signed').innerHTML = content

}
checklocalStorage()

// makeid 
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

window.onload = checklocalStorage()


let modal = document.getElementById('modal')
// show modal
$(document).on("click", "#sign_in", function (e) {
    e.preventDefault()
    document.getElementById('modal').style.display = "flex"
})


//hide modal
let close_modal = document.getElementById('close_modal').addEventListener('click', () => {
    modal.style.display = 'none'
})
$(function () {
    $("#switch").click(function () {
        $("#formContainer, #register, #switch, #login").toggleClass("toggle");
    });
});


let discountSignup = document.getElementById('discount-signup').addEventListener('click', (event) => {
    event.preventDefault()
    document.getElementById('modal').style.display = "flex"
})




// login
let submit_login = document.getElementById('button_login')
submit_login.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()

    let url = 'https://6362430966f75177ea2aae4d.mockapi.io/users'
    fetch(url, {
    })
        .then((res) => {
            authenication(url)

        })
        .then((data) => {
        })
        .catch((error) => {
            console.log(error);
        })
})

// authenication
async function authenication(url) {
    let user = document.getElementById('user').value
    let password = document.getElementById('password').value
    let object = ''

    const response = await fetch(url);

    var data = await response.json();
    var k = false
    for (var i = 0; i < data.length; i++) {
        let dataUser = data[i].user
        let dataPass = data[i].password
        if (user == dataUser && password == dataPass) {
            k = true
            object = {
                id: data[i].id,
                user: data[i].user
            }
        }
    }
    if (k) {
        Swal.fire(
            'Sign in Successful',
            'Welcome!',
            'success'
        )
        let user = JSON.stringify(object)
        localStorage.setItem('User', user)
        checklocalStorage()
        document.getElementById('modal').style.display = 'none'
    } else {
        Swal.fire(
            'Sign in Faild!',
            'Your User or Password wrong',
            'error'
        )
    }
}


// register
let register = document.getElementById('button_register').addEventListener('click', (event) => {
    event.preventDefault()
    let ruser = document.getElementById('ruser').value
    let rpassword = document.getElementById('rpassword').value
    let remail = document.getElementById('remail').value
    let repeatPass = document.getElementById('repeatpass').value

    if (repeatPass != rpassword) {
        Swal.fire(
            'Faild',
            'Password and repeat password do not match!',
            'error'
        )
    } else {
        let url = 'https://6362430966f75177ea2aae4d.mockapi.io/users'
        const day = new Date()
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                createdAt: day,
                user: ruser,
                password: rpassword,
                avatar: `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${Math.floor(Math.random() * 100) + 1}.jpg`,
                email: remail,
                id: makeid(Math.floor(Math.random() * 10) + 1)
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('User', ruser)
                Swal.fire(
                    'Successful',
                    `Welcome! ${ruser}`,
                    'success'
                )
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
})

// logout
$(document).on("click", "#button_logout", function (e) {
    localStorage.clear()
    Swal.fire(
        'Log out Successful',
        'Good bye!',
        'success'
    )
    checklocalStorage()
})

// services

const servicesList = () => {
    let content = ''
    let url = 'https://6362430966f75177ea2aae4d.mockapi.io/services'
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                content += `<div class="section__serve-rows">

            <img src="${item.image}" alt="">
            <p class="section__serve-rows--title">
                ${item.title}
            </p>
            <p class="section__serve-rows--text">
                ${item.description}
            </p>

        </div>`
                document.getElementById('howit_col').innerHTML = content
            });
        })
}

servicesList()