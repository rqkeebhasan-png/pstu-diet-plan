// দিনের নাম, JS Date.getDay() অনুযায়ী: 0=রবি ... 6=শনি
const DAY_NAMES = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const DAY_SHORT = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি"];

// সপ্তাহের সম্পূর্ণ মেনু — শুধু ১০টি আইটেম দিয়ে তৈরি: পরোটা, ডাল, ভাজি, ভাত, মাছ, সবজি,
// মুরগি মাংস, খিচুড়ি, ডিম ভাজি, ডিম ভুনা
const WEEK = [
  { // রবিবার
    breakfast: { time: "সকাল ৮টা", items: "পরোটা (২টি) + ডিম ভুনা", kcal: 500, protein: 22 },
    lunch:     { time: "দুপুর ১টা", items: "ভাত + মাছ + সবজি + ডাল", kcal: 850, protein: 38 },
    snack:     { time: "বিকাল ৫টা", items: "ডিম ভাজি + মুড়ি", kcal: 300, protein: 12 },
    dinner:    { time: "রাত ৯টা", items: "ভাত + মুরগি মাংস + ভাজি", kcal: 800, protein: 38 }
  },
  { // সোমবার
    breakfast: { time: "সকাল ৮টা", items: "পরোটা (২টি) + ডাল", kcal: 480, protein: 18 },
    lunch:     { time: "দুপুর ১টা", items: "ভাত + মুরগি মাংস + সবজি + ডাল", kcal: 860, protein: 40 },
    snack:     { time: "বিকাল ৫টা", items: "ডিম ভুনা", kcal: 280, protein: 14 },
    dinner:    { time: "রাত ৯টা", items: "খিচুড়ি + ডিম ভাজি + ভাজি", kcal: 780, protein: 32 }
  },
  { // মঙ্গলবার
    breakfast: { time: "সকাল ৮টা", items: "পরোটা (২টি) + ডিম ভাজি", kcal: 500, protein: 20 },
    lunch:     { time: "দুপুর ১টা", items: "ভাত + মাছ + ভাজি + ডাল", kcal: 830, protein: 36 },
    snack:     { time: "বিকাল ৫টা", items: "ডাল + মুড়ি", kcal: 270, protein: 10 },
    dinner:    { time: "রাত ৯টা", items: "ভাত + মুরগি মাংস + সবজি", kcal: 820, protein: 38 }
  },
  { // বুধবার
    breakfast: { time: "সকাল ৮টা", items: "পরোটা (২টি) + ডিম ভুনা", kcal: 500, protein: 22 },
    lunch:     { time: "দুপুর ১টা", items: "খিচুড়ি + ডিম ভাজি", kcal: 650, protein: 26 },
    snack:     { time: "বিকাল ৫টা", items: "ডিম ভাজি", kcal: 220, protein: 13 },
    dinner:    { time: "রাত ৯টা", items: "ভাত + মাছ + সবজি + ডাল", kcal: 850, protein: 38 }
  },
  { // বৃহস্পতিবার
    breakfast: { time: "সকাল ৮টা", items: "পরোটা (২টি) + ডাল", kcal: 480, protein: 18 },
    lunch:     { time: "দুপুর ১টা", items: "ভাত + মুরগি মাংস + ভাজি + ডাল", kcal: 870, protein: 40 },
    snack:     { time: "বিকাল ৫টা", items: "ডিম ভুনা", kcal: 280, protein: 14 },
    dinner:    { time: "রাত ৯টা", items: "ভাত + মাছ + সবজি", kcal: 780, protein: 34 }
  },
  { // শুক্রবার — ফুটবলের দিন, বাড়তি এনার্জি
    breakfast: { time: "সকাল ৮টা", items: "পরোটা (২টি) + ডিম ভুনা + ডাল", kcal: 600, protein: 26 },
    lunch:     { time: "দুপুর ১টা", items: "ভাত + মুরগি মাংস + সবজি + ডাল", kcal: 900, protein: 42 },
    snack:     { time: "বিকাল ৫টা (খেলার আগে)", items: "ডিম ভাজি + মুড়ি (বাড়তি)", kcal: 350, protein: 15 },
    dinner:    { time: "রাত ৯টা", items: "খিচুড়ি + মাছ + ভাজি", kcal: 820, protein: 36 }
  },
  { // শনিবার
    breakfast: { time: "সকাল ৮টা", items: "পরোটা (২টি) + ডিম ভাজি", kcal: 500, protein: 20 },
    lunch:     { time: "দুপুর ১টা", items: "ভাত + মাছ + সবজি + ডাল", kcal: 850, protein: 38 },
    snack:     { time: "বিকাল ৫টা", items: "ডিম ভুনা", kcal: 280, protein: 14 },
    dinner:    { time: "রাত ৯টা", items: "ভাত + মুরগি মাংস + ভাজি", kcal: 800, protein: 36 }
  }
];

