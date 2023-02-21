document.addEventListener('DOMContentLoaded', function () {
    CartLoad()
})

let products = JSON.parse(localStorage.getItem("AllProducts"))
function CartLoad() {
    let Cartitems = document.querySelector("#CartItems");
    let ActiveUserData = JSON.parse(localStorage.getItem(sessionStorage.getItem('ActiveUser')))
    if (ActiveUserData != null) {
        for (const key in ActiveUserData.CartProducts) {
            if (ActiveUserData.CartProducts[key] != 0) {
                let item = CartMake(ActiveUserData.CartProducts[key], Number(key))
                let cartDispay = document.createElement("div");
                cartDispay.setAttribute("class", "itemFlex");
                cartDispay.setAttribute("data-productCartId", key);
                cartDispay.innerHTML = item;
                Cartitems.append(cartDispay);
            }

        }
    } else {
        console.log("No cart data")
    }
    TotalCalculate()
}


function CartMake(productNumber, key) {
    let product
    products.forEach(u => {
        if (u.id == key) {
            product = u
        }
    })
    let cart = `
    <div class="cartTitle">
    <b>
      ${product.name}
      </b>
    </div>
    <div>
    <span id="price">$ ${product.price} x ${productNumber}</span> 
    <span class="price">$ ${(product.price * productNumber).toFixed(2)}</span></p>
    </div>
  </div>
  `
    return cart;
}

function TotalCalculate() {
    let total = 0;
    let ActiveUserData = JSON.parse(localStorage.getItem(sessionStorage.getItem('ActiveUser')))
    if (ActiveUserData != null) {
        for (const key in ActiveUserData.CartProducts) {
            if (ActiveUserData.CartProducts[key] != 0) {
                products.forEach(u => {
                    if (u.id == key) {
                        total += (ActiveUserData.CartProducts[key] * u.price)
                    }
                })
            }

        }
    }
    document.getElementById("TotalValue").innerHTML = total.toFixed(2);

}

function Complete() {
    Swal.fire({
        title: 'Uploading...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });
    setTimeout(function() {
        Swal.close()
        Swal.fire({
            icon: 'success',
            title: 'Your payment has been confirmed! Thank you for shopping with us)',
            showConfirmButton: false,
            timer: 2000
        }).then(r => {
            let user = JSON.parse(localStorage.getItem(sessionStorage.getItem("ActiveUser")))
            user.CartProducts = {}
            localStorage.setItem(sessionStorage.getItem("ActiveUser"),JSON.stringify(user))
            window.location.href = window.location.origin;
        })
    }, 4000);

}