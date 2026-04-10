const test = require('node:test');
const assert = require('node:assert/strict');
const { inferEtfSignal } = require('../src/adapters/etf');

test('inferEtfSignal returns bullish signal when position is well above entry', () => {
  const signal = inferEtfSignal({ ticker: 'EUNLd_EQ', entryPrice: 88, currentPrice: 113 });
  assert.equal(signal.stance, 'bullish');
  assert.ok(signal.confidence > 0.7);
});

test('inferEtfSignal returns bearish signal when position is far below entry', () => {
  const signal = inferEtfSignal({ ticker: 'ETF_X', entryPrice: 100, currentPrice: 80 });
  assert.equal(signal.stance, 'bearish');
});
