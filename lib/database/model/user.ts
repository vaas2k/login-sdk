import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, require: true },
  image: { type: String },
  OAuth_ID : {type : String}
});

const User = models?.User || model("User", UserSchema);

export default User;
