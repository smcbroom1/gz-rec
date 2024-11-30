import { GodzillaMovie } from '../data/godzillaMovies';

interface UserPreferences {
  effects: number;
  story: number;
  action: number;
  tone: 'serious' | 'balanced' | 'light';
  monsters: 'yes' | 'no';
}

function calculateMovieSimilarity(movie1: GodzillaMovie, movie2: GodzillaMovie): number {
  const featureWeights = {
    specialEffects: 0.2,
    story: 0.2,
    action: 0.2,
    humor: 0.1,
    seriousness: 0.2,
    multipleMonsters: 0.1,
  };

  let similarity = 0;
  similarity += (1 - Math.abs(movie1.features.specialEffects - movie2.features.specialEffects) / 4) * featureWeights.specialEffects;
  similarity += (1 - Math.abs(movie1.features.story - movie2.features.story) / 4) * featureWeights.story;
  similarity += (1 - Math.abs(movie1.features.action - movie2.features.action) / 4) * featureWeights.action;
  similarity += (1 - Math.abs(movie1.features.humor - movie2.features.humor) / 4) * featureWeights.humor;
  similarity += (1 - Math.abs(movie1.features.seriousness - movie2.features.seriousness) / 4) * featureWeights.seriousness;
  similarity += (movie1.features.multipleMonsters === movie2.features.multipleMonsters ? 1 : 0) * featureWeights.multipleMonsters;

  return similarity;
}

export function getRecommendations(movies: GodzillaMovie[], preferences: UserPreferences): GodzillaMovie[] {
  const weights = {
    effects: 0.2,
    story: 0.2,
    action: 0.2,
    tone: 0.2,
    monsters: 0.2,
  };

  const scoredMovies = movies.map(movie => {
    let score = 0;
    score += (1 - Math.abs(movie.features.specialEffects - preferences.effects) / 4) * weights.effects;
    score += (1 - Math.abs(movie.features.story - preferences.story) / 4) * weights.story;
    score += (1 - Math.abs(movie.features.action - preferences.action) / 4) * weights.action;

    if (preferences.tone === 'serious') {
      score += (movie.features.seriousness / 5) * weights.tone;
    } else if (preferences.tone === 'light') {
      score += (movie.features.humor / 5) * weights.tone;
    } else {
      score += (1 - Math.abs(3 - (movie.features.seriousness + movie.features.humor) / 2) / 2) * weights.tone;
    }

    if (preferences.monsters === 'yes' && movie.features.multipleMonsters) {
      score += weights.monsters;
    } else if (preferences.monsters === 'no' && !movie.features.multipleMonsters) {
      score += weights.monsters;
    }

    // Collaborative filtering inspired approach
    const similarMovies = movies
      .filter(m => m !== movie)
      .sort((a, b) => calculateMovieSimilarity(b, movie) - calculateMovieSimilarity(a, movie))
      .slice(0, 5);

    const similarityBonus = similarMovies.reduce((sum, similarMovie) => {
      return sum + calculateMovieSimilarity(similarMovie, movie) * (similarMovie.features.specialEffects + similarMovie.features.story + similarMovie.features.action) / 15;
    }, 0) / similarMovies.length;

    score += similarityBonus * 0.2; // Add 20% weight to similarity bonus

    return { ...movie, score };
  });

  return scoredMovies.sort((a, b) => b.score - a.score);
}

