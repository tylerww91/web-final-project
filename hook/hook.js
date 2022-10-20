import '../auth/user.js';
import { getUser, getConversion, getProfile } from '../fetch-utils.js';

// DOM

const continueButton = document.getElementById('continue-button');
const conversionHeader = document.getElementById('conversion-header');
const conversionNum1 = document.getElementById('conversion-1');
const conversionNum2 = document.getElementById('conversion-2');
conversionHeader.textContent = '';
conversionNum1.textContent = '';
conversionNum2.textContent = '';

let user = getUser();
let profile = null;
// events

window.addEventListener('load', async () => {
    profile = await getProfile(user.id);

    const conversionId1 = 31;
    const conversionId2 = getRandomNumber(29) + 1;
    const conversionData1 = await getConversion(conversionId1);
    const conversionData2 = await getConversion(conversionId2);
    const conversion1 = conversionData1.data;
    const conversion2 = conversionData2.data;

    const factorTitle = conversion1.title;
    const factorTitle2 = conversion2.title;
    const factorPlural = conversion1.title_pl;
    const factorPlural2 = conversion2.title_pl;
    let randomTitle = null;
    let x = conversion1.weight / conversion2.weight;
    let x2 = conversion2.weight / conversion1.weight;

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
    randomTitle = `${conversion1.title} at ${conversion1.weight} pounds converted into a ${conversion2.title} at ${conversion2.weight} pounds...`;
    x = `${factorTitle} is equal to approximately ${x} ${factorPlural2}`;
    x2 = `${factorTitle2} is equal to approximately ${x2} ${factorPlural}`;

    conversionHeader.textContent = randomTitle;
    conversionNum1.textContent = x;
    conversionNum2.textContent = x2;
});

continueButton.addEventListener('click', () => {
    if (profile.data !== null) {
        location.replace('/');
    } else {
        location.replace('/profile');
    }
});

function getRandomNumber(choices) {
    return Math.floor(Math.random() * choices);
}
