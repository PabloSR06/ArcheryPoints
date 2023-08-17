export function generateExtId(name) {
    // const currentDate = new Date();
    // const day = currentDate.getDate().toString().padStart(2, '0');
    // const randomNum = generateRandomNumber().toString().padStart(3, '0');

    console.log(name.replace(/\s+/g, ''));
    //return `${name.slice(0, 3).toUpperCase()}${year}${month}${day}${randomNum}`;

    var array = [getRandomLeter(), getRandomNumber(), getRandomLeter(), getRandomNumber()]
    console.log(getRandomLeter());
    console.log(getRandomNumber());
    console.log(getRandomLeter());
    console.log(getRandomNumber());

    var date = new Date();
    console.log(date.ge);
}
function getRandomLeter() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var index = Math.floor(Math.random() * 26);
    return alphabet[index];
}
function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}