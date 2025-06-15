# Pomodoro Timer

A simple and visually appealing Pomodoro timer web application to help you manage your work and break intervals efficiently.

## Features

- Customizable work, short break, and long break durations (with hours and minutes for work)
- Animated circular progress indicator with smooth transitions and dynamic color (green → yellow → red)
- Start, pause, and reset timer controls
- Responsive and modern UI
- Edit timer durations in a modal popup with a dimmed background
- No dependencies—pure HTML, CSS, and JavaScript

## Usage

- Click **Start ▶️** to begin the timer.
- Click **Pause ⏸️** to pause the timer.
- Click **Reset 🔄** to reset the timer to the initial work session.

## Customize the Timer

- Click **Edit Time** to open the settings popup.
- Set your preferred durations for work (hours and minutes), short break, and long break.
- Click **Set Time** to apply the changes or **Cancel** to close the popup.
- The timer will automatically switch between work and break sessions based on the set durations.
- The timer will change color dynamically based on the remaining time:
  - Green for more than 50% of the time remaining
  - Yellow for between 20% and 50%.
  - Red for less than 20% of the time remaining.

## File Structure

- [`index.html`](index.html): Main HTML file.
- [`style.css`](style.css): Styles for the application.
- [`script.js`](script.js): Timer logic and interactivity.
- [`README.md`](README.md): Project documentation.

## Getting Started

1. **Clone or Download the Repository**

   ```sh
   git clone https://github.com/yourusername/Pomodoro.git
   ```

2. **Open the App**

   Open the `index.html` file in your web browser.

---
