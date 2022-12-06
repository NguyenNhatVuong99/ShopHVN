let cartId = "cart"
// local storage
let localAdapter = {
    saveCart: function (object) {
        let cart = JSON.stringify(object)
        localStorage.setItem(cartId, cart)
        return true
    },
    getCart: function () {
        return JSON.parse(localStorage.getItem(cartId))
    },
    clearCart: function () {
        localStorage.removeItem(cartId)
        helpers.emptyView()
    }
}
let cart = {
    count: 0,
    total: 0,
    items: [],
    getItems: function () {
        return this.items
    },
    setItems: (items) => {
        this.items = items
        for (let i = 0; i < this.items.length; i++) {
            let _item = this.items[i]
            this.total += _item.total
        }
    },
    clearItems: function () {
        this.count = 0;
        this.total = 0;
        localAdapter.clearCart()
    },

    addItem: (item) => {
        // console.log(cart.existsItem(item.id));
        if (cart.existsItem(item.id)) {
            cart.updateItem(item)
        } else {
            let object = {
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: item.quantity,
                amount: item.quantity * item.price
            }
            cart.items.push(object)
        }
        cart.count += item.quantity
        cart.total += item.quantity * item.price
        localAdapter.saveCart(cart)
        helpers.updateView()
    },
    existsItem: (id) => {
        let cart = localAdapter.getCart()
        if (cart === null) return false
        else {
            for (let index = 0; index < cart.items.length; index++) {
                let item = cart.items[index];
                if (id === item.id) return true
            }
            return false
        }
    },
    updateItem: (object) => {
        let cart = localAdapter.getCart();
        for (let index = 0; index < cart.items.length; index++) {
            let _item = cart.items[index];
            if (object.id === _item.id) {
                _item.quantity += parseInt(object.quantity)
                _item.amount += parseInt(object.quantity) * parseInt(object.price)
                cart.items.push(_item)
            }
        }
    }
}
let helpers = {
    getHTML: function (id) {
        return document.getElementById(id).innerHTML
    },
    setHTML: function (id, html) {
        document.getElementById(id).innerHTML = html;
        return true
    },
    itemData: function (object) {
        var item = {
            id: object.data('id'),
            name: object.data('name'),
            price: object.data('price'),
            image: object.data('image'),
            quantity: 1,
        };
        return item;
    },
    updateView: function () {
        var cart = localAdapter.getCart()
        var id = "shopping-cart";
        let html = `<div class="shopping-cart-header">
                            <i class="fa fa-shopping-cart cart-icon"></i>
                            <span class="badge">${cart.count}</span>
                            <div class="shopping-cart-total">
                                <span class="lighter-text">Total:</span>
                                <span class="main-color-text">${cart.total}</span>
                            </div>
                        </div>`;
        for (const item of cart.items) {
            html += `<ul class="shopping-cart-list" id="shopping-cart-list">
            <li class="shopping-cart-item">
                <img src="${item.image}" alt="item1" />
                <span class="item-name">${item.name}</span>
                <span class="item-price">${item.amount}</span>
                <span class="item-quantity">Quantity: ${item.quantity}</span>
            </li>
        </ul>`
        }
        html += `<a href="#" class="btn btn--yellow float-r">Xem giỏ hàng</a>`
        this.setHTML(id, html)
        // this.updateTotal();
    },
    emptyView: function () {
        var id = "shopping-cart";
        var html = `<ul class="shopping-cart-list" id="shopping-cart-list">
                        <li class="shopping-cart-item">
                            <span class="text-align-c item-name">Chưa có sản phẩm</span>
                        </li>
                    </ul>`;
        helpers.setHTML(id, html)
    },
    updateTotal: function () { }

}
let cardProduct = {
    getProduct: async function () {
        let url = "https://6362430966f75177ea2aae4d.mockapi.io/products"
        let response = await fetch(url)
        let data = await response.json()
        this.loadData(data);
    },
    loadData: async function (data) {
        let content = ""
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            content += `
            <div class="section__ourmenu--item">
                    <div class="section__ourmenu--item__wrapper">
                        <div class="container">
                            <div class="top" style="background:url('${element.image}') no-repeat center center ;"></div>
                            <div class="bottom" id="bottom-${element.Id}">
                                <div class="left">
                                    <div class="details">
                                        <h1 class="detail-name">${element.name}</h1>
                                        <p>${element.price}</p>
                                    </div>
                                    <div class="buy add-to-cart" 
                                        data-id="${element.Id}"  
                                        data-name="${element.name}"  
                                        data-price="${element.price}"  
                                        data-image="${element.image}"  
                                    ><i class="material-icons " >add_shopping_cart</i></div>

                                </div>
                                <div class="right">
                                    <div class="done"><i class="material-icons">done</i></div>
                                    <div class="details">
                                        <h1>${element.name}</h1>
                                        <p>Added to your cart</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="inside">
                            <div class="icon"><i class="material-icons">info_outline</i></div>
                            <div class="contents">
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae magnam eligendi iusto dolores obcaecati! Error, beatae dignissimos? Voluptatibus maxime temporibus, consequatur vero quam facilis eos autem nihil iure animi.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        // console.log(content);
        await $(".section__ourmenu__food").html(content)
        new Cuttr(".detail-name", {
            truncate: 'characters',
            length: 11,
            ending: '...',
            readMoreBtnTag: 'button',
        });
    }

}
document.addEventListener("DOMContentLoaded", () => {
    
    cardProduct.getProduct()
    if (localAdapter.getCart()) {
        cart.setItems(localAdapter.getCart())
        helpers.updateView()
    } else {
        helpers.emptyView()
    }
    $(document).on("click", ".add-to-cart", function (e) {
        // let id = $(this).data("id")
        // $(`#bottom-${id}`).addClass("clicked");
        // setTimeout(() => {
        //     $(`#bottom-${id}`).removeClass("clicked");
        // }, 1000);
        let item = helpers.itemData($(this))
        console.log(item);
        cart.addItem(item)
    })
})

