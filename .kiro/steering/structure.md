# Project Structure Guide

## Directory Organization

### `.kiro/steering/`
Contains Kiro-specific context and guidance files:
- `product.md`: Complete product specification with local knowledge
- `tech.md`: Technical architecture and stack decisions
- `structure.md`: This file - project organization guide

### `src/`
Main application code:
- `index.ts`: CLI entry point and user interface
- `guide.ts`: Core recommendation engine
- `data/`: JSON files containing local knowledge base

### Root Files
- `package.json`: Node.js dependencies and scripts
- `README.md`: Project overview and setup instructions
- `tsconfig.json`: TypeScript configuration

## Code Organization Principles

### 1. Separation of Concerns
- **Data Layer**: Static JSON files for easy updates
- **Logic Layer**: Pure functions for recommendations
- **Interface Layer**: CLI commands and formatting

### 2. Local Knowledge Structure
Data organized by:
- **Geographic Areas**: North, South, Central, East, West Kolkata
- **Categories**: Food, Hangouts, Transport, Culture
- **Budget Ranges**: Under ₹100, ₹100-300, ₹300-800, ₹800+

### 3. Extensibility
- New areas can be added by updating JSON files
- Additional features require minimal code changes
- Clear interfaces for future API development

## File Naming Conventions
- Use kebab-case for directories and files
- TypeScript files use `.ts` extension
- Data files use descriptive names (areas.json, food-spots.json)
- Keep file names short but descriptive