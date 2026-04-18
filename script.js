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

const LIFE_EVENTS = [
  {
    year: 1,
    title: "Baby year",
    note: "Gear, diapers, safety, appointments, and sleep-deprived math.",
    amount: 0,
  },
  {
    year: 5,
    title: "Kindergarten starts",
    note: "Diapers fade out, school costs wake up.",
    amount: 250,
  },
  {
    year: 18,
    title: "College question",
    note: "You can fund college, skip it, or stare into the FAFSA abyss.",
    amount: 0,
  },
];

const MILESTONES = [
  { years: 1, label: "Age 1" },
  { years: 5, label: "Age 5" },
  { years: 18, label: "Age 18" },
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
    id: "formula-can",
    name: "Formula Can",
    category: "Formula",
    required: (years, persona) => years <= 1 && persona.needsPaidCare,
    photo: "https://cdn.pixabay.com/photo/2017/07/28/15/53/drinking-milk-2549021_1280.jpg",
    price: 38,
    target: (years, persona) => (years <= 1 && persona.needsPaidCare ? 30 : 0),
    note: "Only modeled when paid daycare makes bottle feeding part of the plan.",
  },
  {
    id: "grocery-week",
    name: "Grocery Week",
    category: "Food",
    required: (years) => years > 1,
    photo: "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_1280.jpg",
    price: 45,
    target: (years) => (years <= 1 ? 0 : years * 52),
    note: "A child-sized weekly grocery add-on.",
  },
  {
    id: "diaper-box",
    name: "Diaper Box",
    category: "Diapers",
    required: (years) => years <= 5,
    photo: "https://cdn.pixabay.com/photo/2012/03/01/00/23/baby-19534_640.jpg",
    price: 32,
    target: (years) => (years <= 1 ? 30 : 88),
    note: "A big box, briefly.",
  },
  {
    id: "wipes-pack",
    name: "Wipes Pack",
    category: "Wipes",
    required: (years) => years <= 5,
    photo: "https://cdn.pixabay.com/photo/2020/11/16/17/30/baby-stuff-5749668_640.jpg",
    price: 7,
    target: (years) => (years <= 1 ? 24 : 72),
    note: "The official currency of sticky hands.",
  },
  {
    id: "kid-outfit",
    name: "Baby Outfit",
    category: "Clothes",
    required: true,
    photo: "https://cdn.pixabay.com/photo/2018/05/12/06/04/onesie-3392517_1280.jpg",
    price: 18,
    target: (years) => (years <= 1 ? 10 : years * 5),
    note: "Growth spurts do not respect budgets.",
  },
  {
    id: "shoes",
    name: "Shoes",
    category: "Shoes",
    required: (years) => years > 1,
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Baby_shoes_%28Unsplash%29.jpg/960px-Baby_shoes_%28Unsplash%29.jpg",
    price: 32,
    target: (years) => (years <= 1 ? 0 : years * 2),
    note: "Small shoes, recurring betrayal.",
  },
  {
    id: "doctor-copay",
    name: "Doctor Visit",
    category: "Health",
    required: false,
    photo: "https://cdn.pixabay.com/photo/2017/05/15/23/47/stethoscope-icon-2316460_1280.png",
    price: 45,
    target: () => 3,
    note: "Optional, but skipping it makes illness more expensive if you miss it early.",
  },
  {
    id: "baby-bottles",
    name: "Bottle Set",
    category: "Bottles",
    required: (years) => years <= 1,
    photo: "https://cdn.pixabay.com/photo/2012/04/12/18/57/baby-30177_1280.png",
    price: 22,
    target: (years) => (years <= 1 ? 3 : 0),
    note: "Bottles, nipples, and the drawer they take over.",
  },
  {
    id: "pacifier-pack",
    name: "Pacifier Pack",
    category: "Pacifiers",
    required: (years) => years <= 1,
    photo: "https://cdn.pixabay.com/photo/2022/10/20/20/41/pacifier-7535751_640.jpg",
    price: 9,
    target: (years) => (years <= 1 ? 4 : 0),
    note: "Several will disappear into another dimension.",
  },
  {
    id: "crib",
    name: "Crib",
    category: "Sleep",
    required: (years) => years <= 5,
    photo: "https://cdn.pixabay.com/photo/2015/08/16/04/03/crib-890565_1280.jpg",
    price: 240,
    target: (years) => (years <= 5 ? 1 : 0),
    note: "The first real furniture hit.",
  },
  {
    id: "crib-mattress",
    name: "Crib Mattress",
    category: "Sleep",
    required: (years) => years <= 5,
    photo: "https://cdn.pixabay.com/photo/2015/12/05/23/38/nursery-1078923_1280.jpg",
    price: 95,
    target: (years) => (years <= 5 ? 1 : 0),
    note: "A separate price tag, because of course.",
  },
  {
    id: "sleep-sacks",
    name: "Sleep Sack",
    category: "Sleep",
    required: (years) => years <= 1,
    photo: "https://cdn.pixabay.com/photo/2022/08/15/14/26/baby-7388054_640.jpg",
    price: 24,
    target: (years) => (years <= 1 ? 3 : 0),
    note: "Warm, safe sleep without loose blankets.",
  },
  {
    id: "childcare-week",
    name: "Daycare Week",
    category: "Care",
    required: (years, persona) => persona.needsPaidCare && years <= 5,
    photo: "https://cdn.pixabay.com/photo/2020/04/09/08/06/kid-5020226_1280.jpg",
    price: 195,
    stayHomePrice: 35,
    target: (years, persona) => {
      if (!persona.needsPaidCare) return Math.min(years, 5) * 12;
      return Math.min(years, 5) * 50;
    },
    note: "The line item that starts lifting weights.",
  },
  {
    id: "car-seat",
    name: "Car Seat",
    category: "Safety",
    required: true,
    photo: "https://cdn.pixabay.com/photo/2022/08/10/04/18/mother-7376325_1280.jpg",
    price: 120,
    target: (years) => (years <= 1 ? 1 : 2),
    note: "Non-negotiable, thankfully reusable.",
  },
  {
    id: "stroller",
    name: "Stroller",
    category: "Gear",
    required: (years) => years <= 5,
    photo: "https://cdn.pixabay.com/photo/2019/04/02/16/08/baby-carriage-4098055_1280.jpg",
    price: 160,
    target: (years) => (years <= 5 ? 1 : 0),
    note: "Errands become an equipment sport.",
  },
  {
    id: "baby-monitor",
    name: "Baby Monitor",
    category: "Gear",
    required: (years) => years <= 1,
    photo: "https://cdn.pixabay.com/photo/2023/01/25/13/47/nursery-7743630_1280.jpg",
    price: 70,
    target: (years) => (years <= 1 ? 1 : 0),
    note: "Peace of mind, sold separately.",
  },
  {
    id: "bath-kit",
    name: "Bath Kit",
    category: "Bath",
    required: (years) => years <= 1,
    photo: "https://cdn.pixabay.com/photo/2023/07/04/09/36/baby-8105822_1280.jpg",
    price: 34,
    target: (years) => (years <= 1 ? 1 : 0),
    note: "Tub, washcloths, soap, and slippery panic.",
  },
  {
    id: "care-supplies",
    name: "Care Supplies",
    category: "Health",
    required: (years) => years <= 5,
    photo: "https://cdn.pixabay.com/photo/2015/08/26/15/07/first-aid-908591_1280.jpg",
    price: 50,
    target: (years) => (years <= 1 ? 1 : 2),
    note: "Thermometer, fever reducer, saline, and midnight confidence.",
  },
  {
    id: "backpack",
    name: "Backpack",
    category: "School",
    required: (years) => years >= 5,
    photo: "https://cdn.pixabay.com/photo/2023/05/30/16/42/backpack-8029117_1280.png",
    price: 35,
    target: (years) => (years < 5 ? 0 : Math.ceil((years - 4) / 3)),
    note: "One zipper away from chaos.",
  },
  {
    id: "school-pack",
    name: "School Pack",
    category: "Supplies",
    required: (years) => years >= 5,
    photo: "https://cdn.pixabay.com/photo/2020/05/15/18/39/school-supplies-5174645_1280.png",
    price: 28,
    target: (years) => Math.max(0, years - 4),
    note: "Pencils, folders, glue, repeat.",
  },
  {
    id: "activity-fee",
    name: "Activity Fee",
    category: "Activities",
    required: (years) => years >= 5,
    photo: "https://cdn.pixabay.com/photo/2022/08/17/15/45/soccer-7392832_1280.jpg",
    price: 75,
    target: (years) => Math.max(0, years - 4),
    note: "Sports, clubs, trips, and snacks.",
  },
  {
    id: "emergency-100",
    name: "Emergency $100",
    category: "Buffer",
    required: true,
    photo: "https://cdn.pixabay.com/photo/2021/02/17/17/22/savings-6024919_1280.jpg",
    price: 100,
    target: (years) => years * 10,
    note: "Tires, fevers, and bad timing.",
  },
  {
    id: "college-year",
    name: "College Year",
    category: "College",
    required: false,
    photo: "https://cdn.pixabay.com/photo/2013/01/20/04/53/college-75535_1280.jpg",
    price: 9810,
    target: (years) => (years >= 18 ? 4 : 0),
    note: "Optional. Emotionally spicy.",
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
  riskSeed: Math.floor(Math.random() * 1000000),
  savings: new Set(["handMeDowns"]),
  purchases: Object.fromEntries(ITEMS.map((item) => [item.id, 0])),
};

