// Initialize Firebase
var config = {
    apiKey: "AIzaSyDGCTv9tkR6r9w-0P9Gz__Xi1FHnAkTAXU",
    authDomain: "loose-cooking.firebaseapp.com",
    databaseURL: "https://loose-cooking.firebaseio.com",
    projectId: "loose-cooking",
    storageBucket: "loose-cooking.appspot.com",
    messagingSenderId: "535521502364"
};
firebase.initializeApp(config);
var database = firebase.database();

// Global variables 
var ingredients = [];
var recipes = [];
var embedURL;
var cals = 0;
var tFat = 0;
var chol = 0;
var sodium = 0;
var tCarb = 0;
var protein = 0;

// Enter and store ingredients
$("#add-button").click(function(){
    if ($("#enter-ingredients").val() != "") {
        ingredients.push($("#enter-ingredients").val());
        $("#ingredient-added-list").text(ingredients.join(", ").toUpperCase().trim());
        $("#enter-ingredients").val("");
    }
})

// Ingredient submit button with Ajax call for recipes, Firebase for last recipe searched
$("#ingredient-submit").click(function(event){
    $.ajax({
        url: "https://www.food2fork.com/api/search?key=2f1201dc25f3e453a5c909d94d149d44&q=" + ingredients,
        dataType: "json",
        method: "GET"
    }).then(function (food2fork) {
        embedURL = food2fork.recipes[0].f2f_url;
        recipes = food2fork.recipes;
        $("#recipe-image").attr("src", embedURL);
        $("#recipe-image").attr("height", "700px");
        $("#recipe-image").attr("width", "100%");
        database.ref().set({
            embedURL: embedURL
        })
    })
    event.preventDefault();
    updatePage();
})

// Nutrition submit with Ajax call for nutrional facts
$("#nutrition-submit").click(function (event) {
    $("#ingredient-added-list").empty();
    var input = $("#nutrition-ingredients-").val().trim();
    var settings = {
        "url": "https://trackapi.nutritionix.com/v2/natural/nutrients",
        "method": "POST",
        "timeout": 0,
        "headers": {
        "x-app-id": "044d2156",
        "x-app-key": "fc6e03e57789aa930a4efc1c9a131c43",
        "x-remote-user-id": "0",
        "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "query": input 
        }
  };
  
//   Nutrional values added then displayed on page. Rounded numbers.
  $.ajax(settings).done(function(response){
    for (var i = 0; i < response.foods.length; i++ ){
        cals += response.foods[i].nf_calories;
        tFat += response.foods[i].nf_total_fat;
        chol += response.foods[i].nf_cholesterol;
        sodium += response.foods[i].nf_sodium;
        tCarb += response.foods[i].nf_total_carbohydrate;
        protein += response.foods[i].nf_protein;
    }
        $("#calories").text(Math.round(cals));
        $("#fat").text(Math.round(tFat) + "g");
        $("#chol").text(Math.round(chol) + "mg");
        $("#sodium").text(Math.round(sodium) + "mg");
        $("#carbs").text(Math.round(tCarb) + "g");
        $("#protein").text(Math.round(protein) + "g");

        cals = 0;
        tFat = 0;
        chol= 0;
        sodium= 0;
        tCarb = 0;
        protein = 0;
        ingredients = [];
  });
})

// Diplay for embeded URL
function updatePage() {
    database.ref().on("value", function(snapshot){
        let embedURL = snapshot.val().embedURL;
        $("#recipe-image").attr("src", embedURL);
        $("#recipe-image").attr("height", "700px");
        $("#recipe-image").attr("width", "100%");
    })  
}

setTimeout(function () {
    updatePage();
}, 1000);