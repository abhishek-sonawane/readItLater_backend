
# 📚 ReadItLater — Backend

ReadItLater is an open source alternative to Pocket (which is shutting down), designed to let users save articles or any web content for reading later. This is the **backend service** that powers the web and mobile apps, offering RESTful APIs for managing saved content, tags, and folder hierarchies.

> 💡 This will evolve into a monorepo including the frontend (React), and mobile app (React Native).

---

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 🤖 Article scraping with Readability and Puppeteer
- 🎯 Background scraping queued using Bull (Redis)
- 🏷️ Tagging support
- 📁 One-level folder system for organization
- 📦 Zod for runtime validation
- 🧾 PostgreSQL for relational data modeling
- ☁️ AWS S3 integration (for content attachments/media)
- 🐳 Dockerized for easy deployment
- ✅ Jest for testing
- ⚙️ CI/CD via Jenkins
- 🏗️ Future plans:
  - Browser extension
  - Web app
  - Mobile app
  - Convert to TypeScript
  - Add recommendation engine

---

## Tech Stack

| Layer        | Stack                              |
|--------------|-------------------------------------|
| Backend      | Node.js, Express.js, Zod, PostgreSQL |
| Frontend     | React, TypeScript, Tailwind CSS (planned) |
| Mobile App   | React Native + TypeScript |
| Deployment   | Docker, AWS EC2, AWS S3, Jenkins |
| Testing      | Jest |


## Run Locally

Prerequisites
- Node v22
- Docker

Clone the project

```bash
  git clone https://github.com/abhishek-sonawane/readItLater_backend
```

Go to the project directory

```bash
  cd readItLater
```

Install dependencies

```bash
  npm install
```

Add .env from .env.example

```bash
PORT=3000
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
DATABASE_URL=<Your database url>
ACCESS_TOKEN_SECRET='secret'
ACCESS_TOKEN_EXPIRY='1d'
REFRESH_TOKEN_SECRET='secret'
REFRESH_TOKEN_EXPIRY='10d'
```

Start Database using docker

```bash
  docker compose up
```

Start the server

```bash
  npm run dev
```


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Author

- [@abhishek-sonwane](https://www.github.com/abhishek-sonwane)

