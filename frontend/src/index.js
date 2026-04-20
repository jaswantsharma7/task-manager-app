// The index.js file is the entry point of the React application. It imports the necessary modules, including React, ReactDOM, and the main App component. It then uses ReactDOM to render the App component into the root DOM element, which is typically defined in the public/index.html file. The React.StrictMode wrapper is used to enable additional checks and warnings for potential issues in the application during development. This setup allows the React application to be rendered and displayed in the browser when the application is run.

// Importing React and ReactDOM libraries to create and render the React application. The App component is imported from the App.js file, which contains the main structure and logic of the application. The index.css file is imported to apply global styles to the application.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// The root variable is created by calling ReactDOM.createRoot and passing in the DOM element with the ID of 'root'. This is where the React application will be rendered. The root.render() method is then called to render the App component wrapped in React.StrictMode, which helps identify potential problems in the application during development by activating additional checks and warnings.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
