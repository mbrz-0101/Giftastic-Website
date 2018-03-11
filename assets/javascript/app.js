function giphyApp() {
  let topics = ['eye roll', 'facepalm', 'happy', 'high five', 'kiss', 'lol', 'no', 'sad', 'shrug', 'thumbs up', 'wink', 'yes', 'help', 'love', 'drunk', 'mood', 'disappointed', 'oh no you didn\'t', 'gtfo', 'goodbye', 'rejected', 'rage'];

  stagePage();

  $("#add-reaction-button").on('click', function () {
    event.preventDefault();

    topics.push($("#reaction-input").val());

    $("#button-space").empty();
    $("#reaction-input").val("");
    $("#reaction-input").attr("placeholder", "");

    stagePage();
  });
  
  function stagePage() {
    topics.forEach(function (reaction) {
      let newButton = $("<button class='btn reaction-button'>");
      newButton.text(reaction);
      $("#button-space").append(newButton);
    });


    $(".reaction-button").on("click", function () {
      $("#gif-space").empty();
      var reaction = $(this).text();
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        reaction + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function (response) {
          console.log(response);
          var results = response.data;
          var maxGifs = 10;
          $("#gif-space").empty();

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


}