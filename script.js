recipeCount = undefined;

function search_recipes() {
  let query_input_value = document.getElementById("query_input").value;
  console.log(query_input_value);
  try {
    $.ajax({
      url: `https://api.spoonacular.com/recipes/findByIngredients?apiKey=35119e298b824e7481b7febdf3fabcaa&ingredients=${query_input_value}&ranking=1&number=15&ignorePantry=true`,
      type: "GET",
      success: [display_results, get_recipe_count],
    });
  } catch {
    alert("Unable to fetch Spoonacular API");
  }
}

function display_results(response) {
  $(".scrollButton").empty();
  $(".scrollButton").append(
    `
        <div>
            <a href="#results" class="single_day">Let's get cooking!</a>
            <p class="scrollIcon">></p>
        </div>
        `
  );

  console.log(response);
  $("#results").empty();

  for (let i = 0; i < response.length; i++) {
    $("#results").append(
      `
            <div class="cards" id="${response[i].id}">
                <h2>${response[i].title}</h2>
                <img src="${response[i].image}">
            </div>
            `
    );
  }

  $("#results").on("click", "div.cards", function () {
    const recipeId = this.id;
    openModalWithRecipeInfo(recipeId);
    displayRecipeSummary(recipeId);
    displayIngredients(recipeId);
  });
}

function displayRecipeSummary(recipeId) {
  try {
    $.ajax({
      url: `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=35119e298b824e7481b7febdf3fabcaa&includeNutrition=false`,
      type: "GET",
      success: function (recipeSummary) {
        console.log(recipeSummary);
        $("#modal_title").html(recipeSummary.title);
        $("#modal_summary").html(recipeSummary.summary);
      },
    });
  } catch {
    alert("Unable to fetch API for Recipe Summary");
  }
}

function displayIngredients(recipeId) {
  try {
    $.ajax({
      url: `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=35119e298b824e7481b7febdf3fabcaa`,
      type: "GET",
      success: function (recipeIngredients) {
        console.log(recipeIngredients);

        ingredients = document.createElement("ul");

        for (let i = 0; i < recipeIngredients.extendedIngredients.length; i++) {
          // Corrected the creation of li element
          const li = document.createElement("li");
          li.append(recipeIngredients.extendedIngredients[i].name);
          ingredients.append(li); // Concatenate the HTML of li to ingredients
        }

        $("#modal_ingredients").html(ingredients);
      },
    });
  } catch {
    alert("Unable to fetch API for Recipe Summary");
  }
}

function openModalWithRecipeInfo(recipeId) {
  const modal = document.getElementById("modal");
  modal.showModal();
  try {
    $.ajax({
      url: `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=35119e298b824e7481b7febdf3fabcaa`,
      type: "GET",
      success: function (recipeInfo) {
        console.log(recipeInfo);

        // Check if there are steps available
        if (recipeInfo.length > 0 && recipeInfo[0].steps.length > 0) {
          const steps = recipeInfo[0].steps;

          // Clear previous content in the modal
          $("#modal_body").html("");

          // Loop through each step and display information
          for (let i = 0; i < steps.length; i++) {
            const step = steps[i];

            $("#modal_body").append(
              `<div class="step">
                                <h3>Step ${step.number}</h3>
                                <p>${step.step}</p>                           
                            </div>`
            );
          }
        } else {
          // No steps available
          $("#modal_body").html("<p>No steps available for this recipe.</p>");
        }
      },
    });
  } catch {
    alert("Unable to fetch Spoonacular API");
  }
}

function get_recipe_count(response) {
  var recipeCount = response.totalResults;
  console.log(recipeCount);
}

function close_modal() {
  close_modal_button = document.getElementById("close_modal");
  modal.close();
}

function setup() {
  currentPage = 1;
  ITEM_PER_PAGE = 15;

  var query_input = document.getElementById("query_input");

  query_input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      document.getElementById("submit_button").click();
      event.preventDefault(); // prevents refresh
      // console.log("enter key is pressed")
    }
  });
}

$(document).ready(setup);
