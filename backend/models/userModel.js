const mongoose = require("mongoose");

 const userSchema =  mongoose.Schema(
  {
    user: {
      userName: {
        type: String,
        required: [true, "Enter the userName"],
        unique: [true, "Enter a Unique userId"],
      },
      userPassword: {
        type: String,
        required: [true, "Enter the userPassword"],
      },
    },
  },    
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("budgetUsers", userSchema);
module.exports = UserModel;
