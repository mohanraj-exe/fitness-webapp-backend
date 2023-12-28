# Fitness back-end web application

A fitness back-end web application that allows users to public apis to get nutritional facts for different food items, 
Calories burned by activities, 
Exercises info and Recipe details.

User can sign up and add food items eaten data,view,list,update and delete meals in the present day and previous days as well. 

## Table of Contents

- Description
- Demo
- Installation
- Usage

## Description

The Fitness backend is a straightforward web application that provides users to track calories and fetch data with the following apis:

* Public APIs:
  * /api/public/nutritional_facts
    * search_query and weight_in_grams - by using these query parameters public user can fetch food item data based on its weight.  

  * /api/public/calories_burned
    * activity - by using this query public user can know the calories burned based on activity.
  
  * /api/public/exercise_info
    * muscle - by using this query public user can know the exercise info based on muscle group.

  * /api/public/recipe_data
    * search_query - by using this query public user can get food recipe data for the food.

* User APIs:
  * /api/user/signup
    * email and password - by using this request body inputs user can create account.

  * /api/user/login
    * email and password - by using this request body inputs user can sign in.
 
* Calorie APIs:
  * /api/calories/add
    * meal, '_id' - by using this request body inputs and signed in user('_id') can access to this api and create a 'meal' entry for the current date.

  * /api/calories/view
    * inputDate, '_id' - by using this request query inputs and signed in user('_id') can access to this api and view 'meal' entry for the input date 
else it will show the present date meals data entered.

  * /api/calories/update
    * inputDate, meal_id, '_id', meal - by using this request query inputs and signed in user('_id') can access to this api and can edit 'meal' entry for the input date 
else it will update meal data for the present date.

  * /api/calories/delete
    * inputDate, meal_id, '_id' - by using this request query inputs and signed in user('_id') can access to this api and can delete 'meal' entry for the input date 
else it will delete meal data by using its given 'meal_id' for the present date.

## Demo

You can view the project live at [Deployed backend project link](https://ﬁtness-webapp-backend.onrender.com/)

## Installation

1. Clone the repository:
git **clone** [GitHub](https://github.com/mohanraj-exe/fitness-webapp-backend.git)

2. Navigate to the project directory:
**cd** src

## Usage

1. Open the project directory in a code editor of your choice.
2. Open the **index.js** file in your editor.
3. You can find **/api** base api following it has routes in the **index.router** file.
