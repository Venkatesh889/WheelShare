
# WeelShare Backend

## Project Purpose and Overview

**WeelShare** is a car-sharing platform that allows users to book and manage cars efficiently. The backend is built using **Node.js** and **Express.js**, and it connects to a **MongoDB** database to store user, car, and booking information. The project follows the MVC architecture, providing a clean separation of concerns and ease of scalability.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- JWT (JSON Web Tokens) for authentication
- Postman for API testing

## How to Run the Project

1. **Clone the repository** or extract the zip file.
2. **Navigate to the project directory**:
   ```bash
   cd wheel_share_backend
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up your environment variables** (explained below).
5. **Start the server**:
   ```bash
   node server.js
   ```

## How to Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace `your_mongodb_connection_string` and `your_secret_key` with actual values.

## Project Structure

```
wheel_share_backend/
├── .env
├── server.js
├── package.json
├── package-lock.json
├── config/
│   └── db.js
├── controllers/
│   ├── carController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Booking.js
│   ├── Car.js
│   └── User.js
├── routes/
│   ├── bookingsRoutes.js
│   ├── carRoutes.js
│   └── userRoutes.js
```

## Models and Their Explanation

### User Model (`models/User.js`)
- Fields: `name`, `email`, `password`, `role`
- Has hashed password storage and authentication utilities.

### Car Model (`models/Car.js`)
- Fields: `model`, `brand`, `location`, `availability`, `pricePerDay`

### Booking Model (`models/Booking.js`)
- Fields: `user`, `car`, `startDate`, `endDate`,
- References both `User` and `Car` models.

### Review Model (`model/review.js`)
- Fields: `renterId` , `carId` , `rating`, `comment`,

## API Routes Explanation

### User Routes (`/api/users`)
- `POST /register`: Register a new user
- `POST /login`: Authenticate user and return JWT

### Car Routes (`/api/cars`)
- `GET /`: Get all cars
- `POST /`: Add a new car

### Booking Routes (`/api/bookings`)
- `GET /`: Get all bookings
- `POST /`: Create a new booking
- `DELETE /:id`: Cancel a booking

### Payemnt Routes (`/api/dummypayment`)
- `POST /`: Do payment using stripes dependence API

### Review Routes (`/api/review`)
- `POST /`: Add a review
- `GET /:car_Id`: Get all reviews for a specific car

### Verify Routes (`/api/verify`)
- `POST`: Verify Pan

## Postman Collection (JSON)

```json
{
   "info": {
      "_postman_id": "ef5d3c8b-2efe-42ff-820a-46ee240c7c59",
      "name": "WeelShare API",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
      "_exporter_id": "42937220"
   },
   "item": [
      {
         "name": "Register User",
         "request": {
            "method": "POST",
            "header": [
               {
                  "key": "Content-Type",
                  "value": "application/json"
               }
            ],
            "body": {
               "mode": "raw",
               "raw": "{\n  \"name\": \"Priya Verma\",\n  \"email\": \"priya@example.com\",\n  \"phone\": \"9876541230\",\n  \"password\": \"testpass123\",\n  \"role\": \"renter\"\n}\n"
            },
            "url": {
               "raw": "http://localhost:5000/api/users/register",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "users",
                  "register"
               ]
            }
         },
         "response": []
      },
      {
         "name": "Login User",
         "request": {
            "method": "POST",
            "header": [
               {
                  "key": "Content-Type",
                  "value": "application/json"
               },
               {
                  "key": "Authorization",
                  "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjQwYzEyNTcyOWJhNDJhNjI1NWY0YyIsImlhdCI6MTc0NzI0NzU0OCwiZXhwIjoxNzQ3MzMzOTQ4fQ.U-2L-mqZVTM-38yK_7jCKwF0dL6yx_Ettnw1gNaMLnw",
                  "type": "text",
                  "disabled": true
               }
            ],
            "body": {
               "mode": "raw",
               "raw": "{\n  \"email\": \"rahul@example.com\",\n  \"password\": \"testpass123\"\n}\n"
            },
            "url": {
               "raw": "http://localhost:5000/api/users/login",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "users",
                  "login"
               ]
            }
         },
         "response": []
      },
      {
         "name": "Add Car",
         "request": {
            "auth": {
               "type": "bearer",
               "bearer": [
                  {
                     "key": "token",
                     "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjUwOTMyMjM3ZjJkNjdlNmJhODcxZiIsImlhdCI6MTc0NzI1NzgxMCwiZXhwIjoxNzQ3MzQ0MjEwfQ.iHCQVpEq2NwoOE0lzHI63GEXcGoCC0fhkxjq8y6edQA",
                     "type": "string"
                  }
               ]
            },
            "method": "POST",
            "header": [
               {
                  "key": "Content-Type",
                  "value": "application/json"
               },
               {
                  "key": "Authorization",
                  "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjRlMzkxNTA0MWFmNWQ0YTYxNDU0ZiIsImlhdCI6MTc0NzI0ODA3NSwiZXhwIjoxNzQ3MzM0NDc1fQ.4CcweOblzkHUIWPQ4sGI8rnYP53zdtW6Vgms2Y03krU"
               }
            ],
            "body": {
               "mode": "raw",
               "raw": "{\n  \"model\": \"Hyundai Creta\",\n  \"year\": 2022,\n  \"price\": 2000,\n  \"location\": \"Mumbai\",\n  \"availability\": [\n    {\n      \"start\": \"2025-06-01\",\n      \"end\": \"2025-06-10\"\n    },\n    {\n      \"start\": \"2025-06-15\",\n      \"end\": \"2025-06-20\"\n    }\n  ]\n}\n"
            },
            "url": {
               "raw": "http://localhost:5000/api/cars/add",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "cars",
                  "add"
               ]
            }
         },
         "response": []
      },
      {
         "name": "only by location",
         "request": {
            "auth": {
               "type": "bearer",
               "bearer": [
                  {
                     "key": "token",
                     "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjRlNjJmNTA0MWFmNWQ0YTYxNDU1OCIsImlhdCI6MTc0NzI0ODcyNCwiZXhwIjoxNzQ3MzM1MTI0fQ.JWnvk6n3WVSHUY53A8BlXqnQCMLKuzd4bOdvy0vimkg",
                     "type": "string"
                  }
               ]
            },
            "method": "GET",
            "header": [],
            "url": {
               "raw": "http://localhost:5000/api/cars?location=Mumbai",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "cars"
               ],
               "query": [
                  {
                     "key": "location",
                     "value": "Mumbai"
                  }
               ]
            }
         },
         "response": []
      },
      {
         "name": "Car Availability",
         "protocolProfileBehavior": {
            "disableBodyPruning": true
         },
         "request": {
            "auth": {
               "type": "bearer",
               "bearer": [
                  {
                     "key": "token",
                     "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjRlMzkxNTA0MWFmNWQ0YTYxNDU0ZiIsImlhdCI6MTc0NzI0ODA3NSwiZXhwIjoxNzQ3MzM0NDc1fQ.4CcweOblzkHUIWPQ4sGI8rnYP53zdtW6Vgms2Y03krU",
                     "type": "string"
                  }
               ]
            },
            "method": "GET",
            "header": [
               {
                  "key": "Authorization",
                  "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjRlMzkxNTA0MWFmNWQ0YTYxNDU0ZiIsImlhdCI6MTc0NzI0ODA3NSwiZXhwIjoxNzQ3MzM0NDc1fQ.4CcweOblzkHUIWPQ4sGI8rnYP53zdtW6Vgms2Y03krU",
                  "type": "text"
               }
            ],
            "body": {
               "mode": "raw",
               "raw": "",
               "options": {
                  "raw": {
                     "language": "json"
                  }
               }
            },
            "url": {
               "raw": "http://localhost:5000/api/cars?location=Mumbai&startDate=2025-06-01&endDate=2025-06-05",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "cars"
               ],
               "query": [
                  {
                     "key": "location",
                     "value": "Mumbai"
                  },
                  {
                     "key": "startDate",
                     "value": "2025-06-01"
                  },
                  {
                     "key": "endDate",
                     "value": "2025-06-05"
                  }
               ]
            }
         },
         "response": []
      },
      {
         "name": "Create Booking",
         "request": {
            "auth": {
               "type": "bearer",
               "bearer": [
                  {
                     "key": "token",
                     "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjUwOTU0MjM3ZjJkNjdlNmJhODcyMiIsImlhdCI6MTc0NzI1NzcyMCwiZXhwIjoxNzQ3MzQ0MTIwfQ.oEM2v055qaoO_3HI4SlEWcineeY-4MQxg-PraGGAZMk",
                     "type": "string"
                  }
               ]
            },
            "method": "POST",
            "header": [
               {
                  "key": "Content-Type",
                  "value": "application/json"
               },
               {
                  "key": "Authorization",
                  "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjUwOTU0MjM3ZjJkNjdlNmJhODcyMiIsImlhdCI6MTc0NzI1NzcyMCwiZXhwIjoxNzQ3MzQ0MTIwfQ.oEM2v055qaoO_3HI4SlEWcineeY-4MQxg-PraGGAZMk"
               }
            ],
            "body": {
               "mode": "raw",
               "raw": "{\n  \"carId\": \"68250a14237f2d67e6ba8726\",\n  \"startDate\": \"2025-06-02\",\n  \"endDate\": \"2025-06-08\"\n}\n"
            },
            "url": {
               "raw": "http://localhost:5000/api/bookings",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "bookings"
               ]
            }
         },
         "response": []
      },
      {
         "name": "Pan",
         "request": {
            "auth": {
               "type": "bearer",
               "bearer": [
                  {
                     "key": "token",
                     "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjUwOTU0MjM3ZjJkNjdlNmJhODcyMiIsImlhdCI6MTc0NzI1NzcyMCwiZXhwIjoxNzQ3MzQ0MTIwfQ.oEM2v055qaoO_3HI4SlEWcineeY-4MQxg-PraGGAZMk",
                     "type": "string"
                  }
               ]
            },
            "method": "POST",
            "header": [
               {
                  "key": "Authorization",
                  "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjRlNjJmNTA0MWFmNWQ0YTYxNDU1OCIsImlhdCI6MTc0NzI0ODcyNCwiZXhwIjoxNzQ3MzM1MTI0fQ.JWnvk6n3WVSHUY53A8BlXqnQCMLKuzd4bOdvy0vimkg",
                  "type": "text"
               }
            ],
            "body": {
               "mode": "raw",
               "raw": "{\r\n  \"panNumber\": \"ABCDE1234F\",\r\n  \"fullName\": \"Priya Verma\"\r\n}\r\n",
               "options": {
                  "raw": {
                     "language": "json"
                  }
               }
            },
            "url": {
               "raw": "http://localhost:5000/api/verify/pan",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "verify",
                  "pan"
               ]
            }
         },
         "response": []
      },
      {
         "name": "Dummy-payments",
         "request": {
            "method": "POST",
            "header": [],
            "body": {
               "mode": "raw",
               "raw": "{\r\n  \"userId\": \"68250954237f2d67e6ba8722\",\r\n  \"amount\": 2500,\r\n  \"currency\": \"INR\"\r\n}\r\n",
               "options": {
                  "raw": {
                     "language": "json"
                  }
               }
            },
            "url": {
               "raw": "http://localhost:5000/api/dummy-payments",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "dummy-payments"
               ]
            }
         },
         "response": []
      },
      {
         "name": "Cancel booking",
         "request": {
            "auth": {
               "type": "bearer",
               "bearer": [
                  {
                     "key": "token",
                     "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjUwOTU0MjM3ZjJkNjdlNmJhODcyMiIsImlhdCI6MTc0NzI1NzcyMCwiZXhwIjoxNzQ3MzQ0MTIwfQ.oEM2v055qaoO_3HI4SlEWcineeY-4MQxg-PraGGAZMk",
                     "type": "string"
                  }
               ]
            },
            "method": "DELETE",
            "header": [
               {
                  "key": "Authorization",
                  "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjUwOTU0MjM3ZjJkNjdlNmJhODcyMiIsImlhdCI6MTc0NzI1NzcyMCwiZXhwIjoxNzQ3MzQ0MTIwfQ.oEM2v055qaoO_3HI4SlEWcineeY-4MQxg-PraGGAZMk",
                  "type": "text"
               }
            ],
            "url": {
               "raw": "http://localhost:5000/api/bookings/68250dbd237f2d67e6ba8760",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "bookings",
                  "68250dbd237f2d67e6ba8760"
               ]
            }
         },
         "response": []
      },
      {
         "name": "Write Review",
         "request": {
            "auth": {
               "type": "bearer",
               "bearer": [
                  {
                     "key": "token",
                     "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjUwOTU0MjM3ZjJkNjdlNmJhODcyMiIsImlhdCI6MTc0NzI1NzcyMCwiZXhwIjoxNzQ3MzQ0MTIwfQ.oEM2v055qaoO_3HI4SlEWcineeY-4MQxg-PraGGAZMk",
                     "type": "string"
                  }
               ]
            },
            "method": "POST",
            "header": [
               {
                  "key": "Authorization",
                  "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjRlNjJmNTA0MWFmNWQ0YTYxNDU1OCIsImlhdCI6MTc0NzI0ODcyNCwiZXhwIjoxNzQ3MzM1MTI0fQ.JWnvk6n3WVSHUY53A8BlXqnQCMLKuzd4bOdvy0vimkg",
                  "type": "text"
               },
               {
                  "key": "Content-Type",
                  "value": "application/json",
                  "type": "text"
               }
            ],
            "body": {
               "mode": "raw",
               "raw": "{\r\n  \"carId\": \"68250a14237f2d67e6ba8726\",\r\n  \"rating\": 5,\r\n  \"comment\": \"Amazing experience! Smooth ride.\"\r\n}\r\n\r\n"
            },
            "url": {
               "raw": "http://localhost:5000/api/reviews",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "reviews"
               ]
            }
         },
         "response": []
      },
      {
         "name": "Delete User",
         "request": {
            "method": "DELETE",
            "header": [],
            "body": {
               "mode": "raw",
               "raw": "",
               "options": {
                  "raw": {
                     "language": "json"
                  }
               }
            },
            "url": {
               "raw": "http://localhost:5000/api/users/6824dac9c8521d941c3e65b7",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "users",
                  "6824dac9c8521d941c3e65b7"
               ]
            }
         },
         "response": []
      },
      {
         "name": "Renter",
         "request": {
            "auth": {
               "type": "bearer",
               "bearer": [
                  {
                     "key": "token",
                     "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjRlNjJmNTA0MWFmNWQ0YTYxNDU1OCIsImlhdCI6MTc0NzI0OTcwMCwiZXhwIjoxNzQ3MzM2MTAwfQ.GcGs3gWXgLGM2JCjF0RSTooMo-zCc4cVCPCuIFtexIA",
                     "type": "string"
                  }
               ]
            },
            "method": "POST",
            "header": [
               {
                  "key": "Authorization",
                  "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjRlNjJmNTA0MWFmNWQ0YTYxNDU1OCIsImlhdCI6MTc0NzI0OTcwMCwiZXhwIjoxNzQ3MzM2MTAwfQ.GcGs3gWXgLGM2JCjF0RSTooMo-zCc4cVCPCuIFtexIA",
                  "type": "text"
               }
            ],
            "body": {
               "mode": "raw",
               "raw": "{\r\n  \"renterId\": \"6824e62f5041af5d4a614558\",\r\n  \"carId\": \"6824e4945041af5d4a614552\",\r\n  \"startDate\": \"2025-05-20T00:00:00.000Z\",\r\n  \"endDate\": \"2025-05-22T00:00:00.000Z\"\r\n}\r\n",
               "options": {
                  "raw": {
                     "language": "json"
                  }
               }
            },
            "url": {
               "raw": "http://localhost:5000/api/bookings",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "bookings"
               ]
            }
         },
         "response": []
      },
      {
         "name": "Get Review",
         "request": {
            "method": "GET",
            "header": [],
            "url": {
               "raw": "http://localhost:5000/api/reviews/68250a14237f2d67e6ba8726",
               "protocol": "http",
               "host": [
                  "localhost"
               ],
               "port": "5000",
               "path": [
                  "api",
                  "reviews",
                  "68250a14237f2d67e6ba8726"
               ]
            }
         },
         "response": []
      }
   ]
}
```
