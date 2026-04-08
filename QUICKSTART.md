# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd conference-platform
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Open `http://localhost:5173`

### Google Sign-In Setup
If Google Sign-In shows `Error 400: origin_mismatch`, open your OAuth 2.0 Client ID in Google Cloud Console and add the exact frontend origin to `Authorized JavaScript origins`.

For local development with this project, add:

```text
http://localhost:5173
```

If you open the app with a different host, add that exact origin too, for example:

```text
http://127.0.0.1:5173
https://your-deployed-domain.com
```

Important checks:

- Do not add paths. Use origin only, for example `http://localhost:5173` (not `http://localhost:5173/login`).
- Keep frontend client ID and backend client ID the same:
	- `.env` -> `VITE_GOOGLE_CLIENT_ID`
	- `backend/src/main/resources/application.properties` -> `google.client-id`
- This project now uses a fixed Vite dev origin (`http://localhost:5173`). If port `5173` is occupied, stop the process using it instead of switching to another port, or also add that alternate origin in Google Cloud Console.

---

## 🔐 Demo Login Credentials

### Admin Account
- **Email:** admin@conference.com
- **Password:** admin123
- **Access:** Full admin panel with all management features

### User Account
- **Email:** user@example.com
- **Password:** user123
- **Access:** User dashboard with paper submission and registration

---

## 📱 Features to Test

### As Admin:
1. Login with admin credentials
2. View dashboard statistics
3. Manage paper submissions (approve/reject)
4. Assign reviewers to papers
5. Manage conference schedule
6. View attendee registrations

### As User:
1. Login with user credentials
2. Submit a research paper
3. View submission status
4. Register for conference
5. View conference schedule
6. Edit profile

---

## 🎨 UI Highlights

- **Responsive Design:** Works on mobile, tablet, and desktop
- **Modern UI:** Clean card-based layout with soft blue theme
- **Interactive:** Hover effects and smooth transitions
- **Professional:** Academic-focused design

---

## 📂 Project Structure

```
src/
├── components/common/    # Reusable UI components
├── pages/admin/         # Admin pages
├── pages/user/          # User pages
├── context/             # State management
└── data/                # Dummy data
```

---

## 🛠️ Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🌐 Deploy Your App

### Fastest: Vercel
```bash
npm install -g vercel
vercel
```

### Alternative: Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

See `DEPLOYMENT.md` for detailed instructions.

---

## 💡 Tips

- Use Chrome DevTools to test responsive design
- Check browser console for any errors
- All data is stored in `src/data/dummyData.js`
- Modify Tailwind config for custom colors

---

## 🐛 Common Issues

**Port already in use?**
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

**Styles not loading?**
- Ensure Tailwind CSS is installed
- Check `tailwind.config.js` exists

**Can't login?**
- Use exact credentials from above
- Check browser console for errors

---

## 📚 Next Steps

1. Customize colors in `tailwind.config.js`
2. Add more dummy data in `src/data/dummyData.js`
3. Modify components to fit your needs
4. Deploy to production
5. Add backend integration (optional)

---

## 🎯 Production Ready

This application is production-ready with:
- ✅ Clean code structure
- ✅ Reusable components
- ✅ Responsive design
- ✅ Protected routes
- ✅ State management
- ✅ Modern UI/UX

Ready to deploy and use!
