
const foodItem = document.getElementById('foodItem');
const parentClass = document.getElementById('parentClass');
const foodDetails = document.getElementById('foodDetails');
const errorHandel = document.getElementById('errorHandel');
const itemList = document.querySelectorAll('.itemList');


document.getElementById('searchFood').addEventListener('click', function(){
    const food = document.getElementById('foodName');
    const foodName = food.value;
    if(foodName == ''){
      alert('Please Enter Your Desired Food Item');
    }else{
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${foodName}`)
      .then(res => res.json())
      .then(data => {
          let foodMeal="";
          if(data.meals){
              data.meals.forEach(meals => {
                foodMeal +=` 
                  <div class="col-md-3 mb-3" onclick="food(${meals.idMeal});">
                  <div class="card h-100  shadow  p-3" >
                    <img src="${meals.strMealThumb}" class="card-img-top">
                    <div class="card-body">
                      <h5 class="card-title text_color fw-bold">${meals.strMeal}</h5>
                    </div>
                  </div>
                </div>
                  ` ; 
              });
              foodItem.innerHTML=foodMeal; 
              errorHandel.style.display="none";
              parentClass.style.display="block";
              
  
          }else{
            foodMeal =`
             <h3>Food item not found</h3>
            `;
            errorHandel.innerHTML=foodMeal; 
            parentClass.style.display="none";
            errorHandel.style.display="block";
            foodDetails.style.display="none";
  
          } 
           
      } )
      .catch(error => {
          let foodMeal =`
            <h3> food item not found plz search again </h3>
          `;
          errorHandel.innerHTML = foodMeal;
          parentClass.style.display="none";
          errorHandel.style.display="block";
          foodDetails.style.display="none";
   
  
      })
    }


})

const food=(idMeal)=>{
  const mealId = idMeal;
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then(res=> res.json())
  .then(data =>{
     const foodObject = data.meals[0];
    let ingredient = `
    <div class="card h-100  shadow card_radius p-3 ">
    <img src="${foodObject.strMealThumb}" class="card-img-top card-bg " alt="...">
    <div class="card-body">
      <h5 class="card-title orangeColor fw-bold ">${foodObject.strMeal}</h5>
      <h6>Ingredient</h6>
      <li><span><i class="fas fa-check-square orange"></i> </span> ${foodObject.strIngredient1} </li>
      <li><span><i class="fas fa-check-square orange"></i> </span> ${foodObject.strIngredient2} </li>
      <li><span><i class="fas fa-check-square orange"></i> </span> ${foodObject.strIngredient3} </li>
      <li><span><i class="fas fa-check-square orange"></i> </span> ${foodObject.strIngredient4} </li>
      <li><span><i class="fas fa-check-square orange"></i> </span> ${foodObject.strIngredient5} </li>
      <li><span><i class="fas fa-check-square orange"></i> </span> ${foodObject.strIngredient6} </li>
    </div>
  </div>
    `
    foodDetails.innerHTML = ingredient;
  })
}