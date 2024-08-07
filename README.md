# Cinespot

## Project Overview

Cinespot is a movie search app developed using React Native, Firebase, TMDB API, YouTube V3 API, NativeWind, and React Navigation. This app provides users with a seamless experience for discovering and reviewing movies.

## Key Features

### User Authentication

- **Firebase Authentication**: Secure user login and registration with Firebase.
- **Persistent Login**: Checks for existing credentials in `asyncstorage` to determine if the user is already logged in.
- **Form Validation**: Extensive validation to ensure data integrity and security during account creation and login.

### Loading Animations and Font Management

- **Loading Animation**: Displayed using LottieView when the app is opened.
- **Async Font Loading**: Fonts are loaded asynchronously in the `useEffect` hook using `loadAsync` to ensure UI elements are displayed correctly.

### Homepage

- **Trending Movies Carousel**: Features a carousel display of trending movies.
- **Movie Lists**: Reusable `MovieList` components for displaying upcoming and top-rated movies in a horizontal scroll view.

### Detailed Movie Screens

- **Movie Information**: Displays detailed information including movie name, release status, duration, and an expandable description.
- **Additional Features**: Includes a favorite heart icon, top cast list, similar movies section, and movie trailers fetched from the YouTube V3 API.

### Person Screens

- **Cast Member Information**: Displays detailed information about cast members, including a circular picture, name, place of birth, gender, birthday, known for, popularity, and an expandable biography.
- **Movies List**: A horizontal scroll view of the person's movies, which, when clicked, navigates back to the detailed movie screen.

### UI/UX and Navigation

- **Styling**: Components are styled using NativeWind for a consistent and visually appealing design.
- **Navigation**: Managed using React Navigation to ensure smooth transitions between screens and an intuitive user experience.

## Technical Challenges and Solutions

### Authentication and Validation

- **Challenge**: Implementing secure Firebase authentication with comprehensive form validations.
- **Solution**: Ensured seamless user login and registration processes with robust validation.

### Dynamic and Reusable Components

- **Challenge**: Designing dynamic and reusable components for movie lists and detailed screens.
- **Solution**: Maintained code modularity and efficiency when handling diverse data sets from TMDB and YouTube APIs.

### Responsive Design and Performance

- **Challenge**: Enhancing the visual appeal and performance of the app.
- **Solution**: Used LottieView for animations and managed asynchronous font loading for a smooth user experience.

### Data Integration and API Optimization

- **Challenge**: Integrating data from external APIs and ensuring prompt app response.
- **Solution**: Handled asynchronous data fetching, used throttling functions to limit API call frequency, and optimized loading to improve performance.

### Loading and API Call Optimization

- **Challenge**: Optimizing loading times and API calls.
- **Solution**: Implemented throttling and debouncing functions to reduce unnecessary requests and enhance app responsiveness and performance.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mikey6521/Cinespot.git
   cd Cinespot
