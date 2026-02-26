# Academic Conference Management Platform

A modern, production-ready web application for managing academic conferences built with React.js, Vite, and Tailwind CSS.

## Features

### Admin Features
- Dashboard with statistics (submissions, accepted papers, participants)
- Manage paper submissions (view, approve, reject)
- Assign peer reviewers to papers
- Review tracking system
- Create and manage conference schedule
- Manage attendee registrations

### User Features
- User registration & login
- Submit research papers (PDF upload with metadata)
- View submission status
- Register for conference
- View conference schedule
- Profile management

## Tech Stack

- **React.js** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Context API** - State management

## Project Structure

```
conference-platform/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Table.jsx
│   │   │   └── Modal.jsx
│   │   ├── admin/           # Admin-specific components
│   │   └── user/            # User-specific components
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── admin/           # Admin pages
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminSubmissions.jsx
│   │   │   ├── AdminReviewers.jsx
│   │   │   ├── AdminSchedule.jsx
│   │   │   └── AdminRegistrations.jsx
│   │   └── user/            # User pages
│   │       ├── UserDashboard.jsx
│   │       ├── SubmitPaper.jsx
│   │       ├── UserSubmissions.jsx
│   │       ├── UserRegister.jsx
│   │       ├── UserSchedule.jsx
│   │       └── UserProfile.jsx
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication state
│   ├── data/
│   │   └── dummyData.js     # Mock data
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. **Navigate to project directory:**
```bash
cd conference-platform
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open browser:**
Navigate to `http://localhost:5173`

### Demo Credentials

**Admin Account:**
- Email: `admin@conference.com`
- Password: `admin123`

**User Account:**
- Email: `user@example.com`
- Password: `user123`

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## Deployment

### Deploy to GitHub

1. **Initialize Git repository:**
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Create GitHub repository** (via GitHub website)

3. **Push to GitHub:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/conference-platform.git
git branch -M main
git push -u origin main
```

### Deploy to Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Follow prompts** and your app will be live!

**OR use Vercel Dashboard:**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Vercel auto-detects Vite and deploys

### Deploy to Netlify

**Method 1: Netlify CLI**

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build the project:**
```bash
npm run build
```

3. **Deploy:**
```bash
netlify deploy --prod
```

4. **Specify publish directory:** `dist`

**Method 2: Netlify Dashboard**

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

## Features Overview

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface

### UI/UX
- Professional academic theme
- Soft blue/white color palette
- Clean card-based layout
- Interactive hover effects
- Smooth transitions

### State Management
- React Context API for authentication
- useState/useEffect for local state
- Dummy JSON data (no backend required)

## Available Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page

### Admin Routes (Protected)
- `/admin/dashboard` - Admin dashboard
- `/admin/submissions` - Manage submissions
- `/admin/reviewers` - Assign reviewers
- `/admin/schedule` - Manage schedule
- `/admin/registrations` - View registrations

### User Routes (Protected)
- `/user/dashboard` - User dashboard
- `/user/submit` - Submit paper
- `/user/submissions` - View submissions
- `/user/register` - Register for conference
- `/user/schedule` - View schedule
- `/user/profile` - Edit profile

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Data
Edit `src/data/dummyData.js` to modify mock data.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use for your projects!

## Support

For issues or questions, please create an issue in the GitHub repository.
