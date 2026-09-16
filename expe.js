let a = document.getElementById("exp");
let am = document.getElementById("am");
let b = document.getElementById("btn");

let list = document.getElementById("list");

let inco = document.getElementById("inco");
let expense = document.getElementById("expen");

let sum = document.getElementById("sum");
let all = document.getElementById("all");

let clear = document.getElementById("clear");

let transaction = document.getElementById("transaction");
let dashboard = document.getElementById("dashboard");

let currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// ===============================
// CHECK LOGIN
// ===============================

if (!currentUser) {
    window.location.href = "login.html";
}


// ===============================
// USER STORAGE
// ===============================

let storageKey =
    "expense_" + currentUser.email;

let array =
    JSON.parse(localStorage.getItem(storageKey)) || [];


// ===============================
// DATE
// ===============================

let DateInput =
    document.getElementById("date");


// ===============================
// SET TODAY'S DATE
// ===============================

function setTodayDate() {

    if (DateInput) {

        let today = new Date();

        let year =
            today.getFullYear();

        let month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        let day =
            String(
                today.getDate()
            ).padStart(2, "0");

        DateInput.value =
            `${year}-${month}-${day}`;
    }
}


// Set today's date when page loads
setTodayDate();


// ===============================
// EDIT INDEX
// ===============================

let editindex = null;


// ===============================
// INITIAL PAGE
// ===============================

if (dashboard) {
    dashboard.style.display = "none";
}


// ===============================
// ADD TRANSACTION BUTTON
// ===============================

