let images = [];
let index = 0;
let imgFound = false;

$(document).ready(function(){
    var dir = "images/galerie/"; // folder location
    var fileextension = ".jpg"; // image format
    var i = 1;

    $(function imageloop(){
    //   $("<img />").attr('src', dir + i + fileextension ).appendTo(".testing");
    
        $.get(dir + i + fileextension)
            .done(function() { 
                // Do something now you know the image exists.
                images.push(dir + i + fileextension);
                if (!imgFound){
                    $('.img').css('background-image', "url(" + dir + i + fileextension + ")");
                    imgFound = true;
                }
                if (i < 100){
                    $('#picNumber').text(`1/${images.length}`);
                    i++;
                    imageloop();
                }
            }).fail(function() { 
                // Image doesn't exist - do something else.
                if (i < 100){
                    i++;
                    imageloop();
                }
                console.clear();
            })
        
    });
});
function checkIndex(operation){
    if (operation == 'next'){
        if (index == images.length - 1){
            index = 0;
        }
        else{
            index++;
        }
        return index;
    }
    else if (operation == 'prev'){
        if (index == 0){
            index = images.length - 1;
        }
        else{
            index--;
        }
        return index;
    }
}
$('.right').on('click', function(){
    $('.img').css('background-image', "url(" + images[checkIndex('next')] + ")");
    $('#picNumber').text(`${index + 1}/${images.length}`);
});
$('.left').on('click', function(){
    $('.img').css('background-image', "url(" + images[checkIndex('prev')] + ")");
    $('#picNumber').text(`${index + 1}/${images.length}`);
});
// while #AutoNext-checkbox is checked
// setInterval(function(){
//     if ($('#AutoNext-checkbox').is(':checked')){
//         $('.img').css('background-image', "url(" + images[checkIndex('next')] + ")");
//         $('#picNumber').text(`${index + 1}/${images.length}`);
//         document.getElementById("img01").src = images[index];
//         document.getElementById("caption").innerHTML = document.getElementById("picNumber").innerHTML;
//     }
// }, 5000);
let active_timers = [];
$('#AutoNext-checkbox').on('change', function(){
    if (this.checked){
        let timer = setInterval(function(){
            $('.img').css('background-image', "url(" + images[checkIndex('next')] + ")");
            document.getElementById("picNumber").innerHTML = `${index + 1}/${images.length}`;
            document.getElementById("img01").src = images[index];
            document.getElementById("caption").innerHTML = document.getElementById("picNumber").innerHTML;
            }, 5000);
        setInterval(timer);
        active_timers.push(timer);
    }else{
        for (let i = 0; i < active_timers.length; i++){
            clearInterval(active_timers[i]);
        }
    }
});