let url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";


let options = document.querySelectorAll(".select-container select");
let btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");
for(let i of options){
    for(code in countryList)
    {
        let option= document.createElement("option");
        option.value=code;
        option.innerText=code;
        i.append(option);
        if(i.name==="from" && code==="USD")
        {
            option.selected="selected";
        }
        else if(i.name==="to" && code==="INR")
            {
                option.selected="selected";
            }
        
    }
    i.addEventListener("change", (evt) => {
        updateFlag(evt.target);
      });
     
}


let updateFlag=(element)=>{
    let crrcode =element.value;
    let cocode=countryList[crrcode];
    let img =element.parentElement.querySelector("img");
    img.src=`https://flagsapi.com/${cocode}/flat/64.png`;
}
 

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

let updateExchangeRate=async ()=>{
    let amount = document.querySelector(".amount input");
    let val = amount.value;
    if(val==="" || val<1){
        val = 1;
        amount.value="1";
    }

    let exchangejson =  await fetch(url);
    let exchange = exchangejson.json();
    exchange.then((res)=>{
        let fromRate = res['eur'][fromCurr.value.toLowerCase()];
        let toRate = res['eur'][toCurr.value.toLowerCase()];

        if (fromRate && toRate) {
            let finalamt = (val / fromRate) * toRate; 
            msg.innerText = `${val} ${fromCurr.value} = ${finalamt.toFixed(2)} ${toCurr.value}`; 
            msg.classList.add("size");
        } else {
            msg.innerText = "Error: Invalid currency code.";
        }


    })
}

window.addEventListener("load",()=>{
    updateExchangeRate();
})

