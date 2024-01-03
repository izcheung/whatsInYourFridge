function search_recipes(){
    let query_input_value = document.getElementById('query_input').value
    console.log(query_input_value)
    try {
        $.ajax({
            url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=35119e298b824e7481b7febdf3fabcaa&query=${query_input_value}`,
            type: 'GET',
            success: display_results
        });
    } catch {
        alert("Unable to fetch Spoonacular API")
    }
}

function display_results(response){
    $('#results').empty();
    for (let i =0; i < response.results.length; i++){   
        $('#results').append(
            `
            <div class="cards">
                <h2>${response.results[i].title}</h2>
                <img src="${response.results[i].image}">
            </div>
            `            
        )  
    }
    $('#results').on("click", "div.cards", function(){
        modal = document.getElementById('modal')
        modal.showModal();
    });
}

function close_modal(){
    close_modal_button = document.getElementById('close_modal')
    modal.close()
}


function setup(){

    var query_input = document.getElementById('query_input')

    query_input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("submit_button").click()
            event.preventDefault();
            console.log("enter key is pressed")
        }   
    });
}

$(document).ready(setup)
