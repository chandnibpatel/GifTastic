var emotions = ["Shocked", "Excited", "Hungry", "Sick"];

      // displayEmotionInfo function re-renders the HTML to display the appropriate content
      function displayEmotionInfo() {

        var emotion = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=lyTOMzYoWn96srBbhvXyBDBI38ZFKLpB";

        // Creates AJAX call for the specific emotion button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
          // Creates a div to hold the emotion
       
          for (var i=0;i<10;i++)
          {
            var new_Emotion= $("<div>");
            new_Emotion.addClass("newEmotion");

            var emotionRat= $("<h6>");

            console.log(JSON.stringify(response.data[i].rating));
            emotionRat.text("Rating :" + response.data[i].rating);
        

            var emotionImg = $("<img>");
            emotionImg.addClass("imgEmotion");
            console.log(response.data[i].images.fixed_width.url);
            emotionImg.attr("src", response.data[i].images.fixed_width_still.url);
            emotionImg.attr("data-still-url",response.data[i].images.fixed_width_still.url);
            emotionImg.attr("data-animated-url",response.data[i].images.fixed_width.url);

            new_Emotion.append(emotionRat);  
            new_Emotion.append(emotionImg);
            $("#gifArea").prepend(new_Emotion);
          }
                 

          
        });

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
      $("#addEmotion").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var emotion = $("#emotionInput").val().trim();

        // The emotion from the textbox is then added to our array
        emotions.push(emotion);

        // Calling renderButtons which handles the processing of our emotions array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "emotion"
      $(document).on("click", ".emotion", displayEmotionInfo);
      $(document).on("click", ".imgEmotion", startStopGif);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      function startStopGif()
      {
           if ($(this).attr("src")===$(this).attr("data-still-url"))
           {
            $(this).attr("src",$(this).attr("data-animated-url"))
           }else if ($(this).attr("src")===$(this).attr("data-animated-url"))
           {
            $(this).attr("src",$(this).attr("data-still-url"))
           }
      }