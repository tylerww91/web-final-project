import '../auth/user.js';


const errorDisplay = document.getElementById('error-display');


let error = null;





function displayError() {
    errorDisplay.textContent = error.message;
}