let products = [
    {
        id:1,
        name:"ShoesA",
        price: 4000
    },

    {
        id:2,
        name:"ShoesB",
        price: 4500
    },

    {
        id:3,
        name:"ShoesC",
        price: 3500
    },

    {
        id:4,
        name:"ShoesD",
        price: 5430
    },

    {
        id:5,
        name:"ShoesE",
        price: 4330
    },
]


let arr = [];
const productContainer = document.querySelector("#product-container");
function render(){
    // productContainer.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.innerHTML = `
        <h3>${product.name}<h3>
        <p>${product.price}<p>
        <button data-id=${product.id}
        data-name="${product.name}" 
        data-price=${product.price}> Add to cart </button>
        `;

        productContainer.appendChild(productCard);
        
    })
}
 render();

 const addButtons = document.querySelectorAll("#product-container button");
        addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if(!arr.includes(Number(id))){
        const billContainer = document.querySelector('#bill');
            const productCart = document.createElement('div');
            productCart.id = `product-${id}`;
            productCart.innerHTML = `
            <h3>${e.target.dataset.name}</h3>
            <p>${e.target.dataset.price}</p>
            <p>quantity : 
            <span class="qty">0</span> 
            </p>
            `
            billContainer.appendChild(productCart);
            arr.push(Number(id));
        }else{
            const quantity = document.querySelector(`#product-${id} .qty`);
            quantity.textContent = Number(quantity.textContent) + 1;
            console.log(quantity.textContent);
        }
            console.log(e.target.dataset.name);
            console.log(e.target.dataset.price);
            
        console.log("Button click" , id); 
    })
})


