# Task Management Application

## Live Demo
[Click here to access the live application](YOUR_LIVE_LINK_HERE)

## Description
This **Task Management Application** allows users to efficiently organize their tasks into three categories: **To-Do, In Progress, and Done**. Users can seamlessly **add, edit, delete, and reorder** tasks using an intuitive drag-and-drop interface. All changes are saved instantly to the database, ensuring persistence.

## Features
### 1. Authentication
- **Google Sign-in** via Firebase.
- Only authenticated users can access the app.
- User details (User ID, email, and display name) are stored in the database upon first login.

### 2. Task Management System
- Users can **add, edit, delete, and reorder** tasks.
- Tasks are categorized into:
  - **To-Do**
  - **In Progress**
  - **Done**
- Drag-and-drop functionality:
  - Move tasks between categories.
  - Reorder tasks within a category.
- Real-time database updates ensure task persistence.
- Task properties:
  - **Title** (Required, max 50 characters)
  - **Description** (Optional, max 200 characters)
  - **Timestamp** (Auto-generated on creation)
  - **Category** (To-Do, In Progress, Done)

## Technologies Used
### Frontend:
- **React.js** (with Vite.js for fast performance)
- **Tailwind CSS** for modern, responsive UI
- **dnd-kit** for drag-and-drop functionality
- **TanStack Query** for data fetching

### Backend:
- **Node.js** with **Express.js** for API development
- **MongoDB** (No Mongoose) for task storage
- **Firebase Authentication** for secure user authentication

### Real-time Updates:
- **Change Streams** or **WebSockets** for live task updates.
- **Optimistic UI updates** to improve user experience.

## API Endpoints
| Method | Endpoint        | Description |
|--------|---------------|-------------|
| `POST` | `/tasks`       | Add a new task |
| `GET`  | `/tasks`       | Retrieve all tasks for the logged-in user |
| `PUT`  | `/tasks/:id`   | Update task details (title, description, category) |
| `DELETE` | `/tasks/:id` | Delete a task permanently |

## Installation & Setup
### 1. Clone the Repository
```bash
git clone YOUR_REPO_LINK_HERE
cd task-management-app
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
yarn install # or npm install

# Install backend dependencies
cd backend
yarn install # or npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the backend directory and add the following:
```
MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
```

### 4. Run the Application
#### Start the Backend Server
```bash
cd backend
yarn start # or npm start
```

#### Start the Frontend
```bash
yarn dev # or npm run dev
```

### 5. Deploying to Netlify & Render
- Frontend: **Deploy via Netlify**
- Backend: **Deploy using Render/Vercel/Heroku**

## Contributing
Pull requests are welcome! If you'd like to contribute, please fork the repository and submit a PR.

## License
This project is licensed under the **MIT License**.
