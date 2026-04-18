const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const PERSONAS = [
  {
    id: "stay-home",
    name: "Stay-at-home mom",
    annualIncome: 66148,
    adults: 2,
    needsPaidCare: false,
    note: "No full-time daycare",
  },
  {
    id: "single",
    name: "Single mom",
    annualIncome: 35174,
    adults: 1,
    needsPaidCare: true,
    note: "One income",
  },
  {
    id: "working",
    name: "Working mom",
    annualIncome: 45853,
    adults: 1,
    needsPaidCare: true,
    note: "Paid daycare",
  },
];

const CHECKPOINTS = [
  {
    years: 1,
    name: "Age 1",
    note: "Newborn year",
  },
  {
    years: 5,
    name: "Age 5",
    note: "Early childhood",
  },
  {
    years: 18,
    name: "Age 18",
    note: "Long haul",
  },
];

const WIC_LIMITS = {
  1: 28953,
  2: 39128,
  3: 49303,
  4: 59478,
  5: 69653,
  6: 79828,
  7: 90003,
  8: 100178,
  9: 110353,
  10: 120528,
  11: 130703,
  12: 140878,
  13: 151053,
  14: 161228,
  15: 171403,
  16: 181578,
};

const DHS_COPAY = {
  2: { zero: 1452, max: 4525, top: 223 },
  3: { zero: 1830, max: 5589, top: 276 },
  4: { zero: 2208, max: 6654, top: 328 },
  5: { zero: 2587, max: 7718, top: 381 },
  6: { zero: 2965, max: 8783, top: 433 },
  7: { zero: 3343, max: 8983, top: 443 },
  8: { zero: 3722, max: 9182, top: 453 },
  9: { zero: 4100, max: 9382, top: 463 },
  10: { zero: 4478, max: 9582, top: 473 },
};

const SAVINGS = [
  {
    id: "costco",
    name: "Costco Gold Star",
    note: "Bulk savings",
  },
  {
    id: "handMeDowns",
    name: "Hand-me-down network",
    note: "Used gear",
  },
  {
    id: "wic",
    name: "WIC / food help check",
    note: "Food help",
  },
  {
    id: "homeCare",
    name: "Licensed home daycare",
    note: "Lower care rate",
  },
  {
    id: "dhsCare",
    name: "OKDHS child care subsidy",
    note: "Copay check",
  },
];

