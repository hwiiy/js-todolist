const taskInput = document.querySelector(".task-input");
const addBtn = document.querySelector(".button-add");
const tabs =document.querySelectorAll(".task-tabs div")
let mode = "all";
let filteredList = [];

addBtn.addEventListener("click",addTask)
for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",
    function (event) { filter(event)});
}

let taskList = [];

function addTask(){
    let task = {
        id:randomIDgenerate(),
        content : taskInput.value,
        isComplete:false,
    }

    taskList.push(task)
    taskInput.value = ""
    render();
}

function randomIDgenerate(){
    return Math.random().toString(36).substr(2, 16);
}


function render(){
    let resultHTML = "";

    let list =[];

    if(mode == "all"){
        list = taskList;
    }
    else if(mode == "ongoing" || mode=="done"){
        list = filteredList;
    }

    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML += `
        <div class="done">
        <!-- task content -->
        <div class="task-done">${list[i].content}</div>
        <!-- task button -->
        <div class="button-wrap">
            <button onClick="checkTask('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
            <button onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        </div>`
        }

    else {
        resultHTML += `
        <div class="task">
        <!-- task content -->
        <div>${list[i].content}</div>
        <!-- task button -->
        <div class="button-wrap">
        <button onClick="checkTask('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
        <button onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        </div>`
    }
        document.getElementById("task-board").innerHTML = resultHTML;
    }
}

function deleteTask(id){
for(let i=0;i<taskList.length;i++){
    if(taskList[i].id ===id){
        taskList.splice(i,1);
        break;
    }
}
render();
}

function checkTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id === id){
            taskList[i].isComplete = !taskList[i].isComplete;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id;
    filteredList =[]


    // tab-bar 관련
    document.getElementById("underLine").style.width = event.target.offsetWidth+"px" 
    document.getElementById("underLine").style.top = event.target.offsetTop+event.target.offsetHeight+"px"
    document.getElementById("underLine").style.left = event.target.offsetLeft+"px"

    if(mode == "all") render();
    else if(mode == "ongoing"){
        for(let i=0;i<taskList.length;i++)
        if(taskList[i].isComplete == false){
            filteredList.push(taskList[i])
        }
        render()
    }
    
    else if(mode == "done"){
        for(let i=0;i<taskList.length;i++)
        if(taskList[i].isComplete == true){
            filteredList.push(taskList[i])
        }
        render()
    };
    
}
