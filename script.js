
const form = document.querySelector("form");


statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e)=>{
    e.preventDefault(); // preventing form from submitting
    statusTxt.style.color = "#0d6efd";

    statusTxt.style.display = "block";


    let xhr =  new XMLHttpRequest(); // creating new xml object
    xhr.open("POST", "message.php", true); // sending post request to message.php file
    xhr.onload = ()=> { //once ajax loaded 
        if(xhr.readyState == 4 &&  xhr.status == 200){ //if ajax response stust is 200 & ready status is 4 means there is an error
            let response = xhr.response; // storing ajax response in a respone variable
            //if response is an error like enter valid email then we'll change status color to red else reset the for
            if(response.indexOf("Email and message field is required") != -1 || response.indexOf("Enter a valid email") || response.indexOf("Sorry, Failed to send your message")){
                statusTxt.style.color = "red";
            }
            else{
                form.reset();
                setTimeout(() => {
                statusTxt.style.display = "none";
                }, 3000); // hide the statusTxt after 3 seconds
                
            }
            
            statusTxt.innerText = response;
        }  
    }
    let formData = new FormData(form);
        xhr.send(formData);
}