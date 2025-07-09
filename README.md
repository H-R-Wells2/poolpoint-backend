# PoolPoint Backend

PoolPoint is a smart backend system for a mobile snooker tracking app. It supports real-time game tracking, cost calculation, player management, and session summaries. Built using Next.js 15 (App Router) and MongoDB, this backend provides structured API endpoints for efficient data handling.

---

## Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Database:** MongoDB (via Mongoose)
* **API:** Route Handlers (`app/api/`)
* **Language:** TypeScript

---

## Features

* RESTful API endpoints for:

  * Creating and fetching game results
  * Updating and deleting result records
  * Handling player scores, cost splits, and metadata
* Pagination support for large data sets
* Clean Mongoose schema for flexible result storage

---

## Project Structure

```
poolpoint-backend/
├── app/
│   └── api/
│       └── results/
│           ├── [id]/
│           │   └── route.ts      (PUT & DELETE handlers for individual result)
│           └── route.ts          (GET & POST handlers for results collection)
├── lib/
│   ├── mongodb.ts                (MongoDB connection utility)
│   └── models/
│       └── result.model.ts       (Mongoose schema for game results)
├── types/                        (TypeScript interfaces - optional)
├── .env.local                    (Environment variables - MongoDB URI)
├── README.md
└── package.json
```

---

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/poolpoint-backend.git
   cd poolpoint-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory with the following content:

   ```env
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/poolpoint?retryWrites=true&w=majority
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

The API will be available at:
`http://localhost:3000/api/results`

---

## API Endpoints

* **GET** `/api/results`
  Returns a paginated list of game results.

* **POST** `/api/results`
  Creates a new game result. Example request body:

  ```json
  {
    "players": [
      {
        "playerName": "Alice",
        "score": 120,
        "amount": 50,
        "isTeamWon": true
      },
      {
        "playerName": "Bob",
        "score": 100,
        "amount": 30,
        "isTeamWon": false
      }
    ]
  }
  ```

* **PUT** `/api/results/:id`
  Updates a game result by its ID.

* **DELETE** `/api/results/:id`
  Deletes a game result by its ID.

---

## Future Enhancements (Post-MVP)

* Player authentication and game ownership
* Filtering results by player or game mode
* Admin dashboard or analytics API
* Integration with Firebase or Supabase for cloud sync

---

## Author

Built by the PoolPoint Team
Contact: [kadamshubham10246@gmail.com](mailto:kadamshubham10246@gmail.com) 
