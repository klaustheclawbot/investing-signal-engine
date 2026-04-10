function inferEtfSignal(holding) {
  const ticker = holding.ticker;
  const current = Number(holding.currentPrice || 0);
  const entry = Number(holding.entryPrice || 0);
  const deltaPct = entry > 0 ? ((current - entry) / entry) * 100 : 0;

  let stance = 'neutral';
  let confidence = 0.55;
  let headline = `${ticker} trend signal: neutral`;
  let summary = 'Broad-market ETF signal inferred from positive trend vs entry price.';

  if (deltaPct >= 15) {
    stance = 'bullish';
    confidence = 0.72;
    headline = `${ticker} trend signal: bullish`;
    summary = 'Position remains well above entry; trend support still intact unless macro regime shifts.';
  } else if (deltaPct <= -10) {
    stance = 'bearish';
    confidence = 0.65;
    headline = `${ticker} trend signal: bearish`;
    summary = 'Position is materially below entry; risk control matters more than adding.';
  }

  return {
    ticker,
    source: 'ETF trend model',
    sourceType: 'internal',
    signalType: 'analysis',
    stance,
    headline,
    summary,
    url: null,
    confidence,
    freshness: 0.7,
    priceTarget: null,
  };
}

module.exports = { inferEtfSignal };
