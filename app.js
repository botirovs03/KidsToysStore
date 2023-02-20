// Load JSON data and make page resposive
import JsonProduct from "./products.json" assert { type: "json" };
// to make BestSeller Slider work Smooth
document.querySelector(".item").remove()
// check whether products exists in local storage 
if (localStorage.getItem("LocalProducts") == null) {
    localStorage.setItem("LocalProducts", JSON.stringify([]))
} else {
    let LocalProduct = JSON.parse(localStorage.getItem("LocalProducts"))
    LocalProduct.forEach(e => {
        JsonProduct.push(e)
    })
    console.log(LocalProduct)
}

localStorage.setItem("IdentityNumber", JsonProduct.length + 1)
let products = JsonProduct
console.log(products)
let screenBig = false;
let screenMin = false;
let isOpen = false;
let cart;
let screenSize = 768
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "100",
    "hideDuration": "200",
    "timeOut": "1000",
    "extendedTimeOut": "500",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

if (window.innerWidth <= screenSize) {
    screenMin = true;
    cart = document.querySelector("#cartMax").innerHTML
    document.querySelector("#cartMenu").remove();
    document.querySelector("#cartMin").innerHTML = cart
    document.querySelector("#cartMenu").classList.remove("cartMenuMax")
    document.querySelector("#cartMenu").classList.add("cartMenuMin")
} else {
    screenBig = true;
}

function LoadProduct(params = "", age = null) {
    const main = document.querySelector("#items");
    const top = document.querySelector("#bestsellers")
    products.forEach(product => {
        if ((age == null) ? true : product.age == age) {
            if (product.name.toLowerCase().includes(params.toLowerCase())) {
                let item = MakeProduct(product);
                if (product.best) {
                    const productDispay = document.createElement("div");
                    productDispay.setAttribute("class", "item");
                    productDispay.setAttribute("data-products", "product");
                    productDispay.innerHTML = item;
                    top.append(productDispay);
                } else {
                    const productDispay = document.createElement("div");
                    // productDispay.setAttribute("class", "col-lg-4 col-md-6 p-2");
                    productDispay.setAttribute("class", " col-lg-4 col-md-4 col-sm-6 p-2");
                    productDispay.setAttribute("data-products", "product");
                    productDispay.innerHTML = item;
                    main.append(productDispay);
                }
            }
        }
    });
}
LoadProduct()

document.querySelector("#SearchButton").onclick = function () {
    document.querySelectorAll('div[data-products="product"]').forEach(el => el.remove());
    let SearchText = document.querySelector("#SearchTerm").value
    // console.log(SearchText)
    LoadProduct(SearchText)
    AddToCartButtonsHandle()
}

document.querySelectorAll(".AgeButton").forEach(e => {
    e.onclick = function () {
        document.querySelectorAll('div[data-products="product"]').forEach(el => el.remove());
        // let SearchText = document.querySelector("#SearchTerm").value
        let age = e.getAttribute("data-age")
        // console.log(SearchText)
        LoadProduct(undefined, age)
        AddToCartButtonsHandle()
    }
});


function MakeProduct(product) {
    let a = ""
    if (product.best) {
        a = `
            <p class="card-text">
                <img src="${product.image.slice(0, 5) != "data:" ? "images/" + product.image : product.image}" style="width: 100%;">
              </p>
              <div class="bestName">
                ${product.name} 
              </div>
              <div class="text-center bestCart">
                <span class="bprice">${"Price: $" + product.price} </span>
                <a class="AddToCartSel bestButton" data-productId="${product.id}">
                        To Cart
                </a>
              </div>
          `
    } else {
        a = `
    <div class="col-12 p-1" style="border-radius: 10px; block-size: fit-content; background-color: white;">

            <div class="imageBack">
                <img src="${product.image.slice(0, 5) != "data:" ? "images/" + product.image : product.image}" class="card-img-top rounded ProductImage" />
            </div>
            <div class="ProductCard">
                <div class="card-body">
                    <div class="pl-1">
                        <p class="PrTitle">
                            ${product.name}
                        </p>
                    </div>
                    <div class="pl-1">
                        <p class="ProductDescription" title="${product.description}">
                        ${product.description}
                        </p>
                    </div>
                    <div class="pl-1">
                        <div class="PrPrice">
                            ${product.price}
                        </div>
                    </div>
                </div>
            </div>
            <div class="mx-4 mb-4">
                <a class="form-control mt-1 AddToCart AddToCartSel" data-productId="${product.id}">
                    add to cart
                </a>
            </div>
            
        </div>
`
    }

    return a;
}
// let CartMenu = document.querySelector("#cartMenu");
// document.querySelector("#cartMenu a").onclick = function () {
//     document.querySelector("#cartMenu").classList.toggle("cartMenu-hidden")
//     setTimeout(() => {
//         document.querySelector("#siteBody").classList.toggle("poswidth1")
//         document.querySelector("#siteBody").classList.toggle("poswidth2")
//     }, 500);
//     document.querySelector("#cartMenu").style.height = "0px";

