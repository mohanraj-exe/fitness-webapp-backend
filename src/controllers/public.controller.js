const axios = require('axios');
const NINJA_NUTRITION_API_URL = 'https://api.api-ninjas.com/v1/nutrition?query=';
const NINJA_CALORIES_API_URL = 'https://api.api-ninjas.com/v1/caloriesburned?activity=';
const NINJA_EXERCISE_API_URL = 'https://api.api-ninjas.com/v1/exercises?muscle=';
const NINJA_RECIPE_API_URL = 'https://api.api-ninjas.com/v1/recipe?query=';
// const USDA_API_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';

module.exports = {
  foodData: function (req, res, next) {
    axios.get(NINJA_NUTRITION_API_URL, {
      params: {
        query: req.query.search_query
      },
      headers: {
        'X-Api-Key': process.env.NINJA_API_KEY
      }
    })
      .then(function (response) {
        if (req.query.weight_in_grams) {
          const output = response.data.map(function (nutritional_data) {
            let transformedData = Object.keys(nutritional_data).reduce(function (result, item) {
              result[item] = typeof nutritional_data[item] === "number"
                ? Number((nutritional_data[item] * (req.query.weight_in_grams / 100)).toFixed(2))
                : nutritional_data[item];
              return result;
            }, {});
            // Log the transformed data
            // console.log(transformedData);
            return transformedData;
          });
          return res.status(200).json({ message: 'Success', data: output });
        }
        else {
          return res.status(200).json({ message: 'Success', data: response.data });
        }
      })
      .catch(function (error) {
        console.error('Error:', error.message);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return res.status(error.response.status).json({ message: 'Error', data: error.response.data });
        } else if (error.request) {
          // The request was made but no response was received
          return res.status(500).json({ message: 'Error', data: 'No response received from the server' });
        } else {
          // Something happened in setting up the request that triggered an Error
          return res.status(500).json({ message: 'Error', data: 'Request setup error' });
        }
      });
  },
  caloriesBurned: function (req, res, next) {
    axios.get(NINJA_CALORIES_API_URL + req.query.activity, {
      headers: {
        'X-Api-Key': process.env.NINJA_API_KEY
      }
    })
      .then(function (value) {
        console.log("value:", value.data);
        return res.status(value.status).json({ message: value.statusText, data: value.data });
      }).catch(function (err) {
        console.log("value:", err);
        return res.status(err.status).json({ message: err.statusText, data: err });
      })
  },
  exercisesInfo: function (req, res, next) {
    axios.get(NINJA_EXERCISE_API_URL + req.query.muscle, {
      headers: {
        'X-Api-Key': process.env.NINJA_API_KEY
      }
    })
      .then(function (value) {
        // console.log("value:", value.data);
        return res.status(value.status).json({ message: value.statusText, data: value.data });
      }).catch(function (err) {
        // console.log("value:", err);
        return res.status(err.status).json({ message: err.statusText, data: err });
      })
  },
  recipeData: function (req, res, next) {
    axios.get(NINJA_RECIPE_API_URL + req.query.search_query, {
      headers: {
        'X-Api-Key': process.env.NINJA_API_KEY
      }
    })
      .then(function (value) {
        // console.log("value:", value.data);
        return res.status(value.status).json({ message: value.statusText, data: value.data });
      }).catch(function (err) {
        // console.log("value:", err);
        return res.status(err.status).json({ message: err.statusText, data: err });
      })
  }
};

// module.exports = {
//   foodData: function (req, res, next) {
//     axios.get(USDA_API_URL, {
//         params:{
//             query: query,
//             api_key: process.env.USDA_API_KEY
//         }
//     })
//       .then(function (response) {
//         return res.status(200).json({ message: 'Success', data: response.data });
//       })
//       .catch(function (error) {
//         console.error('Error:', error.message);
//         if (error.response) {
//           // The request was made and the server responded with a status code
//           // that falls out of the range of 2xx
//           return res.status(error.response.status).json({ message: 'Error', data: error.response.data });
//         } else if (error.request) {
//           // The request was made but no response was received
//           return res.status(500).json({ message: 'Error', data: 'No response received from the server' });
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           return res.status(500).json({ message: 'Error', data: 'Request setup error' });
//         }
//       });
//   },
// };