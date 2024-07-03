mkdir trivia-quiz
cd trivia-quiz
git init
echo "# Fun Trivia Quiz Web Page" > README.md
git add README.md
git commit -m "Initial commit: Add README"
git remote add origin https://github.com/yourusername/trivia-quiz.git
git push -u origin main
touch index.html 
touch style.css
touch script.js
