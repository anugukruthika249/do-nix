# Donix - Blood Donation Platform

A modern, responsive web application for connecting blood donors with patients in critical need. Built with React, TypeScript, and Tailwind CSS.

![Donix Banner](https://img.shields.io/badge/Donix-Blood%20Donation%20Platform-red?style=for-the-badge)

## Features

- **Emergency Dashboard**: Real-time blood request management with sorting by urgency, time, and units needed
- **Donor Registration**: Streamlined registration form for new donors to join the network
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, accessible interface built with Tailwind CSS
- **Type Safety**: Full TypeScript support for robust code quality

## Tech Stack

- **Frontend**: React 19.2.3
- **Build Tool**: Vite 6.2.0
- **Language**: TypeScript 5.8.2
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Dhanush-git-ui/do-nix.git
cd do-nix
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
donix/
├── components/          # React components
│   ├── Dashboard.tsx    # Emergency request dashboard
│   ├── DonorRegistration.tsx  # Donor signup form
│   ├── Features.tsx     # Platform features section
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Landing page hero
│   ├── ProblemSolution.tsx  # Problem/solution section
│   ├── Testimonials.tsx # User testimonials
│   └── TrustSafety.tsx  # Trust and safety info
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── package.json        # Project dependencies
```

## Components Overview

### Dashboard
The emergency dashboard allows users to:
- View active blood requests
- Create new emergency requests
- Sort requests by time, urgency, or units needed
- See critical alerts with visual indicators

### Donor Registration
A multi-step registration form for donors to:
- Enter personal information
- Select blood group
- Provide contact details
- Submit for verification

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For support or inquiries, please contact: support@donix-save.org

---

Built with ❤️ for humanity by the Donix Team
