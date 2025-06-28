# 🎤 AI Voice Assistant

> **Experience the future of AI interaction with natural voice conversations**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.39.0-3ECF8E.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 **Features**

### 🎯 **Core Functionality**
- 🗣️ **Voice Recognition** - Advanced speech-to-text with natural language processing
- 🧠 **AI Intelligence** - Powered by Qwen's advanced language model
- 🔊 **Premium Voice Synthesis** - High-quality text-to-speech with ElevenLabs integration
- 💬 **Natural Conversations** - Context-aware dialogue with memory retention
- ⚡ **Real-time Processing** - Lightning-fast response times
- 📱 **Multi-modal Input** - Support for both voice and text interactions

### 🎨 **User Experience**
- 🍎 **iPhone-style Interface** - Sleek, modern design with smooth animations
- 🌊 **Siri-like Waveforms** - Beautiful visual feedback during interactions
- 📊 **Conversation History** - Slide-down panel to view chat history
- 🔐 **Secure Authentication** - User accounts with Supabase integration
- 📱 **Responsive Design** - Optimized for all device sizes

### 🛡️ **Security & Performance**
- 🔒 **Secure Authentication** - Email/password with Supabase Auth
- 🚀 **Optimized Performance** - Fast loading and smooth interactions
- 🌐 **Cross-browser Support** - Works on all modern browsers
- 📡 **Real-time Updates** - Live authentication state management

---

## 🚀 **Quick Start**

### 📋 **Prerequisites**

Before you begin, ensure you have the following installed:

- 📦 **Node.js** (v18.0.0 or higher)
- 📦 **npm** or **yarn** package manager
- 🌐 **Modern web browser** with microphone support
- 🔑 **Supabase account** (for authentication)
- 🎵 **ElevenLabs API key** (optional, for premium voice)

### 🛠️ **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-voice-assistant.git
   cd ai-voice-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Add your environment variables:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:8080` 🎉

---

## ⚙️ **Configuration**

### 🗄️ **Supabase Setup**

1. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy your project URL and anon key

2. **Configure Authentication**
   - Enable Email authentication in Supabase dashboard
   - Disable email confirmation (optional)
   - Set up your authentication policies

3. **Update Environment Variables**
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 🎵 **ElevenLabs Integration (Optional)**

For premium voice synthesis:

1. **Get ElevenLabs API Key**
   - Sign up at [elevenlabs.io](https://elevenlabs.io)
   - Generate an API key from your dashboard

2. **Configure in App**
   - Click the settings icon in the voice assistant
   - Enter your ElevenLabs API key
   - Enjoy high-quality voice responses!

---

## 🏗️ **Project Structure**

```
ai-voice-assistant/
├── 📁 public/                 # Static assets
├── 📁 src/
│   ├── 📁 components/         # React components
│   │   ├── 📁 auth/          # Authentication components
│   │   │   ├── 📄 SignInPage.tsx
│   │   │   └── 📄 SignUpPage.tsx
│   │   ├── 📁 ui/            # UI components (shadcn/ui)
│   │   ├── 📄 ChatMessage.tsx
│   │   ├── 📄 LandingPage.tsx
│   │   ├── 📄 SiriWaveform.tsx
│   │   └── 📄 VoiceAssistant.tsx
│   ├── 📁 hooks/             # Custom React hooks
│   │   ├── 📄 useAuth.ts
│   │   ├── 📄 use-mobile.tsx
│   │   └── 📄 use-toast.ts
│   ├── 📁 lib/               # Utility libraries
│   │   ├── 📄 supabase.ts
│   │   └── 📄 utils.ts
│   ├── 📁 pages/             # Page components
│   │   ├── 📄 Index.tsx
│   │   └── 📄 NotFound.tsx
│   ├── 📁 types/             # TypeScript definitions
│   │   └── 📄 speech.d.ts
│   ├── 📄 App.tsx            # Main app component
│   ├── 📄 main.tsx           # App entry point
│   └── 📄 index.css          # Global styles
├── 📄 package.json           # Dependencies and scripts
├── 📄 tailwind.config.ts     # Tailwind CSS configuration
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 vite.config.ts         # Vite configuration
└── 📄 README.md              # This file
```

---

## 🎯 **Usage**

### 🎤 **Voice Interaction**

1. **Start Conversation**
   - Click the microphone button
   - Speak naturally when prompted
   - Wait for AI response

2. **Text Input**
   - Type your message in the input field
   - Press Enter or click send
   - Receive voice and text responses

### 👤 **User Management**

1. **Sign Up**
   - Create account with email/password
   - Verify email (if enabled)
   - Start using the assistant

2. **Sign In**
   - Use existing credentials
   - Access conversation history
   - Personalized experience

### ⚙️ **Settings**

- 🔊 **Toggle TTS** - Enable/disable voice responses
- 🎵 **ElevenLabs** - Configure premium voice
- 📜 **History** - View conversation history
- 🚪 **Logout** - Sign out of account

---

## 🛠️ **Development**

### 📦 **Available Scripts**

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type Checking
npm run type-check   # Check TypeScript types
```

