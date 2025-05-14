
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

## Postman Collection (JSON)

```json
{
  "info": {
    "_postman_id": "d8c033c6-0018-4f6e-9cde-01c18d3bfd33",
    "name": "WheelShare",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "_exporter_id": "42937220"
  },
  "item": [
    {
      "name": "http://localhost:5000/api/bookings",
      "protocolProfileBehavior": {
        "disableBodyPruning": true
      },
      "request": {
        "auth": {
          "type": "bearer",
          "bearer": [
            {
              "key": "token",
              "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE2Nzg5M2E0YjIxMDIwNTYyODI4ZCIsImlhdCI6MTc0NzAyMDEzMywiZXhwIjoxNzQ3MTA2NTMzfQ.vkU9CisFEhjHfIumx-ovvD0FHRk9rJe6dzIWTw_g-y4",
              "type": "string"
            }
          ]
        },
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE2Nzg5M2E0YjIxMDIwNTYyODI4ZCIsImlhdCI6MTc0NzAyMDEzMywiZXhwIjoxNzQ3MTA2NTMzfQ.vkU9CisFEhjHfIumx-ovvD0FHRk9rJe6dzIWTw_g-y4",
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
          "raw": "http://localhost:5000/api/protected",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "5000",
          "path": [
            "api",
            "protected"
          ]
        }
      },
      "response": []
    },
    {
      "name": "http://localhost:5000/",
      "request": {
        "method": "GET",
        "header": [],
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
      "name": "http://localhost:5000/api/cars/add",
      "request": {
        "auth": {
          "type": "bearer",
          "bearer": [
            {
              "key": "token",
              "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE2Nzg5M2E0YjIxMDIwNTYyODI4ZCIsImlhdCI6MTc0NzAyMTEwMywiZXhwIjoxNzQ3MTA3NTAzfQ.UoAb4scsrDtezeUCRMALkdC2QJncGcwqcf3O-PQSZOg",
              "type": "string"
            }
          ]
        },
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE2Nzg5M2E0YjIxMDIwNTYyODI4ZCIsImlhdCI6MTc0NzAyMTEwMywiZXhwIjoxNzQ3MTA3NTAzfQ.UoAb4scsrDtezeUCRMALkdC2QJncGcwqcf3O-PQSZOg",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\r\n    \"model\": \"Toyota Corolla\",\r\n    \"year\": 2020,\r\n    \"availability\": \"Available\",\r\n    \"price\": 100,\r\n    \"location\": \"New York\"\r\n}\r\n",
          "options": {
            "raw": {
              "language": "json"
            }
          }
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
      "name": "http://localhost:5000/api/cars/add",
      "request": {
        "auth": {
          "type": "bearer",
          "bearer": [
            {
              "key": "token",
              "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE2Nzg5M2E0YjIxMDIwNTYyODI4ZCIsImlhdCI6MTc0NzAyMTg1NSwiZXhwIjoxNzQ3MTA4MjU1fQ.tST0q0Nk-GKhLShZTirHXr3akkL6DmDNDowrqswHHfg",
              "type": "string"
            }
          ]
        },
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE2Nzg5M2E0YjIxMDIwNTYyODI4ZCIsImlhdCI6MTc0NzAyMTg1NSwiZXhwIjoxNzQ3MTA4MjU1fQ.tST0q0Nk-GKhLShZTirHXr3akkL6DmDNDowrqswHHfg",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"model\": \"Honda Civic\",\r\n  \"year\": 2022,\r\n  \"availability\": true,\r\n  \"price\": 60,\r\n  \"location\": \"Bangalore\",\r\n  \"ownerId\": \"68215cdd84cf5423a46484fe\"\r\n}\r\n",
          "options": {
            "raw": {
              "language": "json"
            }
          }
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
      "name": "http://localhost:5000/api/bookings",
      "request": {
        "auth": {
          "type": "bearer",
          "bearer": [
            {
              "key": "token",
              "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE2Nzg5M2E0YjIxMDIwNTYyODI4ZCIsImlhdCI6MTc0NzAyMTg1NSwiZXhwIjoxNzQ3MTA4MjU1fQ.tST0q0Nk-GKhLShZTirHXr3akkL6DmDNDowrqswHHfg",
              "type": "string"
            }
          ]
        },
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE2Nzg5M2E0YjIxMDIwNTYyODI4ZCIsImlhdCI6MTc0NzAyMTg1NSwiZXhwIjoxNzQ3MTA4MjU1fQ.tST0q0Nk-GKhLShZTirHXr3akkL6DmDNDowrqswHHfg",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"renterId\": \"682182577d9b9120629556e6\",\r\n  \"carId\": \"6821819e7d9b9120629556e4\",\r\n  \"startDate\": \"2025-05-15T00:00:00.000Z\",\r\n  \"endDate\": \"2025-05-17T00:00:00.000Z\"\r\n}\r\n",
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
      "name": "http://localhost:5000/api/bookings",
      "request": {
        "method": "GET",
        "header": [],
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
      "name": "http://localhost:5000/api/bookings?carId=6821819e7d9b9120629556e4",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/bookings?carId=6821819e7d9b9120629556e4",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "5000",
          "path": [
            "api",
            "bookings"
          ],
          "query": [
            {
              "key": "carId",
              "value": "6821819e7d9b9120629556e4"
            }
          ]
        }
      },
      "response": []
    },
    {
      "name": "http://localhost:5000/api/bookings?renterId=682182577d9b9120629556e6",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/bookings?renterId=682182577d9b9120629556e6",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "5000",
          "path": [
            "api",
            "bookings"
          ],
          "query": [
            {
              "key": "renterId",
              "value": "682182577d9b9120629556e6"
            }
          ]
        }
      },
      "response": []
    },
    {
      "name": "http://localhost:5000/api/reviews",
      "request": {
        "method": "POST",
        "header": [],
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
    }
  ]
}
```
