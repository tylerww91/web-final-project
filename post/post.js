/* imports */
import '../auth/user.js';
import { getPost, createComment, onMessage, getComment, getUser } from '../fetch-utils.js';
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
let profile = null;

const user = getUser();
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
    } else {
        displayPost();
        displayComments();
    }
    onMessage(post.id, async (payload) => {
        const commentId = payload.new.id;      
        const postResponse = await getComment(commentId);
        console.log(postResponse);
        error = postResponse.error;

        if (error) {
            displayError();
        } else {
            const comment = postResponse.data;
            post.comments.unshift(comment);
            displayComments();
            //scroll in to view?//
        }
    });


});

commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(commentForm);
    const insertComment = {
        text: formData.get('comment'),
        post_id: post.id,
        user_id: user.id,
    };

    const response = await createComment(insertComment);
    error = response.error;

    if (error) {
        displayError();
    } else {
        displayComments();
        commentForm.reset();
    }
});

/*display functions*/

function displayComments() {
    commentList.innerHTML = '';

    for (const comment of post.comments) {
        const commentEl = renderComment(comment, profile);
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
