const test = require('node:test');
const assert = require('node:assert/strict');
const { extractTradingViewStates, parseTradingViewTechnicalText } = require('../src/adapters/tradingview');

test('extractTradingViewStates parses gauge state classes', () => {
  const html = '<div class="container-a container-buy-b"></div><div class="container-c container-neutral-d"></div><div class="container-e container-strong-buy-f"></div>';
  const states = extractTradingViewStates(html);
  assert.deepEqual(states, ['buy', 'neutral', 'strong-buy']);
});

test('parseTradingViewTechnicalText detects bullish stance', () => {
  const signal = parseTradingViewTechnicalText('<div class="container-a container-strong-buy-b"></div>', {
    ticker: 'AMD_US_EQ',
    url: 'https://www.tradingview.com/symbols/NASDAQ-AMD/technicals/'
  });
  assert.equal(signal.stance, 'bullish');
  assert.equal(signal.signalType, 'technical');
  assert.ok(signal.confidence >= 0.8);
});

test('parseTradingViewTechnicalText detects bearish stance', () => {
  const signal = parseTradingViewTechnicalText('<div class="container-a container-sell-b"></div>', {
    ticker: 'INTC_US_EQ',
    url: 'https://www.tradingview.com/symbols/NASDAQ-INTC/technicals/'
  });
  assert.equal(signal.stance, 'bearish');
});
