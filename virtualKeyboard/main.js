//create a javascript object that will be used to generate the keyboard
const keyboard={
   elements:{
       mainContainer:null,
       keyContainer:null,
       keys:[]
   },

   eventHandlers:{
       oninput:null,
       onclose:null

   },
   properties:{
       value:'',
       capsLock:false
   },

   init(){
       //create Main elements
       this.elements.mainContainer=document.createElement('div');
       this.elements.keyContainer=document.createElement('div');

       //set up Main elements
       this.elements.mainContainer.classList.add("keyboard","1keyboard--hidden");
       this.elements.keyContainer.classList.add("keyboard-keys");

       //Adding to DOM
       this.elements.mainContainer.appendChild(this.elements.keyContainer);
       document.body.appendChild(this.elements.mainContainer);
       this.elements.keyContainer.appendChild(this._createKeys());

       this.elements.keys=this.elements.keyContainer.querySelectorAll("keyboard__key");



   },

   _createKeys(){
       const fragment=document.createDocumentFragment();
       const keyLayout=[
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
        "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "space"
       ];

       //function that creates Icon HTML
       const createIconHTML = (icon_name) =>{
          return `<i class="material-icons">${icon_name}</i>`
       };

       keyLayout.forEach(key=>{
           const keyElement=document.createElement('button');
           const insertLineBreak=["backspace","p","enter","?"].indexOf(key)!==-1;

           //Adding attributes/class for the button tag
           keyElement.setAttribute("type","button");
           keyElement.classList.add("keyboard__key");

           switch(key){
               case 'backspace':
                   keyElement.classList.add('keyboard__key--wide');
                   keyElement.innerHTML=createIconHTML('backspace');

                   keyElement.addEventListener('click',()=>{
                       this.properties.value=this.properties.value.substring(0,this.properties.value.length-1);
                       this._triggerEvent('oninput');

                   });
                   break;
                case 'caps':
                keyElement.classList.add('keyboard__key--wide','keyboard__key-wide--activatable');
                keyElement.innerHTML=createIconHTML('keyboard_capslock');

                keyElement.addEventListener('click',()=>{
                    this._toggleCapsLock();
                    keyElement.classList.toggle("keyboard__key--active",this.properties.capsLock);
                });
                    break;
                case 'enter':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML=createIconHTML('keyboard_return');
    
                    keyElement.addEventListener('click',()=>{
                        keyElement.addEventListener("click", () => {
                            this.properties.value += "\n";
                            this._triggerEvent("oninput");
    
                    });
                });
                    break;
                case 'space':
                    keyElement.classList.add('keyboard__key--extra-wide');
                    keyElement.innerHTML=createIconHTML('space_bar');
    
                    keyElement.addEventListener('click',()=>{
                        this.properties.value+=" ";
                        this._triggerEvent('oninput');
    
                    });
                    break;

                case 'done':
                keyElement.classList.add('keyboard__key--wide','keyboard__key--dark');
                keyElement.innerHTML=createIconHTML('check_circle');

                keyElement.addEventListener('click',()=>{
                    this.close;
                    this._triggerEvent('onclose');

                });
                    break;

                default:
                    keyElement.textContent=key.toLowerCase();
                    keyElement.addEventListener('click',()=>{
                        this.properties.value +=this.properties.capsLock ? key.toUpperCase():key.toLowerCase();
                        this._triggerEvent('oninput');

                    });
                    break;
           }
           fragment.appendChild(keyElement);
           if(insertLineBreak){
             fragment.appendChild(document.createElement("br"));
           };

         

       });

       return fragment;

   },

   _triggerEvent(handleEvents){
       console.log("Event Triggered: Event Name:")
   },


   _toggleCapsLock(){
this.properties.capsLock= !this.properties.capsLock;
for (const key of this.elements.keys) {
    //checking that the key doesn't have an icon
    if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    }
}
   },


   open(initialValue, onInput,onClose){

   },


   close(){

   }
};

window.addEventListener("DOMContentLoaded",function(){
   keyboard.init();
});