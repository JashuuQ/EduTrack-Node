import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from 'cors';

import UserRoutes from './Kanbas/Users/routes.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import EnrollmentsRoutes from './Kanbas/Enrollments/routes.js';
import PeopleRoutes from './Kanbas/People/routes.js';

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.NETLIFY_URL || 'http://localhost:3000/',
    credentials: true,
  })
);

// Session Options
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'kanbas',
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
};

if (process.env.NODE_ENV !== 'development') {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));

app.use(express.json()); // Process JSON requests

// Load Routes
Lab5(app);
Hello(app);
AssignmentRoutes(app);
CourseRoutes(app);
EnrollmentsRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
PeopleRoutes(app);

const PORT = process.env.PORT || 4000;

// Debug
console.log('ENV Variables:', process.env);
console.log('Server configured for:', process.env.REMOTE_SERVER);
console.log('Server configured for:', process.env.NODE_SERVER_DOMAIN);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
