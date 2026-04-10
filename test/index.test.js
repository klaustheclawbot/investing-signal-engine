const test = require('node:test');
const assert = require('node:assert/strict');
const {
  normalizeHolding,
  rankHoldingsForCoverage,
  normalizeSignal,
  matchSignalsToHoldings,
  computeIdeaScore,
  rankTopIdeas,
} = require('../src');

test('normalizeHolding extracts entry price from averagePrice', () => {
  const h = normalizeHolding({ ticker: 'AMD_US_EQ', averagePrice: 118.02, currentPrice: 236.29, quantity: 10, ppl: 906.96 });
  assert.equal(h.entryPrice, 118.02);
});

test('rankHoldingsForCoverage sorts by absolute pnl', () => {
  const holdings = rankHoldingsForCoverage([
    { ticker: 'A', averagePrice: 1, currentPrice: 2, ppl: 10 },
    { ticker: 'B', averagePrice: 1, currentPrice: 2, ppl: 100 }
  ]);
  assert.equal(holdings[0].ticker, 'B');
});

test('normalizeSignal normalizes price target', () => {
  const s = normalizeSignal({ ticker: 'AMD_US_EQ', source: 'TradingView', headline: 'Strong buy', priceTarget: '300', confidence: 0.8 });
  assert.equal(s.priceTarget, 300);
});

test('matchSignalsToHoldings filters unmatched tickers', () => {
  const matches = matchSignalsToHoldings(
    [{ ticker: 'AMD_US_EQ', averagePrice: 118, currentPrice: 236 }].map(normalizeHolding),
    [
      { ticker: 'AMD_US_EQ', source: 'TradingView', headline: 'Bullish' },
      { ticker: 'NVDA_US_EQ', source: 'TradingView', headline: 'Bullish' }
    ]
  );
  assert.equal(matches.length, 1);
  assert.equal(matches[0].holding.ticker, 'AMD_US_EQ');
});

test('computeIdeaScore rewards bullish fresh analyst ideas', () => {
  const score = computeIdeaScore({
    holding: { ticker: 'AMD_US_EQ', entryPrice: 118, currentPrice: 236 },
    signal: { stance: 'bullish', signalType: 'analyst', confidence: 0.9, freshness: 0.9, priceTarget: 280 }
  });
  assert.ok(score > 30);
});

test('rankTopIdeas returns top 3 ranked ideas with entry price', () => {
  const matches = [
    {
      holding: { ticker: 'AMD_US_EQ', entryPrice: 118, currentPrice: 236 },
      signal: { source: 'TradingView', headline: 'AMD momentum strong', stance: 'bullish', signalType: 'technical', confidence: 0.8, freshness: 0.9, priceTarget: 280, summary: 'Momentum still supportive' }
    },
    {
      holding: { ticker: 'INTC_US_EQ', entryPrice: 26, currentPrice: 61 },
      signal: { source: 'Company', headline: 'Intel announces new launch', stance: 'bullish', signalType: 'company', confidence: 0.7, freshness: 1.0, priceTarget: 70, summary: 'Catalyst-driven' }
    },
    {
      holding: { ticker: 'EUNLd_EQ', entryPrice: 88, currentPrice: 112 },
      signal: { source: 'Macro', headline: 'Global equities remain supported', stance: 'bullish', signalType: 'analysis', confidence: 0.6, freshness: 0.8, priceTarget: null, summary: 'Trend remains intact' }
    },
    {
      holding: { ticker: 'IS3Nd_EQ', entryPrice: 31, currentPrice: 42 },
      signal: { source: 'Macro', headline: 'EM risk rising', stance: 'bearish', signalType: 'analysis', confidence: 0.5, freshness: 0.7, priceTarget: null, summary: 'Watch position sizing' }
    }
  ];
  const ideas = rankTopIdeas(matches, 3);
  assert.equal(ideas.length, 3);
  assert.ok(ideas.every(x => typeof x.entryPrice === 'number'));
});
