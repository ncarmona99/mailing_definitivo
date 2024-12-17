# API Gateway

This project implements an API Gateway that routes requests to various backend services, including email, SMS, and no-disturb APIs. It is built using Node.js and Express.

## Project Structure

```
api-gateway
├── src
│   ├── gateway.js        # Main entry point for the API gateway
├── Dockerfile            # Dockerfile for building the API gateway image
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd api-gateway
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the API Gateway:**
   ```
   npm start
   ```

   The server will start on `http://localhost:3000` by default.

## Usage

The API Gateway routes requests to the following endpoints:

- **Email API:** `/api/email`
- **SMS API:** `/api/sms`
- **No Disturb API:** `/api/no-disturb`

Make sure the backend services are running and accessible at the specified ports.

## Docker

To build and run the API Gateway using Docker:

1. **Build the Docker image:**
   ```
   docker build -t api-gateway .
   ```

2. **Run the Docker container:**
   ```
   docker run -p 3000:3000 api-gateway
   ```

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is licensed under the MIT License.