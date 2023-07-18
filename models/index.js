const mongoose = require('mongoose')

// DB setup
mongoose.connect('mongodb://127.0.0.1:27017/socialDB').then(() => {
  console.log('connected to DB!')
}).catch((err) => {
  console.error(err)
})