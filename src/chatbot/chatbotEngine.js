import { intents } from './intents.js';
import { getResponse } from './responses.js';

/**
 * NLP Pipeline Step 1: Text Preprocessing
 * Converts raw input to normalized tokens
 * @param {string} input - Raw user input
 * @returns {string[]} - Array of normalized tokens
 */
export const preprocessText = (input) => {
  return input
    .toLowerCase()                          // Step 1: Lowercase
    .replace(/[^\w\s]/g, ' ')              // Step 2: Remove punctuation
    .replace(/\s+/g, ' ')                  // Step 3: Normalize whitespace
    .trim()                                 // Step 4: Trim
    .split(' ')                             // Step 5: Tokenize
    .filter(token => token.length > 0);    // Step 6: Remove empty tokens
};

/**
 * NLP Pipeline Step 2: Intent Detection
 * Matches tokens against intent keyword patterns
 * @param {string[]} tokens - Preprocessed tokens
 * @returns {string} - Detected intent name
 */
export const detectIntent = (tokens) => {
  const tokenSet = new Set(tokens);
  const fullText = tokens.join(' ');

  let bestMatch = { name: 'unknown', score: 0 };

  for (const intent of intents) {
    let score = 0;

    for (const pattern of intent.patterns) {
      // Check if any token matches the keyword
      if (tokenSet.has(pattern)) {
        score += 2; // Exact token match gets higher score
      } else if (fullText.includes(pattern)) {
        score += 1; // Substring match gets lower score
      }
    }

    if (score > bestMatch.score) {
      bestMatch = { name: intent.name, score };
    }
  }

  return bestMatch.name;
};

/**
 * NLP Pipeline Step 3: Response Generation
 * Main chatbot function that processes user input and returns a response
 * @param {string} userInput - Raw user message
 * @returns {{ intent: string, response: string, tokens: string[] }}
 */
export const processMessage = (userInput) => {
  if (!userInput || userInput.trim() === '') {
    return {
      intent: 'unknown',
      response: "Please type a message so I can help you! 😊",
      tokens: [],
    };
  }

  const tokens = preprocessText(userInput);
  const intent = detectIntent(tokens);
  const response = getResponse(intent);

  return { intent, response, tokens };
};
