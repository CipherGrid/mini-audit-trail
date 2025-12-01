# 📘 Mini Audit Trail — Full Stack Project

A simple full-stack **Audit Trail System** that lets users write content, save versions, and automatically track what words were added or removed between snapshots.

This project includes a **Node.js backend** and a **React + TailwindCSS frontend**.

---

## 🚀 Features

### **Backend (Node.js + Express)**

- Save content versions
- Get full version history
- Calculates:
  - `addedWords`
  - `removedWords`
  - `oldLength`
  - `newLength`
- Stores data in a JSON file
- Clean MVC-like structure
- CORS enabled

### **Frontend (React + Vite + TailwindCSS)**

- Simple and clean UI
- Editor to write text and save versions
- Version list with:
  - Timestamp
  - Version ID
  - Added words
  - Removed words
  - Old and new length
- Environment-based backend URL

---

# 🛠️ Tech Stack

### **Backend**

- Node.js
- Express
- File System (JSON storage)
- UUID
- CORS

### **Frontend**

- React (Vite)
- Tailwind CSS
- Lucide Icons

---

# 📦 Installation

## 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```
