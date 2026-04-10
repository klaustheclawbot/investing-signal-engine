function parseTradingViewTechnicalText(text, { ticker, url }) {
  const lower = text.toLowerCase();
  let stance = 'neutral';
  if (lower.includes('strong buy')) stance = 'bullish';
  else if (lower.includes('buy')) stance = 'bullish';
  else if (lower.includes('strong sell')) stance = 'bearish';
  else if (lower.includes('sell')) stance = 'bearish';

  let confidence = 0.4;
  if (lower.includes('strong buy') || lower.includes('strong sell')) confidence = 0.85;
  else if (lower.includes('buy') || lower.includes('sell')) confidence = 0.7;

  return {
    ticker,
    source: 'TradingView',
    sourceType: 'web',
    signalType: 'technical',
    stance,
    headline: `${ticker} technical summary: ${stance}`,
    summary: 'Technical summary parsed from TradingView technical page.',
    url,
    confidence,
    freshness: 0.8,
    priceTarget: null,
  };
}

module.exports = {
  parseTradingViewTechnicalText,
};
