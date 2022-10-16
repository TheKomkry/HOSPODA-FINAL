function checkHeight(){
    var headerImage = document.getElementById('header-image');
    var headerLogo = document.getElementById('header-logo');
    headerLogo.style.marginTop = `-${headerImage.clientHeight / 2.425}` + "px";
};
window.addEventListener("resize", function(){
    checkHeight();
});
checkHeight();

var menuList = document.getElementById("menuList");
var navbar = document.getElementById("navbar");
menuList.style.top = navbar.clientHeight + "px";