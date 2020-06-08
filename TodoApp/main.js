const listContainer=document.querySelector('.lists-container');
const addList=document.querySelector(".add-list");
const overallContainer=document.querySelector(".overall-container")


//create an array that holds the items
let todoTasks=[];

const createIcon=()=>{
    return `<i class="material-icons">add</i>`;
    }


// creating a list that will display the tasks
const todoList=document.createElement('ul');
todoList.classList.add('todo-list');


function init(){
    console.log('Hello World!')
    if(addList){
        addList.addEventListener('click',createList,false);
    }  
    
    if(todoList){
        markComplete();
    }
    
}



// A function that creates a list for an individual

function createList(){
    
    const listTitle=document.createElement("input");
    const list=document.createElement("Div");
    
    listTitle.type='text';
    listTitle.placeholder='Title';
    

    listTitle.classList.add('list-title');
    list.classList.add('list')

    const addItemButton=document.createElement("Button");
    addItemButton.classList.add('add-item');
    addItemButton.innerHTML=createIcon();

    

    list.appendChild(listTitle);
    list.appendChild(addItemButton);
    listContainer.appendChild(list);
    overallContainer.appendChild(listContainer)
    document.body.appendChild(overallContainer);

    // Adding an event listener to the addItem buttom.
    addItemButton.addEventListener('click',displayInputForm.bind(null,list),false);
        
    }



// the function takes a tak and renders it on the DOM
function addTask(text,list){
   const todo={
       text,
       checked:false,
       id:Date.now()
   }

   todoTasks.push(todo);
   console.log(todoTasks);

   todoList.insertAdjacentHTML('beforeend',
   `<li class="todo-item" data-key="${todo.id}">
   <input id="${todo.id}" type="checkbox"/>
   <label for="${todo.id}" class="task-tick"></label>
   <span>${todo.text}</span>`);

   list.appendChild(todoList);

}


// a form that allows for input from the user
function displayInputForm(list){

    const inputForm=document.createElement('Form');
    const input=document.createElement("input");
    // const list=listElement();
    
    inputForm.classList.add('todo-form');
    input.classList.add('todo-input');
    
    input.autofocus=true;
    input.placeholder='Add task';
    input.setAttribute('type','text')
    inputForm.appendChild(input);
    list.appendChild(inputForm);
    


// adding an eventlistener for the form.
inputForm.addEventListener('submit',event=>{
    event.preventDefault();

    const text=input.value.trim();

    if(text!==''){
        addTask(text,list);
        //reset the input value
        input.value='';
        input.focus();
    }
    //Hide the form once the user has submitted the task
    if(inputForm.style.display==='none'){
        inputForm.style.display='block';
    }
    else{
        inputForm.style.display='none';
    }
});


}



function toggleComplete(key){
    //finding the index of the item key from the todoTasks array
    //The index will help with changing the checked value of the item
    const index=todoTasks.findIndex(item=>item.id===Number(key));
    todoTasks[index].checked = !todoTasks[index].checked

    const item=document.querySelector(`[data-key='${key}']`);
    if (todoTasks[index].checked) {
        item.classList.add('done');
      } else {
        item.classList.remove('done');
      }

}


// Marking a task as complete
/**
 * This function listens for clicks on the whole todo list
 * Extracts the data key of where the click comes from if it is a checkbox.
 * Passes the data-key to a toggle function that marks the task as complete.
 */
function markComplete(){
    console.log('I am inside this function')
    todoList.addEventListener('click',event=>{
        const itemKey=event.target.parentElement.dataset.key;
            console.log(itemKey);
            toggleComplete(itemKey);
      
       if(event.target.classList.contains('task-tick')){
            return true;
            }
    
    });
}



// a function that will help us delete the todo items.

function deleteTodoItem(){
    
}


init()