### 🎨 **Styling**

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components
- **Custom animations** - iPhone-style transitions
- **Responsive design** - Mobile-first approach

### 🔧 **Tech Stack**

| Technology | Purpose | Version |
|------------|---------|---------|
| ⚛️ **React** | Frontend framework | 18.3.1 |
| 📘 **TypeScript** | Type safety | 5.5.3 |
| ⚡ **Vite** | Build tool | 5.4.1 |
| 🎨 **Tailwind CSS** | Styling | 3.4.11 |
| 🗄️ **Supabase** | Backend & Auth | 2.39.0 |
| 🎵 **ElevenLabs** | Voice synthesis | API |
| 🧠 **Qwen AI** | Language model | API |
| 🎤 **Web Speech API** | Voice recognition | Native |

---

## 🌐 **Browser Support**

| Browser | Voice Recognition | Voice Synthesis | Status |
|---------|------------------|-----------------|--------|
| 🌐 **Chrome** | ✅ | ✅ | Fully supported |
| 🦊 **Firefox** | ✅ | ✅ | Fully supported |
| 🧭 **Safari** | ✅ | ✅ | Fully supported |
| 📘 **Edge** | ✅ | ✅ | Fully supported |

---

## 🚀 **Deployment**

### 📡 **Netlify (Recommended)**

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables

### 🐳 **Docker**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

### ☁️ **Vercel**

```bash
npm install -g vercel
vercel --prod
```

---

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

1. **Fork the repository** 🍴
2. **Create a feature branch** 🌿
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes** 💾
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch** 🚀
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request** 📬

### 📝 **Development Guidelines**

- ✅ Follow TypeScript best practices
- ✅ Use meaningful commit messages
- ✅ Add tests for new features
- ✅ Update documentation
- ✅ Ensure responsive design

---

## 🐛 **Troubleshooting**

### 🎤 **Microphone Issues**

**Problem**: Microphone not working
- ✅ Check browser permissions
- ✅ Ensure HTTPS connection
- ✅ Test microphone in other apps

**Problem**: Poor voice recognition
- ✅ Speak clearly and slowly
- ✅ Reduce background noise
- ✅ Check microphone quality

### 🔐 **Authentication Issues**

**Problem**: Can't sign in/up
- ✅ Check Supabase configuration
- ✅ Verify environment variables
- ✅ Check network connection

**Problem**: Email verification
- ✅ Check spam folder
- ✅ Verify email settings in Supabase
- ✅ Resend verification email

### 🎵 **Voice Synthesis Issues**

**Problem**: No voice output
- ✅ Check TTS toggle setting
- ✅ Verify browser audio permissions
- ✅ Test system audio

**Problem**: Poor voice quality
- ✅ Configure ElevenLabs API key
- ✅ Check internet connection
- ✅ Try different voice settings

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- 🧠 **Qwen AI** - For the powerful language model
- 🎵 **ElevenLabs** - For premium voice synthesis
- 🗄️ **Supabase** - For backend and authentication
- 🎨 **shadcn/ui** - For beautiful UI components
- 🌐 **Web Speech API** - For voice recognition

---

## 📞 **Support**

Need help? We're here for you!

- 📧 **Email**: support@aivoiceassistant.com
- 💬 **Discord**: [Join our community](https://discord.gg/aivoiceassistant)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/ai-voice-assistant/issues)
- 📖 **Documentation**: [Full docs](https://docs.aivoiceassistant.com)

---

## 🌟 **Star History**

If you find this project helpful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Made with ❤️ by the AI Voice Assistant Team**

[🌐 Website](https://aivoiceassistant.com) • [📱 Demo](https://demo.aivoiceassistant.com) • [📖 Docs](https://docs.aivoiceassistant.com)

</div>