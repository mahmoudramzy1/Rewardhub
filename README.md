# 🚀 RewardHub

**RewardHub** is a web-based platform with mobile applications designed to help companies efficiently reward their employees. Built with **Node.js, Express.js, React, and MongoDB**, RewardHub provides an engaging and interactive user experience.

Organizations using RewardHub make their employees feel valued by granting them **reward points**, which can be redeemed for **exclusive offers** from vendors.

---

## 🌟 Features

✅ **Enhanced Security** – Implements JWT-based authentication, role-based authorization, and password encryption.  
✅ **Scalability** – Designed to handle large user bases, transactions, and offers seamlessly.  
✅ **Seamless Reward Distribution** – Enables organizations to allocate reward points based on employee performance and milestones.  
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
cd backend
npm install
cd ..
cd frontend
cd Admin
npm install
cd ..
cd Redeem-App
npm install
cd ..
cd Reward-Hub-emp-app
npm install
cd ..
cd SuperAdmin
npm install
```

#### 3️⃣ Setup Environment Variables

1. Navigate to the backend folder.

2. Create a new file named .env in the backend directory.

3. Generate two tokens (ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET).

4. Add the following content to the .env file:
```bash
_______________________________________________________________________________
ACCESS_TOKEN_SECRET=[your first token]
REFRESH_TOKEN_SECRET=[your second token]
GROQ_API_KEY=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
_______________________________________________________________________________
```

💡 Note:

Replace [your first token] and [your second token] with your actual generated tokens.
Do not share the .env file publicly.
To prevent accidental commits, add .env to your .gitignore file.


#### 🎯 Running the Application
```bash
cd backend
npm run dev
cd ..
cd frontend
cd Admin
npm run dev
cd ..
cd SuperAdmin
npm run dev
cd ..
cd Redeem-App
npm run start
cd ..
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

- 🎥 [Demo Video](https://www.youtube.com/watch?v=WbNO3oei6IM)
- 📊 [Presentation](https://docs.google.com/presentation/d/1G9HICe-cMydpujCcK2k9I3LErt6GkGJR/edit#slide=id.p1)
