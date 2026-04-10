function inferCompanySignal(holding, catalyst = null) {
  const ticker = holding.ticker;
  const current = Number(holding.currentPrice || 0);
  const entry = Number(holding.entryPrice || 0);
  const deltaPct = entry > 0 ? ((current - entry) / entry) * 100 : 0;

  let stance = 'neutral';
  let confidence = 0.58;
  let headline = `${ticker} company signal: neutral`;
  let summary = catalyst || 'No fresh verified company catalyst captured; maintain watch posture.';

  if (deltaPct >= 25) {
    stance = 'bullish';
    confidence = 0.68;
    headline = `${ticker} company signal: bullish`;
    if (!catalyst) summary = 'Name remains materially above entry; trend and catalyst follow-through matter more than fresh initiation.';
  } else if (deltaPct <= -12) {
    stance = 'bearish';
    confidence = 0.64;
    headline = `${ticker} company signal: bearish`;
    if (!catalyst) summary = 'Position is under pressure vs entry; require fresh catalyst before adding.';
  }

  return {
    ticker,
    source: 'Company catalyst model',
    sourceType: 'internal',
    signalType: 'company',
    stance,
    headline,
    summary,
    url: null,
    confidence,
    freshness: 0.7,
    priceTarget: null,
  };
}

module.exports = { inferCompanySignal };
