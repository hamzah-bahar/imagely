# Imagely

Imagely is a full-stack image uploading and management web application. It features a Laravel-powered REST API backend and a React.js frontend. The app supports two user roles — **Regular Users** and **Admins** — each with tailored access and permissions.

## 🚀 Features

- ✅ User authentication (login, register)
- 🖼️ Image upload, display, and deletion
- 🔒 Role-based access control (regular users vs admins)
- 📂 Admin dashboard for managing user uploads
- 📸 Image storage using Laravel’s Filesystem
- ⚡ Responsive UI using React and TailwindCSS

---

## 🛠️ Tech Stack

### Backend: [Laravel](https://laravel.com/)

- **Laravel Sanctum** – for token-based API authentication
- **Laravel Filesystem** – to handle image storage (local, with option for S3)
- **Laravel Resource API** – for structured and clean JSON responses
- **Eloquent ORM** – for database interaction
- **Form Request Validation** – for secure and clean data handling

### Frontend: [React.js](https://reactjs.org/)

- **Axios** – for API communication
- **React Router** – for navigation
- **Context API** – for global user authentication state
- **TailwindCSS** – for responsive and modern styling

---

## ⚙️ Getting Started

Follow these steps to set up Imagely locally.

### 1. Clone the repository

```bash
git clone https://github.com/hamzah-bahar/imagely.git
cd imagely
```

### 2. Set up the Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

### 3. Set up the Frontend (React)

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will start on http://localhost:3000 and connect to the API running on http://localhost:8000.

## 🧪 Future Enhancements

- 🔁 lazy loading for image feed

- 🗃️ Image categories and tags

- 🧑‍🤝‍🧑 Social features (likes, comments)

- ☁️ Cloud storage integration (AWS S3, Cloudinary)

## 📄 License

MIT

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

## 🙌 Acknowledgments

- Laravel Documentation
- React Documentation
- TailwindCSS Docs
- Preline Docs