// }

document.querySelector("#CartIcon").onclick = function () {
    isOpen = !isOpen
    if (document.querySelector("#cartMenu").classList.contains("cartMenu-hidden")) {
        document.querySelector("#siteBody").classList.toggle("poswidth1")
        document.querySelector("#siteBody").classList.toggle("poswidth2")
        if (screenMin) {
            document.querySelector("#cartMenu").style.height = "25vh";
        } else {
            document.querySelector("#cartMenu").style.height = "calc( 100vh - 60px - 2.5rem - 30px)";
        }
        setTimeout(() => {
            document.querySelector("#cartMenu").classList.toggle("cartMenu-hidden")
        }, screenBig ? 250 : 0);

    } else {
        document.querySelector("#cartMenu").classList.toggle("cartMenu-hidden")
        setTimeout(() => {
            document.querySelector("#siteBody").classList.toggle("poswidth1")
            document.querySelector("#siteBody").classList.toggle("poswidth2")
        }, 500);
        document.querySelector("#cartMenu").style.height = "0px";
    }

}

window.onresize = resize;

function resize() {

    if (window.innerWidth <= screenSize) {
        screenMin = true
        cart = document.querySelector("#cartMax").innerHTML
        if (screenBig == screenMin) {
            document.querySelector("#cartMenu").remove();
            document.querySelector("#cartMin").innerHTML = cart
            document.querySelector("#cartMenu").classList.remove("cartMenuMax")
            document.querySelector("#cartMenu").classList.add("cartMenuMin")
            if (isOpen) {
                document.querySelector("#cartMenu").style.height = "25vh";
            }
            ReloadCartPanel()

        }
        screenBig = false
    } else {
        screenBig = true
        cart = document.querySelector("#cartMin").innerHTML
        if (screenBig == screenMin) {
            document.querySelector("#cartMenu").remove();
            document.querySelector("#cartMax").innerHTML = cart
            document.querySelector("#cartMenu").classList.remove("cartMenuMin")
            document.querySelector("#cartMenu").classList.add("cartMenuMax")
            if (isOpen) {
                document.querySelector("#cartMenu").style.height = "calc( 100vh - 60px - 2.5rem - 30px)";
            }
            ReloadCartPanel()
        }
        screenMin = false
    }
}

///////////////////////////////////////////////////////////////////////////
//Initialize Local storage variables


let CartProducts = {

}



function AddToCartButtonsHandle() {
    let AddToCartButtons = document.querySelectorAll(".AddToCartSel")
    AddToCartButtons.forEach(e => {
        CartProducts[e.getAttribute('data-productId')] = 0;
    });
    AddToCartButtons.forEach(e => {
        e.onclick = function () {
            if (CheckAcc()) {
                UserData = JSON.parse(localStorage.getItem(sessionStorage.getItem('ActiveUser')))
                if (UserData.CartProducts[e.getAttribute('data-productId')] != null) {
                    UserData.CartProducts[e.getAttribute('data-productId')] = Number(UserData.CartProducts[e.getAttribute('data-productId')]) + Number(1);
                } else {
                    UserData.CartProducts[e.getAttribute('data-productId')] = Number(1);
                }
                localStorage.setItem(sessionStorage.getItem('ActiveUser'), JSON.stringify(UserData))
                // console.log(localStorage.getItem(sessionStorage.getItem('ActiveUser')))
                toastr["success"]("Added to Cart Succesfully")
                ReloadCartPanel()
            } else {
                Swal.fire({
                    template: '#my-template'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.assign(window.location.origin + "/Account/Login.html")
                    }
                    if (result.isDenied) {
                        if (localStorage.getItem("Guest") != null) {
                            var User = {
                                FullName: "Guest",
                                UserName: "Guest",
                                Email: "Guest"
                            }
                            localStorage.setItem("Guest", JSON.stringify(User))
                        }
                        sessionStorage.setItem("ActiveUser", "Guest")
                        window.location.assign(window.location.origin)
                    }
                })
            }
        }
    });
}
AddToCartButtonsHandle()
/////////
// Cart Load