if (transaction) {

    transaction.addEventListener("click", () => {

        // Show transaction form
        if (dashboard) {
            dashboard.style.display = "block";
        }

        // Show search/filter area
        let searchArea =
            document.getElementById("searchArea");

        if (searchArea) {
            searchArea.style.display = "block";
        }

        // If we are NOT editing,
        // use today's date
        if (editindex === null) {
            setTodayDate();
        }

        // Scroll to form
        if (dashboard) {

            dashboard.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


// ===============================
// LOGOUT
// ===============================

let logout =
    document.getElementById("logout");

if (logout) {

    logout.addEventListener("click", () => {

        localStorage.removeItem("currentUser");

        window.location.href =
            "login.html";

    });

}


// ===============================
// ADD / UPDATE TRANSACTION
// ===============================

if (b) {

    b.addEventListener("click", () => {


        // =================================================
        // UPDATE MODE
        // =================================================

        if (editindex !== null) {


            // ===============================
            // VALIDATE NAME
            // ===============================

            if (a.value.trim() === "") {

                alert(
                    "Please enter transaction name"
                );

                return;
            }


            // ===============================
            // VALIDATE AMOUNT
            // ===============================

            if (
                am.value === "" ||
                Number(am.value) <= 0
            ) {

                alert(
                    "Please enter a valid amount"
                );

                return;
            }


            // ===============================
            // GET TYPE
            // ===============================

            let type = "";

            if (
                expense &&
                expense.checked
            ) {

                type = expense.value;

            }
            else if (
                inco &&
                inco.checked
            ) {

                type = inco.value;

            }
            else {

                alert(
                    "Please select Income or Expense"
                );

                return;
            }


            // ===============================
            // VALIDATE DATE
            // ===============================

            if (
                DateInput &&
                DateInput.value === ""
            ) {

                alert(
                    "Please select a date"
                );

                return;
            }


            array[editindex] = {

                Name:
                    a.value.trim(),

                Amount:
                    Number(am.value),

                Type:
                    type,

                Date:
                    DateInput
                        ? DateInput.value
                        : ""

            };



            localStorage.setItem(
                storageKey,
                JSON.stringify(array)
            );




            a.value = "";

            am.value = "";


            if (expense) {
                expense.checked = false;
            }


            if (inco) {
                inco.checked = false;
            }



            setTodayDate();


            // ===============================
            // EXIT EDIT MODE
            // ===============================

            editindex = null;


            b.innerText = "ADD";



            render(array);

            return;
        }




        let type = "";


   

        if (
            expense &&
            expense.checked
        ) {

            type = expense.value;

        }
        else if (
            inco &&
            inco.checked
        ) {

            type = inco.value;

        }
        else {

            alert(
                "Please select Income or Expense"
            );

            return;
        }




        if (a.value.trim() === "") {

            alert(
                "Please enter transaction name"
            );

            return;
        }


      

        if (
            am.value === "" ||
            Number(am.value) <= 0
        ) {

            alert(
                "Please enter a valid amount"
            );

            return;
        }




        if (
            DateInput &&
            DateInput.value === ""
        ) {

            alert(
                "Please select a date"
            );

            return;
        }


       

        let newTransaction = {

            Name:
                a.value.trim(),

            Amount:
                Number(am.value),

            Type:
                type,

            Date:
                DateInput
                    ? DateInput.value
                    : ""

        };



        array.push(newTransaction);




        localStorage.setItem(
            storageKey,
            JSON.stringify(array)
        );


       

        a.value = "";

        am.value = "";


        if (expense) {
            expense.checked = false;
        }


        if (inco) {
            inco.checked = false;
        }


       
        setTodayDate();




        editindex = null;

        b.innerText = "ADD";



        render(array);

    });

}




function render(data = array) {

    if (!list) {
        return;
    }




    list.innerHTML = "";




    let sumBtn =
        document.createElement("button");

    sumBtn.id = "sum";

    sumBtn.innerText = "Total";



    let totalText =
        document.createElement("h1");

    totalText.id = "all";


    list.appendChild(sumBtn);

    list.appendChild(totalText);




    let text =
        document.getElementById(
            "addtransaction"
        );


    if (text) {
        text.innerHTML = "";
    }




    data.forEach((item) => {

        let div =
            document.createElement("div");

        div.classList.add(
            "transaction-item"
        );


        // ===============================
        // TRANSACTION TEXT
        // ===============================

        let span =
            document.createElement("span");


        span.innerText =
            item.Name +
            " - ₹" +
            item.Amount +
            " - " +
            item.Type +
            " - " +
            item.Date;


        // =================================================
        // EDIT BUTTON
        // =================================================

        let upd =
            document.createElement("button");


        upd.innerHTML =
            `<i class="fa-solid fa-pen"></i>`;


        upd.classList.add(
            "edit-btn"
        );


        upd.addEventListener("click", () => {




            editindex =
                array.indexOf(item);


    

            if (dashboard) {
                dashboard.style.display = "block";
            }


            // ===============================
            // SHOW SEARCH/FILTER AREA
            // ===============================

            let searchArea =
                document.getElementById(
                    "searchArea"
                );


            if (searchArea) {
                searchArea.style.display =
                    "block";
            }


            // ===============================
            // PUT NAME IN FORM
            // ===============================

            a.value =
                item.Name;


            // ===============================
            // PUT AMOUNT IN FORM
            // ===============================

            am.value =
                item.Amount;


            // ===============================
            // PUT DATE IN FORM
            // ===============================

            if (DateInput) {

                DateInput.value =
                    item.Date;

            }


            // ===============================
            // CLEAR BOTH TYPES FIRST
            // ===============================

            if (expense) {
                expense.checked = false;
            }

            if (inco) {
                inco.checked = false;
            }


            // ===============================
            // SELECT CORRECT TYPE
            // ===============================

            if (
                item.Type === "expense"
            ) {

                if (expense) {
                    expense.checked = true;
                }

            }
            else if (
                item.Type === "income"
            ) {

                if (inco) {
                    inco.checked = true;
                }

            }


            // ===============================
            // CHANGE ADD TO UPDATE
            // ===============================

            b.innerText =
                "UPDATE";


            // ===============================
            // SCROLL TO FORM
            // ===============================

            if (dashboard) {

                dashboard.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });


        // =================================================
        // DELETE BUTTON
        // =================================================

        let delBtn =
            document.createElement("button");


        delBtn.innerHTML =
            `<i class="fa-solid fa-trash"></i>`;


        delBtn.classList.add(
            "delete-btn"
        );


        delBtn.addEventListener("click", () => {


            // ===============================
            // GET REAL INDEX
            // ===============================

            let realIndex =
                array.indexOf(item);


            // ===============================
            // DELETE
            // ===============================

            if (realIndex !== -1) {

                array.splice(
                    realIndex,
                    1
                );

            }


            // ===============================
            // SAVE
            // ===============================

            localStorage.setItem(
                storageKey,
                JSON.stringify(array)
            );


            // ===============================
            // IF EDITING DELETED ITEM
            // ===============================

            if (
                editindex === realIndex
            ) {

                editindex = null;

                b.innerText = "ADD";

                a.value = "";

                am.value = "";


                if (expense) {
                    expense.checked = false;
                }


                if (inco) {
                    inco.checked = false;
                }


                setTodayDate();

            }


            // ===============================
            // RENDER
            // ===============================

            render(array);

        });


        // ===============================
        // APPEND ELEMENTS
        // ===============================

        div.appendChild(span);

        div.appendChild(upd);

        div.appendChild(delBtn);


        if (text) {

            text.appendChild(div);

        }
        else {

            list.appendChild(div);

        }

    });


    // =================================================
    // TOTAL BUTTON
    // =================================================

    sumBtn.addEventListener("click", () => {


        let total =
            array.reduce(
                (total, item) => {

                    return total +
                        Number(item.Amount);

                },
                0
            );


        totalText.innerText =
            "Total = ₹" + total;

    });

}


// =====================================================
// CLEAR ALL TRANSACTIONS
// =====================================================

if (clear) {

    clear.addEventListener("click", () => {


        // Empty array
        array = [];


        // Remove from localStorage
        localStorage.removeItem(
            storageKey
        );


        // Clear transaction display
        let text =
            document.getElementById(
                "addtransaction"
            );


        if (text) {
            text.innerHTML = "";
        }


        // Reset edit mode
        editindex = null;


        if (b) {
            b.innerText = "ADD";
        }


        // Clear form
        if (a) {
            a.value = "";
        }


        if (am) {
            am.value = "";
        }


        if (expense) {
            expense.checked = false;
        }


        if (inco) {
            inco.checked = false;
        }


        // Set today's date
        setTodayDate();


        // Render
        render(array);

    });

}


// =====================================================
// EXPENSE TOTAL
// =====================================================

let expenseButton =
    document.getElementById("Expense");


let expenseText =
    document.getElementById("ex");


if (expenseButton) {

    expenseButton.addEventListener("click", () => {


        let expenseTotal =
            array

                .filter(
                    item =>
                        item.Type === "expense"
                )

                .reduce(
                    (total, item) =>
                        total +
                        Number(item.Amount),
                    0
                );


        if (expenseText) {

            expenseText.innerText =
                "Expense = ₹" +
                expenseTotal;

        }

    });

}


// =====================================================
// INCOME TOTAL
// =====================================================

let incomeButton =
    document.getElementById("Income");


let incomeText =
    document.getElementById("in");


if (incomeButton) {

    incomeButton.addEventListener("click", () => {


        let incomeTotal =
            array

                .filter(
                    item =>
                        item.Type === "income"
                )

                .reduce(
                    (total, item) =>
                        total +
                        Number(item.Amount),
                    0
                );


        if (incomeText) {

            incomeText.innerText =
                "Income = ₹" +
                incomeTotal;

        }

    });

}


// =====================================================
// SEARCH
// =====================================================

let search =
    document.getElementById("search");


if (search) {

    search.addEventListener("input", () => {


        let value =
            search.value
                .toLowerCase()
                .trim();


        let store =
            array.filter(item => {

                return item.Name
                    .toLowerCase()
                    .includes(value);

            });


        render(store);

    });

}


// =====================================================
// DATE FILTER
// =====================================================

if (DateInput) {

    DateInput.addEventListener("change", () => {


        let dateValue =
            DateInput.value;


        if (dateValue === "") {

            render(array);

            return;

        }


        let filteredData =
            array.filter(item => {

                return item.Date ===
                    dateValue;

            });


        render(filteredData);

    });

}


// =====================================================
// TYPE FILTER
// =====================================================

let select =
    document.getElementById("select");


if (select) {

    select.addEventListener("change", () => {


        let value =
            select.value;


        if (value === "all") {

            render(array);

        }
        else {

            let filterData =
                array.filter(
                    item =>
                        item.Type ===
                        value
                );


            render(filterData);

        }

    });

}


// =====================================================
// FIRST RENDER
// =====================================================

render(array);