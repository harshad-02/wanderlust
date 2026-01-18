<img width="1919" height="933" alt="Screenshot 2026-01-18 150555" src="https://github.com/user-attachments/assets/1089dade-f01c-42bc-9012-2a72837058fb" />

<img width="1919" height="929" alt="Screenshot 2026-01-18 150608" src="https://github.com/user-attachments/assets/d994ba6a-5016-4afe-a2b1-8d7277bd40d6" />

<img width="1919" height="929" alt="Screenshot 2026-01-18 150620" src="https://github.com/user-attachments/assets/9c037d8b-c33a-42dc-be07-3c4bbf416e15" />

<img width="1919" height="932" alt="Screenshot 2026-01-18 150641" src="https://github.com/user-attachments/assets/9d016f98-ef5d-479f-9b0f-d887931bfc7f" />

<img width="1919" height="928" alt="Screenshot 2026-01-18 150658" src="https://github.com/user-attachments/assets/1809a789-36c9-4e99-863d-3e155c156f2a" />

<img width="1919" height="932" alt="Screenshot 2026-01-18 150711" src="https://github.com/user-attachments/assets/415517b2-e63a-4e5b-ae24-ed6f90838803" />



# 🌍 WanderLust – Full Stack Airbnb-like Listing Platform

WanderLust is a full-stack web application inspired by Airbnb, where users can create, view, review, and manage property listings with secure authentication and image uploads.

---

## ✨ Features

- 🔐 **User Authentication & Authorization**
  - Signup, Login, Logout using Passport.js
  - Only listing owners can edit/delete their listings
  - Only review authors can delete their reviews

- 🏠 **Listings Management**
  - Create, read, update, and delete property listings
  - Upload images using Cloudinary
  - View listing owner details

- ⭐ **Reviews System**
  - Add ratings and comments to listings
  - Star-based rating UI
  - Display reviewer name and review date

- ☁️ **Image Uploads**
  - Multer + Cloudinary integration
  - Secure image storage in the cloud

- 🧱 **MVC Architecture**
  - Clean separation of routes, controllers, models, and middleware

- 🎨 **UI & UX**
  - EJS templates with Bootstrap
  - Airbnb-style buttons and layout
  - Flash messages for success and errors

---

## 🛠️ Tech Stack

**Frontend**
- EJS
- Bootstrap 5
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Authentication**
- Passport.js
- express-session

**Image Upload**
- Multer
- Cloudinary

**Validation & Utilities**
- Joi
- Method-Override
- Connect-Flash
- dotenv

---

## 📁 Project Structure
```
Major_project/
│
├── controllers/
│ ├── listings.js
│ ├── reviews.js
│ └── users.js
│
├── models/
│ ├── listing.js
│ ├── review.js
│ └── user.js
│
├── routes/
│ ├── listing.js
│ ├── review.js
│ └── user.js
│
├── views/
│ ├── layouts/
│ ├── listings/
│ ├── users/
│ └── error.ejs
│
├── public/
│ ├── css/
│ └── js/
│
├── cloudinary/
│ └── index.js
│
├── middleware.js
├── app.js
├── .env
└── README.md
```

---
---
## ⚙️ Environment Variables

- **Create a `.env` file in the root directory and add the following:**
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

🚀 Getting Started

**1️⃣ Clone the Repository**
- git clone https://github.com/your-username/wanderlust.git
- cd wanderlust

**2️⃣ Install Dependencies**
- npm install

**3️⃣ Start MongoDB**
- Make sure MongoDB is running locally:
- mongosh

**4️⃣ Run the Application**
- nodemon app.js
- Visit the application at:
👉 http://localhost:8080

**🧪 Key Learning Outcomes**
- Implemented secure authentication & authorization
- Designed RESTful APIs
- Integrated cloud image storage using Cloudinary
- Applied MVC architecture
- Handled form validation & error handling
- Built a real-world production-level project

**📌 Future Improvements**
- 🔍 Search & filter listings
- ❤️ Wishlist / Favorites
- 📍 Map integration (Mapbox)
- 🏠 Booking system
- 🌐 Deployment (Render / Railway)

**👨‍💻 Author**
- **Harshad**
-  **T.E. Information Technology**
- **International Institute of Information Technology, Pune**

  ***⭐ Show Your Support***
***If you like this project, give it a ⭐ on GitHub!***
