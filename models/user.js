import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

/**
 * 🔴 IMPORTANT FIX:
 * passport-local-mongoose exports the plugin as `.default` in ESM
 */
userSchema.plugin(passportLocalMongoose.default);

const User = mongoose.model("User", userSchema);
export default User;
