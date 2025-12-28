#!/usr/bin/env node

import { Command } from 'commander';
import { KolkataGuide } from './guide';

const program = new Command();
const guide = new KolkataGuide();

program
  .name('kolkata-guide')
  .description('AI-powered local guide for Kolkata')
  .version('1.0.0');

program
  .command('ask')
  .description('Ask the Kolkata Local Guide a question')
  .argument('<query>', 'Your question about Kolkata')
  .action((query: string) => {
    console.log('\n🏙️  Kolkata Local Guide\n');
    console.log(`❓ Your question: "${query}"\n`);
    
    const result = guide.processQuery(query);
    
    console.log(`📍 ${result.context}\n`);
    
    result.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}\n`);
    });
    
    if (result.tips && result.tips.length > 0) {
      console.log('💡 **Tips:**');
      result.tips.forEach(tip => {
        console.log(`   ${tip}`);
      });
    }
    
    console.log('\n---');
    console.log('Ask me more about Kolkata food, transport, hangouts, or culture! 🎉');
  });

program
  .command('demo')
  .description('Run demo queries to see the guide in action')
  .action(() => {
    console.log('\n🏙️  Kolkata Local Guide - Demo\n');
    
    const demoQueries = [
      "Suggest street food near Gariahat under ₹200",
      "How do I go from Salt Lake to Park Street by metro?",
      "What are some good hangout spots in Park Street?",
      "Explain local Bengali phrases for newcomers"
    ];
    
    demoQueries.forEach((query, index) => {
      console.log(`\n--- Demo ${index + 1} ---`);
      console.log(`❓ Query: "${query}"\n`);
      
      const result = guide.processQuery(query);
      
      console.log(`📍 ${result.context}\n`);
      result.recommendations.slice(0, 2).forEach((rec, recIndex) => {
        console.log(`${recIndex + 1}. ${rec}\n`);
      });
      
      if (result.tips && result.tips.length > 0) {
        console.log('💡 **Quick Tip:**');
        console.log(`   ${result.tips[0]}\n`);
      }
    });
    
    console.log('\n🎉 Demo complete! Try "kolkata-guide ask \\"your question\\"" for interactive use.');
  });

// Interactive mode
program
  .command('interactive')
  .description('Start interactive mode for continuous questions')
  .action(async () => {
    console.log('\n🏙️  Kolkata Local Guide - Interactive Mode');
    console.log('Type your questions about Kolkata. Type "exit" to quit.\n');
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const askQuestion = () => {
      rl.question('❓ Ask me about Kolkata: ', (query: string) => {
        if (query.toLowerCase() === 'exit') {
          console.log('\n👋 Thanks for using Kolkata Local Guide!');
          rl.close();
          return;
        }
        
        if (query.trim()) {
          console.log('');
          const result = guide.processQuery(query);
          
          console.log(`📍 ${result.context}\n`);
          result.recommendations.forEach((rec, index) => {
            console.log(`${index + 1}. ${rec}\n`);
          });
          
          if (result.tips && result.tips.length > 0) {
            console.log('💡 **Tips:**');
            result.tips.slice(0, 2).forEach(tip => {
              console.log(`   ${tip}`);
            });
          }
          console.log('');
        }
        
        askQuestion();
      });
    };
    
    askQuestion();
  });

// Default action
program.action(() => {
  console.log('\n🏙️  Kolkata Local Guide');
  console.log('\nWelcome to your AI-powered guide for the City of Joy!\n');
  console.log('Available commands:');
  console.log('  ask <query>     - Ask a specific question');
  console.log('  demo           - See example queries and responses');
  console.log('  interactive    - Start interactive Q&A mode');
  console.log('\nExamples:');
  console.log('  kolkata-guide ask "Best phuchka places in Gariahat"');
  console.log('  kolkata-guide ask "How to reach Howrah from Salt Lake"');
  console.log('  kolkata-guide demo');
  console.log('\nFor help: kolkata-guide --help\n');
});

program.parse();