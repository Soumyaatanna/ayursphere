# AyurSphere - Ayurvedic Blogging Platform

## 🌿 About AyurSphere
AyurSphere is a community-driven blogging platform where users can share Ayurvedic remedies, health tips, and wellness ideas. All user submissions go through an admin approval process before being published, ensuring credibility and quality.

## 🚀 Features
- **User-Generated Posts** – Users can submit Ayurvedic remedies and health tips.
- **Admin Approval System** – Posts must be reviewed and approved before publication.
- **User Registration & Profiles** – Users can create accounts, submit posts, and engage in discussions.
- **Categories & Tags** – Posts categorized by ailments (Cold & Cough, Digestion, Skin Care, etc.).
- **Comment & Discussion Section** – Users can interact and discuss remedies.
- **Search & Filter** – Easily find posts based on categories, keywords, or popularity.
- **Admin Panel** – Separate dashboard for managing posts and user submissions.

## 🛠️ Tech Stack
- **Frontend:**  TypeScript, Tailwind CSS
- **Backend:** Node.js, TypeScript
- **Authentication:** Firebase / JWT-based authentication
- **Hosting:** Vercel / Netlify (Frontend), Heroku / Render (Backend)

## 📂 Project Structure
/ayursphere ├── client/ # Frontend (React + TypeScript) │ ├── src/ │ ├── public/ │ └── package.json ├── server/ # Backend (Node.js + Express + TypeScript) │ ├── models/ │ ├── routes/ │ ├── controllers/ │ ├── config/ │ ├── index.ts │ └── package.json └── README.md

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB database setup
- Git installed

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Soumyaatanna/ayursphere.git
   cd ayursphere
 2. **Install dependencies:**
cd client
npm install
cd ../server
npm install
Set up environment variables:

Create a .env file in the server directory.

Add the following:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run development servers: In two terminals or tabs:

sh
Copy
Edit
cd client
npm run dev
sh
Copy
Edit
cd server
npm run dev
🛡️ Admin Panel Access
Admins can log in via /admin and approve or reject submitted posts.

Admin credentials can be configured in the database or environment variables.

📌 Roadmap
🌱 Add image uploads for blog posts

📱 Make the UI responsive for mobile devices

🌍 Add support for multiple languages

🔔 Email notifications for post approvals and comments

🤝 Contributing
Pull requests are welcome! Follow these steps:

Fork the repository.

Create a feature branch (git checkout -b feature-name).

Commit your changes (git commit -m 'Add feature').

Push to the branch (git push origin feature-name).

Open a pull request.

📜 License
This project is licensed under the MIT License.

📬 Contact
For any queries, reach out at soumyatanna103@gmail.com or visit the GitHub Repo.