const ITEMS = [
  {
    id: "food",
    name: "Food and formula",
    category: "Food",
    required: true,
    colors: ["#20b15a", "#f5c84b"],
    label: "Food",
    photo: "https://cdn.pixabay.com/photo/2017/07/28/15/53/drinking-milk-2549021_1280.jpg",
    base: { 1: 1800, 5: 11400, 18: 58200 },
    note: "Formula, baby food, groceries, snacks, and school-age food at home.",
  },
  {
    id: "diapers",
    name: "Diapers and wipes",
    category: "Diapers",
    required: (years) => years <= 5,
    colors: ["#40a7b8", "#ffffff"],
    label: "Diapers",
    photo: "https://cdn.pixabay.com/photo/2012/03/01/00/23/baby-19534_640.jpg",
    base: { 1: 936, 5: 2400, 18: 2400 },
    note: "The early years are tiny, expensive, and somehow always sticky.",
  },
  {
    id: "clothes",
    name: "Clothes and shoes",
    category: "Clothing",
    required: true,
    colors: ["#e56f7a", "#f5c84b"],
    label: "Clothes",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Baby_shoes_%28Unsplash%29.jpg/960px-Baby_shoes_%28Unsplash%29.jpg",
    base: { 1: 650, 5: 2650, 18: 11750 },
    note: "Growth spurts, coats, shoes, school clothes, and replacements.",
  },
  {
    id: "health",
    name: "Healthcare",
    category: "Health",
    required: true,
    colors: ["#20b15a", "#ffffff"],
    label: "Care",
    photo: "https://cdn.pixabay.com/photo/2018/06/09/17/13/doctor-3464763_1280.jpg",
    base: { 1: 1200, 5: 3600, 18: 11400 },
    note: "Checkups, medicine, dental basics, urgent visits, and insurance gaps.",
  },
  {
    id: "childcare",
    name: "Child care",
    category: "Care",
    required: (years, persona) => persona.needsPaidCare,
    colors: ["#40a7b8", "#f5c84b"],
    label: "Care",
    photo: "https://cdn.pixabay.com/photo/2020/04/09/08/06/kid-5020226_1280.jpg",
    base: { 1: 10065, 5: 39165, 18: 72965 },
    stayHomeBase: { 1: 1200, 5: 4800, 18: 9000 },
    note: "Full-time care for working households, or limited respite care for stay-at-home mode.",
  },
  {
    id: "housing",
    name: "Housing space",
    category: "Housing",
    required: true,
    colors: ["#1d241f", "#40a7b8"],
    label: "Home",
    photo: "https://cdn.pixabay.com/photo/2023/01/25/13/47/nursery-7743630_1280.jpg",
    base: { 1: 3600, 5: 18000, 18: 64800 },
    note: "Extra bedroom pressure, utilities, household supplies, and child-safe space.",
  },
  {
    id: "transport",
    name: "Transportation",
    category: "Transport",
    required: true,
    colors: ["#f5c84b", "#1d241f"],
    label: "Rides",
    photo: "https://cdn.pixabay.com/photo/2019/04/02/16/08/baby-carriage-4098055_1280.jpg",
    base: { 1: 800, 5: 4500, 18: 17100 },
    note: "Car seats, more errands, school runs, gas, repairs, and activities.",
  },
  {
    id: "school",
    name: "School and activities",
    category: "School",
    required: (years) => years >= 5,
    colors: ["#40a7b8", "#ffffff"],
    label: "School",
    photo: "https://cdn.pixabay.com/photo/2015/05/11/14/44/pencils-762555_1280.jpg",
    base: { 1: 0, 5: 450, 18: 9000 },
    note: "Supplies, fees, books, field trips, sports, clubs, and technology.",
  },
  {
    id: "safety",
    name: "Safety gear",
    category: "Gear",
    required: true,
    colors: ["#e56f7a", "#ffffff"],
    label: "Gear",
    photo: "https://cdn.pixabay.com/photo/2022/08/10/04/18/mother-7376325_1280.jpg",
    base: { 1: 850, 5: 1200, 18: 1200 },
    note: "Car seat, crib, stroller, babyproofing, and gear that gets outgrown fast.",
  },
  {
    id: "emergency",
    name: "Emergency buffer",
    category: "Buffer",
    required: true,
    colors: ["#20b15a", "#1d241f"],
    label: "Buffer",
    photo: "https://cdn.pixabay.com/photo/2021/02/17/17/22/savings-6024919_1280.jpg",
    base: { 1: 1000, 5: 5000, 18: 18000 },
    note: "The boring money that saves you when tires, fevers, and job chaos show up.",
  },
  {
    id: "college",
    name: "College fund",
    category: "College",
    required: false,
    colors: ["#f5c84b", "#e56f7a"],
    label: "College",
    photo: "https://cdn.pixabay.com/photo/2013/01/20/04/53/college-75535_1280.jpg",
    base: { 1: 0, 5: 0, 18: 39240 },
    note: "Optional at age 18. Public four-year tuition and fees, multiplied by four years. Pain, but itemized.",
  },
];

const SOURCES = [
  {
    label: "U.S. Census ACS 2024",
    url: "https://api.census.gov/data/2024/acs/acs1?get=NAME,B19126_001E,B19126_003E,B19126_010E&for=state:40",
    note:
      "Oklahoma family-income baselines, including female householder with own children and married-couple families with children.",
  },
  {
    label: "U.S. Census ACS profile 2024",
    url: "https://api.census.gov/data/2024/acs/acs1/profile?get=NAME,DP03_0062E,DP03_0092E,DP03_0094E&for=state:40",
    note:
      "Median household income and median earnings for female full-time, year-round workers in Oklahoma.",
  },
  {
    label: "FFYF Oklahoma child care fact sheet",
    url: "https://www.ffyf.org/wp-content/uploads/2024/07/2024-Oklahoma-State-Fact-Sheet.pdf",
    note:
      "Center-based infant care listed at $10,065 per year and home-based infant care at $8,704 per year.",
  },
  {
    label: "OKDHS child care copay chart",
    url: "https://www.oklahoma.gov/content/dam/ok/en/okdhs/documents/searchcenter/okdhsformresults/c-4.pdf",
    note:
      "Simplified subsidy eligibility and copay modeling uses the October 1, 2025 chart.",
  },
  {
    label: "Oklahoma WIC income guidelines",
    url: "https://aem-prod.oklahoma.gov/content/dam/ok/en/health/health2/aem-documents/family-health/wic/wic-income-eligibility-guidelines.pdf",
    note:
      "WIC eligibility thresholds for April 1, 2025 through June 30, 2026.",
  },
  {
    label: "Costco membership",
    url: "https://customerservice.costco.com/app/answers/answer_view/a_id/1013504/~/membership-fee-increase",
    note:
      "Gold Star membership modeled at $65 per year.",
  },
  {
    label: "Oklahoma higher education tuition report",
    url: "https://digitalprairie.ok.gov/digital/api/collection/stgovpub/id/723870/download",
    note:
      "Oklahoma public four-year tuition and mandatory fees reference of $9,810.",
  },
];

