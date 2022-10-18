import '../auth/user.js';
import { createProfile } from '../fetch-utils.js';
//add to fetch after merge//
import { uploadImage } from '../fetch-utils.js';
//add to fetch after merge//
import { getUser } from '../fetch-utils.js';

const errorDisplay = document.getElementById('error-display');
const profileForm = document.getElementById('profile-form');
const uploadButton = document.getElementById('avatar-input');
const previewImage = document.getElementById('preview-image');

let error = null;
let user = getUser();

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
        username: formData.get('username'),
        color: formData.get('color'),
        image_url: url,
        user_id: user.id,
    };

    const response = await createProfile(profile);

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