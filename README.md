# Event Management Platform

## Description

This Event Management Platform is a React-based web application that allows users to create, browse, and register for events. It features event listings from both user-created events and real-time data from the PredictHQ API, specifically for events happening in Egypt. The platform offers a responsive design, dynamic routing, and local storage integration for a seamless user experience.

## Features

- Browse upcoming events in Egypt
- Create new events
- View detailed information about each event
- Register for events
- Responsive design for various screen sizes
- Integration with PredictHQ API for real event data
- Local storage for persisting user-created events and registrations

## Technologies Used

- React
- React Router for navigation
- Formik and Yup for form handling and validation
- TailwindCSS for styling
- PredictHQ API for fetching real event data

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- A PredictHQ API key

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/event-management-platform.git
   cd event-management-platform
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your PredictHQ API key:

   ```
   REACT_APP_PREDICTHQ_API_KEY=your_api_key_here
   ```

4. Replace `YOUR_API_KEY_HERE` in `src/components/EventList.js` with:
   ```javascript
   process.env.REACT_APP_PREDICTHQ_API_KEY;
   ```

## Usage

To start the development server, run:

```
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
|-- components/
|   |-- EventList.js
|   |-- EventCreationForm.js
|   |-- EventDetails.js
|-- App.js
|-- index.js
|-- index.css
```

- `EventList.js`: Displays a list of events, fetching data from both local storage and the PredictHQ API.
- `EventCreationForm.js`: Allows users to create new events.
- `EventDetails.js`: Shows detailed information about a specific event and handles event registration.
- `App.js`: Main component that sets up routing and navigation.

## Contributing

Contributions to the Event Management Platform are welcome. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- PredictHQ for providing the event data API
- TailwindCSS for the utility-first CSS framework
- React Router for seamless navigation
- Formik and Yup for form handling and validation
