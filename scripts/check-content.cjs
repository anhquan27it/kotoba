const { load } = require("./ts-loader.cjs");
const { lessonSources } = load("data/lessons");
const { validateLessons } = load("lib/validate-content");
const errors = validateLessons(lessonSources);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Content validated: ${lessonSources.length} lesson(s), ${lessonSources.reduce((total, lesson) => total + lesson.questions.length, 0)} questions, all reading and knowledge references resolved.`,
  );
