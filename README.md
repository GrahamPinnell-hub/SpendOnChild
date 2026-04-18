# Spend On Child

A static prototype inspired by Neal.fun's spending format, rebuilt around an
Oklahoma child-raising budget simulator.

## Run

Open `index.html` in a browser. No build step is required.

## Current model

- Persona budgets use 2024 ACS Oklahoma income values.
- The cart models one coverage unit per child for the chosen checkpoint.
- Checkpoints are age 1, age 5, and age 18.
- Savings toggles model Costco, hand-me-downs, WIC/food help, licensed home
  daycare, and OKDHS child care subsidy eligibility.
- College is optional at age 18 and intentionally framed as a painful bonus
  choice, not a requirement for a child to count as covered.

## Easiest data edits

Most numbers live in `script.js`:

- `PERSONAS` for income profiles
- `CHECKPOINTS` for timeline text
- `SAVINGS` for discount options
- `ITEMS` for costs, categories, and requirements
- `SOURCES` for citations shown on the page

When you send Oklahoma-specific stats, replace the relevant values in `ITEMS`
and add the citation to `SOURCES`.
