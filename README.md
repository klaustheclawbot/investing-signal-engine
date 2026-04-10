# Investing Signal Engine

No-API investing signal backbone for daily analyst-style tips.

## Goal

This project is a **data and ranking engine**, not the final briefing writer.
It should:
- collect public no-API investing signals from scrapeable/reliable sources
- match them against current holdings
- combine them with actual portfolio entry prices
- rank the top 3 items for a short executive brief

## Design

### Inputs
- Holdings from Trading 212 (including `averagePrice` as entry price)
- Public non-API signals from sources that are at least partially scrapeable/readable
- Optional manual ticker mappings and instrument metadata

### Outputs
Structured ranked ideas like:
- ticker
- thesis / signal
- current price
- entry price
- delta vs entry
- confidence / source quality
- why it matters now

## Important constraint
This engine should avoid pretending blocked sources are reliable. Source-health and degradation must be explicit.

## Current source strategy
Prefer sources that can be fetched without paid APIs and that degrade gracefully:
- TradingView technical summary pages
- official company IR / press release pages
- selected finance/news pages if readable
- optional curated manual-source layer for known blocked sites

Avoid depending on:
- Zacks API
- blocked pages that regularly serve bot walls
- unverifiable scraped numbers

## Planned modules
- `src/holdings.js`
- `src/signals.js`
- `src/ranking.js`
- `src/index.js`

## Tests
Use deterministic fixtures for:
- holdings normalization
- source parsing
- signal ranking
- top-3 selection
