let cart = [];
document.getElementById('targetEl').innerText = cart.length;

document.getElementById('small-dev').style.display = "none";
//cart-dom
const appWindowWidth = window.innerWidth;
let cartDom;
if (appWindowWidth < 992) {
    cartDom = document.querySelector('.cart-sm');
    document.getElementById('small-dev').style.display = "none";
} else {
    cartDom = document.querySelector('.cart');
}

//cartIcon show- only for small devices
const cartIconDom = document.querySelector('.show-cart');

//all food items button
const addToCartButtonsDom = document.querySelectorAll('#add_to_cart_button');

//loop into selected buttons
addToCartButtonsDom.forEach(addToCartButtonDom => {
    //get selected item
    addToCartButtonDom.addEventListener('click', () => {

        //selected item
        let clickedProductDom = addToCartButtonDom.parentNode;
        const itemSelected = clickedProductDom.parentNode;

        //make a produc object from an item
        const product = {
            image: itemSelected.querySelector('.card-img-top').getAttribute('src'),
            name: itemSelected.querySelector('.food-title').innerText,
            price: itemSelected.querySelector('.food-price').innerText,
            quantity: 1
        }

        //check with cart and product
        const isInCart = cart.filter(cartItem => (cartItem.name === product.name)).length > 0;
        if (!isInCart) {
            //moved to cart place
            cartDom.insertAdjacentHTML("beforeend", `
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span class="product-name">${product.name}</span>
                        <span><img src="${product.image}" alt="${product.name}"></span>
                        <span class="badge badge-success badge-pill decrease badge-danger" data-action="decr_quantity">&minus;</span>
                        <span class="product-qty">${product.quantity}</span>
                        <span class="badge badge-success badge-pill increase" data-action="incr_quantity">&plus;</span>
                        <span class="badge badge-primary badge-pill">${product.price}</span>
                        <span class="badge badge-danger badge-pill delete" data-action="delete_item">&times;</span>
                    </li>
                </ul>
            `);

            cart.push(product);
            cartIconDom.classList.add('show-cart-sm-dev');
            addToCartButtonDom.innerText = 'In Cart';
            addToCartButtonDom.disabled = true;
            document.getElementById('small-dev').style.display = "block";
            document.getElementById('targetEl').innerText = cart.length;
            document.getElementById('small-targetEl').innerText = cart.length;
        }

        //cart functionality
        const cartItemDom = document.querySelectorAll('.list-group-item');
        cartItemDom.forEach(itemSelectedCartItemDom => {

            if (itemSelectedCartItemDom.querySelector('.product-name').innerText === product.name) {

                //inc product quantity
                itemSelectedCartItemDom.querySelector('[data-action="incr_quantity"]').addEventListener('click', () => {
                    cart.forEach(cartItem => {
                        if (cartItem.name === product.name) {
                            itemSelectedCartItemDom.querySelector('.product-qty').innerText = ++cartItem.quantity;
                            itemSelectedCartItemDom.querySelector('[data-action="decr_quantity"]').classList.remove('badge-danger')
                        }
                    })
                })

                //dec product quantity
                itemSelectedCartItemDom.querySelector('[data-action="decr_quantity"]').addEventListener('click', () => {
                    cart.forEach(cartItem => {
                        if (cartItem.name === product.name) {
                            if (cartItem.quantity > 1) {
                                itemSelectedCartItemDom.querySelector('.product-qty').innerText = --cartItem.quantity;
                            }
                            else {
                                itemSelectedCartItemDom.classList.add('cart-item-removed');
                                setTimeout(() => itemSelectedCartItemDom.remove(), 300);
                                cart = cart.filter(cartItem => cartItem.name != product.name);
                                addToCartButtonDom.innerText = 'Add to Cart';
                                addToCartButtonDom.disabled = false;
                            }
                            if (cartItem.quantity === 1) {
                                itemSelectedCartItemDom.querySelector('[data-action="decr_quantity"]').classList.add('badge-danger');
                            }
                        }
                        document.getElementById('targetEl').innerText = cart.length;
                        document.getElementById('small-targetEl').innerText = cart.length;
                    })
                    if (cart.length < 1) {
                        cartIconDom.classList.remove('show-cart-sm-dev');
                        drawer.closeDrawer();
                        document.getElementById('small-dev').style.display = "none";
                    }
                })

                //delete product quantity
                itemSelectedCartItemDom.querySelector('[data-action="delete_item"]').addEventListener('click', () => {
                    cart.forEach(cartItem => {
                        if (cartItem.name === product.name) {
                            itemSelectedCartItemDom.classList.add('cart-item-removed');
                            setTimeout(() => itemSelectedCartItemDom.remove(), 300);
                            cart = cart.filter(cartItem => cartItem.name != product.name);
                            addToCartButtonDom.innerText = 'Add to Cart';
                            addToCartButtonDom.disabled = false;
                        }
                        if (cart.length < 1) {
                            cartIconDom.classList.remove('show-cart-sm-dev');
                            drawer.closeDrawer();
                            document.getElementById('small-dev').style.display = "none";
                        }
                        document.getElementById('targetEl').innerText = cart.length;
                        document.getElementById('small-targetEl').innerText = cart.length;
                    })
                })

            }

        });


    })

});









/*Note:- other method to loop into an array
    Array.from(addToCartButtonsDom).forEach((foo)=>{
        return foo;
    })
*/



