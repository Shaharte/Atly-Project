## Getting Started

To run this Project, please run the following commands

### Installation

1. Clone the Repository:
   ```sh
   git clone https://github.com/Shaharte/Atly-Project.git
   ```
2. Configure Environment:
   ```sh
   Add a .env file in root folder with the credentials and configuration details provided separately.
   ```
3. Docker Setup:
   ```sh
   Ensure Docker is running on your computer. This is crucial for containerization and ensuring a consistent environment.
   ```
4. Run with Docker
   ```sh
   docker-compose up --build
   ```
5. Alternative Run Method (Without Docker): Install NPM packages and run localy
   ```sh
   npm install
   npm run start
   ```
6. API Usage:
   ```js
   Once the server is up and running, you can interact with the API as per the defined endpoints.
   ```

### API ENDPOINTS

1. Create a post:

   ```js
   POST
   {
   "creatorId": number,
   "title": string,
   "body": string
   }
   http://localhost:8080/api/v1/posts
   ```

2. Get posts list by their creation order:
   ```js
   GET
   http://localhost:8080/api/v1/posts/:id
   ```
3. Get the total posts number:
   ```js
   GET
   http://localhost:8080/api/v1/posts/postsnumber
   ```
4. Get the top 10 of post creators:
   ```js
   GET
   http://localhost:8080/api/v1/statistics/topcreators
   ```
5. Get the average run-time of the first 2 functions:
   ```js
   GET
   http://localhost:8080/api/v1/statistics/runtimes
   ```

## My DB Selection NoSql MongoDB

Why MongoDB?

Schema Flexibility: MongoDB's schema-less nature is ideal for handling posts, which may vary in structure. It allows you to easily add or change fields such as title, body, and user information without affecting existing data.

Scalability: MongoDB scales horizontally, this is beneficial for a posts database, which can expand rapidly.

JSON-like Documents: The data format is easy to understand and use. MongoDB stores data in BSON format, which is similar to JSON. This is particularly convenient when dealing with REST APIs.

Performance: MongoDB offers high read/write performance, especially when dealing with large volumes of data and simple queries.

Aggregation Framework: MongoDB's aggregation framework simplifies complex operations like calculating averages run-time top top 10 of post creators.

No Initial Need for Relations: In the current scope of the project, the Post and Statistics models have no direct relationships, making MongoDB a suitable choice due to its non-relational structure.

## Contact

Shahar Terem Linkdin - [@https://www.linkedin.com/in/shaharterem87]

Project Link: [https://github.com/Shaharte/Atly-Project]

## Testing

The unit tests cover the core functionalities of my project. I use Jest in this project.

1. Running Tests:
   ```sh
   npm run test
   ```

## Testing Limitations

Important Note: Due to the use of 'express-async-errors', testing the error handling paths functions is currently not feasible in these unit tests.
This limitation is recognized, and it is recommended to cover these scenarios in integration tests.
