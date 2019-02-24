//cart-dom
const cartDom = document.querySelector('.cart');
let cart = [];

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
                        <span class="badge badge-success badge-pill decrease" data-action="decr_quantity">&minus;</span>
                        <span class="product-qty">${product.quantity}</span>
                        <span class="badge badge-success badge-pill increase" data-action="incr_quantity">&plus;</span>
                        <span class="badge badge-primary badge-pill">${product.price}</span>
                        <span class="badge badge-danger badge-pill delete">&times;</span>
                    </li>
                </ul>
                `);

            cart.push(product);
            addToCartButtonDom.innerText = 'In Cart';
            addToCartButtonDom.classList.add("button-disable");
        }

        //cart functionality
        const cartItemDom = document.querySelectorAll('.list-group-item');
        cartItemDom.forEach(itemSelectedCartItemDom => {

            if (itemSelectedCartItemDom.querySelector('.product-name').innerText === product.name) {
                itemSelectedCartItemDom.querySelector('[data-action="decr_quantity"]').addEventListener('click', () => {
                    cart.forEach(cartItem => {
                        if (cartItem.name === product.name && cartItem.quantity > 0) {
                            itemSelectedCartItemDom.querySelector('.product-qty').innerText = --cartItem.quantity;
                        }
                    })
                })
                itemSelectedCartItemDom.querySelector('[data-action="incr_quantity"]').addEventListener('click', () => {
                    cart.forEach(cartItem => {
                        if (cartItem.name === product.name) {
                            itemSelectedCartItemDom.querySelector('.product-qty').innerText = ++cartItem.quantity;
                        }
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