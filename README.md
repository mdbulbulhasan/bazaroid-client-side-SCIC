#  Bazaroid – Daily Price Tracker for Local Markets

Live Site: [https://bazaroid.web.app/](https://bazaroid.web.app/)

##  Project Purpose

Bazaroid is a daily price tracking web application for local markets in Bangladesh. It enables users to view, track, and compare current prices of essential items across various markets. Vendors can submit daily price updates, and admins manage approvals to maintain data reliability.

---

##  Key Features

**JWT Authentication & Role-Based Authorization**  
• User registration, login, Google social login  
• Role-based dashboards for Admin, Vendor, and User

**Home Page**  
• Dynamic banner with Framer Motion animation  
• Product preview cards with market info and recent prices  
• Advertisement carousel for vendor promotions

**All Products Page**  
• List of all products with filter (date range) and sorting (price high-low, low-high)  
• Search functionality in admin dashboard (backend implemented)

**Details Page** (Private)  
• Full item breakdown with vendor info and user reviews  
• Watchlist system (excludes Admin and Vendor)  
• Comparison charts with Recharts to show price trends

**Dashboards**  
• **User:** View price trends, manage watchlist, order list  
• **Vendor:** Add/update products, manage advertisements  
• **Admin:** Manage users (with search), products (approve/reject with feedback), advertisements, orders

**Other Functionalities**  
• Pagination implemented on required pages  
• Axios with React Query for secure data fetching  
• React Toastify for success/error notifications  
• Lottie animations for error and loading pages  
• Fully responsive design for mobile, tablet, and desktop

---

## ⚡ Tech Stack

- **Frontend Framework:** React with Vite
- **State & Data Management:** React Hook Form, React Query, Context API
- **Routing:** React Router v7
- **Animations:** Framer Motion, Lottie React
- **UI & Styling:** Tailwind CSS, DaisyUI, React Icons
- **Charts:** Recharts
- **Backend (linked separately):** Node.js, Express, MongoDB, JWT

---

## NPM Packages Used

- `react`, `react-dom`, `react-router`
- `react-hook-form`
- `@tanstack/react-query`
- `axios`
- `firebase`
- `framer-motion`
- `react-icons`
- `react-toastify`
- `recharts`
- `react-datepicker`
- `react-fast-marquee`
- `react-responsive-carousel`
- `sweetalert2`
- `lottie-react`
- `@tailwindcss/vite`, `tailwindcss`, `daisyui`

---

## Environment Variables

All Firebase configuration and MongoDB credentials are secured in environment variables for production security.

---

## Project Highlights

✅ Clean and intuitive UI with professional color palette  
✅ Meaningful commits for each implementation step  
✅ Environment variables implemented for config security  
✅ No payment system implemented as per assignment scope  
✅ Designed to impress recruiters with production-level structure, UI/UX alignment, and code quality

---

## Author

**Md Bulbul Hasan**  
Front-End Developer | MERN Stack Enthusiast  

---
