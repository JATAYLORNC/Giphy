//variable to hold initial array of marine animals
var marineAnimals = ["Dolphin", "Killer Whale", "Whale Shark", "Great White Shark", "Hammerhead Shark", "Mako Shark", "Blue Whale", 
"Sperm Whale", "Marlin", "Flounder", "Beluga Whale", "Fur Seal", "Walrus", "Sea Lion", "Sea Otter", "Starfish", "Sea Horse", 
"Clown Fish", "Sting Ray", "Blue Tang", "Octopus", "Sea Turtle"];

//boolean to indicate state of animation of giphy
var animated = false;

//variable to hold query URL
var queryURL;

//function to render buttons

function rendorButtons() {
    //empty button-view div to prevent duplicate buttons
    $("#button-view").empty();

    //loop through marineAnimals array
    for(i=0; i<marineAnimals.length; i++) {

        //create button tag
        var ma = $("<button>");

        //add classes to button tag
        ma.addClass("btn btn-default btn-sm mabutton");

        //add text to button tag
        ma.text(marineAnimals[i]);

        //style the button
        ma.css({"background-color": "#3987C9", "color":"white"});
        
        //add a data-searchName attribute to button

        //split input text variable into array to handle multiple word input
        var maWordArray = marineAnimals[i].split(" ");

        //create variable to hold data-searchName string
        var maSearchName = maWordArray[0];

            //loop through input word array to add "+" character between words
            for(j=0; j<(maWordArray.length-1); j++) {

                maSearchName = maSearchName + "+" + maWordArray[j+1];
            }

        //add data-searchName attribute to button
        ma.attr("data-searchname", maSearchName);
           
        //append button tag to "button-view" div
        $("#button-view").append(ma);

    }
}

    
//function to display giphys

function displayGiphy() {

    //empty contents of giphyDisplay div to make room for next set of giphy's
    $("#giphyDisplay").empty();

    //capture data-searchName of button
    var maSearchName = $(this).attr("data-searchname");

    //assign value to queryURL
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + maSearchName + "&api_key=N78frKOJKNi8iCjnIbbvWUNhnLMLcYDn&limit=10";

    //make ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        //handle giphy response
        console.log(response);
        //loop through each of the 10 responses
        for(i=0; i<10; i++) {

            //create variable to hold "rating"
            var rating = response.data[i].rating;
            //create variables to hold appropriate static and animated images 
            // var animatedURL = response.data[i].embed_url;
            var animatedURL = response.data[i].images.looping.url;

            var staticURL = response.data[i].images.fixed_height_still.url;
            console.log(staticURL);

            // <iframe src="https://giphy.com/embed/v5VcGU8dSnB9S" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/bird-v5VcGU8dSnB9S">via GIPHY</a></p>
            //<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/v5VcGU8dSnB9S" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/bird-v5VcGU8dSnB9S">via GIPHY</a></p>
            
            //create separate div for each image to allow for responsive image size
            var imageDiv = $("<div>");
            imageDiv.addClass("imgDiv");
            imageDiv.css({"width": "100%", "height": "0", "padding-bottom": "56%", "position": "relative", "display": "inline"});
            
            
            // //create <p> tag to hold rating
            // var ratingTag = $("<p>");
            // //add text to <p> tag
            // ratingTag.text(rating);
            // //style <p> tag
            // ratingTag.css({"display": "inline-block", "color": "white", "font-size": "24px"});

            // imageDiv.append(ratingTag);
            
            //scrolling: "no", frameborder: "0", height: "100%", width: "100%", position: "absolute"
            //create iframe or image tag
            var giphyImageTag = $("<img>");
            //add class to iframe or image tag
            giphyImageTag.addClass("giphyImage");
            //add attribute to hold the appropriate URL
            giphyImageTag.attr({src: staticURL, alt: "giphy"});
            //style giphyImageTag
            giphyImageTag.css({"margin-right": "15px"});
            //append <iframe> tag to <p> tag
            imageDiv.append(giphyImageTag);
            //append image tag to "#giphyDisplay"
            $("#giphyDisplay").append(imageDiv);
        //click function to change image url when image is clicked
            //conditional statement to change image url to static or animated image depending on state of animated boolean

        }
    });

    

}
        


//click function to respond to user input

    //listen for click of "addMarineAnimal" button
    $("#addMarineAnimal").click(function(event) {
        //prevent default from happening so that page doesn't reload
        event.preventDefault();
        //capture text input value, trim, and assign to variable
        var marineAnimalInput = $("#marineAnimalInput").val().trim();
        //capitalize the first letter of each word (css "text-transform: capitalize")  

        //push input to marineAnimals array
        marineAnimals.push(marineAnimalInput);

        //call render buttons function
        rendorButtons();


    });
    


//click function to respond to Marine Animal button click

    //listen for click of one of the Marine Animal buttons
    $(document).on("click", ".mabutton", displayGiphy);

//call render buttons function
rendorButtons();