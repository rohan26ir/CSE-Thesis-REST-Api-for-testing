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
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cse-thesis-db
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
```
> The app accepts either `MONGODB_URI` or `MONGO_URI`. The code and examples below use `MONGODB_URI`.

### 4. Run the server
```bash
# Development mode (with nodemon)
npm run dev
# or
npx nodemon server.js
```
Server will run at `http://localhost:5000`

## API Endpoints
### Base URL
```
http://localhost:5000/api
```
### Health Check
- `GET /` - Check if API is running

### Users API (`/api/users`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Register a new user | Public |
| POST | `/api/users/login` | Login user | Public |
| GET | `/api/users/me` | Get current user profile | Private |
| PUT | `/api/users/updatedetails` | Update user details | Private |
| PUT | `/api/users/updatepassword` | Update password | Private |
| GET | `/api/users` | Get all users | Private/Admin |
| DELETE | `/api/users/:id` | Delete user | Private/Admin |

### Products API (`/api/products`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products (with filters, pagination, search) | Public |
| GET | `/api/products/:id` | Get single product | Public |
| POST | `/api/products` | Create new product | Private |
| PUT | `/api/products/:id` | Update product | Private (Owner/Admin) |
| DELETE | `/api/products/:id` | Delete product | Private (Owner/Admin) |
| PATCH | `/api/products/:id/stock` | Update product stock | Private |
---
## Postman Collection Examples
### 1. Register User
**POST** `http://localhost:5000/api/users/register`
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
**POST** `http://localhost:5000/api/users/login`
**Body (JSON)**:
```json
{
 "email": "john@example.com",
 "password": "password123"
}
```
### 3. Get Current User (Protected)
**GET** `http://localhost:5000/api/users/me`
**Headers**:
```
Authorization: Bearer <your-jwt-token>
```
### 4. Create Product (Protected)
**POST** `http://localhost:5000/api/products`
**Headers**:

## 🧪 Postman Testing Examples

### Complete Product Data for Testing

Below are 25+ sample products with all available fields for comprehensive API testing in Postman.

---

### Sample Product 1: Electronics - Laptop

```json
{
  "name": "MacBook Pro 16-inch M3 Max",
  "shortDescription": "Ultimate professional laptop with M3 Max chip",
  "description": "Apple's most powerful laptop with M3 Max chip, 36GB unified memory, 1TB SSD storage, 16-core GPU, and 22-hour battery life. Perfect for professionals and content creators.",
  "price": 3499.99,
  "compareAtPrice": 3999.99,
  "costPerItem": 2400.00,
  "discount": 15,
  "taxRate": 8.5,
  "category": "Electronics",
  "subCategory": "Laptops",
  "tags": ["Apple", "M3", "Laptop", "Professional", "Content Creation"],
  "brand": "Apple",
  "sku": "MBP-M3-16-36-1TB",
  "barcode": "885909949345",
  "stock": 15,
  "lowStockThreshold": 5,
  "isBackorderAllowed": true,
  "weight": 2.1,
  "dimensions": {
    "length": 35.57,
    "width": 24.81,
    "height": 1.68,
    "unit": "cm"
  },
  "imageUrl": "https://example.com/images/macbook-pro-m3.jpg",
  "images": [
    "https://example.com/images/macbook-pro-m3-1.jpg",
    "https://example.com/images/macbook-pro-m3-2.jpg",
    "https://example.com/images/macbook-pro-m3-3.jpg"
  ],
  "videoUrl": "https://www.youtube.com/watch?v=example",
  "rating": 4.9,
  "totalReviews": 234,
  "averageRating": 4.9,
  "reviewCount": 234,
  "isFeatured": true,
  "isNewArrival": true,
  "isBestSeller": false,
  "isOnSale": true,
  "isActive": true,
  "isDigital": false,
  "isPhysical": true,
  "isTaxable": true,
  "isFreeShipping": false,
  "hasVariants": false,
  "shipping": {
    "weight": 2.1,
    "dimensions": {
      "length": 35.57,
      "width": 24.81,
      "height": 1.68
    },
    "freeShipping": false,
    "shippingCost": 15.00,
    "estimatedDelivery": "2-3 business days"
  },
  "warranty": "Limited Warranty",
  "warrantyPeriod": 24,
  "returnPolicy": "30 days return policy",
  "returnWindow": 30,
  "vendor": "Apple Inc.",
  "seoTitle": "MacBook Pro 16-inch M3 Max - Apple's Most Powerful Laptop",
  "seoDescription": "Buy MacBook Pro with M3 Max chip, 36GB memory, 1TB SSD. Best laptop for professionals and content creators.",
  "seoKeywords": ["MacBook Pro", "M3 Max", "Apple Laptop", "Professional Laptop"],
  "slug": "macbook-pro-16-inch-m3-max",
  "metaTitle": "MacBook Pro 16-inch M3 Max | Apple Professional Laptop",
  "metaDescription": "The ultimate MacBook Pro with M3 Max chip for professionals. 36GB memory, 1TB storage, 22-hour battery life.",
  "color": ["Silver", "Space Gray"],
  "size": ["16-inch"],
  "material": "Aluminum",
  "features": ["M3 Max Chip", "36GB Memory", "1TB SSD", "16-core GPU", "22-hour Battery", "Retina Display"],
  "specifications": {
    "processor": "Apple M3 Max",
    "memory": "36GB Unified",
    "storage": "1TB SSD",
    "display": "16-inch Liquid Retina XDR",
    "battery": "22 hours",
    "weight": "2.1 kg"
  },
  "relatedProducts": [],
  "views": 1500,
  "purchases": 89
}
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