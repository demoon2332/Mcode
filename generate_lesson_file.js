const fs = require('fs');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const lessons = [];

for (let i = 1; i <= 30; i++) {
  const lesson = {
    name: `Lesson ${i}`,
    duration: getRandomInt(30, 120),
    difficulty: ["Basic", "Advanced", "Hard"][getRandomInt(0, 2)],
    questionCount: getRandomInt(15, 30)
  };

  lessons.push(lesson);
}

const jsonContent = JSON.stringify(lessons, null, 2);

fs.writeFile('lessons.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
  } else {
    console.log('File "lessons.json" has been saved.');
  }
});
