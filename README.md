# Kolkata Local Guide 🏙️

An AI-powered local guide for Kolkata that helps newcomers and visitors navigate the City of Joy like a local. Built for the **AI for Bharat Week 5 Local Guide Challenge**.

## What is Kolkata Local Guide?

This project demonstrates how AI agents can be enhanced with hyper-local knowledge to provide authentic, culturally-aware recommendations. Unlike generic travel apps, this guide:

- **Knows local slang** - Understands "Boi Para" means College Street
- **Suggests by budget** - From ₹20 phuchka to ₹800 fine dining
- **Gives transport tips** - Metro routes, auto fares, sharing points
- **Explains culture** - Adda spots, Bengali phrases, local etiquette

## Features

### 🍽️ Food Recommendations
- Street food hubs (Gariahat, Shyama Charan Mukherjee Street)
- Budget-wise suggestions (Under ₹100, ₹100-300, ₹300-800, ₹800+)
- Area-specific specialties (Park Street continental, Tangra Chinese)
- Timing and cultural context

### 🚇 Transport Navigation
- Metro line connections (Blue, Green, Purple lines)
- Bus routes between major areas
- Auto-rickshaw fare estimates
- Local transport etiquette and tips

### 🏛️ Hangout Spots
- Area-wise recommendations (Park Street nightlife, College Street books)
- Budget-appropriate venues
- Cultural significance and local favorites

### 🗣️ Cultural Context
- Essential Bengali phrases for newcomers
- Local area nicknames and slang
- Social norms and etiquette
- Seasonal advice (monsoon, winter, summer)

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation & Setup

1. **Clone or download this project**
   ```bash
   git clone <your-repo-url>
   cd kolkata-local-guide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Run the demo**
   ```bash
   npm run demo
   ```

### Usage Examples

#### Command Line Interface
```bash
# Ask specific questions
npm start ask "Suggest street food near Gariahat under ₹200"
npm start ask "How do I go from Salt Lake to Park Street by metro?"
npm start ask "What are good hangout spots in College Street?"

# Run interactive demo
npm start demo

# Start interactive mode
npm start interactive
```

#### Sample Queries
- "Best phuchka places in South Kolkata"
- "How to reach Howrah Station from Jadavpur?"
- "Explain Bengali phrases for newcomers"
- "Suggest evening hangout spots near Park Street"
- "Where to find authentic Chinese food in Kolkata?"

## Project Structure

```
kolkata-local-guide/
├── .kiro/
│   └── steering/           # Kiro context files
│       ├── product.md      # Detailed product specification
│       ├── tech.md         # Technical architecture
│       └── structure.md    # Project organization
├── src/
│   ├── index.ts           # CLI interface
│   ├── guide.ts           # Core recommendation engine
│   └── data/              # Local knowledge base
│       ├── areas.json     # Kolkata areas and zones
│       ├── food-spots.json # Restaurants and street food
│       ├── transport.json  # Metro, bus, auto routes
│       └── local-context.json # Slang, culture, tips
├── package.json
├── tsconfig.json
└── README.md
```

## Kiro Integration

This project is designed to work with [Kiro](https://kiro.ai) - an AI-powered IDE. The `.kiro/steering/` folder contains:

- **product.md**: Complete product specification with local Kolkata knowledge
- **tech.md**: Technical architecture and development guidelines  
- **structure.md**: Project organization and coding standards

These files provide context to AI agents working on the project, ensuring they understand:
- Local Kolkata geography, culture, and preferences
- Project goals and target users
- Technical constraints and architectural decisions

## Local Knowledge Base

The guide includes authentic Kolkata data:

### Areas Covered
- **Central**: Park Street, College Street, Esplanade
- **South**: Gariahat, Jadavpur, Tollygunge  
- **North**: Shyambazar, Hatibagan, Bagbazar
- **East**: Salt Lake, Rajarhat, New Town
- **West**: Howrah, Shibpur

### Cultural Context
- Bengali phrases and local slang
- Area nicknames (Boi Para, IT Para, Chinatown)
- Social norms and etiquette
- Seasonal considerations

### Transport Network
- All 3 metro lines with stations and fares
- Major bus routes and connections
- Auto-rickshaw sharing points and rates
- Local transport tips and etiquette

## Development

### Scripts
```bash
npm run build    # Compile TypeScript
npm run dev      # Run with ts-node (development)
npm start        # Run compiled version
npm run demo     # Quick demo of capabilities
```

### Adding New Data
The knowledge base is stored in JSON files under `src/data/`. To add new areas, food spots, or cultural context:

1. Edit the relevant JSON file
2. Rebuild the project: `npm run build`
3. Test with new queries

### Extending Features
The modular architecture makes it easy to add:
- New query types (shopping, events, etc.)
- Additional areas or neighborhoods  
- Real-time data integration
- Web API endpoints

## AI for Bharat Challenge

This project was created for the **AI for Bharat Week 5 Local Guide Challenge**. It demonstrates:

- **Local AI Enhancement**: How AI agents can be made culturally aware
- **Practical Applications**: Real-world utility for newcomers to Indian cities
- **Scalable Architecture**: Framework that can be adapted to other cities
- **Cultural Sensitivity**: Authentic local knowledge vs generic recommendations

## Contributing

This is a challenge submission, but contributions are welcome:

1. Fork the repository
2. Add new areas, food spots, or cultural context
3. Improve the recommendation algorithms
4. Submit a pull request

## License

MIT License - feel free to use this as a template for other cities!

---

**Built with ❤️ for Kolkata** - The City of Joy deserves an AI guide that truly understands its soul.