const state = {
  personaId: "single",
  years: 1,
  childCount: 1,
  savings: new Set(["handMeDowns"]),
  purchases: Object.fromEntries(ITEMS.map((item) => [item.id, 0])),
};

const els = {
  personaGrid: document.querySelector("#personaGrid"),
  checkpointGrid: document.querySelector("#checkpointGrid"),
  savingsGrid: document.querySelector("#savingsGrid"),
  remainingMoney: document.querySelector("#remainingMoney"),
  childCount: document.querySelector("#childCount"),
  coveredCount: document.querySelector("#coveredCount"),
  removeChild: document.querySelector("#removeChild"),
  addChild: document.querySelector("#addChild"),
  meterList: document.querySelector("#meterList"),
  verdict: document.querySelector("#verdict"),
  progressTitle: document.querySelector("#progressTitle"),
  itemGrid: document.querySelector("#itemGrid"),
  autoBuy: document.querySelector("#autoBuy"),
  resetGame: document.querySelector("#resetGame"),
  receipt: document.querySelector("#receipt"),
  sourceList: document.querySelector("#sourceList"),
  stickyLedger: document.querySelector(".sticky-ledger"),
};

function getPersona() {
  return PERSONAS.find((persona) => persona.id === state.personaId);
}

function familySize() {
  return Math.min(16, getPersona().adults + state.childCount);
}

function wicLimit() {
  return WIC_LIMITS[familySize()] || WIC_LIMITS[16] + (familySize() - 16) * 10175;
}

function isWicEligible() {
  return getPersona().annualIncome <= wicLimit();
}

function dhsBracket() {
  const size = Math.min(10, Math.max(2, familySize()));
  return DHS_COPAY[size] || DHS_COPAY[10];
}

function isDhsEligible() {
  return getPersona().annualIncome / 12 <= dhsBracket().max;
}

function dhsMonthlyCopay() {
  const monthly = getPersona().annualIncome / 12;
  const bracket = dhsBracket();

  if (monthly <= bracket.zero) return 0;
  if (monthly > bracket.max) return null;

  const progress = (monthly - bracket.zero) / (bracket.max - bracket.zero);
  return Math.round(progress * bracket.top);
}

function isItemRequired(item) {
  return typeof item.required === "function"
    ? item.required(state.years, getPersona())
    : item.required;
}

function baseCost(item) {
  if (item.id === "childcare" && !getPersona().needsPaidCare) {
    return item.stayHomeBase[state.years];
  }

  return item.base[state.years];
}

function firstFiveFoodCost() {
  if (state.years === 1) return ITEMS.find((item) => item.id === "food").base[1];
  return ITEMS.find((item) => item.id === "food").base[5];
}

function adjustedUnitCost(item) {
  let cost = baseCost(item);

  if (item.id === "food" && state.savings.has("wic") && isWicEligible()) {
    cost -= Math.min(cost, firstFiveFoodCost()) * 0.35;
  }

  if (state.savings.has("costco") && ["food", "diapers", "safety"].includes(item.id)) {
    cost *= 0.92;
  }

  if (state.savings.has("handMeDowns")) {
    if (item.id === "clothes") cost *= 0.6;
    if (item.id === "safety") cost *= 0.75;
    if (item.id === "school") cost *= 0.9;
  }

  if (item.id === "childcare" && getPersona().needsPaidCare) {
    if (state.savings.has("homeCare")) cost *= 0.865;

    if (state.savings.has("dhsCare") && isDhsEligible()) {
      const copay = dhsMonthlyCopay();
      if (copay !== null) {
        const householdCopay = copay * 12 * state.years;
        cost = Math.min(cost, householdCopay / Math.max(1, state.childCount));
      }
    }
  }

  return Math.max(0, Math.round(cost));
}

function savingsFees() {
  let fees = 0;
  if (state.savings.has("costco")) fees += 65 * state.years;
  return fees;
}

function totalBudget() {
  return getPersona().annualIncome * state.years;
}

function itemTotal(item) {
  return adjustedUnitCost(item) * state.purchases[item.id];
}

