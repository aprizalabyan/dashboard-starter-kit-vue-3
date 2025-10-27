# 🧱 Vue 3 Dashboard Starter Kit

A starter / base project for building modern dashboards using **Vue 3 + TypeScript + Vuetify 3**.  
This project provides a clean and scalable foundation with essential components, layouts, and integrations for rapid dashboard development.

---

## 🚀 Features

- **Vue 3 + TypeScript** – modern, maintainable, and scalable architecture  
- **Vuetify 3** – ready-to-use Material Design UI framework  
- **Common Form Components** – reusable form components (input, select, datepicker, etc.)  
- **Base Dashboard Layout** – prebuilt layout with drawer (sidebar) and app bar  
- **ECharts Integration** – interactive chart components powered by [Apache ECharts](https://echarts.apache.org/)  
- **Mapbox Component** – interactive maps with [Mapbox GL JS](https://www.mapbox.com/)  
- **Pinia** – lightweight and modular state management  
- **Typography System** – consistent global typography styles  
- **Custom SVG Icons** – custom scalable vector icons support  
- **Day.js** – lightweight date formatting and manipulation  

---

## 🧩 Folder Structure

```bash
src/
├── assets/           # Static assets (icons, images, fonts)
│   ├── styles/       # Global styles & typography
├── components/       # Reusable UI components
│   ├── forms/        # Common form components
│   ├── chart/        # ECharts components
│   └── map/          # Mapbox components
├── layouts/          # Base layout (drawer + appbar)
├── plugins/          # Vuetify & Dayjs configuration
├── stores/           # Pinia state stores
├── utils/            # Utilities (e.g. dayjs setup)
├── router/           # Vue Router configuration
├── views/            # Dashboard views / pages
└── main.ts           # Entry point
```

## 🛠️ Installation & Setup

### 🧾 1. Clone the Repository

```bash
git clone https://github.com/aprizalabyan/dashboard-starter-kit-vue-3.git
cd dashboard-starter-kit-vue-3
```

### 📦 2. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### ⚙️ 3. Create Environment File
Before running the project, create a .env file in the root directory and add your Mapbox access token:
```bash
# .env
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
```

### ▶️ 4. Start the Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Visit the app at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧭 Core Technologies

| Technology                                    | Description                            |
| --------------------------------------------- | -------------------------------------- |
| [Vue 3](https://vuejs.org/)                   | The progressive JavaScript framework   |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe and maintainable development |
| [Vuetify 3](https://next.vuetifyjs.com/)      | Material Design UI framework           |
| [ECharts](https://echarts.apache.org/)        | Interactive charting library           |
| [Mapbox GL JS](https://www.mapbox.com/)       | Maps and geospatial visualization      |
| [Pinia](https://pinia.vuejs.org/)             | Modern state management                |
| [Day.js](https://day.js.org/)                 | Lightweight date manipulation          |

---

## 📄 License

This project is licensed under the **[MIT License](LICENSE)**.
You’re free to use, modify, and distribute it as needed.

---

## 🧠 Notes

This starter kit is designed to help developers quickly start building dashboards without repetitive boilerplate setup.
Ideal for **internal tools**, **admin panels**, or **analytics dashboards**.

---

## 💬 Author

Created by [Aprizal Abyan](https://github.com/aprizalabyan) 💻
Feel free to reach out or fork the repo to build your own version!
