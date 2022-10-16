var menuList = document.getElementById("menuList");
var menuIcon = document.getElementById("menu-icon");
var navbar = document.getElementById("navbar");
menuList.style.maxHeight = "0px";
function togglemenu(){
    if (menuList.style.maxHeight == "0px"){
        menuList.style.maxHeight = "fit-content";//was 130px
        navbar.classList.toggle("menuClicked");
        menuIcon.src = "images/menu-close.svg";
    }else{
        menuList.style.maxHeight = "0px";
        navbar.classList.toggle("menuClicked");
        menuIcon.src = "images/menu-open.svg";
    }
}

window.addEventListener("scroll", function(){
    var navbar = document.querySelector(".navbar");
    navbar.classList.toggle("sticky", window.scrollY > 0);
});