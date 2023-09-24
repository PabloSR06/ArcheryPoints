export function generateExtId(index) {
    var array = [];
    for (var i = 0; i < index; i++) {
        array.push(getRandomLeter());
    }
    return array.join("").toUpperCase();
}
function getRandomLeter() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var shuffled = alphabet.split('').sort(function(){return 0.5-Math.random()}).join('')
    var index = Math.floor(Math.random() * 26);
    return shuffled[index];
}
function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}