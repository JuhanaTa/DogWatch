# DOGWATCH

## Where pet lovers meet their helpers

DogWatch is where pet owners and pet sitters find each others. Our desire is to connect them all in one place.

## Functionalities:

1. Register and login

- Create a new account and log in to the system.
- Manage personal information via settings.
- (Dog sitters must edit services at /profile/accountsettings page before getting sitting requests.)

2. Search

- Search for sitters based on location, service and rating

3. View profile and reviews

- View sitter's profile with reviews.
- When log in, sitter can view dog owner's profiles and reviews.

4. Book for services

- Dog owner can send or cancel booking requests to dog sitters.
- Dog sitter can accept or denied a booking request

5. Review

- Dog owner and dog sitter can review each other if they have a completed booking.

6. Chat

- Dog owner can contact the dog sitter before sending the booking request.
- After a booking request has been sent, dog owner and dog sitter can contact each other.

## Stack

- Front-end: Vite+React
- State handling: React Redux
- Components: MUI (Material UI components)

## Dependencies

    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@fontsource/roboto": "^5.1.0",
    "@mui/icons-material": "^6.1.4",
    "@mui/material": "^6.1.4",
    "@mui/x-date-pickers": "^7.22.2",
    "@reduxjs/toolkit": "^2.3.0",
    "axios": "^1.7.7",
    "date-fns": "^2.29.3",
    "dayjs": "^1.11.13",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.27.0",
    "react-window": "^1.8.10",
    "socket.io-client": "^4.8.1"

## Installation (local)

Clone the repo:

```
git clone
```

To run front-end:

```
cd dogwatch
npm install
```

Create .env file with the following content:

```
VITE_API_URL=<your-local-backend>
VITE_IMAGE_URL=<your-local-backend-image-url>
VITE_SOCKET_URL=<your-local-backend-socket-url>
```

Ensure first that local backend is running.
Then start the project:

```
npm run dev
```