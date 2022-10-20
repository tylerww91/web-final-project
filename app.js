/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createPost, getItems, getPosts } from '../fetch-utils.js';
import { renderConversionOption } from '../render-utils.js';
import { renderPosts } from './render-utils.js';
// import { getUser } from './fetch-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const conversionForm = document.getElementById('conversion-form');
const conversionSelect = document.getElementById('conversion-select');
const conversionList = document.getElementById('conversion-list');
const submitButton = document.getElementById('submit-button');
const profSound = new Audio('/assets/good-news-everyone.mp3');

// const profileLink = document.getElementById('profile-link');

/* State */
// let user = getUser();
let error = null;
let items = null;
let posts = [];
// let profileThing = null;
/* Events */

window.addEventListener('load', async () => {
    const conversionOption = await getItems();
    items = conversionOption.data;

    const conversionList = await getPosts();
    posts = conversionList.data;

    if (!error) {
        displayConversionOptions();
        displayPosts();
    }

    // const profileData = await getProfile(user.id);
    // profileThing = profileData.data;
    // // console.log(profileThing);
    // const profile = {
    //     user_name: profileThing.user_name,
    //     image_url: profileThing.image_url,
    // };

    // if (profile) {

    // }
});

conversionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(conversionForm);
    const refTitle = formData.get('title');
    const refWeight = formData.get('weight');

    let x = null;
    let x2 = null;
    let factorWeight = null;
    let factorId = null;
    let factorPlural = null;

    for (const item of items) {
        if (conversionSelect.value === item.title) {
            factorWeight = item.weight;
            x = refWeight / item.weight;
            x2 = item.weight / refWeight;
            factorPlural = item.title_pl;
            factorId = item.id;
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
        }
    }

    x = `${refTitle} is equal to approximately ${x} ${factorPlural}`;
    x2 = `A ${conversionSelect.value} is approximately ${x2} ${refTitle}s`;

    const post = {
        title: refTitle,
        weight: refWeight,
        // conversion: conversionSelect.value,
        weight_factor: factorWeight,
        result_1: x,
        result_2: x2,
        factor_id: factorId,
    };

    // console.log(post);
    const response = await createPost(post);
    //   conversionForm.error = response.error;
    conversionForm.reset();
    error = response.error;

    if (error) {
        displayError();
    } else {
        const postList = await getPosts();
        posts = postList.data;
        displayPosts();
    }
});

submitButton.addEventListener('click', async () => {
    profSound.play();
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
