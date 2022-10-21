$(function() {

    var baseUrl = "images/galerie/";
    var pictureIndex = 0;
    var pictures = [];

    function getFiles() {
        $.ajax({
            type: "GET",
            url: baseUrl,
            success: function (data) {
                pictures = [];
                $(data).find("a[href]").each(function() {
                var href = $(this).attr('href');
                if (href.indexOf('.jpg') > 0 || href.indexOf('.png') > 0 || href.indexOf('.jpeg') > 0) {
                    pictures.push(href);
                }
            });
            console.log(pictures.length + " pictures loaded!");
            changePicture(0);
            }
        });
    }

    function changePicture(indexOffset) {
        pictureIndex += indexOffset;
        if (pictureIndex >= pictures.length) {
            pictureIndex = 0;
        } else if (pictureIndex < 0) {
            pictureIndex = pictures.length - 1;
        }
        $('#viewer').attr('src',pictures[pictureIndex]);
        console.log(pictures[pictureIndex]);
        $('#viewer').attr('alt', pictures[pictureIndex]);
        $('#picNumber').text((pictureIndex + 1) + "/" + pictures.length);
    }

    getFiles();
    $(document).keydown(function(e){
        var left = -1, right = 1;
        if (e.keyCode == 37) {
        changePicture(left); return false;
        } else if (e.keyCode == 39) {
            changePicture(right); return false;
        }
    });
    $('.left').on('click', function() {
        changePicture(-1);
    });
    $('.right').on('click', function() {
        changePicture(1);
    });
});