# OTT Platform "My List" Feature - Developer Evaluation Project

Welcome to the OTT Platform "My List" feature evaluation project. This project is designed to assess your problem-solving skills, debugging abilities, and overall proficiency in improving an existing codebase. The project is built using [NestJS](https://nestjs.com/), and your task will involve refining the current implementation and adding new features.

## Project Overview

This project simulates a basic OTT (Over-the-Top) platform where users can add content (movies, series, etc.) to their "My List" feature. The backend is implemented with NestJS, and we have already seeded the database with some initial data and models.

Your job will be to address existing issues, optimize the current code, and extend it by adding the required functionalities.

### What you will be working on:
- **Fix existing bugs** in the project.
- **Improve and optimize** the current implementation.
- **Add new features** to enhance the functionality of the "My List" feature.

## Getting Started

### Prerequisites

Before running the application, ensure you have the following prerequisites installed on your machine:

- Node.js v18 or above
- Docker
- Docker Compose

### Setting Up the Project

1. **Clone the repository** to your local machine:
   ```bash
   git clone <repository-url>


### Getting Started

To start the project locally, use the following command:

```bash
docker-compose up --build
```



### Swagger Documentation for existing apis
Swagger Documentation: http://127.0.0.1:3000/api


### API Endpoints to Be Developed
The application needs to expose the following API endpoints by the completion of this assignment:

- GET /list: Lists all items added to the user's list with pagination.
- POST /list: Adds items to the user's list.
- DELETE /list: Removes an item from the user's list.

### Detailed Requirements for the API:
- GET /list should include pagination support (e.g., limit and offset).
- POST /list must validate incoming data and ensure no duplicate items are added.
- DELETE /list should ensure proper validation of the item being removed and return meaningful responses.

### Existing Endpoints in the Application
You can use the following existing endpoints to interact with movies and TV shows:

- GET /movies: Lists all movies.
- POST /movies: Adds a new movie.
- GET /tvshows: Lists all TV shows.
- POST /tvshows: Adds a TV show.
Note: These endpoints are already implemented and should function correctly. Feel free to review and improve them where necessary.

### Changes

- GET /list (Added this api with userId int the headers the support of pagination where we need to add only page number for pagination).
- POST /list (Added this api with payload of movieOrShowId and type is movie or tvshow and userId in the header so that each user have their own list).
- DELETE /list/:showOrMovieId  ( Added this api for deleting the list item with the usedId in the header showOrMovieId as params)
- 
### some changes made for the user module and seeder was not working properly 


