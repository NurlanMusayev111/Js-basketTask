"use strict";



let basket = [];


if(JSON.parse(localStorage.getItem("basket") == null)){

    localStorage.setItem("basket",JSON.stringify(basket))
}else{

    basket = JSON.parse(localStorage.getItem("basket"))
}


getBasketCount(basket)

function getBasketCount(arr){
    let basketCount = 0;
    if(arr.length != 0){
        for (const item of arr) {
            basketCount += item.count
        }
    }

    document.querySelector("#navbar .count").innerText = basketCount;
}




let addBtns = document.querySelectorAll("#shopping .add");


addBtns.forEach(btn => {
    btn.addEventListener("click",function(e){

        e.preventDefault();
        let productId = this.parentNode.parentNode.getAttribute("data-id")
        let productName = this.parentNode.firstElementChild.innerText;
        let productDesc = this.previousElementSibling.innerText;
        let productImage = this.parentNode.previousElementSibling.getAttribute("src");
        let productPrice = this.previousElementSibling.previousElementSibling.previousElementSibling.innerText;

        console.log(productPrice);

        let existsProduct = basket.find(m => m.id == productId);

        if(existsProduct !=undefined){
            existsProduct.count++;
        }else{
            basket.push({
                id:productId,
                name: productName,
                desc:productDesc,
                image:productImage,
                price:productPrice,
                count:1
            })
        }

        getBasketCount(basket)
    
        localStorage.setItem("basket",JSON.stringify(basket));
    })
});

