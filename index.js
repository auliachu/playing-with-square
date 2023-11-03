class Square extends HTMLElement{
    static get observedAttributes(){
        return ["color","size"];
    }
    constructor(){
        super()
        const shadow = this.attachShadow({mode:"open"});

        const div = document.createElement('div');
        const style = document.createElement('style');
        shadow.appendChild(style);
        shadow.appendChild(div);
    }

    connectedCallback(){
        console.log("Custom square element added tp page.")
        updateStyle(this);
    }
    disconnectedCallback(){
        console.log("Custom square element removed from page")
    }
    adoptedCallback(){
        console.log('Custom square element moved to new page')
    }
    attributeChangedCallback(name,oldValue, newValue){
        console.log(`This ${name} element attributes changed from ${oldValue} to ${newValue}`);
        updateStyle(this);
    }
}

customElements.define('custom-square', Square);

function updateStyle(elem){
    const shadow = elem.shadowRoot; //elem=this==> this.shadowRoot
    shadow.querySelector("style").textContent=`
        div{
            width: ${elem.getAttribute("size")}px;
            height: ${elem.getAttribute("size")}px;
            background-color: ${elem.getAttribute("color")}
        }
    `;
}

const add = document.querySelector(".addSquare");
const update = document.querySelector(".updatedSquare");
const remove = document.querySelector(".removeSquare");
let square;

update.disabled = true
remove.disabled = true

add.addEventListener("click", function(){
    square = document.createElement("custom-square");
    square.setAttribute("size","100");
    square.setAttribute("color", "red");
    document.body.appendChild(square);

    update.disabled=false
    remove.disabled=false
    add.disabled=true;
})

function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

update.addEventListener("click", function(){
    square.setAttribute("size",random(50,200));

    square.setAttribute("color", `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`);
    add.disabled=true;
    document.body.appendChild(square);

    
});

remove.addEventListener("click", function(){
    document.body.removeChild(square);
    update.disabled=true;
    remove.disabled=true;
    add.disabled=false;
})