const els = {
  personaGrid: document.querySelector("#personaGrid"),
  yearNumber: document.querySelector("#yearNumber"),
  yearStage: document.querySelector("#yearStage"),
  yearTrack: document.querySelector("#yearTrack"),
  lifeEvent: document.querySelector("#lifeEvent"),
  prevYear: document.querySelector("#prevYear"),
  nextYear: document.querySelector("#nextYear"),
  savingsGrid: document.querySelector("#savingsGrid"),
  ledgerHousehold: document.querySelector("#ledgerHousehold"),
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

let displayedRemaining = null;
let moneyAnimationFrame = null;

function getPersona() {
  return PERSONAS.find((persona) => persona.id === state.personaId);
}

function stageName(year) {
  if (year <= 1) return "Baby year";
  if (year <= 5) return "Early childhood";
  return "Age 18";
}

function eventApplies(event) {
  if (event.requiresPaidCare && !getPersona().needsPaidCare) return false;
  if (event.requiresSaving && !state.savings.has(event.requiresSaving)) return false;
  return true;
}

function seededRandom(seed) {
  let value = seed;
  value = (value ^ 61) ^ (value >>> 16);
  value += value << 3;
  value ^= value >>> 4;
  value *= 0x27d4eb2d;
  value ^= value >>> 15;
  return ((value >>> 0) % 10000) / 10000;
}

function fixedEventTotal() {
  return LIFE_EVENTS
    .filter((event) => event.year <= state.years && eventApplies(event))
    .reduce((sum, event) => sum + event.amount * state.childCount, 0);
}

function boughtRatio(itemId) {
  const item = ITEMS.find((candidate) => candidate.id === itemId);
  if (!item) return 0;
  const needed = Math.max(1, requiredQuantity(item));
  return Math.min(1, state.purchases[itemId] / needed);
}

function healthEvent() {
  const doctorRatio = boughtRatio("doctor-copay");
  const suppliesRatio = boughtRatio("care-supplies");
  const earlyCare = Math.max(doctorRatio, suppliesRatio * 0.5);
  const baseChance = state.years === 1 ? 0.48 : state.years === 5 ? 0.32 : 0.2;
  const chance = Math.max(0.08, baseChance - earlyCare * 0.28);
  const roll = seededRandom(state.riskSeed + state.years * 37 + state.childCount * 101);

  if (roll > chance) {
    return {
      title: "No illness",
      note: "This checkpoint gets lucky. The pediatrician bill stays boring.",
      cost: 0,
    };
  }

  const severityRoll = seededRandom(state.riskSeed + state.years * 53 + 17);
  const severity =
    severityRoll > 0.82
      ? { title: "Urgent care surprise", base: 950 }
      : severityRoll > 0.45
        ? { title: "Ear infection week", base: 320 }
        : { title: "Fever scare", base: 140 };
  const lateMultiplier = 1 + (1 - doctorRatio) * 1.25;
  const cost = Math.round(severity.base * lateMultiplier * state.childCount);
  const caught = doctorRatio >= 0.75 ? "Caught early." : doctorRatio > 0 ? "Partly caught." : "Caught late.";

  return {
    title: severity.title,
    note: `${caught} Doctor visits lower the chance and the damage.`,
    cost,
  };
}

function emergencyEvent() {
  const bufferRatio = boughtRatio("emergency-100");
  const baseChance = state.years === 1 ? 0.3 : state.years === 5 ? 0.38 : 0.46;
  const chance = Math.max(0.1, baseChance - bufferRatio * 0.18);
  const roll = seededRandom(state.riskSeed + state.years * 71 + state.childCount * 19);

  if (roll > chance) {
    return {
      title: "No emergency",
      note: "Nothing explodes this checkpoint. Rare, suspicious, welcome.",
      cost: 0,
    };
  }

  const base = state.years === 1 ? 450 : state.years === 5 ? 850 : 1600;
  const cost = Math.round(base * (1 - bufferRatio * 0.75));

  return {
    title: "Emergency hit",
    note: bufferRatio > 0 ? "Your $100 buffers absorb some of it." : "No buffer means the full hit lands.",
    cost,
  };
}

function eventImpactTotal() {
  return fixedEventTotal() + healthEvent().cost + emergencyEvent().cost;
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

function targetUnits(item) {
  if (typeof item.target !== "function") return 1;
  return Math.max(0, Math.ceil(item.target(state.years, getPersona())));
}

function requiredQuantity(item) {
  return targetUnits(item) * state.childCount;
}

function baseCost(item) {
  if (item.id === "childcare-week" && !getPersona().needsPaidCare) {
    return item.stayHomePrice;
  }

  return item.price;
}

function adjustedUnitCost(item) {
  let cost = baseCost(item);

  if (["formula-can", "grocery-week"].includes(item.id) && state.savings.has("wic") && isWicEligible()) {
    cost *= 0.65;
  }

  if (state.savings.has("costco") && ["grocery-week", "diaper-box", "wipes-pack"].includes(item.id)) {
    cost *= 0.92;
  }

  if (state.savings.has("handMeDowns")) {
    if (["kid-outfit", "shoes"].includes(item.id)) cost *= 0.6;
    if (item.id === "car-seat") cost *= 0.75;
    if (item.id === "backpack") cost *= 0.75;
  }

  if (item.id === "childcare-week" && getPersona().needsPaidCare) {
    if (state.savings.has("homeCare")) cost *= 0.865;

    if (state.savings.has("dhsCare") && isDhsEligible()) {
      const copay = dhsMonthlyCopay();
      if (copay !== null) {
        const householdCopay = copay * 12 * state.years;
        const careWeeks = Math.max(1, targetUnits(item) * state.childCount);
        cost = Math.min(cost, householdCopay / careWeeks);
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
  const subtotal = ITEMS.reduce((sum, item) => sum + itemTotal(item), 0) + savingsFees() + eventImpactTotal();
  return Math.max(0, subtotal);
}

function remainingTotal() {
  return totalBudget() - spentTotal();
}

function requiredItems() {
  return ITEMS.filter((item) => isItemRequired(item) && targetUnits(item) > 0);
}

function essentialsCovered() {
  const required = requiredItems();
  if (required.length === 0) return state.childCount;
  return Math.min(
    ...required.map((item) => Math.floor(state.purchases[item.id] / targetUnits(item))),
    state.childCount,
  );
}

function fullyCovered() {
  return remainingTotal() >= 0 ? essentialsCovered() : 0;
}

function setPurchase(itemId, nextValue) {
  state.purchases[itemId] = Math.max(0, Math.min(9999, nextValue));
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

function renderYearRun() {
  const event = LIFE_EVENTS.find((item) => item.year === state.years);
  const health = healthEvent();
  const emergency = emergencyEvent();
  const impact = eventImpactTotal();
  const impactText = impact === 0 ? "No budget hit" : `${impact > 0 ? "+" : ""}${money.format(impact)}`;
  const milestoneIndex = MILESTONES.findIndex((milestone) => milestone.years === state.years);

  els.yearNumber.textContent = String(state.years);
  els.yearStage.textContent = stageName(state.years);
  els.prevYear.disabled = milestoneIndex <= 0;
  els.nextYear.disabled = milestoneIndex === MILESTONES.length - 1;
  els.nextYear.textContent = state.years === 18 ? "Finished" : "Next";

  els.yearTrack.innerHTML = MILESTONES.map((milestone) => {
    const year = milestone.years;
    const status = year === state.years ? " is-current" : year < state.years ? " is-past" : "";

    return `
      <button class="year-dot${status}" type="button" data-year="${year}" aria-label="Jump to age ${year}">
        ${milestone.label}
      </button>
    `;
  }).join("");

  els.yearTrack.querySelectorAll("[data-year]").forEach((button) => {
    button.addEventListener("click", () => {
      state.years = Number(button.dataset.year);
      render();
    });
  });

  els.lifeEvent.innerHTML = `
    <span>At this point</span>
    <strong>${event.title}</strong>
    <p>${event.note}</p>
    <p><b>${health.title}:</b> ${health.note} ${money.format(health.cost)}</p>
    <p><b>${emergency.title}:</b> ${emergency.note} ${money.format(emergency.cost)}</p>
    <p>${impactText}</p>
  `;
}

function renderSavings() {
  els.savingsGrid.innerHTML = SAVINGS.map((saving) => {
    const active = state.savings.has(saving.id) ? " is-active" : "";
    let status = "";
    let statusClass = "is-neutral";

    if (saving.id === "wic") {
      status = isWicEligible() ? "Eligible" : "Not eligible";
      statusClass = isWicEligible() ? "is-eligible" : "is-ineligible";
    }

    if (saving.id === "dhsCare") {
      if (!getPersona().needsPaidCare) status = "Not needed";
      else if (isDhsEligible()) {
        status = `Eligible: ${money.format(dhsMonthlyCopay())}/mo`;
        statusClass = "is-eligible";
      } else {
        status = "Not eligible";
        statusClass = "is-ineligible";
      }
    }

    if (saving.id === "costco") {
      status = `${money.format(65 * state.years)} fee`;
    }

    return `
      <button class="saving-card${active}" type="button" data-saving="${saving.id}">
        <h3>${saving.name}</h3>
        <p>${saving.note}</p>
        ${status ? `<span class="saving-status ${statusClass}">${status}</span>` : ""}
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
  const previous = displayedRemaining;

  els.ledgerHousehold.textContent = getPersona().name;
  els.childCount.textContent = String(state.childCount);
  els.coveredCount.textContent = String(fullyCovered());
  els.stickyLedger.classList.toggle("is-danger", remaining < 0);

  if (displayedRemaining === null) {
    displayedRemaining = remaining;
    els.remainingMoney.textContent = money.format(remaining);
    return;
  }

  animateMoney(previous, remaining);
  showMoneyDelta(remaining - previous);
}

function animateMoney(fromValue, toValue) {
  if (moneyAnimationFrame) cancelAnimationFrame(moneyAnimationFrame);

  const start = performance.now();
  const duration = 360;

  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const nextValue = Math.round(fromValue + (toValue - fromValue) * eased);

    displayedRemaining = nextValue;
    els.remainingMoney.textContent = money.format(nextValue);

    if (progress < 1) {
      moneyAnimationFrame = requestAnimationFrame(tick);
    } else {
      displayedRemaining = toValue;
      els.remainingMoney.textContent = money.format(toValue);
      moneyAnimationFrame = null;
    }
  }

  moneyAnimationFrame = requestAnimationFrame(tick);
}

function showMoneyDelta(delta) {
  if (delta === 0) return;

  const bubble = document.createElement("span");
  bubble.className = "money-delta";
  bubble.textContent = `${delta < 0 ? "-" : "+"}${money.format(Math.abs(delta))}`;
  els.remainingMoney.parentElement.appendChild(bubble);
  bubble.addEventListener("animationend", () => bubble.remove(), { once: true });
}

function renderMeters() {
  const rows = requiredItems().map((item) => {
    const needed = requiredQuantity(item);
    const count = Math.min(state.purchases[item.id], needed);
    const percent = needed === 0 ? 100 : Math.round((count / needed) * 100);
    const status = percent < 50 ? " is-danger" : percent < 100 ? " is-warning" : "";

    return `
      <div class="meter-row${status}">
        <div class="meter-name">${item.category}</div>
        <div class="meter-track" aria-label="${item.category} coverage">
          <div class="meter-fill" style="--fill: ${percent}%"></div>
        </div>
        <div class="meter-value">${count}/${needed}</div>
      </div>
    `;
  });

  els.meterList.innerHTML = rows.join("");
}

function renderVerdict() {
  const covered = fullyCovered();
  const remaining = remainingTotal();
  const collegeTarget = ITEMS.find((item) => item.id === "college-year");
  const college = state.years === 18 && state.purchases["college-year"] >= targetUnits(collegeTarget) * state.childCount;
  let title = "Try again";
  let body = "The cart is missing essentials, or the household is underwater before the checkpoint.";

  if (covered === state.childCount && remaining >= 0) {
    title = "It works";
    body = `All ${state.childCount} attempted ${state.childCount === 1 ? "child is" : "children are"} covered through age ${state.years}.`;
  } else if (covered > 0) {
    title = `${covered} covered`;
    body = `${covered} ${covered === 1 ? "child has" : "children have"} the core needs funded, but the rest still need coverage.`;
  }

  if (state.years === 18 && covered === state.childCount && remaining >= 0) {
    body += college
      ? " College is paid too, which is financially heroic and emotionally suspicious."
      : " College is not paid, which is a very common American plot twist.";
  }

  els.progressTitle.textContent = `${getPersona().name}: Age ${state.years}`;
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
    const target = targetUnits(item);
    const disabled = unitCost === 0;
    const required = isItemRequired(item);
    const hiddenForEarlyCollege = item.id === "college-year" && state.years !== 18;
    const hiddenInactiveRequired = target === 0 && quantity === 0 && item.id !== "college-year";

    if (hiddenForEarlyCollege || hiddenInactiveRequired) return "";

    return `
      <article class="item-card${required ? "" : " is-optional"}">
        <div class="item-art">
          <img src="${item.photo}" alt="${item.name}" />
        </div>
        <div class="item-body">
          <h3>${item.name}</h3>
          <span class="item-price">${money.format(unitCost)}</span>
          ${target > 0 ? `<small class="${required ? "" : "optional-note"}">${required ? "Need" : "Optional need"} ${target * state.childCount}</small>` : ""}
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
    .filter((item) => state.purchases[item.id] > 0 && !(item.id === "college-year" && state.years !== 18))
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

  if (eventImpactTotal() !== 0) {
    purchasedRows.push(`
      <div class="receipt-row">
        <strong>Life events through age ${state.years}</strong>
        <span>${money.format(eventImpactTotal())}</span>
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
  renderYearRun();
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

els.nextYear.addEventListener("click", () => {
  const index = MILESTONES.findIndex((milestone) => milestone.years === state.years);
  state.years = MILESTONES[Math.min(MILESTONES.length - 1, index + 1)].years;
  render();
});

els.prevYear.addEventListener("click", () => {
  const index = MILESTONES.findIndex((milestone) => milestone.years === state.years);
  state.years = MILESTONES[Math.max(0, index - 1)].years;
  render();
});

els.autoBuy.addEventListener("click", () => {
  requiredItems().forEach((item) => {
    state.purchases[item.id] = requiredQuantity(item);
  });
  render();
});

els.resetGame.addEventListener("click", () => {
  ITEMS.forEach((item) => {
    state.purchases[item.id] = 0;
  });
  state.riskSeed = Math.floor(Math.random() * 1000000);
  render();
});

render();
