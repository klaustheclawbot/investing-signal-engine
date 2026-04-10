const test = require('node:test');
const assert = require('node:assert/strict');
const { inferCompanySignal } = require('../src/adapters/company');

test('inferCompanySignal can return bullish for strong gains vs entry', () => {
  const signal = inferCompanySignal({ ticker: 'AMD_US_EQ', entryPrice: 118, currentPrice: 236 });
  assert.equal(signal.stance, 'bullish');
});

test('inferCompanySignal preserves explicit catalyst summary', () => {
  const signal = inferCompanySignal({ ticker: 'INTC_US_EQ', entryPrice: 26, currentPrice: 61 }, 'Product cycle remains the main watchpoint.');
  assert.match(signal.summary, /Product cycle/);
});
