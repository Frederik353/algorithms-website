






function resizeFn() {
    // var height = parseInt(window.innerHeight);
    var width = parseInt(window.innerWidth);
    console.log(width)
    var element = document.getElementsByClassName("change-orientation");
    
    if (width <= 500) {
        for(var i = 0; i < element.length; i++){
                element[i].classList.add("horizontal");
                element[i].classList.remove("vertical");
        }
        // document.getElementById("horizontal").classList.remove("vertical")
    }
    else if(width > 500) {
        for(var i = 0; i < element.length; i++){
                element[i].classList.remove("horizontal");
                element[i].classList.add("vertical");
        }
    }
}


window.onload = resizeFn();


window.onresize = resizeFn;