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
    
    
}



// A function that creates a list for an individual

function createList(){
    
    const listTitle=document.createElement("input");
    const list=document.createElement("Div");
    
    listTitle.type='text';
    listTitle.placeholder='Enter name of List';
    

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
   <label for="${todo.id}" class="tick js-tick"></label>
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
    
    input.type='text';
    input.placeholder='Add task';
    
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







window.onload=function(){
    this.init();
}
