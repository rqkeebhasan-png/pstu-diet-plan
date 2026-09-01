/* ---------- ডেটা: সাপ্তাহিক মেনু ----------
   day: JS Date().getDay() কনভেনশন (রবি=0, সোম=1 ... শনি=6)
*/
const WEEK = [
  {
    day: 6, name: "শনিবার", short: "শনি",
    meals: {
      sokal: { items: "পরোটা ২টা + ডিম ভুনা ২টা" },
      dupur: { items: "ভাত + মুরগির মাংস + ডাল + সবজি" },
      raat:  { items: "ভাত + মাছ + ডাল + ভাজি" }
    },
    kcal: "~২৬০০", protein: "~১২০ গ্রাম"
  },
  {
    day: 0, name: "রবিবার", short: "রবি",
    meals: {
      sokal: { items: "খিচুড়ি এক বড় বাটি + ডিম ভাজি ১টা" },
      dupur: { items: "ভাত + মাছ + সবজি + ডাল" },
      raat:  { items: "ভাত + মুরগির মাংস + ভাজি" }
    },
    kcal: "~২৫০০", protein: "~১১০ গ্রাম"
  },
  {
    day: 1, name: "সোমবার", short: "সোম",
    meals: {
      sokal: { items: "পরোটা ২টা + ডিম ভাজি ২টা" },
      dupur: { items: "ভাত (২ প্লেট) + মুরগির মাংস + ডাল" },
      raat:  { items: "খিচুড়ি + ডিম ভুনা ১টা" }
    },
    kcal: "~২৫৫০", protein: "~১১৫ গ্রাম"
  },
  {
    day: 2, name: "মঙ্গলবার", short: "মঙ্গল",
    meals: {
      sokal: { items: "স্কিপ / ক্লাস থাকলে বাদ", note: "সময় না পেলে বাদ দাও, দুপুরে পুষিয়ে নেবে" },
      dupur: { items: "ভাত + মাছ + ডাল + সবজি + ভাজি" },
      raat:  { items: "ভাত + মুরগির মাংস + ডাল" }
    },
    kcal: "~২৪৫০", protein: "~১১০ গ্রাম"
  },
  {
    day: 3, name: "বুধবার", short: "বুধ",
    meals: {
      sokal: { items: "খিচুড়ি + ডিম ভুনা ১টা" },
      dupur: { items: "ভাত + মুরগির মাংস + সবজি" },
      raat:  { items: "ভাত + মাছ + ডাল + ভাজি" }
    },
    kcal: "~২৫০০", protein: "~১১৫ গ্রাম"
  },
  {
    day: 4, name: "বৃহস্পতিবার", short: "বৃহ",
    meals: {
      sokal: { items: "পরোটা ২টা + ডিম ভাজি ২টা + ডাল" },
      dupur: { items: "ভাত + মাছ + ডাল" },
      raat:  { items: "ভাত + মুরগির মাংস + সবজি + ভাজি" }
    },
    kcal: "~২৫৫০", protein: "~১২০ গ্রাম"
  },
  {
    day: 5, name: "শুক্রবার", short: "শুক্র",
    meals: {
      sokal: { items: "পরোটা ২টা + ডিম ভুনা ২টা", note: "ছুটির দিন, একটু স্পেশাল" },
      dupur: { items: "ভাত + মুরগির মাংস (বড় পিস) + ডাল + সবজি + ভাজি" },
      raat:  { items: "খিচুড়ি + ডিম ভাজি + মাছ" }
    },
    kcal: "~২৬৫০", protein: "~১২৫ গ্রাম"
  }
];

/* ---------- ডেটা: খাবারের আনুমানিক পুষ্টিমান (প্রতি সাধারণ hall সার্ভিং) ---------- */
const FOODS = [
  { name: "পরোটা (১টি)", kcal: 150, protein: 3, note: "ময়দা + তেল" },
  { name: "ডাল (১ বাটি)", kcal: 130, protein: 7, note: "মসুর/মুগ" },
  { name: "ভাজি (সবজি, ১ সার্ভিং)", kcal: 90, protein: 2, note: "" },
  { name: "ভাত (১ প্লেট, ~২৫০গ্রাম)", kcal: 325, protein: 6, note: "কার্ব-এর মূল উৎস" },
  { name: "মাছ (১ পিস, ঝোল)", kcal: 150, protein: 20, note: "" },
  { name: "সবজি তরকারি (১ বাটি)", kcal: 100, protein: 3, note: "" },
  { name: "মুরগির মাংস (১ সার্ভিং, ~১৫০গ্রাম)", kcal: 250, protein: 25, note: "সবচেয়ে ঘন প্রোটিন" },
  { name: "খিচুড়ি (১ প্লেট)", kcal: 380, protein: 12, note: "ডাল+চাল একসাথে" },
  { name: "ডিম ভাজি (১টি)", kcal: 90, protein: 6, note: "" },
  { name: "ডিম ভুনা (১টি, ঝোল সহ)", kcal: 110, protein: 6, note: "" }
];

