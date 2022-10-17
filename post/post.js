/* imports */
import '../auth/user.js';

/*dom elements */
const errorDisplay = document.getElementById('error-display');

/* state */
let error = null;

/*event listener*/

/*display functions*/

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
