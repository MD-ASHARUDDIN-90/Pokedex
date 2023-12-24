# React + Vite Template with Component-Based Architecture

## Overview

This template offers a minimal setup to seamlessly integrate React into Vite, ensuring Hot Module Replacement (HMR) functionality and enforcing ESLint rules for code quality. Two official plugins, @vitejs/plugin-react and @vitejs/plugin-react-swc, are available for Fast Refresh, utilizing either Babel or SWC.

## Getting Started

To run the application locally, use the following scripts:

````bash
git clone repo-link  # To clone the repository
npm install          # Install project dependencies
npm run dev          # Run the development server with HMR
npm run build        # Build the production-ready bundle
npm run serve        # Preview the production build locally
npm run lint         # Run ESLint to check for code quality
````

##  Project Structure
The project follows a component-based architecture, and Ant Design is employed for a consistent and responsive UI. Notably, a separate component is created for the navigation bar, featuring a search bar and filter dropdown. The navigation bar component utilizes props to dynamically render two different components: one for displaying search results and another for the main container, showcasing initial Pokémon data.

##  Components
Navbar Component
Houses a search bar and a filter dropdown.
Utilizes Ant Design for a sleek and responsive design.
Uses props to render different components based on user actions.
SearchResult Component
Renders search results dynamically.
Utilizes props to receive and display relevant data.
Container Component
Displays initial Pokémon data.
Includes a “Show More” button to fetch additional data.
Merges fetched data with existing data for a seamless user experience.
Data Manipulation
For data manipulation, JavaScript functionality is leveraged in the frontend. The filter method of the array is used for dynamic data display, ensuring a smooth and responsive application.

## Styling
Both Ant Design and CSS modules are employed for styling, providing a visually appealing and modular structure to the application.

Feel free to explore and enhance the template based on your project requirements. Happy coding!
