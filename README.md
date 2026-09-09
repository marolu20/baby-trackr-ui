# Baby Tracker MVP (v1.0.0)

A lightweight, modern web application designed for parents and caregivers to seamlessly track and manage baby profiles and daily essential events (feedings, sleep cycles, and diaper changes).

---

## 🚀 Key Features

* **Baby Profile Management**: Add, update, and switch between baby tracking profiles.
* **Activity Event Logging**: Easily record specific baby activities with customized metadata:
  * Feeding: Track liquid amounts in ounces.
  * Sleep & Naps: Track duration in minutes.
  * Diaper Changes: Log types (Wet, Dirty, Mixed) converted cleanly to title case.
* **Interactive History Table**: A clean, dashboard view powered by Flowbite-React featuring:
    * Live data syncing using event listeners (`refreshDashboardData`).
    * ⏳ **Chronological Date Sorting** to quickly toggle between newest and oldest events first.
    * Inline **Edit** and **Delete** control loops with confirmation overlays.

---

## 🛠️ Tech Stack

* **Frontend**: React (Hooks, Context, `useCallback`)
* **Styling & UI**: Tailwind CSS & [Flowbite React](https://flowbite-react.com)
* **Utilities**: Custom Date formatting libraries for consistent locale presentation.

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com
   cd YOUR_REPO_NAME
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment / Endpoints**
   Ensure your API configuration path at `src/config/endpoints.js` points to your active backend server instance.

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) (or your local Vite/CRA port) in your browser.

---
