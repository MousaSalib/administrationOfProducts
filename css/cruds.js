let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("submit");
let moodOfProject = "create";
let templete;
let moodOfSearch = "title";
let search = document.getElementById("search");

function calc() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "red";
    }else {
        total.style.background = "rgba(255, 0, 0, 0.5)";
        total.innerHTML = "";
    }
};

let array;
if (localStorage.product != null) {
    array = JSON.parse(localStorage.product)
}else {
    array = []
}
create.onclick = function () {
        let newObj = {
            title: title.value.toUpperCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toUpperCase(),
        };

        if (title.value !="" && price.value != "" && category.value !="" && newObj.count < 200) {
            if (moodOfProject === "create") {
                if(newObj.count > 0) {
                for(let i = 0; i < newObj.count; i++) {
                array.push(newObj);
                }
                }else {
                array.push(newObj);
                }
                }else {
                array[templete] = newObj;
                moodOfProject = "create";
                count.style.display = "block";
                create.innerHTML = "Create";
            }
            clearInfo()
        }
        
        localStorage.setItem("product", JSON.stringify(array));
        readInfo()
}
function clearInfo() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
function readInfo() {
    calc();
    let table = "";
    for(let i = 0; i < array.length; i++) {
        table += `
        <tr>
                        <td>${i + 1}</td>
                        <td>${array[i].title}</td>
                        <td>${array[i].price}</td>
                        <td>${array[i].ads}</td>
                        <td>${array[i].discount}</td>
                        <td>${array[i].total}</td>
                        <td>${array[i].category}</td>
                        <td><button onclick = update(${i})>update</button></td>
                        <td><button onclick = deleteOneItem(${i})>delete</button></td>
                    </tr>
        `
    }
    let btnDeleteAll = document.getElementById("deleteAll")
    if(array.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick = deleteAllItems()>Delete All (${array.length})</button>
        `
    }else {
        btnDeleteAll.innerHTML = "";
    }
    document.getElementById("table").innerHTML = table;
}
function deleteAllItems() {
    array.splice(0);
    localStorage.clear();
    readInfo();
}
readInfo()
function deleteOneItem(i) {
    array.splice(i,1);
    localStorage.product = JSON.stringify(array)
    readInfo();
}
function update(i) {
    title.value = array[i].title;
    price.value = array[i].price;
    taxes.value = array[i].taxes;
    ads.value = array[i].ads;
    discount.value = array[i].discount;
    calc();
    count.style.display = "none";
    category.value = array[i].category;
    create.innerHTML = "update"
    moodOfProject = "Update";
    templete = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

function inputsearch(id) {
    if(id === "searchtitle") {
        moodOfSearch = "Title";
    }else {
        moodOfSearch = "Category";
    }
    search.placeholder = "Search By " +moodOfSearch;
    search.focus();
    search.value = "";
    readInfo()
}
function searchTOrC(value) {
    let table = "";
    for(let i = 0; i < array.length; i++) {
        if(moodOfSearch === "Title") {
                    if(array[i].title.includes(value.toUpperCase())) {
                        table += `
                        <tr>
                                        <td>${i + 1}</td>
                                        <td>${array[i].title}</td>
                                        <td>${array[i].price}</td>
                                        <td>${array[i].ads}</td>
                                        <td>${array[i].discount}</td>
                                        <td>${array[i].total}</td>
                                        <td>${array[i].category}</td>
                                        <td><button onclick = update(${i})>update</button></td>
                                        <td><button onclick = deleteOneItem(${i})>delete</button></td>
                                    </tr>
                        `                    
                }
            }else {
                    if(array[i].category.includes(value.toUpperCase())) {
                    
                        table += `
                        <tr>
                                        <td>${i + 1}</td>
                                        <td>${array[i].title}</td>
                                        <td>${array[i].price}</td>
                                        <td>${array[i].ads}</td>
                                        <td>${array[i].discount}</td>
                                        <td>${array[i].total}</td>
                                        <td>${array[i].category}</td>
                                        <td><button onclick = update(${i})>update</button></td>
                                        <td><button onclick = deleteOneItem(${i})>delete</button></td>
                                    </tr>
                        `
                    
                } 
            }
    }
    document.getElementById("table").innerHTML = table;
}





