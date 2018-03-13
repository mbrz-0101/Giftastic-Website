// The GiphyApp function runs on page load. The Giphy App allows the user to select from a number of buttons, and use Giphy API to view reaction gifs. Using the reaction addition section, the user can add thir own buttons and then search with them dynamically.
function giphyApp() {

  // The default topics to be shown on the page
  let topics = ['eye roll', 'facepalm', 'happy', 'high five', 'kiss', 'lol', 'no', 'sad', 'shrug', 'thumbs up', 'wink', 'yes', 'help', 'love', 'drunk', 'mood', 'disappointed', 'oh no you didn\'t', 'gtfo', 'goodbye', 'rejected', 'rage'];

  // Stages the home page for manipulation and populates the reaction-addition and button fields
  stagePage();

  // On click of the add-reaction-button, the reaction will be added to default topics, then the button area cleared and page 'staged'
  $("#add-reaction-button").on('click', function () {
    event.preventDefault();

    topics.push($("#reaction-input").val());

    $("#button-space").empty();
    $("#reaction-input").val("");
    $("#reaction-input").attr("placeholder", "");

    stagePage();
  });

  // Stages home page for manipulation, populates fields, and uses ajax on reaction-button clicks
  function stagePage() {

    // Displays topics buttons on home page
    topics.forEach(function (reaction) {
      let newButton = $("<button class='btn reaction-button'>");
      newButton.text(reaction);
      $("#button-space").append(newButton);
    });

    // On reaction-button click, ajax is used to query Giphy API
    $(".reaction-button").on("click", function () {
      $("#gif-space").empty();
      var reaction = $(this).text();
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        reaction + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })

        // Following ajax response, gif space is emptied...
        .then(function (response) {
          console.log(response);
          var results = response.data;
          var maxGifs = 10;
          $("#gif-space").empty();

          // then populated with still images from Giphy, and set up to be manipulated through clicks
          for (var i = 0; i < maxGifs; i++) {

            let reactionImage = $("<img class='gif'>");
            reactionImage.attr("src", results[i].images.fixed_width_still.url);
            reactionImage.attr("data-still", results[i].images.fixed_width_still.url);
            reactionImage.attr("data-animate", results[i].images.fixed_width.url);
            reactionImage.attr("data-state", "still");

            $("#gif-space").append(reactionImage);
          }
        });


    });

  }
    // When the user clicks any gif, this will toggle it between still and animated using the attributes specified above
    $(document).on("click", ".gif", function () {
      let state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }

      if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

}