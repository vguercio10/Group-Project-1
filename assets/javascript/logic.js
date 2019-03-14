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

$("#add-button").on("click", function(){
    ingredients.push($("#input").val());
})

$("#submit-button").on("click", function(){
    // $.ajax({
    //     url: "https://www.food2fork.com/api/get?key=2f1201dc25f3e453a5c909d94d149d44&rId=35382",
    //     method: "GET"
    // }).then(function(response){
    //     console.log(response);
    // })
    updatePage();
})

function updatePage(){
    $("#recipe-img").attr("src", "");
    $("#nutrition").attr("src", "");
    $("#recipe").text(recipeText);
}

updatePage();