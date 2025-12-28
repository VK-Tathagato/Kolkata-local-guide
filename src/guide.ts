// Import data
const areasData = require('./data/areas.json');
const foodData = require('./data/food-spots.json');
const transportData = require('./data/transport.json');
const contextData = require('./data/local-context.json');

export interface QueryResult {
  type: 'food' | 'transport' | 'hangout' | 'cultural' | 'general';
  recommendations: string[];
  context?: string;
  tips?: string[];
}

interface Area {
  name: string;
  zone: string;
  description: string;
  keywords: string[];
  nearby_metro: string;
  characteristics: string[];
}

interface FoodSpot {
  name: string;
  area: string;
  type: string;
  speciality: string;
  price_range: string;
  budget_category: string;
  timing: string;
  description: string;
}

interface Route {
  from: string;
  to: string;
  metro: string;
  bus: string;
  auto_fare: string;
  time: string;
}

interface BengaliPhrase {
  phrase: string;
  meaning: string;
  usage: string;
}

interface AreaNickname {
  formal: string;
  local: string;
  meaning: string;
}

export class KolkataGuide {
  private areas: { [key: string]: Area } = areasData.areas;
  private foodSpots: { 
    street_food: FoodSpot[];
    restaurants: FoodSpot[];
    fine_dining: FoodSpot[];
  } = foodData.food_spots;
  private transport: any = transportData;
  private localContext: any = contextData;

  public processQuery(query: string): QueryResult {
    const lowerQuery = query.toLowerCase();
    
    // Determine query type and extract key information
    if (this.isFoodQuery(lowerQuery)) {
      return this.handleFoodQuery(lowerQuery);
    } else if (this.isTransportQuery(lowerQuery)) {
      return this.handleTransportQuery(lowerQuery);
    } else if (this.isCulturalQuery(lowerQuery)) {
      return this.handleCulturalQuery(lowerQuery);
    } else if (this.isHangoutQuery(lowerQuery)) {
      return this.handleHangoutQuery(lowerQuery);
    } else {
      return this.handleGeneralQuery(lowerQuery);
    }
  }

  private isFoodQuery(query: string): boolean {
    const foodKeywords = ['food', 'eat', 'restaurant', 'street food', 'lunch', 'dinner', 'breakfast', 'snack', 'phuchka', 'biryani', 'fish', 'sweet'];
    return foodKeywords.some(keyword => query.includes(keyword));
  }

  private isTransportQuery(query: string): boolean {
    const transportKeywords = ['metro', 'bus', 'auto', 'transport', 'how to go', 'reach', 'travel', 'station'];
    return transportKeywords.some(keyword => query.includes(keyword));
  }

  private isCulturalQuery(query: string): boolean {
    const culturalKeywords = ['slang', 'culture', 'local', 'bengali', 'tradition', 'festival', 'language', 'etiquette'];
    return culturalKeywords.some(keyword => query.includes(keyword));
  }

  private isHangoutQuery(query: string): boolean {
    const hangoutKeywords = ['hangout', 'hang out', 'spend time', 'evening', 'weekend', 'friends', 'date', 'coffee', 'adda'];
    return hangoutKeywords.some(keyword => query.includes(keyword));
  }

  private handleFoodQuery(query: string): QueryResult {
    const area = this.extractArea(query);
    const budget = this.extractBudget(query);
    const recommendations: string[] = [];

    // Filter food spots based on area and budget
    const allSpots = [
      ...this.foodSpots.street_food,
      ...this.foodSpots.restaurants,
      ...this.foodSpots.fine_dining
    ];

    let filteredSpots = allSpots;

    if (area) {
      filteredSpots = filteredSpots.filter(spot => 
        spot.area === area || this.areas[area]?.zone === this.getAreaZone(spot.area)
      );
    }

    if (budget) {
      filteredSpots = filteredSpots.filter(spot => spot.budget_category === budget);
    }

    // Generate recommendations
    filteredSpots.slice(0, 3).forEach(spot => {
      recommendations.push(
        `🍽️ **${spot.name}** (${this.areas[spot.area]?.name || spot.area})\n` +
        `   Speciality: ${spot.speciality}\n` +
        `   Price: ${spot.price_range} | Timing: ${spot.timing}\n` +
        `   ${spot.description}`
      );
    });

    if (recommendations.length === 0) {
      recommendations.push("Let me suggest some popular food spots in Kolkata based on your preferences!");
      // Add fallback recommendations
      recommendations.push(
        "🍽️ **Vivekananda Park Phuchka** (Gariahat)\\n" +
        "   Best phuchka in South Kolkata | ₹20-50 | 4 PM - 10 PM"
      );
    }

    return {
      type: 'food',
      recommendations,
      context: area ? `Food recommendations for ${this.areas[area]?.name || area}` : 'Food recommendations for Kolkata',
      tips: [
        "💡 Try local street food for authentic experience",
        "💡 Lunch time is usually 12-2 PM, dinner 7-10 PM",
        "💡 Always check if the place is open before visiting"
      ]
    };
  }

