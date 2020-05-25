const listContainer=document.querySelector('.lists-container');
const addList=document.querySelector(".add-list");
const overallContainer=document.querySelector(".overall-container")


const createIcon=()=>{
    return `<i class="material-icons">add</i>`;
    }




function init(){
    console.log('Hello World!')
    if(addList){
        addList.addEventListener('click',createList,false);
    }
    
    
}

// A function that creates a list for an individual

function createList(){
    
    const list=document.createElement("Div");
    const listTitle=document.createElement("input");
    
    listTitle.type='text';
    listTitle.placeholder='Enter name of List';
    

    listTitle.classList.add('list-title');
    list.classList.add('list')

    let addItemButton=document.createElement("Button");
    addItemButton.classList.add('add-item');
    addItemButton.innerHTML=createIcon();

    list.appendChild(listTitle);
    list.appendChild(addItemButton);
    listContainer.appendChild(list);
    console.log(list)
    overallContainer.appendChild(listContainer)
    document.body.appendChild(overallContainer);
        
    }







window.onload=function(){
    this.init();
}