function spentTotal() {
  return ITEMS.reduce((sum, item) => sum + itemTotal(item), 0) + savingsFees();
}

function remainingTotal() {
  return totalBudget() - spentTotal();
}

function requiredItems() {
  return ITEMS.filter(isItemRequired);
}

function essentialsCovered() {
  const required = requiredItems();
  if (required.length === 0) return state.childCount;
  return Math.min(...required.map((item) => state.purchases[item.id]), state.childCount);
}

function fullyCovered() {
  return remainingTotal() >= 0 ? essentialsCovered() : 0;
}

function setPurchase(itemId, nextValue) {
  state.purchases[itemId] = Math.max(0, Math.min(99, nextValue));
  render();
}

function renderPersonas() {
  els.personaGrid.innerHTML = PERSONAS.map((persona) => {
    const active = persona.id === state.personaId ? " is-active" : "";
    return `
      <button class="persona-card${active}" type="button" data-persona="${persona.id}">
        <h3>${persona.name}</h3>
        <strong>${money.format(persona.annualIncome)}</strong>
        <p>${persona.note}</p>
      </button>
    `;
  }).join("");

  els.personaGrid.querySelectorAll("[data-persona]").forEach((button) => {
    button.addEventListener("click", () => {
      state.personaId = button.dataset.persona;
      render();
    });
  });
}

function renderCheckpoints() {
  els.checkpointGrid.innerHTML = CHECKPOINTS.map((checkpoint) => {
    const active = checkpoint.years === state.years ? " is-active" : "";
    return `
      <button class="checkpoint-card${active}" type="button" data-years="${checkpoint.years}">
        <h3>${checkpoint.name}</h3>
        <strong>${checkpoint.years} ${checkpoint.years === 1 ? "year" : "years"}</strong>
        <p>${checkpoint.note}</p>
      </button>
    `;
  }).join("");

  els.checkpointGrid.querySelectorAll("[data-years]").forEach((button) => {
    button.addEventListener("click", () => {
      state.years = Number(button.dataset.years);
      render();
    });
  });
}

function totalBudgetForYears(years) {
  return getPersona().annualIncome * years;
}

function renderSavings() {
  els.savingsGrid.innerHTML = SAVINGS.map((saving) => {
    const active = state.savings.has(saving.id) ? " is-active" : "";
    let status = "";

    if (saving.id === "wic") {
      status = isWicEligible() ? "Eligible" : "Not eligible";
    }

    if (saving.id === "dhsCare") {
      if (!getPersona().needsPaidCare) status = "Not needed";
      else if (isDhsEligible()) status = `Copay ${money.format(dhsMonthlyCopay())}/mo`;
      else status = "Not eligible";
    }

    if (saving.id === "costco") {
      status = `${money.format(65 * state.years)} fee`;
    }

    return `
      <button class="saving-card${active}" type="button" data-saving="${saving.id}">
        <h3>${saving.name}</h3>
        <p>${saving.note}</p>
        <p><strong>${status}</strong></p>
      </button>
    `;
  }).join("");

  els.savingsGrid.querySelectorAll("[data-saving]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.saving;
      if (state.savings.has(id)) state.savings.delete(id);
      else state.savings.add(id);
      render();
    });
  });
}

function renderLedger() {
  const remaining = remainingTotal();
  els.remainingMoney.textContent = money.format(remaining);
  els.childCount.textContent = String(state.childCount);
  els.coveredCount.textContent = String(fullyCovered());
  els.stickyLedger.classList.toggle("is-danger", remaining < 0);
}

function renderMeters() {
  const rows = requiredItems().map((item) => {
    const count = Math.min(state.purchases[item.id], state.childCount);
    const percent = state.childCount === 0 ? 100 : Math.round((count / state.childCount) * 100);
    const status = percent < 50 ? " is-danger" : percent < 100 ? " is-warning" : "";

    return `
      <div class="meter-row${status}">
        <div class="meter-name">${item.category}</div>
        <div class="meter-track" aria-label="${item.category} coverage">
          <div class="meter-fill" style="--fill: ${percent}%"></div>
        </div>
        <div class="meter-value">${count}/${state.childCount}</div>
      </div>
    `;
  });

  els.meterList.innerHTML = rows.join("");
}

