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

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

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

```json
{
  "status": "success",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

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

```json
{
  "id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com"
}
```

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
