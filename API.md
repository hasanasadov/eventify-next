# eventify.az API Documentation

## Overview

- **API Title**: eventify.az
- **Version**: 1.0.0
- **Base URL**: http://localhost:8000

---

## Authentication

Certain endpoints require OAuth2 Bearer Token authentication. For these endpoints, pass the token in the `Authorization` header as follows:

```
Authorization: Bearer <token>
```

Endpoints requiring authorization will be marked with **Auth Required**. Ensure that a valid token is provided in the header for these calls.

---

## Endpoints

### Authentication Endpoints

| Endpoint                      | Method | Description                     | Auth Required | 
|-------------------------------|--------|---------------------------------|---------------|
| `/auth`                       | `POST` | Creates a new user              | No            |
| `/auth/token`                 | `POST` | Retrieves an access token       | No            |
| `/auth/verify-token/{token}`  | `GET`  | Verifies token validity         | No            |
| `/auth/confirm-email/{token}` | `GET`  | Confirms user email             | No            |
| `/auth/resend-verification`   | `POST` | Resends email verification link | No            |
| `/auth/user`                  | `POST` | Get user data                   | No            |

#### Details:

- **Create User**
  - **URL**: `/auth`
  - **Method**: `POST`
  - **Request Body**:
    - `username`: `string` (required)
    - `email`: `string` (required, email format)
    - `password`: `string` (required)
    - `first_name`: `string` (required)
    - `last_name`: `string` (required)
    - `is_organizer`: `integer` (required)
  - **Response**:
    - `201`: User created successfully
    - `422`: Validation error

- **Login For Access Token**
  - **URL**: `/auth/token`
  - **Method**: `POST`
  - **Request Body** (form data):
    - `username`: `string` (required)
    - `password`: `string` (required)
  - **Response**:
    - `200`: Token received
    - `422`: Validation error

- **Verify User Token**
  - **URL**: `/auth/verify-token/{token}`
  - **Method**: `GET`
  - **Path Parameters**: `token` (required, string)
  - **Response**:
    - `200`: Token is valid
    - `401`: Invalid or expired token

- **User Verification**
  - **URL**: `/auth/confirm-email/{token}`
  - **Method**: `GET`
  - **Path Parameters**: `token` (required, string)
  - **Response**:
    - `200`: Email confirmed successfully
    - `422`: Invalid token

- **Resend Email Verification**
  - **URL**: `/auth/resend-verification`
  - **Method**: `POST`
  - **Request Body**:
    - `email`: `string` (required)
  - **Response**:
    - `201`: Verification email resent
    - `422`: Email not found or already verified

- **User data**
  - **URL**: `/auth/user`
  - **Method**: `POST`
  - **Authorization**: Bearer token must be provided in the `Authorization` header.
  - **Response**:
    - `200`: Valid user
    - `401`: Invalid or expired token

---

### Venue Endpoints

| Endpoint                       |  Method  | Description                 | Auth Required |
|--------------------------------|----------|-----------------------------|---------------|
| `/venues`                      | `POST`   | Creates a new venue         | Yes           |
| `/venues`                      | `GET`    | Retrieves all venues        | No            |
| `/venues/{venue_id}`           | `GET`    | Retrieves specific venue    | No            |
| `/venues/like`                 | `POST`   | Likes a venue               | Yes           |
| `/venues/like`                 | `DELETE` | Removes a like from a venue | Yes           |
| `/venues/comment`              | `POST`   | Adds a comment to a venue   | Yes           |
| `/venues/comment`              | `DELETE` | Deletes venue comment       | Yes           |
| `/venues/{venue_id}/comment`   | `GET`    | Gets all venue comments     | No            |
| `/venues/comment/{comment_id}` | `GET`    | Gets specific venue comment | No            |
| `/venues/search/{query}`       | `GET`    | Search venues               | No            |

#### Details:

- **Create Venue**
  - **URL**: `/venues`
  - **Method**: `POST`
  - **Auth Required**: Yes
  - **Authorization**: Bearer token must be provided in the `Authorization` header.
  - **Request Body**:
    - `name`: `string` (required)
    - `description`: `string` (required)
    - `venue_type`: `string` (required)
    - `lat`: `string` (required)
    - `lng`: `string` (required)
    - `work_hours_open`: `string` (HH:MM format)
    - `work_hours_close`: `string` (HH:MM format)
  - **Response**:
    - `201`: Venue created successfully
    - `422`: Validation error

- **Get All Venues**
  - **URL**: `/venues`
  - **Method**: `GET`
  - **Response**:
    - `200`: List of venues retrieved

- **Get Venue by ID**
  - **URL**: `/venues/{venue_id}`
  - **Method**: `GET`
  - **Path Parameters**: `venue_id` (integer, required)
  - **Response**:
    - `200`: Venue details
    - `404`: Venue not found

- **Like Venue**
  - **URL**: `/venues/like`
  - **Method**: `POST`
  - **Auth Required**: Yes
  - **Authorization**: Bearer token must be provided in the `Authorization` header.
  - **Request Body**:
    - `venue_id`: `integer` (required)
  - **Response**:
    - `200`: Venue liked
    - `422`: Invalid venue ID

- **Delete Venue Like**
  - **URL**: `/venues/like`
  - **Method**: `DELETE`
  - **Auth Required**: Yes
  - **Authorization**: Bearer token must be provided in the `Authorization` header.
  - **Request Body**:
    - `venue_id`: `integer` (required)
  - **Response**:
    - `200`: Like removed from venue
    - `404`: Venue not found or like does not exist

- **Add Venue Comment**
  - **URL**: `/venues/comment`
  - **Method**: `POST`
  - **Auth Required**: Yes
  - **Authorization**: Bearer token must be provided in the `Authorization` header.
  - **Request Body**:
    - `venue_id`: `integer` (required)
    - `comment`: `string` (required)
  - **Response**:
    - `201`: Comment added
    - `422`: Invalid venue ID or comment text

