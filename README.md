# Kingshot Daily Optimizer

A client-side web application to help Kingshot players optimize their daily in-game tasks and track special events.

## Features

- **Daily Task Tracking**: Track recurring daily tasks like "10 Terror Hunts" and "5 Arena Battles"
- **Event System**: Select from various in-game events that add or modify tasks
- **Preparation Tasks**: Special tasks for optimizing the day before events (e.g., "Save intel missions for server reset")
- **UTC Reset**: Tasks automatically reset at 00:00 UTC daily
- **Progress Tracking**: Visual progress bar and completion statistics
- **Local Storage**: All data persists locally in your browser
- **PWA Support**: Can be installed as a Progressive Web App
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 22+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd kingshot-todo
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:4321`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to GitHub Pages or any static hosting service.

## Usage

1. **Daily Tasks**: Check off tasks as you complete them throughout the day
2. **Event Selection**: Use the dropdown to select an active event for additional tasks
3. **Preparation**: Look for preparation tasks when planning for the next day
4. **Progress**: Monitor your completion percentage with the progress bar

## Customization

### Adding New Tasks

Edit `src/data/` files to add new daily tasks or events:

```json
{
  "dailyTasks": [
    {
      "id": "new-task",
      "name": "New Task Name",
      "description": "Task description",
      "category": "category-name",
      "priority": "high|medium|low"
    }
  ],
  "events": [
    {
      "id": "new-event",
      "name": "Event Name",
      "description": "Event description",
      "duration": 1|2|3|4...,
      "tasks": [...]
    }
  ]
}
```

### Categories

Tasks are organized by categories:

- `combat`: Combat-related tasks
- `quests`: Quest completion tasks
- `resources`: Resource gathering tasks
- `alliance`: Alliance-related tasks
- `preparation`: Day-before preparation tasks
- `event`: Special event tasks
- `raid`: Raid event tasks

## Technical Details

- **Framework**: Astro with React components
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: localStorage
- **PWA**: Service Worker + Web App Manifest

## Deployment

This app is designed to be deployed as a static site. It works perfectly with:

- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## License

MIT License - feel free to use and modify as needed.

# kingshot-todo
