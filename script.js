function display_results(response){
    $('#results').empty();
    for (let i =0; i < response.results.length; i++){
        // console.log(response)
        
        $('#results').append(
            `
            <div class="cards">
                <h2>${response.results[i].title}</h2>
                <img src="${response.results[i].image}">
            </div>
            `
        )
    }
}


function search_recipes(){
    let query_input = $('#query_input').val()
    try {
        $.ajax({
            url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=35119e298b824e7481b7febdf3fabcaa&query=${query_input}`,
            type: 'GET',
            success: display_results
        });
    } catch {
        alert("Unable to fetch Spoonacular API")
    }
}
