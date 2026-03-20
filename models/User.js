import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  role: {
    type: String,
    default: "student",
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);