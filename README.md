# 🚀 RewardHub

**RewardHub** is a web-based platform with mobile applications designed to help companies efficiently reward their employees. Built with **Node.js, Express.js, React, and MongoDB**, RewardHub provides an engaging and interactive user experience.

Organizations using RewardHub make their employees feel valued by granting them **reward points**, which can be redeemed for **exclusive offers** from vendors.

---

## 🏗️ System Overview

RewardHub consists of **four main applications**, each serving a distinct role within the system:

### 🌐 **1. Web App for Organizational Admins**
- Used by **organizational administrators** to manage employees.
- Features:
  - Create and manage **employee accounts**.
  - Assign or **deduct points** from employees based on performance and milestones.
  - View and track **employee transactions**.

### 🌐 **2. Web App for Super Admins**
- Used by **super administrators** to manage the overall system.
- Features:
  - Manage **organizational admin accounts**.
  - Manage **third-party vendor accounts**.
  - Add and manage **offers** available for employees.

### 📱 **3. Mobile App for Employees**
- Used by employees to **redeem rewards** and manage their points.
- Features:
  - View **available reward points**.
  - Browse **exclusive offers**.
  - Check **transaction history**.
  - View **third-party vendors** (shops, restaurants, etc.).
  - Generate a **unique offer code** when redeeming rewards.

### 📱 **4. Mobile App for Third-Party Vendors**
- Used by shops, restaurants, and other vendors to **validate employee rewards**.
- Features:
  - Validate **unique offer codes** provided by employees.
  - Deduct **reward points** from employees and credit them to their own vendor account.
  - View and track **transaction history**.

---

## 🌟 Features

✅ **Seamless Reward Distribution** – Enables organizations to allocate reward points based on employee performance and milestones. 
✅ **Enhanced Security** – Implements JWT-based authentication, role-based authorization, and password encryption.  
✅ **Scalability** – Designed to handle large user bases, transactions, and offers seamlessly.   
✅ **User-Friendly UI** – Built with **React.js** and **Tailwind CSS** for an intuitive experience across web and mobile platforms.  

---

## 🛠️ Tech Stack

| **Category** | **Technology** |
|-------------|---------------|
| Backend | Node.js, Express.js |
| Frontend | React, React Native |
| Database | MongoDB |

---

## 🚀 Installation Guide

### ⚡ Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) & npm  
- [Express.js](https://expressjs.com/)  
- [React](https://react.dev/)  
- [MongoDB](https://www.mongodb.com/)  

---

### 📌 Setup Instructions

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/mahmoudramzy1/Rewardhub.git
cd Rewardhub
```

#### 2️⃣ Install dependencies:
```bash
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend

# Install Admin panel dependencies
cd Admin
npm install
cd ..

# Install SuperAdmin dependencies
cd SuperAdmin
npm install
cd ..

# Install Redeem-App dependencies
cd Redeem-App
npm install
cd ..

# Install Reward-Hub-emp-app dependencies
cd Reward-Hub-emp-app
npm install
cd ..
```

#### 3️⃣ Setup Environment Variables

1. Navigate to the backend folder.

2. Create a new file named .env in the backend directory.

3. Generate two tokens (ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET).

4. Add the following content to the .env file:
```bash
ACCESS_TOKEN_SECRET=[your first token]
REFRESH_TOKEN_SECRET=[your second token]
GROQ_API_KEY=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
```

💡 Note:

Replace [your first token] and [your second token] with your actual generated tokens.

Do not share the .env file publicly.

To prevent accidental commits, add .env to your .gitignore file.


### 🎯 Running the Application
```bash
# Start Backend Server
cd backend
npm run dev

# Start Frontend Applications
cd ../frontend

# Start Admin Panel
cd Admin
npm run dev
cd ..

# Start SuperAdmin Panel
cd SuperAdmin
npm run dev
cd ..

# Start Redeem App
cd Redeem-App
npm run start
cd ..

# Start Employee App
cd Reward-Hub-emp-app
npm run start
```

#### 🔑 the Credentials of Super Admin
```bash
username: "mahmoud200"
password: "SecurePass123!"
```

## 🤝 Contributing
1. **Fork the repository.**
2. **Create a new branch:**
```bash
git checkout -b feature-name
```
3. **Make your changes and commit them:**
```bash
git commit -m "Add feature-name"
```
4. **Push to your fork and submit a pull request.**

## 📌 App links

- 🎥 [Demo Video](https://www.youtube.com/watch?v=nyc9gxkg56E)
- 📊 [Presentation](https://docs.google.com/presentation/d/1G9HICe-cMydpujCcK2k9I3LErt6GkGJR/edit#slide=id.p1)
