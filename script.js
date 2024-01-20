recipeCount = undefined

function search_recipes(){
    let query_input_value = document.getElementById('query_input').value
    console.log(query_input_value)
    try {
        $.ajax({
            url: `https://api.spoonacular.com/recipes/findByIngredients?apiKey=35119e298b824e7481b7febdf3fabcaa&ingredients=${query_input_value}&ranking=1&number=30&ignorePantry=true`,
            // url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=35119e298b824e7481b7febdf3fabcaa&includeIngredients=${query_input_value}&number=15`,
            // url: `https://api.spoonacular.com/recipes/random?apiKey=35119e298b824e7481b7febdf3fabcaa`,
            type: 'GET',
            success: [display_results, get_recipe_count],
        });
    } catch {
        alert("Unable to fetch Spoonacular API")
    }
}

// function search_random_recipe(){
//     let query_input_value = document.getElementById('query_input').value
//     console.log(query_input_value)
//     try {
//         $.ajax({
//             url: `https://api.spoonacular.com/recipes/random?apiKey=35119e298b824e7481b7febdf3fabcaa&number=3&tags=${query_input_value}`,
//             type: 'GET',
//             success: random_recipe_results,
//         });
//     } catch {
//         alert("Unable to fetch Spoonacular API")
//     }
// }

// function random_recipe_results(response){
//     console.log(response)
//     for (i = 0; i < response.recipes.length; i++){
//         $('#results').append(
//                     `
//                     <div class="cards">
//                         <h2>${response.recipes[i].title}</h2>
//                         <img src="${response.recipes[i].image}">
//                     </div>
//                     `            
//                 )  
//         }
//     }


function display_results(response){
    // console.log(response)
    // $('#results').empty();
    
    // for (let i = 0; i < response.results.length; i++){   
    //     $('#results').append(
    //         `
    //         <div class="cards">
    //             <h2>${response.results[i].title}</h2>
    //             <img src="${response.results[i].image}">
    //             <p>Ready in: ${response.results[i].title}</p>
    //         </div>
    //         `            
    //     )  
    // }
    console.log(response)
    $('#results').empty();
    
    for (let i = 0; i < response.length; i++){   
        $('#results').append(
            `
            <div class="cards" id="${response[i].id}">
                <h2>${response[i].title}</h2>
                <img src="${response[i].image}">
            </div>
            `            
        )  
    }

    $('#results').on("click", "div.cards", function(){
        const recipeId = this.id;
        openModalWithRecipeInfo(recipeId);
        displayRecipeSummary(recipeId);
        displayIngredients(recipeId);

    });
}

function displayRecipeSummary(recipeId){
    try {
        $.ajax({
            url: `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=35119e298b824e7481b7febdf3fabcaa&includeNutrition=false`,
            type: 'GET',
            success: function(recipeSummary){
                console.log(recipeSummary);
                $('#modal_title').html(recipeSummary.title);
                $('#modal_summary').html(recipeSummary.summary);
            },
        })
    } catch {
        alert("Unable to fetch API for Recipe Summary");
    }
}

function displayIngredients(recipeId){
    try {
        $.ajax({
            url: `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=35119e298b824e7481b7febdf3fabcaa`,
            type: 'GET',
            success: function(recipeIngredients){
                console.log(recipeIngredients)
                ingredients = '';
                for(i=0; i < recipeIngredients.extendedIngredients.length ; i++){
                    ingredients += recipeIngredients.extendedIngredients[i].name
                }
                
                $('#modal_ingredients').html(ingredients)
            }
            })
        
    } catch {
        alert("Unable to fetch API for Recipe Summary");
    }
}


function openModalWithRecipeInfo(recipeId){
    const modal = document.getElementById('modal')
    modal.showModal();
     try {
        $.ajax({
            url: `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=35119e298b824e7481b7febdf3fabcaa`,
            type: 'GET',
            success: function (recipeInfo) {
                console.log(recipeInfo);

                // Check if there are steps available
                if (recipeInfo.length > 0 && recipeInfo[0].steps.length > 0) {
                    const steps = recipeInfo[0].steps;

                    // Clear previous content in the modal
                    $('#modal_body').html('');

                    // Loop through each step and display information
                    for (let i = 0; i < steps.length; i++) {
                        const step = steps[i];
                        const ingredientsList = step.ingredients.map(ingredient => ingredient.name).join(', ');
                      

                        $('#modal_body').append(
                            `<div class="step">
                                <h3>Step ${step.number}</h3>
                                <p>${step.step}</p>
                                <p>Ingredients: ${ingredientsList}</p>
                           
                            </div>`
                        );
                    }
                } else {
                    // No steps available
                    $('#modal_body').html('<p>No steps available for this recipe.</p>');
                }
            },
        });
    } catch {
        alert("Unable to fetch Spoonacular API");
    }
}


function get_recipe_count(response){
    var recipeCount = response.totalResults
    console.log(recipeCount)
}

function close_modal(){
    close_modal_button = document.getElementById('close_modal')
    modal.close()
}


function setup(){

    currentPage = 1
    ITEM_PER_PAGE = 15
  
    var query_input = document.getElementById('query_input')

    query_input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("submit_button").click()
            event.preventDefault(); // prevents refresh
            // console.log("enter key is pressed")
            

        }   
    });

 
}

$(document).ready(setup)



