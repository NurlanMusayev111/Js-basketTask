"use strict";



let basket = [];


if (JSON.parse(localStorage.getItem("basket") == null)) {

    localStorage.setItem("basket", JSON.stringify(basket))
} else {

    basket = JSON.parse(localStorage.getItem("basket"))
}



getBasketCount(basket)

function getBasketCount(arr) {
    let basketCount = 0;
    if (arr.length != 0) {
        for (const item of arr) {
            basketCount += item.count
        }
    }

    document.querySelector("#navbar .count").innerText = basketCount;
}




function checkCardDatas(arr) {
    let cartAlert = document.querySelector(".alert-warning");
    let cartTable = document.querySelector(".cart-table")
    if (arr.length == 0) {
        cartAlert.classList.remove("d-none");
        cartTable.classList.add("d-none")
    } else {
        cartAlert.classList.add("d-none")
        cartTable.classList.remove("d-none")
    }
}


checkCardDatas(basket);


function getBasketDatas() {


    let tableBody = document.querySelector("tbody");

    let datas = "";

    basket.forEach(product => {

        datas += `<tr>
    <td><img src="${product.image}" style="height: 100px;width: 100px;" alt=""></td>
    <td>${product.name}</td>
    <td>${product.description}</td>
    <td><button class = "minus">-</button><input type="number" class="input" value="${product.count}" readonly><button class = "plus">+</button></td>
    <td>${product.price}</td>
    <td>${product.price * product.count}</td>
    <td><i class="fa-solid fa-xmark delete" data-id="${product.id}"></i></td>
    </tr>`

    });


    tableBody.innerHTML = datas
}


getBasketDatas();


function getGrandTotal(datas) {
    let grandTotal = 0;
    datas.forEach(data => {
        grandTotal += data.count * data.price
    });

    document.querySelector(".total").innerText = grandTotal
}


getGrandTotal(basket)





let deleteIcons = document.querySelectorAll(".delete");

deleteIcons.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", function () {
        basket = basket.filter(m => m.id !== parseInt(this.getAttribute("data-id")));
        localStorage.setItem("basket", JSON.stringify(basket));
        this.parentNode.parentNode.remove();
    });
});





