// Gets references to input box and list container
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Adds a new task and adds X to remove the task
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

// Adds functionality for clicks on the list: marking done or removing tasks when x is clicked
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

// Saves current task list to localStorage
function saveData (){
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load and display tasks from localStorage on page load
function displayTask () {
    listContainer.innerHTML = localStorage.getItem("data");
}
displayTask();