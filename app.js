const listElement = document.getElementsByClassName("list");
const time = document.getElementById("time");
const date = document.getElementById("date");



const refresh = document.getElementById("refresh");
const check = document.getElementById("check");
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

}

//ADD A TODO FUNCTION

//REFRESH FUNCTION


