const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const serviceAccountPath = path.join(__dirname, "firebaseKey.json");

// Check if the service account key exists
if (!fs.existsSync(serviceAccountPath)) {
  console.error("\n❌ ERROR: Firebase service account key not found!");
  console.error(`Expected file at: ${serviceAccountPath}`);
  console.error("\n📝 Setup Instructions:");
  console.error("1. Go to Firebase Console → Project Settings → Service Accounts");
  console.error("2. Click 'Generate New Private Key'");
  console.error("3. Save the JSON file as: backend/config/firebaseKey.json");
  console.error("\nAlternatively, copy firebaseKey.example.json and fill in your credentials.\n");
  process.exit(1);
}

const serviceAccount = require("./firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;