- **Get Venue Comments**
  - **URL**: `/venues/{venue_id}/comment`
  - **Method**: `GET`
  - **Path Parameters**: `venue_id` (integer, required)
  - **Response**:
    - `200`: List of comments for the venue
    - `404`: Venue not found

- **Get specific Venue Comment**
  - **URL**: `/venues/comment/{comment_id}`
  - **Method**: `GET`
  - **Path Parameters**: `comment_id` (integer, required)
  - **Response**:
    - `200`: Comments for the venue
    - `404`: Venue not found

- **Delete Venue Comment**
  - **URL**: `/venues/comment`
  - **Method**: `DELETE`
  - **Auth Required**: Yes
  - **Authorization**: Bearer token must be provided in the `Authorization` header.
  - **Request Body**:
    - `id`: `integer` (required)
  - **Response**:
    - `200`: Comment removed from venue
    - `404`: Venue not found or comment does not exist

- **Search Venues**
  - **URL**: `/venues/search/{query}`
  - **Method**: `GET`
  - **Path Parameters**: `query` (string, required)
  - **Response**:
    - `200`: List of venues

---

### Event Endpoints

| Endpoint                       |  Method  | Description                 | Auth Required |
|--------------------------------|----------|-----------------------------|---------------|
| `/events`                      | `POST`   | Creates a new event         | Yes           |
| `/events`                      | `GET`    | Retrieves all events        | No            |
| `/events/favorites`            | `GET`    | Retrieves favorite events   | Yes           |
| `/events/{event_id}`           | `GET`    | Retrieves specific event    | No            |
| `/events/like`                 | `POST`   | Creates a new like on event | Yes           |
| `/events/like`                 | `DELETE` | Deletes the like from event | Yes           |
| `/events/comment`              | `POST`   | Creates a comment on event  | Yes           |
| `/events/comment`              | `DELETE` | Deletes event comment       | Yes           |
| `/events/{event_id}/comment`   | `GET`    | Retrieves event comments    | No            |
| `/events/comment/{comment_id}` | `GET`    | Gets specific event comment | No            |
| `/events/search/{query}`       | `GET`    | Search through event        | No            |

#### Details:

- **Create Event**
  - **URL**: `/events`
  - **Method**: `POST`
  - **Auth Required**: Yes
  - **Authorization**: Bearer token must be provided in the `Authorization` header.
  - **Request Body**:
    - `venue_id`: `integer` (required)
    - `organizer_id`: `integer` (required)
    - `title`: `string` (required)
    - `description`: `string` (required)
    - `event_type`: `string` (required)
    - `date`: `string` (date format, required)
    - `start`: `string` (time format, required)
    - `finish`: `string` (time format, required)
    - `poster_image_link`: `string` (URL format, required)
  - **Response**:
    - `201`: Event created
    - `422`: Validation error

- **Get All Events**
  - **URL**: `/events`
  - **Method**: `GET`
  - **Response**:
    - `200`: List of events retrieved

- **Get Favorite Events**
  - **URL**: `/events/favorites`
  - **Method**: `GET`
  - **Auth Required**: Yes
  - **Authorization**: Bearer token must be provided in the `Authorization` header.
  - **Response**:
    - `200`: List of favorite events

- **Get Event by ID**
  - **URL**: `/events/{event_id}`
  - **Method**: `GET`
  - **Path Parameters**: `event_id` (integer, required)
  - **Response**:
    - `200`: Event details
    - `404`: Event not found

- **Create Event Like**
  - **URL**: `/events/like`
  - **Method**: `POST`
  - **Auth Required**: Yes
  - **Authorization**: Bearer token must be provided in the `Authorization` header.
  - **Request Body**:
    - `event`: `integer` (required)
  - **Response**:
    - `201`: Event created
    - `422`: Validation error

- **Delete Event Like**
  - **URL**: `/events/like`
  - **Method**: `DELETE`
  - **Auth Required**: Yes
  - **Authorization**: Bearer token must be provided in the `Authorization` header.
  - **Request Body**:
    - `event`: `integer` (required)
  - **Response**:
    - `204`: Like removed from event
    - `404`: Event not found or comment does not exist

- **Create Event Comment**
  - **URL**: `/events/comment`
  - **Method**: `POST`
  - **Auth Required**: Yes
  - **Authorization**: Bearer token must be provided in the `Authorization` header.
  - **Request Body**:
    - `event`: `integer` (required)
    - `content`: `string` (required)
  - **Response**:
    - `201`: Event created
    - `422`: Validation error

- **Delete Event Comment**
  - **URL**: `/events/comment`
  - **Method**: `DELETE`
  - **Auth Required**: Yes
  - **Authorization**: Bearer token must be provided in the `Authorization` header.
  - **Request Body**:
    - `id`: `integer` (required)
  - **Response**:
    - `204`: Comment removed from event
    - `404`: Event not found or comment does not exist

- **Get Event Comments**
  - **URL**: `/events/{event_id}/comment`
  - **Method**: `GET`
  - **Path Parameters**: `event_id` (integer, required)
  - **Response**:
    - `200`: List of comments for the event
    - `404`: Event not found

- **Get specific Event Comment**
  - **URL**: `/events/comment/{comment_id}`
  - **Method**: `GET`
  - **Path Parameters**: `comment_id` (integer, required)
  - **Response**:
    - `200`: Comments for the event
    - `404`: Event not found

- **Search Venues**
  - **URL**: `/events/search/{query}`
  - **Method**: `GET`
  - **Path Parameters**: `query` (string, required)
  - **Response**:
    - `200`: List of events
