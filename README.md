# Streaming Platform Website

This is a React-based website for a streaming platform that provides users access to movies and series. The platform includes features such as user authentication, movie browsing, filter, and detailed media information.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **React**: Frontend framework
- **Redux**: State management
- **TypeScript**: Type checking
- **Tailwind CSS**: Styling
- **React Router**: Navigation
- **The Movie Database (TMDB) API**: Fetching movie and TV show data
- **Firebase**: User authentication, database

## Features

- User authentication (Sign In, Sign Up, Reset Password)
- Browse movies and TV series by categories (Popular, Top Rated, Upcoming)
- Filter movies and TV by (category, popularity, etc.)
- Search functionality for movies and tv shows
- Watchlist feature for logged-in users
- Privacy Policy, Terms of Service, Support and Contact pages
- Cookie consent banner
- Responsive design with light/dark theme toggle

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repo
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Add your TMDB API key in `apiConstants.ts`:

    ```typescript
    export const TMDB_API_KEY = "your-tmdb-api-key";
    ```

5. Run the app:

    ```bash
    npm start
    ```

The app should now be running at `http://localhost:3000`.

## Usage

- Browse movies and TV shows through categories.
- Create an account to access personalized features like watchlists.
- Use the light/dark theme toggle for your preferred theme.
- Manage your profile and personal data through the profile page (available to authenticated users).

## Deployment

This project is deployed on Netlify. You can access the live version here:

[Live Demo on Netlify](https://wachify.netlify.app/)

## Firebase Setup

To use Firebase for authentication and storing user data:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** and select **Email/Password** as the sign-in method.
3. Enable **Firestore Database** to store user watchlists and other data.
4. In your Firebase project settings, generate the Firebase configuration object and paste it into your `firebaseConfig.ts` file.
5. Make sure to set up Firebase rules for security, especially for authentication and database access.


## Project Structure

```bash
src/
├── assets/            # logo images
├── components/        # Shared components (Header, Footer, etc.)
├── contexts/          # Context providers (ThemeProvider)
├── data/              # Static data
├── firebase/          # Firebase setup, configuration
├── helpers/           # Helper methods
├── hooks/             # Custom React hooks
├── pages/             # Page components (Home, Profile, etc.)
├── store/             # Redux store setup, reducers, and action creators
├── types/             # TypeScript types and interfaces
└── App.tsx            # Main application component