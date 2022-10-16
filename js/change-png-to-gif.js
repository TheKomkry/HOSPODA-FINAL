function pngToGif(elem) {
    var img = elem;
    var path = img.src;
    var lastIndex = path.lastIndexOf('.');
    img.src = path.substr(0, lastIndex) + ".gif";
}
function gifToPng(elem) {
    var img = elem;
    var path = img.src;
    var lastIndex = path.lastIndexOf('.');
    img.src = path.substr(0, lastIndex) + ".png";
}
// // add event listener to hover on the image
// var img = document.querySelector('.redir-img');
// img.addEventListener('mouseover', function() {
//     pngToGif(this);
// });
// img.addEventListener('mouseout', function() {
//     gifToPng(this);
// });