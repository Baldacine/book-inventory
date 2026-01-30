# Book Inventory Management System

This project is a simple React application created to practice and demonstrate how to build a book inventory system using modern front-end tools.

The main goal of this project is to show how to structure a React application, manage state, and handle data flow in a clear and organized way.

## Live Demo

<https://bookinventoryapp.vercel.app>

## Technologies Used

- **React** – Used to build the user interface with reusable components
- **Vite** – Development server and build tool
- **TypeScript** – Provides type safety and improves code reliability
- **Zustand** – Manages global application state in a simple way
- **React Query** – Handles asynchronous data fetching and caching
- **Styled Components** – Used for component-based styling
- **Zods** – Used for schema validation and form data validation, ensuring data consistency and safety

## Design System Approach

- Instead of using a third-party UI component library, this project implements a custom Design System.
- The goal of this approach is to:
- Have full control over component behavior and styling
- Create reusable, consistent UI components (Button, Table, List, Search, etc.)
- Demonstrate understanding of component abstraction and scalability
- Avoid unnecessary dependencies and reduce bundle size

This decision reflects a focus on architecture, maintainability, and long-term scalability, which are important aspects in real-world front-end projects.

## Features

- Book listing with responsive layout (Table for desktop, List for mobile)
- Infinite scroll pagination
- Search and filtering by title or author
- Create, edit, and delete books
- Form validation with Zod
- Responsive design with mobile-first considerations
- Unit and integration tests for key pages

## How to Run the Project

### Requirements

- Node.js installed
- npm or yarn

### Steps

```bash
git clone https://github.com/Baldacine/book-inventory.git
cd book-inventory
npm install
npm run dev
