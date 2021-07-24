
 import { displeyBlock, redMarker,createBlueMarkers} from "./map.js"
 import {cloneCard} from "./card.js"

 const allForm = document.querySelector(".ad-form");
 const success = document.getElementById("success")
 const err = document.getElementById("error")
 const resetBtn = document.querySelector(".ad-form__reset")
 const errBtn = document.querySelector(".error__button")
 const mapBlock = document.getElementById("map-canvas");
 const formAdress = document.getElementById("address")

 const main = document.querySelector(".mainm")
 const EscapeKey = "27"
 const LAT = 35.685257;
 const LNG = 139.75146;  

export function allFunction(){

  mapBlock.addEventListener("click", functGet, {once: true});

  function functGet (){
    async function getDate(){

      let responseGet = await fetch("https://22.javascript.pages.academy/keksobooking/data",
      {
        method: 'GET',
        credentials: 'same-origin',
      })
      let dataGet = await responseGet.json()
      return dataGet;
      }
      
      getDate().then(function(resp){
        console.log(resp);
        createBlueMarkers(resp)
         })
  }
  
  allForm.addEventListener("submit", sendData);

  async function sendData(e){
    e.preventDefault();

     const formData  = new FormData(allForm); 

    let responce = await fetch("https://23.javascript.pages.academy/keksobooking", {
      method: 'POST',
      body:formData
    });
    
    function  status(response){
      if(response = "ok"){
        let elem = document.createElement("div");
        let clone = success.content.cloneNode(true)
        elem.append(clone);  
        main.append(elem)

        allForm.reset();
        const markerRed = document.querySelector(".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive.leaflet-marker-draggable")
        markerRed.remove;
        debugger
        redMarker(LAT, LNG)

        window.addEventListener("click", templateClick) 
        window.addEventListener("keydown", templateKey)

        function templateClick (event) {
          if (event.target.className === "successs"){
            elem.style.display = "none"
            location.reload();
          }
        }

        function templateKey (ev){      
          if (ev.keyCode == EscapeKey){
            elem.style.display = "none"
            location.reload();
          }
        }
        
        formAdress.value = [LAT + "  " + LNG]  
        } else  {
        let elem = document.createElement("div");
        let clone = err.content.cloneNode(true)
        elem.append(clone);  
        main.append(elem)

        window.addEventListener("click", templateClock) 
        window.addEventListener("keydown", templateKey)
          
        function templateClock (event) {
          if (event.target.className === "error"){
            elem.style.display = "none"
          } else if(event.target.className === "error__button"){
            elem.style.display = "none"
          }
        }

        function templateKey (ev){
          if (ev.keyCode == EscapeKey){
            elem.style.display = "none"
          }
        }

      }

    }
    status(responce)

  }
  
  resetBtn.addEventListener("click", ()=>{
    allForm.reset()
  })
 
}

allFunction()


  