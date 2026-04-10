const { normalizeHolding, rankHoldingsForCoverage } = require('./holdings');
const { normalizeSignal, matchSignalsToHoldings } = require('./signals');
const { computeIdeaScore, buildIdea, rankTopIdeas } = require('./ranking');
const { parseTradingViewTechnicalText } = require('./adapters/tradingview');
const { inferEtfSignal } = require('./adapters/etf');
const { inferCompanySignal } = require('./adapters/company');

module.exports = {
  normalizeHolding,
  rankHoldingsForCoverage,
  normalizeSignal,
  matchSignalsToHoldings,
  computeIdeaScore,
  buildIdea,
  rankTopIdeas,
  parseTradingViewTechnicalText,
  inferEtfSignal,
  inferCompanySignal,
};
