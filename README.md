# 📝 Collaborative Post App

A full-stack collaborative post creation platform where users can create groups ("Todos"), invite others via unique codes, and collaborate in real-time. Built with modern tech stack and modern UX, including Dark Mode.

## ✨ Key Features

### 👤 User Management
- JWT-based user authentication with bcrypt-hashed passwords.
- Upload and update profile (photo, fullname, email, etc.) using Cloudinary.
- Secure password change and logout features.

### 📌 Group Todo (Collaborative Group)
- Admins can create groups with a title, description, and thumbnail (Cloudinary).
- Users join groups using a unique code.
- Admins can update/delete groups and manage members.
- Members can leave groups voluntarily.
- Fetch all joined or created groups with populated data.

### 🗂️ Subtodo (Posts within Group)
- Create, update, and delete posts within a group.
- Posts can have title, description, and deadline.
- Only post creators have permission to update/delete.

### 💬 Comment System
- Add comments to subtodos.
- Fetch all comments or count for a specific post.

### 👍 Like/Dislike System
- Toggle between liking or disliking a post.
- Auto-removes opposite reaction if already given.
- View total like/dislike counts.

### 💡 Frontend UX
- Modern responsive UI built with Tailwind CSS.
- Built-in Dark Mode toggle.

## 🛠️ Tech Stack
- **Frontend**: React.js + Tailwind CSS  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB + Mongoose  
- **Authentication**: JWT + bcrypt  
- **File Storage**: Cloudinary  
- **Deployment**: Vercel / Render