const BN_DIGIT = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
const BN_MONTH = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];

function toBn(n){
  return String(n).split("").map(ch => (ch >= "0" && ch <= "9") ? BN_DIGIT[+ch] : ch).join("");
}

function bnDateString(d){
  return `${toBn(d.getDate())} ${BN_MONTH[d.getMonth()]}, ${toBn(d.getFullYear())}`;
}

function getToday(){
  const now = new Date();
  const dow = now.getDay();
  return { entry: WEEK.find(w => w.day === dow), dateStr: bnDateString(now) };
}

/* ---------- হোমপেজ হিরো রেন্ডার ---------- */
function renderTodayHero(){
  const mount = document.getElementById("today-mount");
  if (!mount) return;
  const { entry, dateStr } = getToday();

  const noteHtml = (m) => m.note ? `<span class="meal-note">${m.note}</span>` : "";

  mount.innerHTML = `
    <div class="today-head">
      <span class="day-name">আজ, ${entry.name}</span>
      <span class="date-str">${dateStr}</span>
    </div>
    <div class="meal-rows">
      <div class="meal-row"><div class="meal-time">সকাল</div><div class="meal-items">${entry.meals.sokal.items}${noteHtml(entry.meals.sokal)}</div></div>
      <div class="meal-row"><div class="meal-time">দুপুর</div><div class="meal-items">${entry.meals.dupur.items}${noteHtml(entry.meals.dupur)}</div></div>
      <div class="meal-row"><div class="meal-time">রাত</div><div class="meal-items">${entry.meals.raat.items}${noteHtml(entry.meals.raat)}</div></div>
    </div>
    <div class="target-bar">
      <div class="t-item"><div class="t-num">${entry.kcal}</div><div class="t-label">ক্যালরি লক্ষ্য</div></div>
      <div class="t-item"><div class="t-num">${entry.protein}</div><div class="t-label">প্রোটিন লক্ষ্য</div></div>
    </div>
  `;
}

/* ---------- সপ্তাহ-স্ট্রিপ (হোমপেজে ছোট নেভিগেশন) ---------- */
function renderWeekStrip(){
  const mount = document.getElementById("week-strip-mount");
  if (!mount) return;
  const today = new Date().getDay();
  mount.innerHTML = WEEK.map(w =>
    `<a href="week.html" class="${w.day === today ? "is-today" : ""}">${w.short}</a>`
  ).join("");
}

/* ---------- সাপ্তাহিক লেজার টেবিল (week.html) ---------- */
function renderLedger(){
  const mount = document.getElementById("ledger-mount");
  if (!mount) return;
  const today = new Date().getDay();
  mount.innerHTML = WEEK.map((w, i) => `
    <tr class="${w.day === today ? "is-today" : ""}">
      <td class="day-cell"><span class="num">${toBn(i+1)}</span>${w.name}</td>
      <td>${w.meals.sokal.items}${w.meals.sokal.note ? `<span class="meal-note">${w.meals.sokal.note}</span>` : ""}</td>
      <td>${w.meals.dupur.items}</td>
      <td>${w.meals.raat.items}</td>
      <td>${w.kcal}<br><span class="meal-note">${w.protein} প্রোটিন</span></td>
    </tr>
  `).join("");
}

/* ---------- ফুড রেফারেন্স টেবিল (nutrition.html) ---------- */
function renderFoodTable(){
  const mount = document.getElementById("food-table-mount");
  if (!mount) return;
  mount.innerHTML = FOODS.map(f => `
    <tr>
      <td>${f.name}</td>
      <td class="num">${toBn(f.kcal)}</td>
      <td class="num">${toBn(f.protein)} গ্রাম</td>
      <td>${f.note}</td>
    </tr>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderTodayHero();
  renderWeekStrip();
  renderLedger();
  renderFoodTable();
});
