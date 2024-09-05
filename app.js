const time = document.getElementById("time");
const date = document.getElementById("date");
const mainContent = document.getElementById("main-content");
const mainContainer = document.getElementById("main-container");

const refresh = document.getElementById("refresh");
const empty = document.getElementById("empty");
const deleteListElement = document.getElementById("delete");
const add = document.getElementById("add");


//CLOCK AND DATE FUNCTIONS
function updateClock() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const hour = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');
    
    time.innerHTML = `${hour}:${minute}`;
    date.innerHTML = `${day}-${month}-${year}`;
}
updateClock();
setInterval(updateClock, 1000);

//LIST FUNCTIONS
function createList() {

    const listEmpty = document.createElement("img");
    listEmpty.classList.add("icons");
    listEmpty.id = "empty";
    listEmpty.setAttribute("src", "./assets/empty.png");

    const listRemove = document.createElement("img");
    listRemove.classList.add("icons");
    listRemove.id = "delete";
    listRemove.setAttribute("src", "./assets/delete.png");
    listRemove.style = "margin-left: auto";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.classList.add("todo-input");
    inputField.placeholder = "Type your todo...";

    const listElement = document.createElement("div");
    listElement.style = "margin-top: 5px"
    listElement.classList.add("list");

    listElement.append(listEmpty, inputField, listRemove);
    mainContent.appendChild(listElement);

    inputField.focus();

    inputField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const message = inputField.value.trim();
            if (message !== "") {
                const textElement = document.createElement("p");
                textElement.innerHTML = message;
                listElement.replaceChild(textElement, inputField);

            } else {
                if (mainContent.lastChild) {
                    mainContent.removeChild(mainContent.lastChild);
                }
            }
        } else if (event.key === "Escape") {
            mainContent.removeChild(mainContent.lastChild);
        }
    });

    listRemove.addEventListener("click", function() {
        listElement.remove();
    });
}


//ADD A TODO FUNCTION

add.addEventListener("click", createList);

//REFRESH FUNCTION

