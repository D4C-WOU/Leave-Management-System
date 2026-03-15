# LeaveFlow – Leave Management System

LeaveFlow is a full-stack Leave Management System designed to streamline employee leave requests and administrative approvals.  
It provides a centralized platform where employees can apply for leave and administrators can manage, approve, or reject requests while maintaining full visibility of leave statistics.

This project simulates how real organizations manage leave workflows using a modern full-stack architecture.

---

## Features

### Authentication & Access Control
- Secure login system
- Role-based access (Admin / Employee)
- Password hashing using bcrypt

### Employee Management (Admin)
- Add new employees
- Edit employee details
- Delete employees
- Employee search functionality
- View leave statistics per employee

### Leave Request System (Employee)
Employees can:
- Apply for leave
- Select leave type
- Choose start and end dates
- Provide a reason for leave
- Track status of leave requests

### Leave Administration (Admin)
Admins can:
- View all leave requests
- Approve or reject leave applications
- Monitor leave activity across employees

### Leave Statistics
Each employee record displays:
- Total leave requests
- Pending requests
- Approved requests
- Rejected requests

### Smart Validation
- Prevents selecting past dates for leave requests
- Real-time form validation
- User feedback messages for invalid inputs

### UI / UX
- Responsive dashboard layout
- Clean table-based management interface
- Tailwind CSS styling
- Structured admin and employee panels

---

## Tech Stack

Frontend
- React.js
- Tailwind CSS
- Axios

Backend
- Node.js
- Express.js

Database
- MongoDB
- Mongoose

Authentication & Security
- JWT (JSON Web Tokens)
- bcrypt password hashing

Development Tools
- Git
- GitHub
- Nodemon

---

## Project Structure

```
LeaveFlow
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── api
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## System Architecture

```
User Interface (React)
        ↓
REST API (Express / Node.js)
        ↓
MongoDB Database
```

The frontend communicates with the backend using REST APIs, and the backend interacts with MongoDB for data storage.

---

## Installation & Setup

### 1. Clone the Repository

```
git clone https://github.com/D4C-WOU/Leave-Management-System.git
cd Leave-Management-System
```

---

### 2. Backend Setup

Navigate to the backend folder:

```
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend server:

```
npm run dev
```

---

### 3. Frontend Setup

Open another terminal and run:

```
cd frontend
npm install
npm run dev
```

Frontend will start on:

```
http://localhost:5173
```

Backend API will run on:

```
http://localhost:5000
```

---

## Screenshots
Each Screenshot represents the UI and feel of the overall System with demo credentials used for both admin and user 

Example:

```
/screenshots/AdminDashboard.png
/screenshots/LeaveRequestForm.png
/screenshots/LeaveRequestTable.png
/screenshots/Employees
```

---

## Future Improvements

Possible enhancements for the system:

- Email notifications for leave approvals
- Leave balance deduction automation
- Calendar view for leave schedules
- Admin analytics dashboard
- Pagination for large datasets
- Deployment for public access

---

## Learning Outcomes

This project helped strengthen knowledge in:

- Full-stack application architecture
- REST API development
- Authentication and authorization
- Database schema design
- React state management
- CRUD operations with MongoDB
- UI design using Tailwind CSS

---

## Repository

GitHub Repository:

https://github.com/D4C-WOU/Leave-Management-System

---

## Author

Nand Joshi  
Computer Science / IT Student  
Full Stack Development Enthusiast

---

## License

This project is for educational and portfolio purposes.
