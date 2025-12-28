# Technical Architecture - Kolkata Local Guide

## Technology Stack
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Simple CLI interface using Commander.js
- **Data Storage**: JSON files for local knowledge base
- **Dependencies**: Minimal - only essential packages

## Project Structure
```
kolkata-local-guide/
├── .kiro/
│   └── steering/           # Kiro context files
├── src/
│   ├── index.ts           # Main entry point
│   ├── guide.ts           # Core guide logic
│   └── data/              # Local knowledge base
├── package.json
└── README.md
```

## Core Components

### 1. Guide Engine (`src/guide.ts`)
- Query parser to understand user intent
- Location matcher for area-specific responses
- Budget calculator for price-appropriate suggestions
- Response formatter with local context

### 2. Knowledge Base (`src/data/`)
- Areas and neighborhoods data
- Food spots with pricing and categories
- Transport routes and connections
- Local slang and cultural context

### 3. CLI Interface (`src/index.ts`)
- Command-line interface for demo purposes
- Interactive prompts for user queries
- Formatted output with recommendations

## Development Principles
- **Local-First**: All data and logic focused on Kolkata
- **Lightweight**: Minimal dependencies, fast startup
- **Extensible**: Easy to add new areas, spots, or features
- **Maintainable**: Clear separation of data and logic

## Future Enhancements
- Web API for integration with other applications
- Real-time data updates (prices, availability)
- User feedback system for recommendation quality
- Integration with local business APIs