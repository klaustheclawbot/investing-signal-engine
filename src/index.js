const { normalizeHolding, rankHoldingsForCoverage } = require('./holdings');
const { normalizeSignal, matchSignalsToHoldings } = require('./signals');
const { computeIdeaScore, buildIdea, rankTopIdeas } = require('./ranking');

module.exports = {
  normalizeHolding,
  rankHoldingsForCoverage,
  normalizeSignal,
  matchSignalsToHoldings,
  computeIdeaScore,
  buildIdea,
  rankTopIdeas,
};
