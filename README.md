# TODO- APP
Always forgot your tasks? Or just want to clear your mind about them?
This app will help you to orginize all your todo stuff in a simple way :)

## Description
A simple todo app, where you can add tasks, check if you have completed them, remove them and if you want, refresh the entire list.

![image](https://github.com/user-attachments/assets/ee8bbb8f-fff8-423c-8d23-c0840f89bf55)


## Concepts
Here we go through some different important concepts of the front-end, from a strong usage of the DOM manipulation
```javascript
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
    listElement.style = "margin-top: 5px"
    listElement.classList.add("list");

    listElement.append(listEmpty, inputField, listRemove);
    mainContent.appendChild(listElement);

    inputField.focus();
    isActive = true;
```

to the usage of event handlers, to trigger some events and make the app interactive

```javascript
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
```

least but not last, i have learned how to use the instance of the object Date(), to create a simple clock and date inside the app
```javascript
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
```



