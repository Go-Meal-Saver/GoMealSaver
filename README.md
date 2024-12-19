# GoMealSaver

GoMealSaver is a web-based application for selling leftover / unsold food.

Demo : https://gomealsaver.store

## ⚙️ Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Cloudinary](https://cloudinary.com/)
- [Mapbox](https://www.mapbox.com/)
- [OpenCage](https://opencagedata.com/)
- [Maptiler](https://www.maptiler.com/)
- [React Spinners](https://www.npmjs.com/package/react-spinners)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [React Share](https://www.npmjs.com/package/react-share)
- [reCAPTCHA](https://www.google.com/recaptcha/about/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [framer-motion](https://motion.dev/)
- [typed.js](https://mattboldt.com/demos/typed-js/)

## 🔋 Features

- [x] Autentikasi pengguna dengan Google & Next Auth
- [x] Registrasi Akun 
- [x] ke amanan recaptcha 
- [x] Otorisasi pengguna
- [x] Perlindungan rute
- [x] Profil pengguna dengan daftar pengguna
- [x] Daftar makanan CRUD
- [x] Unggahan gambar makanan 
- [x] Pencarian makanan
- [x] Pesan internal dengan notifikasi 'belum dibaca'
- [x] Order Makanan (User)
- [x] Bukti Trankaksi (Pemilik / penjual)
- [x] Prosess  / Batalkan pesanan (pemilik / penjual)
- [x] Halaman About
- [x] Galeri gambar dengan penghapusan foto
- [x] Peta kotak peta
- [x] Penandaan makanan / makanan yang disimpan
- [x] Berbagi makanan ke media sosial
- [x] Desain responsif (Tailwind)
- [x] Halaman 404 khusus
- [x] Next.js Action
## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

- Git
- Node.js
- npm (Node Package Manager)

```bash
https://github.com/Go-Meal-Saver/GoMealSaver.git cd GoMealSaver
```

Installation

Install the project dependencies using npm:

```bash
npm run dev
```

Set Up Environment Variables
Create a new file named .env.local in the root of your project and add the following content:

```bash
MONGODB_URL =
NEXT_PUBLIC_DOMAIN =
NEXT_PUBLIC_API_DOMAIN =
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_URL_INTERNAL=
NEXTAUTH_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_OPENCAGE_API_KEY=
NEXT_PUBLIC_MAPTILER_API_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

### `.env` File

Rename the `env.example` file to `.env` and fill in the following environment variables:

- Get your MongoDB connection string from your MongoDB Atlas cluster and add it to `MONGODB_URI`.
- Get your Google client ID and secret from your Google console account and add them to `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
- Add a secret to `NEXTAUTH_SECRET`. You can generate with the following command:
  ```bash
  openssl rand -base64 32
  ```
- Get your Cloudinary cloud name, API key, and API secret from your Cloudinary account and add them to `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
- Get your OPENCAGE token from your OPENCAGE account and add it to `NEXT_PUBLIC_OPENCAGE_API_KEY`.
- Get your Google MAPTILER API key from your MAPTILER and add it to `NEXT_PUBLIC_MAPTILER_API_KEY`.
- Get your Google RECAPTCHA API key from your RECAPTCHA and add it to `RECAPTCHA_SECRET_KEY`.

Running the Project

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the project.


