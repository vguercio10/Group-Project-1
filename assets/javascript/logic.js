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
var cals = 0;
var tFat = 0;
var chol = 0;
var sodium = 0;
var tCarb = 0;
var protein = 0;

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
        embedURL = food2fork.recipes[0].f2f_url;
        console.log(embedURL);
        recipeCount = food2fork.count;
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
    }   

        console.log(cals);
        $("#calories").text(Math.round(cals));
        console.log(tFat);
        $("#fat").text(Math.round(tFat) + "g");
        console.log(chol);
        $("#chol").text(Math.round(chol) + "mg");
        $("#sodium").text(Math.round(sodium) + "mg");
        console.log(tCarb);
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

function updatePage() {

    database.ref().on("value", function(snapshot){
        
        let embedURL = snapshot.val().embedURL;
        console.log("value changed " + embedURL);
        $("#recipe-image").attr("src", embedURL);
        $("#recipe-image").attr("height", "700px");
        $("#recipe-image").attr("width", "100%");
    })
}

// database.ref().on("value", function(snapshot){
//     console.log("value changed");
//     cals = snapshot.val().cals;
//     tFat = snapshot.val().tFat;
//     chol = snapshot.val().chol;
//     sodium = snapshot.val().sodium;
//     tCarb = snapshot.val().tCarb;
//     protein = snapshot.val().protein;
// })

// database.ref().on("value", function (snapshot) {
//     var sv = snapshot.val();
//     database.ref().set({
//         ingredients: ingredients,
//         recipes: recipes,
//     });
//     console.log(sv.ingredients);
//     console.log(sv.recipes);
// })

setTimeout(function(){
    updatePage();
}, 1000);

