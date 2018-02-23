//variable to hold initial array of marine animals
var marineAnimals = ["Dolphin", "Killer Whale", "Whale Shark", "Great White Shark", "Hammerhead Shark", "Mako Shark", "Blue Whale", 
"Sperm Whale", "Grouper", "Flounder", "Beluga Whale", "Fur Seal", "Walrus", "Sea Lion", "Sea Otter", "Starfish", "Sea Horse", 
"Clown Fish", "Sting Ray", "Blue Tang", "Octopus", "Sea Turtle"];

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

        //add data-searchName attribute to button
        ma.attr("data-searchname", marineAnimals[i]);
           
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
        //loop through each of the 10 responses
        for(i=0; i<10; i++) {

            //create variable to hold "rating"
            var rating = response.data[i].rating.toUpperCase();

            //create variables to hold appropriate static and animated images 
            var animatedURL = response.data[i].images.fixed_height.url;
            var staticURL = response.data[i].images.fixed_height_still.url;
 
            //create separate div for each image
            var imageDiv = $("<div>");

            //add a class to the image div
            imageDiv.addClass("imgDiv");

            //create <p> tag to hold rating
            var ratingTag = $("<p>");

            //add class to <p> tag
            ratingTag.addClass("rating");
            
            //add text to <p> tag
            ratingTag.text(rating);

            //append <p> tag to <div> tag
            imageDiv.append(ratingTag);
            
            //create <img> tag
            var giphyImageTag = $("<img>");

            //add class to <img> tag
            giphyImageTag.addClass("giphyImage img-responsive");

            //add attribute to hold the appropriate URL
            giphyImageTag.attr({"src": staticURL, "alt": "giphy", "data-still": staticURL, "data-animate": animatedURL, "data-state": "still"});
            
            //append <img> tag to <div> tag
            imageDiv.append(giphyImageTag);
            
            //append <div> tag to "#giphyDisplay"
            $("#giphyDisplay").append(imageDiv);
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

    //clear text from input box
    $("#marineAnimalInput").val("");

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

 //click function to change image url when image is clicked
 $(document).on("click", ".giphyImage", function() {
            
    //capture the state of the giphy animation
    var state = $(this).attr("data-state");

    //conditional statement for if the state of the giphy is still or animated
    if (state=="still") {

        //change the source of the giphy to the url for animated
        $(this).attr("src", $(this).attr("data-animate"));

        //change the state to animate
        $(this).attr("data-state", "animate");

    } else {

        //determine if the state of the giphy is still or animated
        $(this).attr("src", $(this).attr("data-still"));

        //determine if the state of the giphy is still or animated
        $(this).attr("data-state", "still");
    }
});