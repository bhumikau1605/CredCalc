# CredCalc 🎓

A full-stack web application designed to help students manage their academic journey — from calculating CGPA and uploading certificates to building resumes and tracking job applications.

🔗 **Live Demo:** [cred-calc.vercel.app](https://cred-calc.vercel.app)

---

## Features

- **CGPA Calculator** — Compute your cumulative GPA based on your courses and grades
- **Certificate Management** — Upload, categorize, and view skill, co-curricular, and study certificates
- **Resume Builder** — Generate a downloadable resume directly from your profile data
- **Applications Tracker** — Keep track of job/internship applications and their statuses
- **Portfolio** — Showcase your academic and extracurricular achievements
- **Placement Resources** — Access curated resources to help with placement preparation
- **User Authentication** — Secure sign-up and login powered by Firebase
- **Profile Management** — Edit and maintain your personal profile with photo upload via Cloudinary

---

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router DOM v6
- Lucide React (icons)
- html2pdf.js (PDF generation)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Multer (file uploads)
- Cloudinary (image/file storage)

**Auth & Config**
- Firebase Authentication
- dotenv for environment variables

---

## Project Structure

```
CredCalc/
├── components/         # Reusable UI components
├── config/             # App configuration (Firebase, DB, etc.)
├── models/             # Mongoose data models
├── pages/              # Page-level React components
├── public/             # Static assets
├── routes/             # Express API routes
├── styles/             # Global and component-level styles
├── App.jsx             # Root component with routing
├── main.jsx            # React entry point
├── server.js           # Express server entry point
├── firebase.js         # Firebase initialization
└── vite.config.js      # Vite build configuration
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB instance (local or Atlas)
- Firebase project
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bhumikau1605/CredCalc.git
   cd CredCalc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root with the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   Update `firebase.js` with your Firebase project credentials.

4. **Run the development server (frontend)**
   ```bash
   npm run dev
   ```

5. **Run the backend server**
   ```bash
   npm run server
   ```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite frontend dev server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run server` | Start the Express backend server |

---

## Deployment

The frontend is deployed on **Vercel**. To deploy your own instance:

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Set the required environment variables in the Vercel dashboard
4. Deploy!

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License

This project is licensed under the [ISC License](LICENSE).
