// $.ajax({
//     url: "https://www.food2fork.com/api/get?key=2f1201dc25f3e453a5c909d94d149d44&rId=35382",
//     method: "GET"
// }).then(function(response){
//     console.log(response);
// })

ingredients = [ ];
recipes = [ ];

$("#submit-button").on("click", function(){
    event.preventDefault();
    recipes.push($("#input").val());

});

var database = firebase.database();
database.ref().push({
    ingredients: ingredients,
    recipes: recipes,
})

database.ref().on("value", function(snapshot) {
var sv = snapshot.val();
console.log(sv.ingredients);
console.log(sv.recipes);
})