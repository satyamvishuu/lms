import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
  lectureId:      { type: String, required: true },
  lectureTitle:   { type: String, required: true },
  lectureDuration:{ type: Number, required: true },
  lectureUrl:     { type: String, required: true },
  isPreviewFree:  { type: Boolean, default: false },
  lectureOrder:   { type: Number, required: true },
});

const chapterSchema = new mongoose.Schema({
  chapterId:      { type: String, required: true },
  chapterOrder:   { type: Number, required: true },
  chapterTitle:   { type: String, required: true },
  chapterContent: { type: [lectureSchema], default: [] }, // ✅ safe
});

const courseSchema = new mongoose.Schema(
  {
    courseTitle:       { type: String, required: true },
    courseDescription: { type: String, required: true },
    courseThumbnail:   { type: String },

    coursePrice:       { type: Number, required: true },
    discount:          { type: Number, default: 0, min: 0, max: 100 },

    isPublished:       { type: Boolean, default: true },

    courseContent:     { type: [chapterSchema], default: [] }, // ✅ safe

    courseRatings: {
      type: [
        {
          userId: String,
          rating: { type: Number, min: 1, max: 5 },
        },
      ],
      default: [], // ✅ prevent crash
    },

    // ✅ FIXED: remove ref (since using Clerk string)
    educator: {
      type: String, // clerkId
      required: true,
      index: true,  // 🚀 performance
    },

    enrolledStudents: {
      type: [String], // clerkId array
      default: [],
    },
  },
  { timestamps: true }
);

// 🚀 helpful index for filtering published courses
courseSchema.index({ isPublished: 1 });

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;