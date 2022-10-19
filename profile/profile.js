import '../auth/user.js';
import { getProfile, updateProfile } from '../fetch-utils.js';
//add to fetch after merge//
import { uploadImage } from '../fetch-utils.js';
import { getUser, getProfilePosts } from '../fetch-utils.js';
import { renderProfilePosts, renderProfile } from '../render-utils.js';

const errorDisplay = document.getElementById('error-display');
const profileForm = document.getElementById('profile-form');
const uploadButton = document.getElementById('avatar-input');
const previewImage = document.getElementById('preview-image');
const profileList = document.getElementById('profile-list');
const profilePosts = document.getElementById('logged-list');

let error = null;
let user = getUser();
let profile = null;
let profiles = [];
let posts = [];

window.addEventListener('load', async () => {
    const response = await getProfile(user.id);
    error = response.error;
    profile = response.data;
    console.log('profile', profile);

    if (error) {
        displayError();
    }
    if (profile) {
        displayProfile();
    }

    const response2 = await getProfilePosts(user.id);

    error = response2.error;
    posts = response2.data;

    if (error) {
        displayError();
    }
    if (posts) {
        displayProfilePosts();
    }
});

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(profileForm);
    let url = null;

    const imageFile = formData.get('avatar');

    if (imageFile) {
        const randomFolder = Math.floor(Date.now() * Math.random());
        const imagePath = `avatar-bucket/${randomFolder}/${imageFile.name}`;

        url = await uploadImage('avatar-bucket', imagePath, imageFile);
    }

    const profile = {
        user_name: formData.get('username'),
        color: formData.get('color'),
        image_url: url,
        user_id: user.id,
    };

    const response = await updateProfile(profile);

    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});

uploadButton.addEventListener('change', () => {
    const file = uploadButton.files[0];

    if (file) {
        previewImage.src = URL.createObjectURL(file);
    } else {
        previewImage.src = '../assets/user-avatar.png';
    }
});

function displayError() {
    errorDisplay.textContent = error.message;
}

function displayProfile() {
    profileList.innerHTML = '';
    // for (const profile of profiles) {
    console.log('profile in display', profiles);

    const profileEl = renderProfile(profile);
    profileList.append(profileEl);
    // }
}

function displayProfilePosts() {
    profilePosts.innerHTML = '';
    for (const post of posts) {
        const profilePostEl = renderProfilePosts(post);
        profilePosts.append(profilePostEl);
    }
}
