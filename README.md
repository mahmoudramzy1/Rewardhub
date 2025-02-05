# Rewardhub

## Overview

Reward hub is a web-based platform with mobile applications that help companies reward their employees effectively and efficiently. This project uses JS (node js, express js), css, react and more to provide an engaging and interactive user experience.

Organizations that use RewardHub make their employees feel special, as they gain access to exclusive offers from various vendors.

Organizations can reward high-performing employees with points or grant points on special occasions, such as weddings or the birth of a child. Employees can then use these points to purchase offers from vendors.

## Features

* Enhanced Security: Implemented JWT-based authentication, role-based authorization, and encryption for Passwords.
* Scalability: Designed to handle big volumes of users, transactions, and offers.
* Seamless Reward Distribution: Organizations can allocate reward points to employees based on performance and milestones.
* User-Friendly UI: Built with React.js and Tailwind CSS, ensuring an intuitive experience across web and mobile applications.

## Tech Stack

* Backend: JS (Node js, express js)
* Frontend: React, React native
* Database: MongoDB

## Installation
### Prerequisites
* Install Node.js and npm
* Install Express.js
* Install React
* install Mongodb

### Steps

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
_______________________________________________________________________________
ACCESS_TOKEN_SECRET=[your first token]
REFRESH_TOKEN_SECRET=[your second token]
GROQ_API_KEY=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
_______________________________________________________________________________

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

#### the Credentials of Super Admin
```bash
username: "mahmoud200"
password: "SecurePass123!"
```

## Contributing
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

## App links

- [Demo Video](https://www.youtube.com/watch?v=WbNO3oei6IM)
- [Presentation](https://docs.google.com/presentation/d/1G9HICe-cMydpujCcK2k9I3LErt6GkGJR/edit#slide=id.p1)


