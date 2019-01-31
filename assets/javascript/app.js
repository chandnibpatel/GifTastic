var emotions = ["Shocked", "Excited", "Hungry", "Sick"];
// displayEmotionInfo function re-renders the HTML to display the appropriate content
$( document ).ready(function() {
  console.log(localStorage.getItem('emotionArray'));
  if (JSON.parse(localStorage.getItem('emotionArray'))!=null)
  {
    emotions=JSON.parse(localStorage.getItem('emotionArray'));
    //console.log(emotions);
     renderButtons() ;
    
  }
});
function displayEmotionInfo() {
  var emotion = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=lyTOMzYoWn96srBbhvXyBDBI38ZFKLpB";
  // Creates AJAX call for the specific emotion button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    // Creates a div to hold the emotion
    addGiFDiv(response, emotion);
  });
}   
function addGiFDiv(response, emotion) {
  for (var i = 0; i < 10; i++) {
    var new_Emotion = $("<div>");
    new_Emotion.addClass("newEmotion col-lg-3  col-md-3 col-sm-4 col-xs-12 border");
    var emotionDetails = $("<div>");
    emotionDetails.addClass("emotionDet text-center");
    var emotionTitle = $("<h6>")
    
    emotionTitle.text(response.data[i].title);
    var emTagRat = $("<div>");
    emTagRat.addClass("emTagRate");
    var emotionTag = $("<h6>");
    emotionTag.text("Tag : #" + emotion);
    var emotionRat = $("<h6>");
    console.log(JSON.stringify(response.data[i].rating));
    emotionRat.text("Rating :" + response.data[i].rating);

    //Add Downloadd button
    var downloadBtnDiv = $("<div>");
    downloadBtnDiv.addClass("downloadBtn");
    var downloadForm = $("<a download target='_blank'>");
    downloadForm.attr("href", response.data[i].images.fixed_width.url);
     var downloadBtn = $("<button type='submit' >");
    downloadBtn.addClass("downloadbtnCss btn btn-secondary");
    downloadBtn.append("Download")
    downloadForm.append(downloadBtn);
    downloadBtnDiv.append(downloadForm);

    //Add Giphy Still image 
    var emotionImg = $("<img>");
    emotionImg.addClass("imgEmotion");
    console.log(response.data[i].images.fixed_width.url);
    emotionImg.attr("src", response.data[i].images.fixed_width_still.url);
    //Added still Url and animated url as part of image attribute
    //So we can interchange when user click on image 
    emotionImg.attr("data-still-url", response.data[i].images.fixed_width_still.url);
    emotionImg.attr("data-animated-url", response.data[i].images.fixed_width.url);
    emotionDetails.append(emotionTitle);
    emTagRat.append(downloadBtnDiv);
    emTagRat.append(emotionTag);
    emTagRat.append(emotionRat);
    new_Emotion.append(emotionDetails);
    new_Emotion.append(emotionImg);
    new_Emotion.append(emTagRat);
    //  new_Emotion.append(downloadBtnDiv);
    $("#gifArea").prepend(new_Emotion);
  }
}
// Function for displaying emotions data
function renderButtons() {
  // Deletes the emotions prior to adding new emotions
  // (this is necessary otherwise you will have repeat buttons)
  $("#myButtons").empty();
  $("#emotionInput").val("");
  // Loops through the array of emotions
  for (var i = 0; i < emotions.length; i++) {
    // Then dynamicaly generates buttons for each emotion in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of emotion to our button
    a.addClass("emotion btn btn-primary");
    // Added a data-attribute
    a.attr("data-name", emotions[i]);
    // Provided the initial button text
    a.text(emotions[i]);
    // Added the button to the buttons-view div
    $("#myButtons").append(a);
  }
}
// This function handles events where the add emotion button is clicked
$("#addEmotion").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var emotion = $("#emotionInput").val().trim();
  // The emotion from the textbox is then added to our array
  if ((!isEmptyOrSpaces(emotion)) && (!isduplicate(emotion)))
    emotions.push(emotion);
  // Calling renderButtons which handles the processing of our emotions array
  
  localStorage.setItem('emotionArray', JSON.stringify(emotions));
  renderButtons();
});
// Adding click event listeners to all elements with a class of "emotion"
$(document).on("click", ".emotion", displayEmotionInfo);
$(document).on("click", ".imgEmotion", startStopGif);
// Calling the renderButtons function to display the intial buttons
renderButtons();
function startStopGif() {
  if ($(this).attr("src") === $(this).attr("data-still-url")) {
    $(this).attr("src", $(this).attr("data-animated-url"))
  } else if ($(this).attr("src") === $(this).attr("data-animated-url")) {
    $(this).attr("src", $(this).attr("data-still-url"))
  }
}
function isEmptyOrSpaces(str) {
   return str === null || str.match(/^ *$/) !== null;
}
//To convert to uppercase
toUpper = function(x){ 
  return x.toUpperCase();
};
function isduplicate(str){
  var emotionsUpper = emotions.map(toUpper);
  var strUpper = str.toUpperCase();
  if (emotionsUpper.indexOf(strUpper) != -1)
    return true;
  else
    return false;
}
