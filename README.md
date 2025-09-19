# TapPrint Monorepo

[![CI/CD Status](https://github.com/PrintNavigator/TapPrint/workflows/CI/badge.svg)](https://github.com/PrintNavigator/TapPrint/actions)

> Modern printing management system with advanced label design capabilities

## 🏗️ Architecture

TapPrint is a comprehensive printing solution built as a monorepo with the following components:

### Applications
- **TapPrint-admin** - Next.js frontend with advanced PDFme Designer integration
- **TapPrint-backend** - Express.js API with CUPS printing integration
- **TapPrint-cockpit** - Management dashboard

### Key Features
- 🎨 **Advanced Label Designer** - PDFme v5.4.1 with zoom up to 400%
- 🖨️ **CUPS Integration** - Native printer management
- 📱 **Responsive Design** - Modern Mantine v7 UI
- 🔧 **Real-time Updates** - WebSocket printing status
- 🐳 **Docker Ready** - Full containerization support

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/PrintNavigator/TapPrint.git
cd TapPrint

# Install dependencies for all projects
npm install

# Start all services
npm run dev
```

## 📦 Project Structure

```
TapPrint/
├── docs/                    # Documentation
│   └── CLAUDE.md           # Claude assistant instructions
├── shared/                  # Cross-project assets
│   ├── assets/             # Images, fonts, icons
│   ├── configs/            # Shared configurations
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Common utilities
├── tools/                   # Development tools
├── TapPrint-admin/          # Frontend application
├── TapPrint-backend/        # Backend API
└── TapPrint-cockpit/        # Management dashboard
```

## 🛠️ Development

Each application can be developed independently:

```bash
# Frontend development
cd TapPrint-admin
npm run dev          # Starts on http://localhost:3050

# Backend development
cd TapPrint-backend
npm run dev          # Starts on http://localhost:3001

# Cockpit development
cd TapPrint-cockpit
npm run dev          # Management dashboard
```

## 🐳 Docker

```bash
# Build and run all services
docker-compose up --build

# Individual service
docker build -t tapprint-admin ./TapPrint-admin
```

## 📚 Documentation

- [Claude Instructions](./docs/CLAUDE.md) - AI assistant configuration
- [Architecture Overview](./docs/architecture/) - System design
- [API Documentation](./TapPrint-backend/docs/) - Backend API reference
- [Contributing](./CONTRIBUTING.md) - Development guidelines

## 🔧 Development Tools

- **Turborepo** - Fast build system
- **pnpm** - Efficient package management
- **ESLint/Prettier** - Code quality
- **TypeScript** - Type safety
- **Docker** - Containerization

## 🏷️ Labels & Printing

The system supports advanced label design with:
- Visual drag-and-drop designer
- 400% zoom for precision editing
- Dynamic handle scaling
- Multiple export formats
- Real-time preview

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by the PrintNavigator team