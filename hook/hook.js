import '../auth/user.js';
import { getConversion } from '../fetch-utils.js';

window.addEventListener('load', async () => {
    const conversionId1 = getRandomNumber(30);
    const conversionId2 = getRandomNumber(30);
    const conversion1 = await getConversion(conversionId1);
    const conversion2 = await getConversion(conversionId2);

    let x = conversion1 / conversion2;
    let x2 = conversion2 / conversion1;

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

    x = `${refTitle} is equal to approximately ${x} ${factorPlural}`;
    x2 = `A ${conversionSelect.value} is approximately ${x2} ${refTitle}s`;
});

function getRandomNumber(choices) {
    return Math.floor(Math.random() * choices);
}
