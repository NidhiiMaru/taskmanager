# TaskMate

TaskMate is a simple, beautiful mobile app for managing your daily tasks. Built with React Native and Expo, it helps you stay organized and never miss a deadline.

## Features

- **Add New Tasks:** Quickly create tasks with a title, description, due date, and status.
- **Edit Tasks:** Update task details, change status, or adjust due dates anytime.
- **Delete Tasks (with Permission):** Remove tasks you no longer need—TaskMate always asks for confirmation before deleting, so you never delete by accident.
- **Search & Filter:** Instantly search tasks by title or description, and filter by status (All, Pending, In Progress, Completed).
- **Due Date Picker:** Pick a due date for each task using a friendly date picker.
- **Status Tracking:** Mark tasks as Pending, In Progress, or Completed for easy tracking.
- **Local Notifications:** Get reminders for tasks with upcoming due dates (requires notification permissions).
- **Theme Toggle:** Switch between Light and Dark mode for comfortable viewing.
- **Persistent Storage:** All your tasks are saved locally on your device, so you never lose them.
- **Responsive UI:** Clean, modern design that works great on both Android and iOS.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the app:**
   ```sh
   npm start
   ```
   Then follow the Expo instructions to open on your device or emulator.

## Folder Structure

- `App.js` – Main app entry point
- `src/screens/` – Screens for Home, Add Task, Edit Task
- `src/context/` – Task and Theme providers
- `src/utils/` – Utility functions (notifications)
- `assets/` – App icons and images

## Requirements

- Node.js & npm
- Expo CLI (`npm install -g expo-cli`)
- Android/iOS device or emulator

## License

MIT

---
