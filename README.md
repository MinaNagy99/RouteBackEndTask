Tasks 
This project is a backend application built with Node.js that provides CRUD operations for three models: Category, Task, and User.

Table of Contents
Introduction
Features
Installation
Usage
API Documentation
Models
Category
Task
User
Contributing
License
Introduction
This backend application is designed to handle CRUD operations for three primary models: Category, Task, and User. It is built using Node.js and utilizes MongoDB for data storage. The application is documented using Postman, and the API documentation can be accessed via the provided URL.

Features
Create, Read, Update, and Delete (CRUD) operations for Category, Task, and User models.
Middleware for auto-populating and validation.
User authentication and authorization.
Error handling and input validation.
Pagination, filtering, and sorting capabilities.
Documentation URL : https://documenter.getpostman.com/view/24508982/2sA3kSmhrh
Installation
Clone the repository:

bash
Copy code
git clone [https://github.com/yourusername/project-name.git](https://github.com/MinaNagy99/RouteBackEndTask)
cd project-name
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add the necessary environment variables:

plaintext
Copy code
PORT=3000
MONGO_URI=mongodb://localhost:27017/yourdatabase
JWT_SECRET=your_jwt_secret
Start the application:

bash
Copy code
npm start
Usage
After starting the application, you can interact with the API using tools like Postman or curl. The base URL for the API is http://localhost:3000.

API Documentation
For detailed information about the API endpoints and how to use them, please refer to the API Documentation.

Models
Category
Fields:

name: String (required)
Task
Fields:

list: Array of Strings (required, min 2 characters, max 2000 characters)
textBody: String (required, min 2 characters, max 2000 characters)
type: String (required, enum: ["text", "list"])
visible: Boolean (required)
category: ObjectId (reference to Category, required)
createdBy: ObjectId (reference to User, required)
User
Fields:

name: String (required)
email: String (required, unique)
password: String (required)
Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.

License
This project is licensed under the MIT License. See the LICENSE file for more information.
