import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const ResetSchema = new Schema(
  {
    userID: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    token: { type: String },
  },
  { timestamps: true }
);

const reset_token = models?.reset_token || model("reset_token", ResetSchema);

export default reset_token;
