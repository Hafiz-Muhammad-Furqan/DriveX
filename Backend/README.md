# API Documentation

## User Registration

### POST /users/register

Register a new user in the system.

#### Request Body

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

#### Required Fields

- `fullname.firstname`: User's first name (minimum 3 characters)
- `fullname.lastname`: User's last name (minimum 3 characters)
- `email`: Valid email address
- `password`: Password (minimum 6 characters)

#### Validations

- `fullname.firstname`: Must be at least 3 characters long
- `fullname.lastname`: Must be at least 3 characters long
- `email`: Must be a valid email address
- `password`: Must be at least 6 characters long

#### Response Status Codes

| Status Code | Description                      |
| ----------- | -------------------------------- |
| 201         | User successfully created        |
| 400         | Bad request - Invalid input data |
| 409         | Conflict - Email already exists  |
| 500         | Internal server error            |

#### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

#### Example Success Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): Users's firstname (minimum 3 characters).
    - `lastname` (string): Users's lastname (minimum 3 characters).
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (string): JWT Token

## User Login

### POST /users/login

Authenticate a user and return a token.

#### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

#### Required Fields

- `email`: Valid email address
- `password`: Password (minimum 6 characters)

#### Validations

- `email`: Must be a valid email address
- `password`: Must be at least 6 characters long

#### Response Status Codes

| Status Code | Description                        |
| ----------- | ---------------------------------- |
| 200         | User successfully authenticated    |
| 400         | Bad request - Invalid input data   |
| 401         | Unauthorized - Invalid credentials |
| 500         | Internal server error              |

#### Example Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Example Success Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): Users's firstname (minimum 3 characters).
    - `lastname` (string): Users's lastname (minimum 3 characters).
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (string): JWT Token

## User Profile

### GET /users/profile

Retrieve the authenticated user's profile.

#### Headers

- `Authorization`: Bearer token

#### Response Status Codes

| Status Code | Description                         |
| ----------- | ----------------------------------- |
| 200         | User profile retrieved successfully |
| 401         | Unauthorized - Invalid token        |
| 500         | Internal server error               |

#### Example Success Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): Users's firstname (minimum 3 characters).
    - `lastname` (string): Users's lastname (minimum 3 characters).
  - `email` (string): User's email address (must be a valid email).

## User Logout

### GET /users/logout

Logout the authenticated user.

#### Headers

- `Authorization`: Bearer token

#### Response Status Codes

| Status Code | Description                  |
| ----------- | ---------------------------- |
| 200         | User logged out successfully |
| 401         | Unauthorized - Invalid token |
| 500         | Internal server error        |

#### Example Success Response

```json
{
  "message": "Logged out successfully"
}
```

## Captain Registration

### POST /captains/register

Register a new captain in the system.

#### Request Body

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```

#### Required Fields

- `fullname.firstname`: Captain's first name (minimum 3 characters)
- `fullname.lastname`: Captain's last name (minimum 3 characters)
- `email`: Valid email address
- `password`: Password (minimum 6 characters)
- `vehicle.color`: Vehicle color (minimum 3 characters)
- `vehicle.plate`: Vehicle plate (minimum 6 characters)
- `vehicle.capacity`: Vehicle capacity (minimum 1)
- `vehicle.vehicleType`: Vehicle type (must be one of "car", "motorcycle", "auto")

#### Validations

- `fullname.firstname`: Must be at least 3 characters long
- `fullname.lastname`: Must be at least 3 characters long
- `email`: Must be a valid email address
- `password`: Must be at least 6 characters long
- `vehicle.color`: Must be at least 3 characters long
- `vehicle.plate`: Must be at least 6 characters long
- `vehicle.capacity`: Must be at least 1
- `vehicle.vehicleType`: Must be one of "car", "motorcycle", "auto"

#### Response Status Codes

| Status Code | Description                      |
| ----------- | -------------------------------- |
| 201         | Captain successfully created     |
| 400         | Bad request - Invalid input data |
| 409         | Conflict - Email already exists  |
| 500         | Internal server error            |

#### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Example Success Response

- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Users's firstname (minimum 3 characters).
    - `lastname` (string): Users's lastname (minimum 3 characters).
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
  - `vehicle` (object)
    - `color` (string) vehicle color
    - `capacity` (number) vehicle capacity
    - `vehicleType` (string) vehicle Type
    - `plate` (string) vehicle number plate
- `token` (string): JWT Token

## Captain Login

### POST /captains/login

Authenticate a captain and return a token.

#### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

#### Required Fields

- `email`: Valid email address
- `password`: Password (minimum 6 characters)

#### Validations

- `email`: Must be a valid email address
- `password`: Must be at least 6 characters long

#### Response Status Codes

| Status Code | Description                        |
| ----------- | ---------------------------------- |
| 200         | Captain successfully authenticated |
| 400         | Bad request - Invalid input data   |
| 401         | Unauthorized - Invalid credentials |
| 500         | Internal server error              |

#### Example Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Example Success Response

- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Users's firstname (minimum 3 characters).
    - `lastname` (string): Users's lastname (minimum 3 characters).
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
  - `vehicle` (object)
    - `color` (string) vehicle color
    - `capacity` (number) vehicle capacity
    - `vehicleType` (string) vehicle Type
    - `plate` (string) vehicle number plate
- `token` (string): JWT Token -->

## Captain Profile

### GET /captains/profile

Retrieve the authenticated captain's profile.

#### Headers

- `Authorization`: Bearer token

#### Response Status Codes

| Status Code | Description                            |
| ----------- | -------------------------------------- |
| 200         | Captain profile retrieved successfully |
| 401         | Unauthorized - Invalid token           |
| 500         | Internal server error                  |

#### Example Success Response

`captain` (object):

- `fullname` (object).
  - `firstname` (string): Users's firstname (minimum 3 characters).
  - `lastname` (string): Users's lastname (minimum 3 characters).
- `email` (string): User's email address (must be a valid email).
- `password` (string): User's password (minimum 6 characters).
- `vehicle` (object)
  - `color` (string) vehicle color
  - `capacity` (number) vehicle capacity
  - `vehicleType` (string) vehicle Type
  - `plate` (string) vehicle number plate

## Captain Logout

### GET /captains/logout

Logout the authenticated captain.

#### Headers

- `Authorization`: Bearer token

#### Response Status Codes

| Status Code | Description                     |
| ----------- | ------------------------------- |
| 200         | Captain logged out successfully |
| 401         | Unauthorized - Invalid token    |
| 500         | Internal server error           |

#### Example Success Response

```json
{
  "message": "Logged out successfully"
}
```
