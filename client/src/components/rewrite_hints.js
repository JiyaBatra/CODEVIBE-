const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\H S SAMIRA\\CODEVIBE-\\client\\src\\components';

// Clean safe hints keyed by LessonId
const hints = {
  'CLesson1.jsx':  'Use printf() inside main() to print Hello C. Do not forget to include stdio.h at the top and return 0 at the end.',
  'CLesson2.jsx':  'Declare int age = 25; and char grade = B; then print them using %d for integers and %c for characters.',
  'CLesson3.jsx':  'Declare num1 = 8 and num2 = 3. Use three separate printf() calls for Sum, Difference, and Product on separate lines.',
  'CLesson4.jsx':  'Declare int marks = 75; then use if (marks >= 50) to print Pass, otherwise print Fail.',
  'CLesson5.jsx':  'Use a for loop starting at i = 1, running while i <= 5, with i++ increment. Print each number on a new line.',
  'CLesson6.jsx':  'Define a function void sayHello() that prints the text, then call sayHello(); inside main().',
  'CLesson7.jsx':  'Declare int arr[5] = {5, 10, 15, 20, 25}; then print arr[2] — arrays are zero-indexed so index 2 gives the third element.',
  'Clesson8.jsx':  'Declare char str[] = "World"; and use printf("Hello %s", str); to print the full output.',
  'CLesson9.jsx':  'Write void sayHello() that prints Hello Functions above main(), then call sayHello(); inside main().',
  'CLesson10.jsx': 'Create int arr[3] = {10, 20, 30}; then use a for loop from i=0 to i<3 to print each element on a new line.',
  'CLesson11.jsx': 'Declare char name[] = "John"; and print it using printf("My name is %s", name);',
  'CLesson12.jsx': 'Write void welcome() that prints Welcome to C Functions, then call welcome(); inside main().',
  'CLesson13.jsx': 'Declare int num = 42; and int *ptr = &num; then use printf with *ptr to print the value via the pointer.',
  'CLesson14.jsx': 'Define struct Book with char title[50] and int price. Create a variable with C Programming and 500, then print both.',
  'CLesson15.jsx': 'For this exercise just use printf("File Handling Works"); inside main() to simulate writing to a file.',
  'CLesson16.jsx': 'Declare two integers that add up to 15, such as a = 10 and b = 5. Then print their sum using printf.',
  'CLesson17.jsx': 'Define struct Student with name and roll fields. Create a student with name Alice and roll 1, then print both.',
};

Object.entries(hints).forEach(([file, hint]) => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  // Replace the entire hint="..." line (from hint=" to the closing ")
  const hintRegex = /hint="[^"]*(?:"[^"]*)*"/g;
  const newContent = content.replace(hintRegex, `hint="${hint}"`);
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Rewrote hint in ${file}`);
  } else {
    console.log(`No hint line found in ${file} — check manually`);
  }
});
