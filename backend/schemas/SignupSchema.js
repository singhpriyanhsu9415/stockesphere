const {Schema}=require('mongoose');

const SignupSchema=new Schema({
      name: String,
      password: String,
      email: String,
})

module.exports={SignupSchema};