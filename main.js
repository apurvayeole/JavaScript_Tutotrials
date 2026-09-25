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
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <input type="number" class="qty-input" min="1" value="1">
        <button data-id=${product.id}
        data-name="${product.name}" 
        data-price=${product.price}> Add to cart </button>
        <p class="error-msg"></p>
        `;
        productContainer.appendChild(productCard);
        
    })
}
 render();
 checkEmptyCart();
productContainer.addEventListener('input', (e) => {
    if(e.target.matches('.qty-input')){
        e.target.parentElement.querySelector('.error-msg').textContent = "";
    }
});
let recentTotal = 0;
 const addButtons = document.querySelectorAll("#product-container button");
        addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;

        const productCard = e.target.parentElement;
        const qtyInput = productCard.querySelector('.qty-input');
        const errorMsg = productCard.querySelector('.error-msg');

        let quantity;
        try{
            quantity = validate(qtyInput.value);
            errorMsg.textContent = "";
        }catch(err){
            errorMsg.textContent = err.message;
            qtyInput.focus();
            return;
        }
        if(!arr.includes(Number(id))){
        const billContainer = document.querySelector('#bill');
            const productCart = document.createElement('div');
            productCart.id = `product-${id}`;
            productCart.innerHTML = `
            <h3>${e.target.dataset.name}</h3>
            <p>${e.target.dataset.price}</p>
            <p>quantity : 
            <span class="qty">${quantity}</span> 
            </p>
            <button data-id="${id}">Remove</button>
            `
            billContainer.appendChild(productCart);
            arr.push(Number(id));

            recentTotal = calculateTotal(quantity,e.target.dataset.price, recentTotal);
            console.log(recentTotal);

            

        }else{
            const quantityDisplay = document.querySelector(`#product-${id} .qty`);
            quantityDisplay.textContent = Number(quantityDisplay.textContent) + quantity;
            recentTotal = calculateTotal(quantity,e.target.dataset.price, recentTotal);
            console.log(recentTotal);
        }
            const totalAmtDigit = document.querySelector("#totalAmtDigit");
            totalAmtDigit.textContent = formatPrice(recentTotal);
            console.log("recent total" , recentTotal);
             checkEmptyCart();
    })
   
})
const billContainer = document.querySelector('#bill');
billContainer.addEventListener('click', (e) =>{
                if(e.target.matches('button')){
                    const removeID = e.target.dataset.id;
                    const cartItem = document.getElementById(`product-${removeID}`);
                    const qty = Number(cartItem.querySelector('.qty').textContent);
                    const product = products.find(p=>p.id === Number(removeID));
                    cartItem.remove();
                    arr = arr.filter(x => x !== Number(removeID));
                    recentTotal = calculateTotal(-qty, product.price, recentTotal);
                    document.querySelector("#totalAmtDigit").textContent = formatPrice(recentTotal);
                    checkEmptyCart();
                }
                 
            })
           
function validate(value){
    const amount = Number(value);
    if(value.trim() === ""){
        throw new Error("Please enter a quantity");
    }
    if(!Number.isInteger(amount)){
        throw new Error("Quantity must be a whole number");
    }
    if(amount <= 0){
        throw new Error("Quantity must be greater than 0");
    }
    return amount;
}
function formatPrice(amount){
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}
function calculateTotal(qty, price, recentTotal){
    recentTotal += price * qty;
    return recentTotal;
}

function checkEmptyCart(){
    const emptyMsg = document.querySelector("#emptyMsg");
    if(arr.length === 0){
        emptyMsg.style.display="block";
    }else{
        emptyMsg.style.display="none";
    }
}