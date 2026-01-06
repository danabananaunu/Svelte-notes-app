This project is a Svelte notes application developed as part of a comparative study of modern frontend frameworks. The application allows users to create, edit, delete, search, and filter notes. All data is stored locally in the browser.

Key Features
• Notes can be created with a title, text content, optional tags, and optional file attachments
• Notes can be edited and deleted, with changes reflected immediately in the user interface
• A search bar provides real-time filtering based on note titles and content
• Tag-based filtering allows notes to be narrowed down by selected tags
• Notes are persisted using browser local storage, ensuring data remains after page reloads
• File attachments are handled entirely on the client side and associated with individual notes


To run the application locally, Node.js and npm are required only for dependency management and running the development tools. The application itself runs in the browser. The node_modules directory is not included in the repository and must be installed locally.
Instructions for setting up:
• Clone the repository from GitHub
• Navigate to the project directory
• Install dependencies using: npm install
• Start the development server using: npm run dev
• Open the application using the local development URL provided by Vite
