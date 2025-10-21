// Initializes variables
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Adds functionality for to-do list and adds span X used to remove tasks
function addTask (){
    if(inputBox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
         listContainer.appendChild(li);
    }
    inputBox.value = '';
    saveData();
}

// Adds functionality for marking completed tasks and removing tasks when X is pressed
listContainer.addEventListener("click", function(e){
    if(e.target.tagName == "LI") {
        e.target.classList.toggle("done");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Prevents deletion of tasks upon refresh
function saveData (){
    localStorage.setItem("data", listContainer.innerHTML);
}

// Displays tasks in to-do list
function displayTask () {
    listContainer.innerHTML = localStorage.getItem("data");
}
displayTask();