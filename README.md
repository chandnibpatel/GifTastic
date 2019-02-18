# GifTastic
Giphy API Project

# Functionality
1. This app takes the search topics in this array and create buttons in your HTML.
2. When the user clicks on a button, the page is grabing 10 static, non-animated gif images from the GIPHY API and place them on the page.
3. When the user clicks one of the still GIPHY images, the gif will animate. If the user clicks the gif again, it will stop playing. 
4. Under every gif, its rating is being displayed (PG, G, so on).

    This data is provided by the GIPHY API.
    Only once you get images displaying with button presses should you move on to the next step.
    
5. The app is fully mobile responsive.
6. It allows the users to request additional gifs to be added to the page. Each request will ADD/Append 10 gifs to the page, will NOT   overwrite the existing gifs.
7. It has additional Functionality of 1-click download button for each gif, this will work across device types.
8. Allows users to add their favorite gifs to a favorites section.
   It will persist even when the user select or add a new topic. 
   This section will persist even when the page is reloaded(via localStorage or cookies).

# API Link
https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=

where emotion = "happy", "shocked" etc. any emotions which user searchfor

# Deployed Site
https://chandnibpatel.github.io/GifTastic/
