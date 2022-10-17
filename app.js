/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createPost, getItems } from '../fetch-utils.js';
import { renderConversionOption } from '../render-utils.js';
const errorDisplay = document.getElementById('error-display');
const conversionForm = document.getElementById('conversion-form');

let error = null;
let items = null;
const conversionSelect = document.getElementById('conversion-select');

window.addEventListener('load', async () => {
    const conversionOption = await getItems();
    items = conversionOption.data;
    console.log('items', items);

    if (!error) {
        displayConversionOptions();
    }
});

conversionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(conversionForm);

    const post = {
        title: formData.get('title'),
    };

    const response = await createPost(post);
    //   conversionForm.error = response.error;
    conversionForm.reset();
    error = response.error;

    if (error) {
        displayError();
    } else {
        // location.assign('/');
    }
});

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
/* Get DOM Elements */

/* State */

/* Events */

/* Display Functions */
function displayConversionOptions() {
    for (const item of items) {
        const option = renderConversionOption(item);
        conversionSelect.append(option);
    }
}