let UserData = undefined
function CheckAcc() {
    if (sessionStorage.getItem('ActiveUser') == null) {
        console.log("please login")

        return false;
    } else {
        UserData = JSON.parse(localStorage.getItem(sessionStorage.getItem('ActiveUser')))
        if (UserData.CartProducts == undefined) {
            UserData.CartProducts = CartProducts
            localStorage.setItem(sessionStorage.getItem('ActiveUser'), JSON.stringify(UserData))
        }
        return true
    }
}



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

}


function CartMake(productNumber, key) {
    let product
    products.forEach(u => {
        if (u.id == key) {
            product = u
        }
    })
    let cart = `<div class="ItemImage">
    <img class="imgIcon" src="${product.image.slice(0, 5) != "data:" ? "images/" + product.image : product.image}" alt="product image">
  </div>
  <div class="ItemTitle">
    <div class="cartTitle" >
      ${product.name}
    </div>
    <div>
    <span id="price">${product.price}</span> x 
    <input class="CartItemNumbers" type="number" id="quantity" name="quantity" min="0" max="99" value="${productNumber}">
    <span class="DeleteButton">
    <i class="bi bi-trash delIcon" style="margin-left:5px"></i>
    </span>
    </div>
    <hr>
  </div>
  `

    return cart;
}



function CartReload() {
    let cartMenu = document.querySelector("#cartMenu");
    document.querySelector("#CartItems").remove();
    let CartItemsList = document.createElement("div");
    CartItemsList.setAttribute("id", "CartItems");
    cartMenu.append(CartItemsList);
}

function ReloadCartPanel() {
    CartReload();
    CartLoad();
    AddButton();
    DeleteButton()
    TotalCalculate()
}


function AddButton() {
    let inputN = document.querySelectorAll("div[data-productcartid]");
    inputN.forEach(u => {
        let productcartid = u.getAttribute("data-productcartid")
        u.querySelector(".CartItemNumbers").addEventListener('input', function () {
            // console.log(productcartid);
            let Data = JSON.parse(localStorage.getItem(sessionStorage.getItem("ActiveUser")))
            Data.CartProducts[productcartid] = this.value

            localStorage.setItem(sessionStorage.getItem("ActiveUser"), JSON.stringify(Data))
            // console.log(Data)
            // console.log(JSON.parse(localStorage.getItem(sessionStorage.getItem("ActiveUser"))))
            if (this.value < 1 && this.value != '') {
                toastr["info"]("Item removef from Cart")
                ReloadCartPanel()
            }
            TotalCalculate()

        })
        // console.log(inputN[0].querySelector(".CartItemNumbers").value);

    })
}

function DeleteButton(params) {
    let inputN = document.querySelectorAll("div[data-productcartid]");
    inputN.forEach(u => {
        let productcartid = u.getAttribute("data-productcartid")
        u.querySelector(".DeleteButton").addEventListener('click', function () {
            // console.log(productcartid);
            let Data = JSON.parse(localStorage.getItem(sessionStorage.getItem("ActiveUser")))
            Data.CartProducts[productcartid] = 0;

            localStorage.setItem(sessionStorage.getItem("ActiveUser"), JSON.stringify(Data))
            // console.log(Data)
            // console.log(JSON.parse(localStorage.getItem(sessionStorage.getItem("ActiveUser"))))
            toastr["info"]("Item removef from Cart")
            ReloadCartPanel()
        })
        // console.log(inputN[0].querySelector(".CartItemNumbers").value);


    })
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
ReloadCartPanel()

document.querySelector("#BuyButton").onclick = function () {
    Swal.fire({
        template: '#my-template-buy'
    })

    // Swal.fire({
    //     title: 'Your order placed',
    //     width: 600,
    //     padding: '3em',
    //     color: '#716add',
    //     background: '#fff url(/images/trees.png)',
    //     backdrop: `
    //       rgba(0,0,123,0.4)
    //       url("/images/nyan-cat.gif")
    //       left top
    //       no-repeat
    //     `
    //   })
}