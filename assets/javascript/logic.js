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

ingredients = [];
recipes = [];

$("#add-button").on("click", function () {
    ingredients.push($("#input").val());
})

$("#submit-button").on("click", function () {
    // $.ajax({
    //     url: "https://www.food2fork.com/api/get?key=2f1201dc25f3e453a5c909d94d149d44&rId=35382&sort=r",
    //     method: "GET"
    // }).then(function(response){
    //     console.log(response);
    // })

    $.ajax({
        url: "https://api.nutritionix.com/v1_1/item?upc=52200004265&appId=044d2156&appKey=a6505bc1a5d010ae2963bc3a56076924",
        method: "GET"
    }).then(function (response) {

        console.log(response);

    })
    event.preventDefault();
    recipes.push($("#input").val());
    updatePage();
})

function updatePage() {
    $("#recipe-img").attr("src", "");
    $("#nutrition").attr("src", "");
    $("#recipe").text(recipeText);
}


var database = firebase.database();
database.ref().push({
    ingredients: ingredients,
    recipes: recipes,
})

database.ref().on("value", function (snapshot) {
    var sv = snapshot.val();
    console.log(sv.ingredients);
    console.log(sv.recipes);
})

updatePage();

