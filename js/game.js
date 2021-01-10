let imgSource ="";
    divID = "";
    qmarkNum1 = "";
    qmarkNum1 = "";
    imgFound = 0;
    moves = 0;
    allImagesArr = [
        "images/balloons.png",
        "images/basketinhoop.png",
        "images/beachball.png",
        "images/binoculars.png",
        "images/cake.png",
        "images/camera.png",
        "images/cards.png",
        "images/compass.png",
        "images/cosmeticbag.png",
        "images/cushion.png",
        "images/directions.png",
        "images/eyemask.png",
        "images/flippers.png",
        "images/floater.png",
        "images/gift.png",
        "images/headphones.png",
        "images/key.png",
        "images/player.png",
        "images/sunhat.png",
        "images/sunscreen.png",
        "images/swimmingtrunks.png",
        "images/thongs.png"
    ];
    imageArray = []; // random array

/***
 * generate images on the board
 */
function getRandomImages(){
    numARR = [];
    for(let i = 0; i < 10; i++){
        index = generateRandomNumber();
        if(numARR.length == 0){
            numARR.push(index);
        }else{
            while(numARR.includes(index)){
                index = generateRandomNumber();
            }
            numARR.push(index);
        }
      imageArray.push(allImagesArr[index])
    }
}

/**
 * generates random numbers
 * used in initializin an array
 */
function generateRandomNumber() {
    return  Math.round(Math.random() * (allImagesArr.length - 1))
}

/**
 * shuffles images in board
 */
function shuffleImages() {
    let len = imageArray.length*2;
        imgArr = new Array();
        imgArr = $.merge($.merge([], imageArray), imageArray);
        currentDiv = $('#images div:first-child')

    for(let z = 0; z < len; z++){
        var randomNum = Math.round(Math.random()*(imgArr.length-1));
        $("#" + currentDiv.attr("id") + " img").attr("src", imgArr[randomNum]);
        $("#" + currentDiv.attr("id") + " p").attr('style', 'display: block');
        imgArr.splice(randomNum, 1);
        currentDiv = currentDiv.next();
    }
}

/**
 * 1) select a card
 * 2) select a second card
 * 3) if cards are the same, keep cards visible; otherwise, make cards no longer visible
 * 4) increment the number of moves (aka attempts)
 */
function openCard(){
    let id = $(this).attr("id");
    if($("#" + id + " img").is(":hidden")){
        $("#" + id + " img").show("slow");
        if(imgSource == ""){
            divID = id;
            imgSource = $("#" + id + " img").attr("src");
            qmarkNum1 = $("#" + id + " p").attr('id');
            $('#' + qmarkNum1).hide()
        }else{
            currentOpened = $('#' + id + ' img').attr('src');
            qmarkNum2 = $('#' + id + ' p').attr('id');
            $("#" + qmarkNum2).hide();
            if(imgSource !== currentOpened)
            {
                setTimeout(function(){
                    $("#" + id + " img").hide("slow");
                    $('#' + divID + ' img').hide('slow');
                    $('#' + qmarkNum1).show(900);
                    $('#' + qmarkNum2).show(900);
                    divID = "";
                    imgSource = "";
                }, 600);

            }else{
                divID = "";
                imgSource = "";
                imgFound++;
            }
        }
        moves++;  
        $("#attempts").html(moves);
        if(imageArray.length == imgFound){
            $('.modal-body').empty();
            setTimeout(function() {
                $('.modal-body').append("<p>Congratulations, You completed the game in " + moves+ " moves.</p>");
                $('.modal-body').append("<p>Well Done!</p>"); 
                $('.modal').attr('style','display: block');
            }, 1000);
        }
    }
}

/***
 * shuffles images and restarts game
 */
function resetGame() {
    shuffleImages();
    moves = 0;
    $("#attempts").html(moves);
    $("#images div img").hide();
    imgFound = 0; 
    imgSource = "";
    divID = "";
    $('.modal').attr('style', 'display: none')
}

/**
 * close the modal
 */
function closeModal() {
    $('.modal').attr('style', 'display: none');
}

$(document).ready(function(){
    getRandomImages();
    for(let i = 1; i < 3; i++){
        $.each(imageArray, function(index, value){
           $("#images").append("<div id=card" + i + index + "><img src="+ value + "><p class='qmark' id=qmark"+ i + index +">?</p></div>");
        });
    }
    shuffleImages();
    $("#images div").click(openCard);
});