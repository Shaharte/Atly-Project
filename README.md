<!-- GETTING STARTED -->

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Shahar Terem Linkdin - [@https://www.linkedin.com/in/shaharterem87]

Project Link: [https://github.com/Shaharte/Atly-Project]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Testing

<p align="right">(<a href="#readme-top">back to top</a>)</p>
