<h2>The Finnish - Russian dictionary</h2>

Custom dictionary with ability to add words with translations and examples, also contains learn mode with flashcards and words writing mode. 
<br>
Technologies used in the project: React.js, TypeScript, Zustand, SASS, Node.js, Axios, clsx, JWT, Eslint, Prettier.
<br>
<br>
Tips for deployment: BrowserRouter in App.tsx uses basename with path stored in .env.production for build:production script. Npm start uses path "/" for basename. If 
you are deploying the app to a subfolder on a server - you need to specify it in .env.production with variable "REACT_APP_BASE_URL".
