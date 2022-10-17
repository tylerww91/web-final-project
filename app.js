/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createPost, getItems, getPosts } from '../fetch-utils.js';
import { renderConversionOption } from '../render-utils.js';
import { renderPosts } from './render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const conversionForm = document.getElementById('conversion-form');
const conversionSelect = document.getElementById('conversion-select');
const conversionResult = document.getElementById('conversion-result');
const conversionResult2 = document.getElementById('conversion-result-2');
const conversionResult3 = document.getElementById('conversion-result-3');
const conversionList = document.getElementById('conversion-list');

/* State */

let error = null;
let items = null;
let posts = [];
/* Events */

window.addEventListener('load', async () => {
    const conversionOption = await getItems();
    items = conversionOption.data;
    console.log('items', items);

    const conversionList = await getPosts();
    posts = conversionList.data;

    if (!error) {
        displayConversionOptions();
        displayPosts();
    }
});

conversionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(conversionForm);

    const refTitle = formData.get('title');
    const refWeight = formData.get('weight');

    // let x = null;
    // let x2 = null;
    // let factorWeight = null;
    // let factorId = null;
    // let factorPlural = null;

    for (const item of items) {
        if (conversionSelect.value === item.title) {
            let x = refWeight / item.weight;
            let x2 = item.weight / refWeight;

            if (x < 0.0001) {
                x = x.toFixed(6);
                x2 = x2.toFixed(0);
            } else if (x < 1) {
                x = x.toFixed(4);
                x2 = x2.toFixed(0);
            } else if (x < 100) {
                x = x.toFixed(2);
                x2 = x2.toFixed(2);
            } else if (x < 1000) {
                x = x.toFixed(0);
                x2 = x2.toFixed(4);
            } else {
                x = x.toFixed(0);
                x2 = x2.toFixed(6);
            }

            //     conversionResult.textContent = `For ${refTitle} at ${refWeight} lbs...`; // we can mess with this wording!!!!!!!!!!!!!!!!!!!!!!!!
            //     conversionResult2.textContent = `${refTitle} is approximately ${x} ${item.title_pl}`;
            //     conversionResult3.textContent = `a ${item.title} is approximately ${x2} ${refTitle}s`;
        }
    }

    const post = {
        title: refTitle,
        weight: refWeight,
        conversion: conversionSelect.value,
    };

    console.log(post);
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

/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayConversionOptions() {
    for (const item of items) {
        const option = renderConversionOption(item);
        conversionSelect.append(option);
    }
}

function displayPosts() {
    conversionList.innerHTML = '';

    for (const post of posts) {
        const postEl = renderPosts(post);
        conversionList.append(postEl);
    }
}
