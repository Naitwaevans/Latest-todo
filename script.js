let form = document.getElementById('form');
let textInput =document.getElementById('title-input');
let msg =document.getElementById('msg');
let dateInput = document.getElementById('duedate');
let msgTwo = document.getElementById('msg-two');
let textArea = document.getElementById('description');
let msgThree = document.getElementById('msg-three');
let tasks = document.getElementById('tasks');




form.addEventListener("submit", (e)=> {
    e.preventDefault();
    formValidation();
});


let formValidation = () =>{
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML= "Task cannot be blank!";


    }
    if (dateInput.value ===""){
        msgTwo.innerHTML = "Date cannot be blank!";
    }
    if (textArea.value ===""){
        msgThree.innerHTML = "Description cannot be blank!";
    }

    else {
        console.log("sucess");
        msg.innerHTML= "";
        msgTwo.innerHTML = "";
        msgThree.innerHTML = "";
        acceptData();

    }
};


let data = [];

let acceptData = () => {
    data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textArea.value,
    });

    localStorage.setItem("data", JSON.stringify(data));
    

    console.log (data);
    createTasks();
};

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x,y)=>{
        return (tasks.innerHTML += `
        <div id=${y} class="task">
        <span>${x.text}</span> <br>
        <span>${x.date}</span> <br>
        <p>${x.description}</p> <br>
        <span class="options">
            <button onClick ="editTask(this)">Edit</button>
            <button onClick ="deleteTask(this)">Delete</button>
            <button>Mark Completed</button>
        
        </span>
    </div>`);
    })
    
resetForm();
};

let deleteTask =(e) =>{
    e.parentElement.parentElement.remove();
    data.splice( e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data)
};

let editTask =(e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[2].innerHTML;
    textArea.value = selectedTask.children[4].innerHTML;

    deleteTask(e);

};



let resetForm = () => {
    textInput.value ="";
    dateInput.value ="";
    textArea.value = "";

}

(()=>{
    data = JSON.parse(localStorage.getItem("data"));
    createTasks();

})();