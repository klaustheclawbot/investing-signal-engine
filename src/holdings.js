function normalizeHolding(raw) {
  return {
    ticker: raw.ticker,
    quantity: Number(raw.quantity || 0),
    entryPrice: Number(raw.averagePrice || raw.entryPrice || 0),
    currentPrice: Number(raw.currentPrice || 0),
    ppl: Number(raw.ppl || 0),
    currency: raw.currency || null,
    instrument: raw.instrument || null,
  };
}

function rankHoldingsForCoverage(holdings) {
  return [...holdings]
    .map(normalizeHolding)
    .sort((a, b) => Math.abs(b.ppl) - Math.abs(a.ppl));
}

module.exports = {
  normalizeHolding,
  rankHoldingsForCoverage,
};
