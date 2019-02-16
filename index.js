//cart-dom
const cartDom = document.querySelector('.cart');

//all food items button
const addToCartButtonsDom = document.querySelectorAll('#add_to_cart_button');

//loop into selected buttons
addToCartButtonsDom.forEach(addToCartButtonDom => {
    //get selected item
    addToCartButtonDom.addEventListener('click', () => {
        //selected item
        let clickedProductDom = addToCartButtonDom.parentNode;
        const producEle = clickedProductDom.parentNode;

        //make a produc object from an item
        const product = {
            image: producEle.querySelector('.card-img-top').getAttribute('src'),
            name: producEle.querySelector('.food-title').innerText,
            price: producEle.querySelector('.food-price').innerText
        }
        //moved to cart place
        cartDom.insertAdjacentHTML("beforeend", `
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span>${product.name}</span>
                        <span><img src="${product.image}" alt="${product.name}"></span>
                         <span class="badge badge-primary badge-pill">${product.price}</span>
                    </li>
                </ul>
            `)
    })
});

/*Note:- other method to loop into an array

    Array.from(addToCartButtonsDom).forEach((foo)=>{
        return foo;
    })
*/