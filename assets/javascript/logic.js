document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, 'options');
});

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

var ingredients = [];
var recipes = [];
var recipeCount = 0;
var recipeIndex = 0;
var embedURL;
var cals;
var tFat;
var chol;
var sodium;
var tCarb;
var protein;

$("#add-button").click(function () {
    if ($("#enter-ingredients").val() != "") {
        ingredients.push($("#enter-ingredients").val());
        $("#ingredient-added-list").text(ingredients.join(", ").toUpperCase().trim());
        $("#enter-ingredients").val("");
    }
})

$("#ingredient-submit").click(function (event) {
    $.ajax({
        url: "https://www.food2fork.com/api/search?key=2f1201dc25f3e453a5c909d94d149d44&q=" + ingredients,
        dataType: "json",
        method: "GET"
    }).then(function (food2fork) {
        console.log(food2fork);
        embedURL = food2fork.recipes[recipeIndex].f2f_url;
        console.log(embedURL);
        recipeCount = food2fork.count;
        recipes = food2fork.recipes;
        $("#recipe-image").attr("src", embedURL);
        $("#recipe-image").attr("height", "700px");
        $("#recipe-image").attr("width", "500px");
    })


    event.preventDefault();
    updatePage();
})

$("#nutrition-submit").click(function(event){
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
  
  $.ajax(settings).done(function (response) {
    console.log(response);

    for (var i = 0; i < response.foods.length; i++ ){
        cals += response.foods[i].nf_calories;
        tFat += response.foods[i].nf_total_fat;
        chol += response.foods[i].nf_cholesterol;
        sodium += response.foods[i].nf_sodium;
        tCarb += response.foods[i].nf_total_carbohydrate;
        protein += response.foods[i].nf_protein;
        console.log(cals);
    }
    console.log(cals);
        $("#calories").text(cals);
        $("#fat").text(tFat + "g");
        $("#chol").text(chol + "mg");
        $("#sodium").text(sodium + "mg");
        $("#carbs").text(tCarb + "g");
        $("#protein").text(protein + "g");
        
        cals = 0;
        tFat = 0;
        chol= 0;
        sodium= 0;
        tCarb = 0;
        protein = 0;
        ingredients = [];
  });
})

function updatePage() {
    console.log("updated Page");
    $("#calories").text(cals);
console.log(cals);
    $("#fat").text(tFat + "g");
    $("#chol").text(chol + "mg");
    $("#sodium").text(sodium + "mg");
    $("#carbs").text(tCarb + "g");
    $("#protein").text(protein + "g");
    console.log(embedURL);
}

setTimeout(function(){
    updatePage();
}, 1000);



