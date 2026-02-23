# 🔍 JobFinder

A modern **Single Page Application** for searching, tracking, and managing job applications — built with **Angular 21**, **NgRx SignalStore**, **Tailwind CSS v4**, and **DaisyUI 5**.

Job listings are fetched in real-time from [**The Muse API**](https://www.themuse.com/developers/api/v2), while user data, favorites, and application tracking are persisted via **JSON Server**.

---

## ✨ Features

### 🏠 Home Page
- **Hero Section** — eye-catching banner with call-to-action
- **Job Listings** — paginated grid of job cards with company, location, level badges, and publication date
- **Real-time Search** — debounced search by category and location with reactive filters
- **Save to Favorites** — bookmark jobs for later review
- **Follow Applications** — track a job application directly from a job card (authenticated users only)

### 🔐 Authentication
- **Register** — create an account with nom, prénom, email, and password
- **Login** — authenticate with email and password
- **Session Persistence** — user session stored in `localStorage`
- **Route Guard** — `guestGuard` prevents authenticated users from accessing login page

### ❤️ Favorites
- **View Saved Jobs** — list of all bookmarked jobs
- **Remove Favorites** — delete bookmarks with one click

### 📋 Application Tracking
- **Tracked Applications Grid** — responsive card layout of all followed applications
- **Status Management** — dropdown to set status: *En attente*, *Accepté*, or *Refusé* (color-coded badges)
- **Personal Notes** — textarea per application with save functionality
- **Delete Tracking** — remove an application from the tracked list

### 👤 Profile Management
- **Edit Profile** — update nom, prénom, email, and password via reactive form with validations
- **Delete Account** — danger zone with confirmation dialog, followed by automatic logout and redirect

### 🎨 UI/UX
- **Dark/Light Theme Toggle** — switch themes via navbar button
- **Responsive Design** — mobile-first layout adapting from 1 to 3 columns
- **Breadcrumb Navigation** — context-aware breadcrumbs on inner pages
- **Loading Skeletons** — skeleton placeholders during data fetching

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Angular 21 (Standalone Components, Signals) |
| **State Management** | NgRx SignalStore (`@ngrx/signals` v21) |
| **Styling** | Tailwind CSS v4  |
| **Icons** | Lucide Angular |
| **Forms** | Angular Reactive Forms |
| **HTTP** | Angular HttpClient |
| **Routing** | Angular Router (Lazy Loading) |
| **Testing** | Vitest |
| **Linting** | ESLint + angular-eslint + typescript-eslint |
| **Backend** | JSON Server (fake REST API) |
| **External API** | [The Muse API](https://www.themuse.com/developers/api/v2) |

---

## 📁 Project Structure

```
src/app/
├── core/                           # Core module (singleton services, models, guards)
│   ├── guards/
│   │   └── guest-guard.ts          # Prevents authenticated users from accessing login
│   ├── model/
│   │   ├── application.model.ts    # Application tracking data model
│   │   ├── favorite.model.ts       # Favorite request/response models
│   │   ├── job.model.ts            # Job, JobCompany, JobLocation, JobResponse
│   │   └── user.model.ts           # User, ILoginRequest, IRegisterRequest
│   └── service/
│       ├── application-service.ts  # CRUD for tracked applications
│       ├── auth-service.ts         # Register, login, updateProfile, deleteAccount
│       ├── favorite-service.ts     # CRUD for favorites
│       ├── job-service.ts          # Fetch jobs from The Muse API
│       └── theme-service.ts        # Theme management
│
├── feature/                        # Feature modules (lazy-loaded)
│   ├── home/
│   │   ├── home-component/         # Main home page shell
│   │   └── components/
│   │       ├── hero-section-component/
│   │       └── job-list-section-component/
│   ├── login/                      # Login page
│   ├── register/                   # Registration page
│   ├── favorite/                   # Favorites page
│   ├── application-tracking/       # Application tracking page
│   └── profile/                    # Profile management page
│
├── shared/                         # Shared module (reusable components & pipes)
│   ├── components/
│   │   ├── navbar-component/       # Responsive navbar with auth-aware links
│   │   ├── job-card-component/     # Job listing card
│   │   ├── search-job-component/   # Search form with category & location inputs
│   │   ├── bread-crumbs-component/ # Dynamic breadcrumb navigation
│   │   ├── rotating-text-component/# Animated rotating text
│   │   └── theme-button-component/ # Dark/light theme toggle
│   └── pipes/
│       └── truncate-pipe.ts        # Truncates long text content
│
├── store/                          # NgRx SignalStore state management
│   ├── auth.store.ts               # User auth state (login, register, profile, delete)
│   ├── job.store.ts                # Job listings state (load, search, paginate)
│   ├── fav.store.ts                # Favorites state (CRUD)
│   └── application.store.ts        # Application tracking state (CRUD)
│
├── app.routes.ts                   # Route configuration (all lazy-loaded)
├── app.config.ts                   # App configuration (providers)
├── app.ts                          # Root component
└── app.html                        # Root template
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 10

### Installation

```bash
# Clone the repository
git clone https://github.com/ChehAchraf/JobFinder-Angular.git
cd JobFinder-Angular

# Install dependencies
npm install
```

### Running the Application

You need to run **two servers** simultaneously:

#### 1. Start JSON Server (fake backend)

```bash
npx json-server db.json
```

This starts the REST API at `http://localhost:3000` with the following endpoints:
- `GET/POST /users` — user management
- `GET/POST/DELETE /fav` — favorites
- `GET/POST/PATCH/DELETE /applications` — application tracking

#### 2. Start Angular Dev Server

```bash
ng serve
```

Open your browser at `http://localhost:4200`.

---

## 🗂️ API Endpoints

### The Muse API (External)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/public/jobs?page=&category=&location=` | Fetch paginated job listings |

### JSON Server (Local)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users` | Register a new user |
| `GET` | `/users?email=&password=` | Login (find user by credentials) |
| `PATCH` | `/users/:id` | Update user profile |
| `DELETE` | `/users/:id` | Delete user account |
| `GET` | `/fav` | Get all favorites |
| `POST` | `/fav` | Add a favorite |
| `DELETE` | `/fav/:id` | Remove a favorite |
| `GET` | `/applications?userId=` | Get user's tracked applications |
| `POST` | `/applications` | Track a new application |
| `PATCH` | `/applications/:id` | Update application (status/notes) |
| `DELETE` | `/applications/:id` | Remove tracked application |

---

## 📊 Data Models

### User
```typescript
interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  password?: string;
}
```

### Application
```typescript
type ApplicationStatus = 'en_attente' | 'accepte' | 'refuse';

interface Application {
  id?: string;
  userId: string;
  offerId: string;
  apiSource: string;
  title: string;
  company: string;
  location: string;
  url: string;
  status: ApplicationStatus;
  notes: string;
  dateAdded: string;
}
```

---

## 🧪 Testing

```bash
# Run unit tests with Vitest
ng test
```

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `ng serve` | Start Angular dev server |
| `build` | `ng build` | Build production bundle |
| `test` | `ng test` | Run unit tests with Vitest |
| `lint` | `ng lint` | Lint the project |

---

## 👤 Author

**Ashraf Chehbouni**

---

## 📄 License

This project is open source and available for educational purposes.