const MEAL_LABELS = {
  breakfast: "সকালের নাস্তা",
  lunch: "দুপুরের খাবার",
  snack: "বিকালের নাস্তা",
  dinner: "রাতের খাবার"
};

function dayTotal(day){
  return ["breakfast","lunch","snack","dinner"].reduce((acc, m) => {
    acc.kcal += day[m].kcal;
    acc.protein += day[m].protein;
    return acc;
  }, { kcal: 0, protein: 0 });
}

function todayIndex(){
  return new Date().getDay();
}

// ---------- হোম পেজ: আজকের প্লেট ----------
function renderHome(){
  const idx = todayIndex();
  const day = WEEK[idx];
  const total = dayTotal(day);

  const labelEl = document.querySelector("[data-today-label]");
  const titleEl = document.querySelector("[data-today-title]");
  if(labelEl) labelEl.textContent = "আজকের রুটিন";
  if(titleEl) titleEl.textContent = DAY_NAMES[idx];

  const timeline = document.querySelector("[data-timeline]");
  if(timeline){
    timeline.innerHTML = "";
    ["breakfast","lunch","snack","dinner"].forEach(m => {
      const meal = day[m];
      const row = document.createElement("div");
      row.className = "meal-row";
      row.innerHTML = `
        <div class="meal-time">${meal.time}</div>
        <div>
          <p class="meal-name">${MEAL_LABELS[m]}</p>
          <p class="meal-items">${meal.items}</p>
        </div>
        <div class="meal-macros"><b>${meal.kcal}</b> kcal<br>${meal.protein} g প্রোটিন</div>
      `;
      timeline.appendChild(row);
    });
  }

  const totalEl = document.querySelector("[data-day-total]");
  if(totalEl){
    totalEl.innerHTML = `মোট আজকে &nbsp; <b>${total.kcal} kcal</b> &nbsp;•&nbsp; <b>${total.protein} g প্রোটিন</b>`;
  }

  renderDayStrip(idx, (i) => {
    const d = WEEK[i];
    const t = dayTotal(d);
    if(titleEl) titleEl.textContent = DAY_NAMES[i] + (i === idx ? "" : " (প্রিভিউ)");
    timeline.innerHTML = "";
    ["breakfast","lunch","snack","dinner"].forEach(m => {
      const meal = d[m];
      const row = document.createElement("div");
      row.className = "meal-row";
      row.innerHTML = `
        <div class="meal-time">${meal.time}</div>
        <div>
          <p class="meal-name">${MEAL_LABELS[m]}</p>
          <p class="meal-items">${meal.items}</p>
        </div>
        <div class="meal-macros"><b>${meal.kcal}</b> kcal<br>${meal.protein} g প্রোটিন</div>
      `;
      timeline.appendChild(row);
    });
    if(totalEl) totalEl.innerHTML = `মোট &nbsp; <b>${t.kcal} kcal</b> &nbsp;•&nbsp; <b>${t.protein} g প্রোটিন</b>`;
  });
}

function renderDayStrip(idx, onClick){
  const strip = document.querySelector("[data-day-strip]");
  if(!strip) return;
  strip.innerHTML = "";
  DAY_SHORT.forEach((name, i) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "day-chip" + (i === idx ? " is-today" : "");
    chip.textContent = name;
    chip.addEventListener("click", () => onClick && onClick(i));
    strip.appendChild(chip);
  });
}

// ---------- মেনু পেজ: সাপ্তাহিক টেবিল ----------
function renderWeekTable(){
  const idx = todayIndex();
  const head = document.querySelector("[data-week-head]");
  const body = document.querySelector("[data-week-body]");
  if(!head || !body) return;

  head.innerHTML = "<th>বেলা</th>" + DAY_NAMES.map((n,i) =>
    `<th class="${i===idx?'today-col':''}">${n}${i===idx?' <br><small>(আজ)</small>':''}</th>`
  ).join("");

  const rows = ["breakfast","lunch","snack","dinner"];
  body.innerHTML = rows.map(m => {
    const cells = WEEK.map((d,i) => {
      const meal = d[m];
      return `<td class="${i===idx?'today-col':''}">${meal.items}<span class="macro">${meal.time} • ${meal.kcal} kcal • ${meal.protein}g প্রোটিন</span></td>`;
    }).join("");
    return `<tr><td class="meal-label">${MEAL_LABELS[m]}</td>${cells}</tr>`;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if(page === "home") renderHome();
  if(page === "menu") renderWeekTable();
});
