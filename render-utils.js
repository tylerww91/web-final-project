export function renderConversionOption(item) {
    const option = document.createElement('option');
    option.value = item.title;
    option.textContent = item.title;
    return option;
}

export function renderPosts(post) {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = `/post/?id=${post.id}`;

    const p = document.createElement('p');
    p.textContent = `For ${post.title} at ${post.weight} lbs...`;
    p.classList.add('conversion-header');

    const p2 = document.createElement('p');
    p2.textContent = post.result_1;

    const p3 = document.createElement('p');
    p3.textContent = post.result_2;

    a.append(p, p2, p3);

    li.append(a);

    return li;
}

export function renderComment(comment) {
    const li = document.createElement('li');

    const h2 = document.createElement('h2');
    h2.textContent = comment.profiles.user_name;
    if (!comment.profiles.user_name) {
        h2.textContent = comment.user_name;
    }

    const p = document.createElement('p');
    p.textContent = comment.text;
    p.classList.add(`${comment.profiles.color}`);

    const img = document.createElement('img');
    img.src = comment.profiles.image_url;
    img.classList.add('avatar-image');

    li.append(h2, img, p);
    return li;
}

export function renderProfile(profile) {
    const li = document.createElement('li');
    const h2 = document.createElement('h2');
    h2.textContent = profile.user_name;
    h2.classList.add(`${profile.color}`);

    const img = document.createElement('img');
    img.src = profile.image_url;
    img.classList.add('avatar-image');
    if (profile.image_url.length < 111) {
        img.src = '/assets/user-avatar.png';
    }

    li.append(h2, img);
    return li;
}

export function renderProfilePosts(post) {
    const li = document.createElement('li');

    const p = document.createElement('p');
    p.textContent = `For ${post.title} at ${post.weight} lbs...`;
    p.classList.add('profile-post-title');

    const p2 = document.createElement('p');
    p2.textContent = post.result_1;

    const p3 = document.createElement('p');
    p3.textContent = post.result_2;

    li.append(p, p2, p3);

    return li;
}
