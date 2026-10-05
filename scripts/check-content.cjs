const { load } = require("./ts-loader.cjs");
const { lessonSources } = load("data/lessons");
const { validateLessons } = load("lib/validate-content");
const { checkAudio } = require("./check-audio.cjs");
const audio = require("../data/pronunciation-audio.json");
const errors = [
  ...validateLessons(lessonSources),
  ...checkAudio(lessonSources, audio),
];
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Content validated: ${lessonSources.length} lesson(s), ${lessonSources.reduce((total, lesson) => total + lesson.questions.length, 0)} questions, ${Object.keys(audio.clips).length} verified MP3 clips; all reading and knowledge references resolved.`,
  );
