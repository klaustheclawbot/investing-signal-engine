function normalizeSignal(raw) {
  return {
    ticker: raw.ticker,
    source: raw.source,
    sourceType: raw.sourceType || 'web',
    signalType: raw.signalType || 'analysis',
    stance: raw.stance || 'neutral',
    headline: raw.headline,
    summary: raw.summary || null,
    url: raw.url || null,
    confidence: Number(raw.confidence || 0),
    freshness: Number(raw.freshness || 0),
    priceTarget: raw.priceTarget != null ? Number(raw.priceTarget) : null,
  };
}

function matchSignalsToHoldings(holdings, signals) {
  const holdingsByTicker = new Map(holdings.map(h => [h.ticker, h]));
  return signals
    .map(normalizeSignal)
    .filter(signal => holdingsByTicker.has(signal.ticker))
    .map(signal => ({
      signal,
      holding: holdingsByTicker.get(signal.ticker),
    }));
}

module.exports = {
  normalizeSignal,
  matchSignalsToHoldings,
};
