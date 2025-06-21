# FashionCheck - Social Media App

A modern React-based social media application where users can share fashion moments by posting pictures and adding comments without requiring login.

## ✨ Features

- 📸 **Image Upload & Sharing** - Upload and post fashion photos with captions
- 💬 **Comment System** - Add comments to any post anonymously
- 🔥 **Real-time Updates** - Live data synchronization with Firebase
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations
- ☁️ **Cloud Storage** - Images stored securely in Firebase Storage
- 🗄️ **Database** - Posts and comments stored in Firestore

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS3 with modern design principles
- **Backend**: Firebase (Firestore + Storage)
- **State Management**: React Hooks
- **Build Tool**: Vite for fast development

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd FashionCheck
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing one
   - Enable **Firestore Database** and **Storage**

4. **Configure Firebase**

   ```bash
   # Copy the example configuration
   cp src/firebase.example.js src/firebase.js
   ```

   Then edit `src/firebase.js` with your Firebase credentials:

   ```javascript
   const firebaseConfig = {
     apiKey: "your-actual-api-key",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id",
   };
   ```

5. **Run the application**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
FashionCheck/
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Main application styles
│   ├── firebase.js          # Firebase configuration (not in git)
│   ├── firebase.example.js  # Firebase config template
│   ├── firebaseService.js   # Firebase service functions
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🔧 Firebase Setup

### 1. Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name and follow setup wizard

### 2. Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create Database"
3. Choose "Start in test mode" for development
4. Select a location for your database

### 3. Enable Storage

1. In Firebase Console, go to "Storage"
2. Click "Get Started"
3. Choose "Start in test mode" for development
4. Select a location for your storage

### 4. Get Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → "Web"
4. Copy the configuration object

## 🔒 Security

### What's Protected

- ✅ Firebase credentials are excluded from git
- ✅ Only template files are pushed to repository
- ✅ Each developer needs their own Firebase config

### Production Considerations

- Set up proper Firebase security rules
- Implement user authentication
- Use environment variables for sensitive data
- Enable Firebase App Check

## 🎯 Usage

### Creating Posts

1. Click "Choose File" to select an image
2. Add a caption describing your fashion moment
3. Click "Post" to share with the community

### Adding Comments

1. Scroll to any post in the feed
2. Type your comment in the input field
3. Press Enter or click the comment button

### Features in Detail

- **Image Preview**: See your image before posting
- **Real-time Updates**: Comments appear instantly
- **Responsive Design**: Works on all screen sizes
- **Anonymous Interaction**: No login required

## 🐛 Troubleshooting

### Common Issues

**Firebase Connection Error**

- Verify your Firebase config in `src/firebase.js`
- Check if Firestore and Storage are enabled
- Ensure security rules allow read/write access

**Image Upload Fails**

- Check Firebase Storage rules
- Verify image file size (should be under 5MB)
- Ensure proper file format (jpg, png, gif)

**Comments Not Saving**

- Check Firestore rules
- Verify network connection
- Check browser console for errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and Firebase
- Styled with modern CSS
- Icons from various icon libraries
- Community feedback and contributions

---

**Happy Fashion Sharing!** 👗✨
