const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Lesson = require('../models/lesson');

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.DB_URL || process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/codevibe';

const modules = [
  { prefix: 'graph', total: 10, title: 'Graph Lesson' },
  { prefix: 'tree', total: 10, title: 'Tree Lesson' },
  { prefix: 'dp', total: 10, title: 'DP Lesson' },
];

const lessons = modules.flatMap((module, moduleIndex) =>
  Array.from({ length: module.total }, (_, index) => ({
    lessonId: `${module.prefix}-lesson-${index + 1}`,
    title: `${module.title} ${index + 1}`,
    content: `${module.title} ${index + 1} content placeholder for ${module.prefix} module.`,
    order: moduleIndex * 100 + index + 1,
  }))
);

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB at ${MONGO_URI}`);

    for (const lesson of lessons) {
      await Lesson.findOneAndUpdate(
        { lessonId: lesson.lessonId },
        { $set: lesson },
        { upsert: true, new: true }
      );
    }

    console.log(`Seeded ${lessons.length} Graph/Tree/DP lesson records.`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding lessons:', error);
    process.exit(1);
  }
})();
