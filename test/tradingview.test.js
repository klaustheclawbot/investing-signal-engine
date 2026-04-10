const test = require('node:test');
const assert = require('node:assert/strict');
const { parseTradingViewTechnicalText } = require('../src/adapters/tradingview');

test('parseTradingViewTechnicalText detects bullish stance', () => {
  const signal = parseTradingViewTechnicalText('Summary Strong buy Moving Averages Buy', {
    ticker: 'AMD_US_EQ',
    url: 'https://www.tradingview.com/symbols/NASDAQ-AMD/technicals/'
  });
  assert.equal(signal.stance, 'bullish');
  assert.equal(signal.signalType, 'technical');
  assert.ok(signal.confidence >= 0.8);
});

test('parseTradingViewTechnicalText detects bearish stance', () => {
  const signal = parseTradingViewTechnicalText('Summary Sell Oscillators Sell', {
    ticker: 'INTC_US_EQ',
    url: 'https://www.tradingview.com/symbols/NASDAQ-INTC/technicals/'
  });
  assert.equal(signal.stance, 'bearish');
});
