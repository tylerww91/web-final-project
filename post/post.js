/* imports */
import '../auth/user.js';
import { getPost } from '../fetch-utils.js';
/*dom elements */
const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const result_1 = document.getElementById('result-1');
const result_2 = document.getElementById('result-2');

/* state */
let error = null;
let post = null;
/*event listener*/

window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (!id) {
        location.replace('/');
        return;
    }
    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        location.replace('/');
    }

    displayPost();
});

/*display functions*/

function displayPost() {
    postTitle.textContent = `For ${post.title} at ${post.weight} lbs...`;
    result_1.textContent = post.result_1;
    result_2.textContent = post.result_2;
}

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
