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

var ingredients = [];
var recipes = [];
var recipeCount = 0;
var recipeIndex = 0;
var embedURL;

$("#add-button").click(function () {
    if ($("#enter-ingredients").val() != "") {
        ingredients.push($("#enter-ingredients").val());
        $("#ingredient-added-list").text(ingredients + " ");
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
        $("#recipe-image").attr("height", "500px");
        $("#recipe-image").attr("width", "440px");
    })

    $.ajax({
        url: "https://api.nutritionix.com/v1_1/item?upc=52200004265&appId=044d2156&appKey=a6505bc1a5d010ae2963bc3a56076924",
        dataType: "json",
        method: "GET"
    }).then(function (nutritionix) {
    console.log(nutritionix);

    })
    event.preventDefault();
    updatePage();
})

function updatePage() {
    $("#car-img-1").attr("src", recipes[recipeIndex].image_url);
    $("#nutrition").attr("src", "");
    $("#recipe-image").attr("src", embedURL);
    $("#recipe-image").attr("height", "100px");
    $("#recipe-image").attr("width", "100px");
    console.log(embedURL);
}


var database = firebase.database();
database.ref().push({
    ingredients: ingredients,
    recipes: recipes,
})

// database.ref().on("value", function (snapshot) {
//     var sv = snapshot.val();
//     console.log(sv.ingredients);
//     console.log(sv.recipes);
// })

// updatePage();

