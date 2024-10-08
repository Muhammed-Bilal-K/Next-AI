import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^[a-zA-Z0-9]{3,20}$/, "Username invalid, it should contain 3-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

// the models object is provided by the mongoose library and stores 

const User = models.User || model("User", UserSchema);

export default User;