# FlexHire Backend Setup

## Prerequisites
- Node.js v14 or higher
- npm or yarn
- Firebase Project

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Firebase Service Account Key:**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project
   - Go to Project Settings ⚙️ → **Service Accounts**
   - Click **Generate New Private Key**
   - Save the downloaded JSON file as `config/firebaseKey.json`
   
   Or simply rename `config/firebaseKey.example.json` to `config/firebaseKey.json` and fill in your credentials.

3. **Configure Environment Variables:**
   - Update `.env` file with your desired PORT (default: 5000)

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

The server will start at `http://localhost:5000`

## API Endpoints

### Authentication
- **POST** `/api/auth/signup` - Create new user
- **POST** `/api/auth/login` - Verify ID token and login user

## File Structure
```
backend/
├── config/
│   ├── firebase.js          # Firebase admin initialization
│   ├── firebaseKey.json     # Service account credentials (⚠️ never commit)
│   └── firebaseKey.example.json
├── controllers/
│   └── authController.js    # Authentication logic
├── routes/
│   └── authRoutes.js        # Route definitions
├── server.js                # Express server
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
└── package.json            # Dependencies
```

## Troubleshooting

### "Cannot find module './firebaseKey.json'"
- Download service account key from Firebase Console
- Place it at `backend/config/firebaseKey.json`

### Port already in use
- Change PORT in `.env` file
- Or kill the process: `lsof -i :5000` (macOS/Linux) or `netstat -ano | findstr :5000` (Windows)
