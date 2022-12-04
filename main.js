const taskInput = document.querySelector(".task-input");
const addBtn = document.querySelector(".button-add");


addBtn.addEventListener("click",addTask)
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
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHTML += `
        <div class="task">
        <!-- task content -->
        <div class="task-done">${taskList[i].content}</div>
        <!-- task button -->
        <div>
            <button onClick="checkTask('${taskList[i].id}')">check</button>
            <button onClick="deleteTask('${taskList[i].id}')">delete</button>
        </div>
        </div>`
        }
    else {
        resultHTML += `
        <div class="task">
        <!-- task content -->
        <div>${taskList[i].content}</div>
        <!-- task button -->
        <div>
            <button onClick="checkTask('${taskList[i].id}')">check</button>
            <button onClick="deleteTask('${taskList[i].id}')">delete</button>
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

