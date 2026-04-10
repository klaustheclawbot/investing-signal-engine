function computeIdeaScore({ holding, signal }) {
  let score = 0;
  if (signal.stance === 'bullish') score += 20;
  if (signal.stance === 'bearish') score += 8;
  if (signal.signalType === 'technical') score += 8;
  if (signal.signalType === 'analyst') score += 10;
  if (signal.signalType === 'company') score += 7;
  score += signal.confidence * 10;
  score += signal.freshness * 10;
  if (signal.priceTarget && holding.currentPrice > 0) {
    const upside = (signal.priceTarget - holding.currentPrice) / holding.currentPrice;
    score += Math.max(-10, Math.min(15, upside * 100));
  }
  return score;
}

function buildIdea({ holding, signal }) {
  const entryDeltaPct = holding.entryPrice > 0
    ? ((holding.currentPrice - holding.entryPrice) / holding.entryPrice) * 100
    : null;

  return {
    ticker: holding.ticker,
    source: signal.source,
    headline: signal.headline,
    stance: signal.stance,
    signalType: signal.signalType,
    entryPrice: holding.entryPrice,
    currentPrice: holding.currentPrice,
    entryDeltaPct,
    priceTarget: signal.priceTarget,
    score: computeIdeaScore({ holding, signal }),
    whyNow: signal.summary,
    url: signal.url,
  };
}

function rankTopIdeas(matches, limit = 3) {
  return matches
    .map(buildIdea)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

module.exports = {
  computeIdeaScore,
  buildIdea,
  rankTopIdeas,
};
