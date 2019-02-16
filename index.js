//cart-dom
const cartDom = document.querySelector('.cart');
console.log('cart---', cartDom)

//all food items button
const addToCartButtonsDom = document.querySelectorAll('.card');

//loop into selected buttons
addToCartButtonsDom.forEach(addToCartButtonDom => {
    //get selected item
    addToCartButtonDom.addEventListener('click', () => {
        //selected item
        const clickedProductDom = addToCartButtonDom.parentNode;
        //make a produc object from an item
        const product = {
            image: clickedProductDom.querySelector('.card-img-top').getAttribute('src'),
            name: clickedProductDom.querySelector('.food-title').innerText,
            price: clickedProductDom.querySelector('.food-price').innerText
        }
        cartDom.insertAdjacentHTML("beforeend", `
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${product.name}
                        <span><img src="${product.image}" alt="${product.name}"></span>
                         <span class="badge badge-primary badge-pill">${product.price}</span>
                    </li>
                </ul>
            `)
    })
});