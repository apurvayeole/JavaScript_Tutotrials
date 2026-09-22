const Price = document.querySelector("#price");
const Quantity = document.querySelector("#quantity");

const CartBtn = document.querySelector("#cart-btn");

const Items = document.querySelector("#items");

const ProductName = document.querySelector("#product-name");
function validate(quantity){
    console.log("4");
    if(quantity >= 1){
        return true;
    }else{
        throw new Error ("Enter valid quantity!");
    }
}
function total(price, quantity){
    try{
    
    validate(quantity);
    console.log(price);
    console.log(quantity);
    console.log(price*quantity);
    return price*quantity;
    }catch(err){
        console.log("Error : " + err.message);
    }
}

CartBtn.addEventListener("click", (event) =>{
    console.log("1");
    const cost = total(Price.textContent, Quantity.value);
    console.log("2");
    const item = document.createElement("div");
    const proName = document.createElement("p");
    const proQuantity = document.createElement("p");
    const proTotalCost = document.createElement("p");

    proTotalCost.textContent = cost;
    proName.textContent = ProductName.textContent;
    proQuantity.textContent = Quantity.value;

    console.log("3");
    Items.appendChild(item);
    item.appendChild(proName);
    item.appendChild(proQuantity);
    item.appendChild(proTotalCost);
    console.log("6");

})


