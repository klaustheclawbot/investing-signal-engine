function mapTvClassToStance(tvState) {
  if (tvState === 'buy' || tvState === 'strong-buy') return 'bullish';
  if (tvState === 'sell' || tvState === 'strong-sell') return 'bearish';
  return 'neutral';
}

function mapTvClassToConfidence(tvState) {
  if (tvState === 'strong-buy' || tvState === 'strong-sell') return 0.85;
  if (tvState === 'buy' || tvState === 'sell') return 0.7;
  return 0.4;
}

function extractTradingViewStates(html) {
  const states = [...html.matchAll(/container-[A-Za-z0-9_-]+ container-(strong-buy|buy|neutral|sell|strong-sell)-[A-Za-z0-9_-]+/g)]
    .map(match => match[1]);
  return states.slice(0, 3);
}

function parseTradingViewTechnicalText(text, { ticker, url }) {
  const states = extractTradingViewStates(text);
  const primary = states[0] || 'neutral';
  const stance = mapTvClassToStance(primary);
  const confidence = mapTvClassToConfidence(primary);

  return {
    ticker,
    source: 'TradingView',
    sourceType: 'web',
    signalType: 'technical',
    stance,
    headline: `${ticker} technical summary: ${primary}`,
    summary: `TradingView technical gauge state: ${states.join(', ') || 'unavailable'}`,
    url,
    confidence,
    freshness: 0.8,
    priceTarget: null,
    rawState: primary,
    states,
  };
}

module.exports = {
  mapTvClassToStance,
  mapTvClassToConfidence,
  extractTradingViewStates,
  parseTradingViewTechnicalText,
};
