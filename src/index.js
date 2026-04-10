const { normalizeHolding, rankHoldingsForCoverage } = require('./holdings');
const { normalizeSignal, matchSignalsToHoldings } = require('./signals');
const { computeIdeaScore, buildIdea, rankTopIdeas } = require('./ranking');
const { parseTradingViewTechnicalText } = require('./adapters/tradingview');

module.exports = {
  normalizeHolding,
  rankHoldingsForCoverage,
  normalizeSignal,
  matchSignalsToHoldings,
  computeIdeaScore,
  buildIdea,
  rankTopIdeas,
  parseTradingViewTechnicalText,
};