  private handleTransportQuery(query: string): QueryResult {
    const recommendations: string[] = [];
    
    // Check if it's a route query
    const fromArea = this.extractFromLocation(query);
    const toArea = this.extractToLocation(query);

    if (fromArea && toArea) {
      // Find specific route
      const route = this.transport.common_routes.find((r: Route) => 
        r.from.toLowerCase().includes(fromArea) || r.to.toLowerCase().includes(toArea)
      );

      if (route) {
        recommendations.push(
          `🚇 **${route.from} to ${route.to}**\n` +
          `   Metro: ${route.metro}\n` +
          `   Bus: ${route.bus}\n` +
          `   Auto fare: ${route.auto_fare}\n` +
          `   Estimated time: ${route.time}`
        );
      }
    }

    // Add general metro information
    recommendations.push(
      "🚇 **Metro Lines in Kolkata:**\n" +
      `   Blue Line: ${this.transport.metro_lines.blue_line.route}\n` +
      `   Green Line: ${this.transport.metro_lines.green_line.route}\n` +
      `   Fare: ${this.transport.metro_lines.blue_line.fare_range}`
    );

    return {
      type: 'transport',
      recommendations,
      context: 'Transport information for Kolkata',
      tips: this.transport.transport_tips.metro.concat(this.transport.transport_tips.auto)
    };
  }

  private handleCulturalQuery(query: string): QueryResult {
    const recommendations: string[] = [];

    // Add Bengali phrases
    recommendations.push("🗣️ **Essential Bengali Phrases:**");
    this.localContext.slang_and_phrases.bengali_basics.slice(0, 3).forEach((phrase: BengaliPhrase) => {
      recommendations.push(`   ${phrase.phrase} - ${phrase.meaning} (${phrase.usage})`);
    });

    // Add area nicknames
    recommendations.push("\n🏘️ **Local Area Names:**");
    this.localContext.slang_and_phrases.area_nicknames.forEach((area: AreaNickname) => {
      recommendations.push(`   ${area.formal} = "${area.local}" (${area.meaning})`);
    });

    return {
      type: 'cultural',
      recommendations,
      context: 'Cultural context and local knowledge for Kolkata',
      tips: this.localContext.cultural_context.social_norms
    };
  }

  private handleHangoutQuery(query: string): QueryResult {
    const area = this.extractArea(query);
    const recommendations: string[] = [];

    // Suggest areas based on characteristics
    Object.entries(this.areas).forEach(([key, areaInfo]: [string, Area]) => {
      if (!area || key === area) {
        if (areaInfo.characteristics.includes('nightlife') || 
            areaInfo.characteristics.includes('shopping') ||
            areaInfo.characteristics.includes('cultural')) {
          recommendations.push(
            `🏛️ **${areaInfo.name}**\n` +
            `   ${areaInfo.description}\n` +
            `   Metro: ${areaInfo.nearby_metro}\n` +
            `   Good for: ${areaInfo.characteristics.join(', ')}`
          );
        }
      }
    });

    return {
      type: 'hangout',
      recommendations: recommendations.slice(0, 3),
      context: 'Hangout spots in Kolkata',
      tips: [
        "💡 Evening time (5-8 PM) is perfect for adda",
        "💡 Carry cash for street vendors and local shops",
        "💡 Try the local tea stalls for authentic experience"
      ]
    };
  }

  private handleGeneralQuery(query: string): QueryResult {
    return {
      type: 'general',
      recommendations: [
        "🏙️ **Welcome to Kolkata!**\n" +
        "I can help you with:\n" +
        "• Food recommendations by area and budget\n" +
        "• Transport routes (metro, bus, auto)\n" +
        "• Hangout spots and cultural experiences\n" +
        "• Local slang and cultural context\n\n" +
        "Try asking: 'Suggest street food near Gariahat under ₹200' or 'How to go from Salt Lake to Park Street?'"
      ],
      context: 'General information about Kolkata Local Guide',
      tips: [
        "💡 Be specific about area and budget for better recommendations",
        "💡 Ask about transport between any two areas",
        "💡 I know local slang and cultural context too!"
      ]
    };
  }

  private extractArea(query: string): string | null {
    for (const [key, area] of Object.entries(this.areas)) {
      if (area.keywords.some((keyword: string) => query.includes(keyword.toLowerCase()))) {
        return key;
      }
    }
    return null;
  }

  private extractBudget(query: string): string | null {
    if (query.includes('under') && (query.includes('100') || query.includes('₹100'))) {
      return 'under_100';
    }
    if (query.includes('200') || query.includes('300')) {
      return '100_300';
    }
    if (query.includes('500') || query.includes('800')) {
      return '300_800';
    }
    if (query.includes('1000') || query.includes('expensive') || query.includes('fine dining')) {
      return '800_plus';
    }
    return null;
  }

  private extractFromLocation(query: string): string | null {
    const fromMatch = query.match(/from\s+([\w\s]+?)\s+to/i);
    return fromMatch ? fromMatch[1].trim().toLowerCase() : null;
  }

  private extractToLocation(query: string): string | null {
    const toMatch = query.match(/to\s+([\w\s]+?)(?:\s|$)/i);
    return toMatch ? toMatch[1].trim().toLowerCase() : null;
  }

  private getAreaZone(areaKey: string): string | null {
    return this.areas[areaKey]?.zone || null;
  }
}