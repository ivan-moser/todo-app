const time = document.getElementById("time");
const date = document.getElementById("date");
const mainContent = document.getElementById("main-content");
const mainContainer = document.getElementById("main-container");

const refresh = document.getElementById("refresh");
const empty = document.getElementById("empty");
const check = document.getElementById("check");
const deleteListElement = document.getElementById("delete");
const add = document.getElementById("add");

let isActive = false;


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

    if (isActive) return;

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
    inputField.placeholder = "...";

    const listElement = document.createElement("div");
    listElement.style = "margin-top: 5px";
    listElement.classList.add("list");
    listElement.setAttribute("draggable", "true"); 

    listElement.append(listEmpty, inputField, listRemove);
    mainContent.appendChild(listElement);

    inputField.focus();
    isActive = true;

    add.addEventListener("click", () => {
        inputField.focus();
    })

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
            isActive = false;
            inputField.focus();
        } else if (event.key === "Escape") {
            mainContent.removeChild(mainContent.lastChild);
            isActive = false;
        }
    });

    listRemove.addEventListener("click", function() {
        listElement.remove();
        isActive = false;    
    });

    listEmpty.addEventListener("click", function() {
        const currentSrc = listEmpty.getAttribute("src");
        const newSrc = currentSrc === "./assets/empty.png" ? "./assets/check-button.png" : "./assets/empty.png";
        listEmpty.setAttribute("src", newSrc);
    });

}

//SET THEM SORTABLE
let draggedItem = null;

mainContent.addEventListener("dragstart", (event) => {
    draggedItem = event.target;
    draggedItem.classList.add("dragging");

    setTimeout(() => {
        event.target.style.opacity = "0";
    }, 0);
});

mainContent.addEventListener("dragend", (event) => {
    setTimeout(() => {
        event.target.style.opacity = "1";
        draggedItem.classList.remove("dragging");
        draggedItem = null;
    }, 0);
});

mainContent.addEventListener("dragover", (event) => {
    event.preventDefault();

    const afterElement = getDragAfterElement(mainContent, event.clientY);
    const currentElement = document.querySelector(".dragging");

    if (afterElement === null) {
        mainContent.appendChild(draggedItem);
    } else {
        mainContent.insertBefore(draggedItem, afterElement);
    }
});

const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll(".list")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return {
                offset: offset,
                element: child
            };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};

const animateList = () => {
    const draggableElements = [...mainContent.querySelectorAll(".list:not(.dragging)")];

    draggableElements.forEach((element, index) => {
        element.style.transform = `translateY(${index * 5}px)`;
    });
};



//ADD A TODO FUNCTION

add.addEventListener("click", createList);

//REFRESH FUNCTION

refresh.addEventListener("click", () => {
    mainContent.innerHTML = "";
})

