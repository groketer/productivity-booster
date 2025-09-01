# 🚀 Productivity Booster

A modern, lightweight productivity application that combines task management with the Pomodoro technique. Built with React, TypeScript, and Tailwind CSS for a clean, responsive experience.

![Productivity Booster Preview](https://productivity-booster-mu.vercel.app/)

## ✨ Features

### 📋 Task Management
- **Daily Planner Dashboard** - Add, edit, and delete tasks with ease
- **Smart Progress Tracking** - Visual progress bars and completion percentages
- **Quick Add** - Instantly add tasks with a simple input field
- **Due Date Management** - Set and track task deadlines

### ⏰ Focus Timer (Pomodoro)
- **25-minute Focus Sessions** - Default Pomodoro timer with customizable durations
- **Smart Break Management** - 5-minute short breaks, 15-minute long breaks
- **Cycle Tracking** - Automatic progression through focus/break cycles
- **Visual Timer** - Beautiful circular progress indicator
- **Session Statistics** - Track daily focus minutes and completed sessions

### 🎯 Priority Matrix (Eisenhower Matrix)
- **Four Quadrants**:
  - 🔥 **Urgent & Important** - Do first (Crisis tasks)
  - 📈 **Not Urgent & Important** - Schedule (Growth tasks)  
  - ⚡ **Urgent & Not Important** - Delegate (Interruption tasks)
  - 🗑️ **Not Urgent & Not Important** - Eliminate (Time wasters)
- **Drag & Drop** - Easy task categorization
- **Visual Organization** - Color-coded quadrants for quick identification

### 📊 Statistics & Progress
- **Streak Tracking** - Daily productivity streaks with fire emoji motivation
- **Weekly Progress Charts** - Visual completion rate over 7 days
- **Focus Time Analytics** - Total focus hours and session counts
- **Achievement System** - Celebrate productivity milestones
- **Productivity Insights** - Personalized tips and recommendations

### 🎨 Modern Design
- **Clean, Minimal Interface** - White/light-gray with blue accents
- **Dark Mode Support** - Toggle between light and dark themes
- **Responsive Design** - Perfect on desktop and mobile devices
- **Smooth Animations** - Framer Motion transitions between sections
- **Accessible UI** - Built with Radix UI primitives for accessibility

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Icons**: Lucide React for consistent iconography
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Data Storage**: Browser localStorage for offline-first experience
- **Deployment**: Vercel for seamless hosting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/productivity-booster.git
   cd productivity-booster
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📱 Usage

### Getting Started
1. **Add Your First Task** - Use the quick add input or detailed task modal
2. **Set Priorities** - Categorize tasks using the Priority Matrix
3. **Start a Focus Session** - Use the Pomodoro timer for deep work
4. **Track Progress** - Monitor your productivity in the Statistics section

### Pro Tips
- 🎯 **Use the Priority Matrix** to focus on what matters most
- ⏰ **Stick to 25-minute focus sessions** for optimal concentration
- 🔥 **Build streaks** by completing at least one task daily
- 📊 **Review your stats** weekly to identify productivity patterns

## 🔧 Configuration

### Customizing Timer Settings
- Focus duration: 1-60 minutes (default: 25)
- Short break: 1-30 minutes (default: 5)
- Long break: 5-60 minutes (default: 15)

### Theme Customization
Toggle between light and dark modes using the theme button in the header.

## 📈 Data Storage

All your data is stored locally in your browser using localStorage:
- ✅ **Privacy-first** - No data sent to external servers
- ✅ **Offline-ready** - Works without internet connection
- ✅ **Persistent** - Data survives browser restarts
- ⚠️ **Backup recommended** - Export important data regularly

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect to Vercel
3. Deploy with zero configuration

### Other Platforms
Works on any static hosting service:
- Netlify
- GitHub Pages  
- Surge.sh
- Firebase Hosting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Lucide](https://lucide.dev/) for beautiful icons
- [Vercel](https://vercel.com/) for seamless deployment

---

**Built with ❤️ for productivity enthusiasts**

Live Demo: [https://productivity-booster-mu.vercel.app/](https://productivity-booster-mu.vercel.app/)