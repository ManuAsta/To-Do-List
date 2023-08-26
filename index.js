


var list=new Array();
var input=document.querySelector("#input-box input");
var addButton=document.getElementById("add-button");
var todoList=document.querySelector("#todo-list");
var clearCompleted=document.getElementById("clear-list");
var todoContainer=document.getElementById("todo-container");
var taskCount=document.getElementById("task-count");
var completedAll=document.getElementById('completed-all');

/**At starting */
function loadApp(){
    hideTodoContainer();
    document.addEventListener('click',handleClick);
}

loadApp();




/**Click handler */
function handleClick(e){
    const target=e.target;
    if(target.className=="fa-solid fa-star"){
        toggleImportant(target);
        return;
    }
    if(target.className=="fa-solid fa-trash"){
        deleteTask(target);
        return;
    }
    if(target.type=="checkbox"){
        toggleChecked(target);
        return;
    }
}










/**input field realted functions */
input.addEventListener('input',(e)=>{
    let text=input.value;
    if(text!==""){
        addButton.style.display="block";
        // console.log(text);
    }else{
        addButton.style.display="none";
    }
});



input.addEventListener('keydown',(e)=>{
    if(e.key=="Enter"){
        handleInput();
        clearInputField();
        hideTodoContainer();
    }
});


function handleInput(){
    let inputText=input.value;
    if(inputText!=""){
        addItem(inputText);
    }
}

function clearInputField(){
    input.value="";
    addButton.style.display="none";
}


input.addEventListener('focus',()=>{
    input.placeholder="Try Buying Groceries...";
});


addButton.addEventListener('click',handleInput);
addButton.addEventListener('click',clearInputField);
addButton.addEventListener('click',hideTodoContainer);







/**rendering the list from a given array*/

function addItem(inputText){
    let item={
        id:new Date().getTime(),
        text:inputText,
        completed:false,
        important:false
    }
    list.push(item);
    renderList(list);
    updateTaskCount(list.length);
}



function renderList(list){
    todoList.innerHTML="";
    for(let item of list){
    let li=document.createElement('li');
        li.innerHTML=`
        <div class="list-text">
            <label for="${item.id}"><span class="todo-item-check" style="${item.completed? 'background-color:orange':''}"><i class="fa-solid fa-check" style="${item.completed? 'display:block;':''}"></i></span></label>
            <input type="checkbox" ${item.completed? 'checked':''} id="${item.id}">   
            <p>${item.text}</p>
        </div>
        <div class="list-actions">
             <span class="star"><i class="fa-solid fa-star" style="${item.important? 'color:gold;':''}" data-id="${item.id}"></i>
                    <span class="show-info">Mark As Important</span>
             </span> 
             <span class="delete"><i class="fa-solid fa-trash"  data-id="${item.id}"></i>
                    <span class="show-info">Delete</span>
             </span>
        </div>`
        todoList.append(li);
    };

}






/**Important related function */

function toggleImportant(targetStar){
    const id=Number(targetStar.dataset.id);
    
    for(let item of list){
        if(item.id==id){
            item.important=!item.important;
        }
    }

    if(targetStar.style.color=="gold"){
        targetStar.style.color="rgba(255, 255, 255, 0.726)";
    }else{
        targetStar.style.color="gold";
    }
}



/**Checked related function */

function toggleChecked(targetCheckBox){
    // console.log(targetCheckBox);
    // console.log(targetCheckBox.checked);
    const id=Number(targetCheckBox.id);
    for(let item of list){
        if(item.id==id){
            item.completed=!item.completed;
        }
    };
    renderList(list);
}



/**Delete related Functions */

function deleteTask(targetDelete){
    const id=Number(targetDelete.dataset.id);
    const newArray=list.filter((item)=>{
        return item.id!==id;
    });
    list=newArray;
    updateTaskCount(list.length);
    renderList(list);
    hideTodoContainer();
}
















/**Other list actions */

clearCompleted.addEventListener('click',()=>{
    const newArray=list.filter((item)=>{
        return !item.completed;
    });
    list=newArray;
    renderList(list);
    updateTaskCount(list.length);
    hideTodoContainer();
});


completedAll.addEventListener('click',()=>{
    let alltrue=true;
    for(let item of list){
        if(item.completed==false){
            alltrue=false;
            break;
        }
    };
    if(!alltrue){
        for(let item of list){
            item.completed=true;
        };
    }
    if(alltrue){
        for(let item of list){
            item.completed=false;
        };
    }
    
    renderList(list);
});

function hideTodoContainer(){
    if(list.length==0){
        todoContainer.style.display="none";
    }else{
        todoContainer.style.display="block";
    }
}



function updateTaskCount(number){
    taskCount.innerText=number;
}




/**Filter Related Functions */


var all=document.getElementById("f-all");

all.addEventListener('click',()=>{
    // console.log("all is clicked");
    renderList(list);
    updateTaskCount(list.length);
});


var filterImportant=document.getElementById("f-important");

filterImportant.addEventListener('click',()=>{
    // console.log("important is clicked");
    const impArray=list.filter((item)=>{
        return item.important;
    });
    if(impArray.length==0){
        showMessage();
        return;
    }
    renderList(impArray);
    updateTaskCount(impArray.length);
});


var filterCompleted=document.getElementById("f-completed");

filterCompleted.addEventListener('click',()=>{
    // console.log("completed clicked"); 
    const impArray=list.filter((item)=>{
        return item.completed;
    });
    if(impArray.length==0){
        showMessage();
        return;
    }
    renderList(impArray);
    updateTaskCount(impArray.length);
});


var filterIncomplete=document.getElementById("f-incomplete");

filterIncomplete.addEventListener('click',()=>{
    // console.log("incomplte is clcikee");
    const impArray=list.filter((item)=>{
        return !item.completed;
    });
    if(impArray.length==0){
        showMessage();
        return;
    }
    renderList(impArray);
    updateTaskCount(impArray.length);
});


function showMessage(){
    todoList.innerHTML="Woah Nothing Here!";
    updateTaskCount(0);
}