function renderVerdict() {
  const covered = fullyCovered();
  const remaining = remainingTotal();
  const college = state.years === 18 && state.purchases.college >= state.childCount;
  let title = "Try again";
  let body = "The cart is missing essentials, or the household is underwater before the checkpoint.";

  if (covered === state.childCount && remaining >= 0) {
    title = "It works";
    body = `All ${state.childCount} attempted ${state.childCount === 1 ? "child is" : "children are"} covered through ${state.years === 18 ? "age 18" : `year ${state.years}`}.`;
  } else if (covered > 0) {
    title = `${covered} covered`;
    body = `${covered} ${covered === 1 ? "child has" : "children have"} the core needs funded, but the rest still need coverage.`;
  }

  if (state.years === 18 && covered === state.childCount && remaining >= 0) {
    body += college
      ? " College is paid too, which is financially heroic and emotionally suspicious."
      : " College is not paid, which is a very common American plot twist.";
  }

  els.progressTitle.textContent = `${getPersona().name}: ${CHECKPOINTS.find((c) => c.years === state.years).name}`;
  els.verdict.innerHTML = `
    <strong>${title}</strong>
    <p>${body}</p>
    <p>Income modeled: ${money.format(totalBudget())}. Cart total: ${money.format(spentTotal())}.</p>
  `;
}

function renderItems() {
  els.itemGrid.innerHTML = ITEMS.map((item) => {
    const unitCost = adjustedUnitCost(item);
    const quantity = state.purchases[item.id];
    const disabled = unitCost === 0 && item.id !== "school";
    const hiddenForEarlyCollege = item.id === "college" && state.years !== 18;
    const hiddenEmptySchool = item.id === "school" && state.years === 1;

    if (hiddenForEarlyCollege || hiddenEmptySchool) return "";

    return `
      <article class="item-card">
        <div class="item-art">
          <img src="${item.photo}" alt="${item.name}" />
        </div>
        <div class="item-body">
          <h3>${item.name}</h3>
          <span class="item-price">${money.format(unitCost)}</span>
        </div>
        <div class="item-controls">
          <button type="button" data-sell="${item.id}" ${quantity === 0 ? "disabled" : ""}>Sell</button>
          <span>${quantity}</span>
          <button type="button" data-buy="${item.id}" ${disabled ? "disabled" : ""}>Buy</button>
        </div>
      </article>
    `;
  }).join("");

  els.itemGrid.querySelectorAll("[data-buy]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.buy;
      setPurchase(id, state.purchases[id] + 1);
    });
  });

  els.itemGrid.querySelectorAll("[data-sell]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.sell;
      setPurchase(id, state.purchases[id] - 1);
    });
  });
}

function renderReceipt() {
  const purchasedRows = ITEMS
    .filter((item) => state.purchases[item.id] > 0 && !(item.id === "college" && state.years !== 18))
    .map((item) => {
      return `
        <div class="receipt-row">
          <strong>${item.name} x ${state.purchases[item.id]}</strong>
          <span>${money.format(itemTotal(item))}</span>
        </div>
      `;
    });

  if (savingsFees() > 0) {
    purchasedRows.push(`
      <div class="receipt-row">
        <strong>Savings memberships and fees</strong>
        <span>${money.format(savingsFees())}</span>
      </div>
    `);
  }

  if (purchasedRows.length === 0) {
    purchasedRows.push(`
      <div class="receipt-row">
        <strong>No child costs covered yet</strong>
        <span>${money.format(0)}</span>
      </div>
    `);
  }

  purchasedRows.push(`
    <div class="receipt-row receipt-total">
      <strong>Total spent</strong>
      <span>${money.format(spentTotal())}</span>
    </div>
  `);

  els.receipt.innerHTML = purchasedRows.join("");
}

function renderSources() {
  els.sourceList.innerHTML = SOURCES.map((source) => {
    return `
      <p>
        <a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a><br />
        ${source.note}
      </p>
    `;
  }).join("");
}

function render() {
  renderPersonas();
  renderCheckpoints();
  renderSavings();
  renderLedger();
  renderMeters();
  renderVerdict();
  renderItems();
  renderReceipt();
  renderSources();
}

els.addChild.addEventListener("click", () => {
  state.childCount = Math.min(12, state.childCount + 1);
  render();
});

els.removeChild.addEventListener("click", () => {
  state.childCount = Math.max(1, state.childCount - 1);
  render();
});

els.autoBuy.addEventListener("click", () => {
  requiredItems().forEach((item) => {
    state.purchases[item.id] = state.childCount;
  });
  render();
});

els.resetGame.addEventListener("click", () => {
  ITEMS.forEach((item) => {
    state.purchases[item.id] = 0;
  });
  render();
});

render();
