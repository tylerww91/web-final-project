/* imports */
import '../auth/user.js';
import { getPost, createComment } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';
/*dom elements */
const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const result_1 = document.getElementById('result-1');
const result_2 = document.getElementById('result-2');
const commentForm = document.getElementById('comment-form');
const commentList = document.getElementById('comment-list');

/* state */
let error = null;
let post = null;
/*event listener*/

window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (!id) {
        // location.replace('/');
        return;
    }
    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        // location.replace('/');
    }

    displayPost();
    displayComments();
});

commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(commentForm);
    const insertComment = {
        text: formData.get('comment'),
        post_id: post.id,
    };

    const response = await createComment(insertComment);
    error = response.error;

    if (error) {
        displayError();
    } else {
        const comment = response.data;
        post.comments.unshift(comment);
        displayComments();
        commentForm.reset();
    }
});

/*display functions*/

function displayComments() {
    commentList.innerHTML = '';

    for (const comment of post.comments) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
    }
}

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
