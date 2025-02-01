# Rewardhub

# Overview

Reward hub is a web-based platform with mobile application that help companies offer their employees competitive rewards. This project uses JS (node js, express js), css, react and more to provide an engaging and interactive user experience.

# Features

* Authentication System: Secure user login and session management.
* Responsive Design: Optimized for use on desktop and mobile devices.
* Reward hub: offer competitive rewards for employees.
* Employee Account: Store employees points.

# Tech Stack

* Backend: JS (Node js, express js)
* Frontend: React, React native
 
# Installation
## Prerequisites
* Install Node.js and npm
* Install Express.js
* Install React

## Steps

1. Clone the repository:
```bash
git clone https://github.com/mahmoudramzy1/Rewardhub.git
cd Rewardhub
```
2. Install dependencies:
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

3. Setup Environment Variables
```bash
1. Navigate to the backend folder.

2. Create a new file named .env in the backend directory.

3. Generate two tokens (ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET).

4. Add the following content to the .env file:


<div style="border:1px solid black; padding:10px;">
  <b>API Keys:</b>
  <div style="border:1px solid blue; padding:5px;">
    <p><b>ACCESS_TOKEN_SECRET:</b> [your first token]</p>
    <p><b>REFRESH_TOKEN_SECRET:</b> [your second token]</p>
    <p><b>GROQ_API_KEY:</b> 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</p>
  </div>
</div>
💡 Note:

Replace [your first token] and [your second token] with your actual generated tokens.
Do not share the .env file publicly or commit it to version control.
To prevent accidental commits, add .env to your .gitignore file.
```


3. Run
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

# Contributing
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

# App links

- [Demo Video](https://www.youtube.com/watch?v=WbNO3oei6IM)
- [Presentation](https://docs.google.com/presentation/d/1G9HICe-cMydpujCcK2k9I3LErt6GkGJR/edit#slide=id.p1)


