# CSE Thesis REST API for Testing
A robust Node.js/Express REST API built with MongoDB for testing purposes in a
CSE Thesis project. Features user authentication (JWT), product management with
advanced filtering, and role-based access control.
## Features
- **User Authentication & Authorization**
 - Register, Login, Profile management
 - JWT-based authentication
 - Role-based access (user/admin)
- **Product Management**
 - CRUD operations
 - Advanced search, filtering, and pagination
 - Stock management
- **MongoDB Integration** with Mongoose
- **Error Handling** and validation
- **CORS** enabled
## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator
- **Environment**: dotenv
## Quick Start
### 1. Clone the repository
```bash
git clone https://github.com/rohan26ir/CSE-Thesis-REST-Api-for-testing.git
cd CSE-Thesis-REST-Api-for-testing
```
### 2. Install dependencies
```bash
npm install
```
### 3. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/cse-thesis-db
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d
```
### 4. Run the server
```bash
# Development mode (with nodemon)
npm run dev
# or
npx nodemon server.js
```
Server will run at `http://localhost:3000`
## API Endpoints
### Base URL
```
http://localhost:3000/api
```
### Health Check
- `GET /` - Check if API is running
### Users API (`/api/users`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user profile | Private |
| PUT | `/updatedetails` | Update user details | Private |
| PUT | `/updatepassword` | Update password | Private |
| GET | `/` | Get all users | Private/Admin |
| DELETE | `/:id` | Delete user | Private/Admin |
### Products API (`/api/products`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all products (with filters) | Public |
| GET | `/:id` | Get single product | Public |
| POST | `/` | Create new product | Private |
| PUT | `/:id` | Update product | Private (Owner/Admin) |
| DELETE | `/:id` | Delete product | Private (Owner/Admin) |
| PATCH | `/:id/stock` | Update product stock | Private |
---
## Postman Collection Examples
### 1. Register User
**POST** `http://localhost:3000/api/users/register`
**Body (JSON)**:
```json
{
 "name": "John Doe",
 "email": "john@example.com",
 "password": "password123"
}
```
**Expected Response**:
```json
{
 "success": true,
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 "user": {
 "id": "60f7b0c9...",
 "name": "John Doe",
 "email": "john@example.com",
 "role": "user"
 }
}
```
### 2. Login User
**POST** `http://localhost:3000/api/users/login`
**Body (JSON)**:
```json
{
 "email": "john@example.com",
 "password": "password123"
}
```
### 3. Get Current User (Protected)
**GET** `http://localhost:3000/api/users/me`
**Headers**:
```
Authorization: Bearer <your-jwt-token>
```
### 4. Create Product (Protected)
**POST** `http://localhost:3000/api/products`
**Headers**:
```
Authorization: Bearer <your-jwt-token>
```
**Body (JSON)**:
```json
{
 "name": "Wireless Headphones",
 "description": "Premium noise-cancelling wireless headphones",
 "price": 129.99,
 "category": "Electronics",
 "stock": 50,
 "brand": "Sony",
 "tags": ["audio", "wireless", "headphones"]
}
```
### 5. Get Products (with Query Params)
**GET** `http://localhost:3000/api/products?category=Electronics&minPrice=50&max
Price=200&search=headphones&page=1&limit=10`
### 6. Update Product Stock
**PATCH** `http://localhost:3000/api/products/:id/stock`
**Body (JSON)**:
```json
{
 "stock": 45
}
```
---
## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
## Database Models
### User
- `name`, `email`, `password`, `role` (user/admin)
### Product
Comprehensive fields including:
- Basic info, pricing, inventory, media
- Categories, tags, SEO
- Virtual fields (discountedPrice, isLowStock, etc.)
## Error Handling
The API uses a centralized error handler that returns consistent JSON responses:
```json
{
 "success": false,
 "message": "Error description"
}
```
## Testing with Postman
1. Import the examples above into Postman
2. Use the **Environment** feature to store `base_url` and `token`
3. Test public endpoints first, then authenticate and test protected ones
## Project Structure
```
■■■ src/
■ ■■■ controllers/ # Route controllers
■ ■■■ models/ # Mongoose models
■ ■■■ routes/ # Express routes
■ ■■■ middleware/ # Auth & error middleware
■ ■■■ db/ # Database connection
■■■ server.js # Entry point
■■■ package.json
■■■ .env
```
## Contributing
Feel free to fork and submit pull requests for improvements.
## License
ISC
---
**Made for CSE Thesis Testing** ■