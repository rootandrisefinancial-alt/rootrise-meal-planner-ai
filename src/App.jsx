/* eslint-disable */
import { useState, useMemo } from "react";

const COLORS = {
  olive: "#3D4A2E",
  sage: "#7A8C6E",
  gold: "#B8965A",
  cream: "#F5F0E8",
  darkCream: "#EDE6D8",
  white: "#FFFFFF",
  text: "#2C3320",
  muted: "#8A9070",
};

const INVENTORY_SECTIONS = [
  {
    key: "protein",
    label: "Protein",
    emoji: "💪",
    items: ["Chicken breast","Ground beef","Ground turkey","Salmon","Tuna (canned)","Eggs","Tofu","Tempeh","Lentils","Chickpeas","Black beans","Kidney beans","Deli meat","Sausage","Bacon","Shrimp"],
  },
  {
    key: "fruits",
    label: "Fruits & Veggies",
    emoji: "🥦",
    items: ["Bananas","Apples","Oranges","Berries","Avocado","Spinach","Kale","Broccoli","Cauliflower","Carrots","Celery","Cucumber","Zucchini","Bell peppers","Tomatoes","Onions","Garlic","Potatoes","Sweet potatoes","Mushrooms","Lettuce","Cabbage","Lemons","Limes"],
  },
  {
    key: "dairy",
    label: "Dairy & Alternatives",
    emoji: "🥛",
    items: ["Milk","Oat milk","Almond milk","Butter","Margarine","Cheddar cheese","Mozzarella","Cream cheese","Sour cream","Greek yogurt","Plain yogurt","Heavy cream","Cottage cheese","Parmesan","Feta"],
  },
  {
    key: "grains",
    label: "Grains & Pasta",
    emoji: "🌾",
    items: ["White rice","Brown rice","Basmati rice","Jasmine rice","Quinoa","Pasta (spaghetti)","Pasta (penne)","Pasta (rotini)","Egg noodles","Rice noodles","Couscous","Farro","Barley","Oats","Rolled oats","Steel cut oats","Bread","Sourdough","Whole wheat bread","Pita","Naan","Flour tortillas","Flour","Cornmeal","Breadcrumbs","Panko"],
  },
  {
    key: "pantry",
    label: "Pantry",
    emoji: "🫙",
    items: ["Olive oil","Vegetable oil","Coconut oil","Canned tomatoes","Tomato paste","Coconut milk","Broth/stock","Soy sauce","Hot sauce","Vinegar","Honey","Maple syrup","Peanut butter","Almond butter","Canned beans","Salt","Pepper","Cumin","Paprika","Garlic powder","Onion powder","Oregano","Chili flakes","Cinnamon","Baking soda","Baking powder","Sugar","Brown sugar","Nutritional yeast","Coffee","Tea"],
  },
  {
    key: "freezer",
    label: "Freezer",
    emoji: "🧊",
    items: ["Frozen vegetables","Frozen fruit","Frozen chicken","Frozen fish","Frozen shrimp","Frozen edamame","Frozen pizza","Frozen meals","Ice cream","Frozen waffles","Frozen fries","Frozen corn","Frozen peas","Frozen spinach","Frozen berries"],
  },
  {
    key: "misc",
    label: "Miscellaneous",
    emoji: "🛒",
    items: ["Tortillas","Wraps","Rice cakes","Crackers","Cereal","Granola","Protein bars","Chips","Nuts","Seeds","Dried fruit","Jam","Salsa","Hummus","Mustard","Ketchup","Mayo","BBQ sauce","Salad dressing","Pasta sauce (jarred)","Dish soap","Tin foil","Parchment paper","Ziplock bags"],
  },
];

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MEALS = ["Breakfast","Lunch","Dinner"];

const styles = {
  app: {
    fontFamily: "'Georgia', serif",
    background: COLORS.cream,
    minHeight: "100vh",
    color: COLORS.text,
  },
  header: {
    background: COLORS.olive,
    padding: "20px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `4px solid ${COLORS.gold}`,
  },
  logo: {
    color: COLORS.cream,
    fontSize: "20px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    lineHeight: 1.2,
  },
  logoSub: {
    color: COLORS.gold,
    fontSize: "11px",
    fontFamily: "Arial, sans-serif",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginTop: "2px",
  },
  badge: {
    background: COLORS.gold,
    color: COLORS.olive,
    fontSize: "10px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    padding: "4px 10px",
    borderRadius: "20px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: COLORS.white,
    borderTop: `2px solid ${COLORS.darkCream}`,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "stretch",
    zIndex: 100,
    boxShadow: "0 -4px 20px rgba(61,74,46,0.10)",
  },
  navBtn: (active) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px",
    padding: "10px 4px 12px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    borderTop: active ? `3px solid ${COLORS.gold}` : "3px solid transparent",
    transition: "all 0.15s",
  }),
  navIcon: (active) => ({
    fontSize: "22px",
    lineHeight: 1,
    filter: active ? "none" : "grayscale(40%) opacity(0.5)",
    transition: "all 0.15s",
  }),
  navLabel: (active) => ({
    fontFamily: "Arial, sans-serif",
    fontSize: "10px",
    fontWeight: active ? "700" : "500",
    color: active ? COLORS.olive : COLORS.muted,
    letterSpacing: "0.3px",
    transition: "all 0.15s",
  }),
  content: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "28px 20px",
  },
  sectionTitle: {
    fontSize: "22px",
    color: COLORS.olive,
    marginBottom: "6px",
    fontWeight: "bold",
  },
  sectionSub: {
    fontFamily: "Arial, sans-serif",
    fontSize: "13px",
    color: COLORS.muted,
    marginBottom: "24px",
  },
  card: {
    background: COLORS.white,
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
    border: `1px solid ${COLORS.darkCream}`,
    boxShadow: "0 2px 8px rgba(61,74,46,0.06)",
  },
  goldCard: {
    background: `linear-gradient(135deg, ${COLORS.olive}, #2a3420)`,
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
    color: COLORS.cream,
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: `1.5px solid ${COLORS.darkCream}`,
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    color: COLORS.text,
    background: COLORS.cream,
    boxSizing: "border-box",
    outline: "none",
  },
  btn: {
    background: COLORS.olive,
    color: COLORS.cream,
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    fontFamily: "Arial, sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.3px",
  },
  btnGold: {
    background: COLORS.gold,
    color: COLORS.olive,
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    fontFamily: "Arial, sans-serif",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    letterSpacing: "0.3px",
  },
  btnOutline: {
    background: "transparent",
    color: COLORS.sage,
    border: `1.5px solid ${COLORS.sage}`,
    borderRadius: "8px",
    padding: "7px 14px",
    fontFamily: "Arial, sans-serif",
    fontSize: "12px",
    cursor: "pointer",
  },
  chip: (checked) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "20px",
    border: `1.5px solid ${checked ? COLORS.sage : COLORS.darkCream}`,
    background: checked ? `${COLORS.sage}18` : COLORS.cream,
    color: checked ? COLORS.olive : COLORS.muted,
    fontFamily: "Arial, sans-serif",
    fontSize: "12px",
    cursor: "pointer",
    margin: "3px",
    transition: "all 0.15s",
    fontWeight: checked ? "600" : "400",
  }),
  groceryItem: (checked) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    borderRadius: "8px",
    background: checked ? `${COLORS.sage}12` : COLORS.cream,
    marginBottom: "6px",
    textDecoration: checked ? "line-through" : "none",
    color: checked ? COLORS.muted : COLORS.text,
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    cursor: "pointer",
    border: `1px solid ${checked ? COLORS.sage + "30" : COLORS.darkCream}`,
    transition: "all 0.15s",
  }),
  mealCell: {
    background: COLORS.cream,
    border: `1px solid ${COLORS.darkCream}`,
    borderRadius: "8px",
    padding: "8px 10px",
    minHeight: "44px",
    fontFamily: "Arial, sans-serif",
    fontSize: "12px",
  },
  tipBox: {
    background: `${COLORS.gold}18`,
    border: `1.5px solid ${COLORS.gold}55`,
    borderRadius: "10px",
    padding: "14px 18px",
    marginBottom: "12px",
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  label: {
    fontFamily: "Arial, sans-serif",
    fontSize: "12px",
    fontWeight: "600",
    color: COLORS.muted,
    marginBottom: "6px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  progressBar: (pct) => ({
    height: "6px",
    background: COLORS.darkCream,
    borderRadius: "3px",
    overflow: "hidden",
    marginTop: "6px",
  }),
  progressFill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    background: `linear-gradient(90deg, ${COLORS.sage}, ${COLORS.gold})`,
    borderRadius: "3px",
    transition: "width 0.4s",
  }),
};

// ─── Kitchen Inventory Tab ────────────────────────────────────────────────────
function InventoryTab({ inventory, setInventory }) {
  const [customVal, setCustomVal] = useState("");
  const [customSection, setCustomSection] = useState("misc");
  const [collapsed, setCollapsed] = useState({});

  const toggle = (item) => {
    setInventory(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleSection = (key) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allSectionItems = INVENTORY_SECTIONS.flatMap(s => s.items);
  const customItems = inventory.filter(i => !allSectionItems.includes(i));

  const addCustom = () => {
    const trimmed = customVal.trim();
    if (trimmed && !inventory.includes(trimmed)) {
      setInventory(prev => [...prev, trimmed]);
    }
    setCustomVal("");
  };

  const sectionCount = (section) =>
    section.items.filter(i => inventory.includes(i)).length;

  return (
    <div>
      <div style={styles.sectionTitle}>Kitchen Inventory</div>
      <div style={styles.sectionSub}>Check off everything you already have at home — this prevents buying duplicates.</div>

      {/* Summary bar */}
      <div style={{ ...styles.card, background: `${COLORS.sage}12`, border: `1.5px solid ${COLORS.sage}40`, marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <div style={{ fontWeight: "bold", color: COLORS.olive, fontSize: "15px" }}>
              {inventory.length} items in your kitchen
            </div>
            <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: COLORS.muted, marginTop: "3px" }}>
              Build your meal plan next to see what you still need to buy.
            </div>
          </div>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
            {INVENTORY_SECTIONS.map(s => (
              <span key={s.key} style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: COLORS.sage, background: COLORS.white, border: `1px solid ${COLORS.sage}40`, borderRadius: "12px", padding: "3px 8px" }}>
                {s.emoji} {sectionCount(s)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      {INVENTORY_SECTIONS.map(section => {
        const count = sectionCount(section);
        const isCollapsed = collapsed[section.key];
        return (
          <div key={section.key} style={{ ...styles.card, padding: 0, overflow: "hidden", marginBottom: "10px" }}>
            <div
              onClick={() => toggleSection(section.key)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                cursor: "pointer",
                background: isCollapsed ? COLORS.cream : COLORS.white,
                borderBottom: isCollapsed ? "none" : `1px solid ${COLORS.darkCream}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "20px" }}>{section.emoji}</span>
                <span style={{ fontWeight: "bold", fontSize: "15px", color: COLORS.olive }}>{section.label}</span>
                {count > 0 && (
                  <span style={{ background: COLORS.sage, color: COLORS.white, borderRadius: "10px", fontSize: "11px", fontFamily: "Arial, sans-serif", fontWeight: "700", padding: "2px 8px" }}>
                    {count}
                  </span>
                )}
              </div>
              <span style={{ color: COLORS.muted, fontSize: "20px", lineHeight: 1, fontWeight: "300" }}>{isCollapsed ? "+" : "−"}</span>
            </div>

            {!isCollapsed && (
              <div style={{ padding: "12px 18px 16px" }}>
                {section.items.map(item => (
                  <span key={item} style={styles.chip(inventory.includes(item))} onClick={() => toggle(item)}>
                    {inventory.includes(item) ? "✓" : "+"} {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Add custom item */}
      <div style={styles.card}>
        <div style={styles.label}>Add a Custom Item</div>
        <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
          <select
            style={{ ...styles.input, width: "auto", flex: "0 0 auto", cursor: "pointer" }}
            value={customSection}
            onChange={e => setCustomSection(e.target.value)}
          >
            {INVENTORY_SECTIONS.map(s => (
              <option key={s.key} value={s.key}>{s.emoji} {s.label}</option>
            ))}
          </select>
          <input
            style={{ ...styles.input, flex: 1, minWidth: "140px" }}
            value={customVal}
            onChange={e => setCustomVal(e.target.value)}
            placeholder="Item name..."
            onKeyDown={e => e.key === "Enter" && addCustom()}
          />
          <button style={styles.btn} onClick={addCustom}>Add</button>
        </div>
        {customItems.length > 0 && (
          <div style={{ marginTop: "12px" }}>
            <div style={{ ...styles.label, marginBottom: "8px" }}>Your custom items</div>
            {customItems.map(item => (
              <span key={item} style={styles.chip(true)} onClick={() => toggle(item)}>
                ✓ {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── AI Meal Suggestion helper ────────────────────────────────────────
const DAILY_LIMIT = 3;
const RECIPE_LIMIT = 5;

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getSuggestionUsage() {
  try {
    const raw = localStorage.getItem("rr_ai_usage");
    const data = raw ? JSON.parse(raw) : {};
    const today = getTodayKey();
    return data.date === today ? data.count : 0;
  } catch { return 0; }
}

function incrementSuggestionUsage() {
  try {
    const today = getTodayKey();
    const count = getSuggestionUsage() + 1;
    localStorage.setItem("rr_ai_usage", JSON.stringify({ date: today, count }));
    return count;
  } catch { return 1; }
}

function getRecipeUsage() {
  try {
    const raw = localStorage.getItem("rr_recipe_usage");
    const data = raw ? JSON.parse(raw) : {};
    const today = getTodayKey();
    return data.date === today ? data.count : 0;
  } catch { return 0; }
}

function incrementRecipeUsage() {
  try {
    const today = getTodayKey();
    const count = getRecipeUsage() + 1;
    localStorage.setItem("rr_recipe_usage", JSON.stringify({ date: today, count }));
    return count;
  } catch { return 1; }
}

async function fetchRecipe({ mealName, inventory, preferences }) {
  const invList = inventory.length > 0 ? inventory.join(", ") : "a general pantry";
  const dietLabel = preferences.length > 0 ? preferences.join(", ") : "no restrictions";

  const prompt = `You are a practical recipe assistant for a Canadian household focused on budget-friendly cooking.

Meal to cook: ${mealName}

Ingredients available in their kitchen: ${invList}

Dietary preferences: ${dietLabel}

Create a simple, practical recipe for this meal.

Rules:
- Use as many of the available ingredients as possible
- Keep it simple - home cook skill level
- Under 45 minutes total
- List ingredients in two groups: "From Your Kitchen" (ingredients they have) and "You Will Need" (additional ingredients to buy)
- Keep "You Will Need" to 3 items or fewer if possible

Respond ONLY with valid JSON, no markdown, no explanation:
{
  "title": "meal name",
  "prepTime": "X mins",
  "cookTime": "X mins",
  "servings": "X",
  "fromKitchen": ["ingredient 1 with amount", "ingredient 2 with amount"],
  "needToBuy": ["ingredient 1 with amount", "ingredient 2 with amount"],
  "steps": ["Step 1...", "Step 2...", "Step 3..."],
  "tip": "one budget or cooking tip"
}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  const raw = data.content?.map(b => b.text || "").join("").trim();
  const text = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(text);
}

async function fetchMealSuggestions({ inventory, preferences, days, existingMeals }) {
  const dietLabel = preferences.length > 0 ? preferences.join(", ") : "no specific restrictions";
  const invList = inventory.length > 0 ? inventory.join(", ") : "a general pantry";
  const lockedInfo = days.map(day => {
    const b = existingMeals[`${day}-Breakfast`];
    const l = existingMeals[`${day}-Lunch`];
    const d = existingMeals[`${day}-Dinner`];
    const locked = [b && `Breakfast: ${b}`, l && `Lunch: ${l}`, d && `Dinner: ${d}`].filter(Boolean);
    return locked.length ? `${day}: ${locked.join(", ")}` : null;
  }).filter(Boolean).join(" | ");

  const prompt = `You are a practical meal planning assistant for a Canadian household focused on budget-friendly cooking.

The client has these items in their kitchen: ${invList}

Dietary preferences: ${dietLabel}

Generate meal suggestions for these days: ${days.join(", ")}.
${lockedInfo ? `These meals are already planned and must NOT be replaced: ${lockedInfo}` : ""}

Rules:
- Prioritise using what they already have
- Keep meals simple, realistic, and budget-friendly
- Suggest meals a home cook can make in under 45 minutes
- Vary proteins and do not repeat the same meal twice in a week
- Each meal name should be short (3-6 words max)

Respond ONLY with a valid JSON object, no markdown, no explanation. Format:
{
  "Monday": { "Breakfast": "meal name", "Lunch": "meal name", "Dinner": "meal name" },
  "Tuesday": { ... }
}
Only include the days requested. Only include meal slots that are NOT already locked.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  const raw = data.content?.map(b => b.text || "").join("").trim();
  const text = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(text);
}

// ─── Meal Plan Tab ────────────────────────────────────────────────
function MealPlanTab({ meals, setMeals, inventory, preferences, setPreferences }) {
  const [loadingWeek, setLoadingWeek] = useState(false);
  const [loadingDay, setLoadingDay] = useState(null);
  const [error, setError] = useState(null);
  const [usageCount, setUsageCount] = useState(getSuggestionUsage);
  const [recipeCount, setRecipeCount] = useState(getRecipeUsage);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(null);
  const [recipeError, setRecipeError] = useState(null);

  const recipesRemaining = RECIPE_LIMIT - recipeCount;
  const recipeLimitReached = recipesRemaining <= 0;

  const viewRecipe = async (mealName) => {
    if (!mealName || recipeLimitReached) return;
    setLoadingRecipe(mealName);
    setRecipeError(null);
    try {
      const recipe = await fetchRecipe({ mealName, inventory, preferences });
      setActiveRecipe(recipe);
      setRecipeCount(incrementRecipeUsage());
    } catch (e) {
      setRecipeError("Couldn't load recipe. Please try again.");
    }
    setLoadingRecipe(null);
  };

  const tapsRemaining = DAILY_LIMIT - usageCount;
  const limitReached = tapsRemaining <= 0;

  const PREF_OPTIONS = [
    "Vegetarian", "Vegan", "Gluten-free", "Dairy-free",
    "Nut-free", "Low-carb", "Halal", "Kid-friendly",
  ];

  const update = (day, meal, value) => {
    setMeals(prev => ({ ...prev, [`${day}-${meal}`]: value }));
  };

  const togglePref = (pref) => {
    setPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const suggestWeek = async () => {
    if (limitReached) return;
    setLoadingWeek(true);
    setError(null);
    try {
      const result = await fetchMealSuggestions({ inventory, preferences, days: DAYS, existingMeals: meals });
      const updated = { ...meals };
      DAYS.forEach(day => {
        MEALS.forEach(meal => {
          const key = `${day}-${meal}`;
          if (!updated[key] && result[day]?.[meal]) updated[key] = result[day][meal];
        });
      });
      setMeals(updated);
      setUsageCount(incrementSuggestionUsage());
    } catch (e) {
      setError("Couldn't generate suggestions. Please try again.");
    }
    setLoadingWeek(false);
  };

  const suggestDay = async (day) => {
    if (limitReached) return;
    setLoadingDay(day);
    setError(null);
    try {
      const result = await fetchMealSuggestions({ inventory, preferences, days: [day], existingMeals: {} });
      const updated = { ...meals };
      MEALS.forEach(meal => {
        const key = `${day}-${meal}`;
        if (result[day]?.[meal]) updated[key] = result[day][meal];
      });
      setMeals(updated);
      setUsageCount(incrementSuggestionUsage());
    } catch (e) {
      setError("Couldn't generate suggestions. Please try again.");
    }
    setLoadingDay(null);
  };

  const clearDay = (day) => {
    const updated = { ...meals };
    MEALS.forEach(meal => { delete updated[`${day}-${meal}`]; });
    setMeals(updated);
  };

  const filledCount = DAYS.reduce((acc, day) =>
    acc + MEALS.filter(m => meals[`${day}-${m}`]).length, 0);

  return (
    <div>
      <div style={styles.sectionTitle}>Weekly Meal Plan</div>
      <div style={styles.sectionSub}>Fill in manually or let AI suggest meals based on your kitchen inventory.</div>

      {/* Preferences */}
      <div style={styles.card}>
        <div style={styles.label}>My Dietary Preferences</div>
        <div style={{ marginTop: "8px" }}>
          {PREF_OPTIONS.map(pref => (
            <span key={pref} style={styles.chip(preferences.includes(pref))} onClick={() => togglePref(pref)}>
              {preferences.includes(pref) ? "v" : "+"} {pref}
            </span>
          ))}
        </div>
        {preferences.length === 0 && (
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: COLORS.muted, marginTop: "8px" }}>
            No preferences selected - AI will suggest any meals.
          </div>
        )}
      </div>

      {/* AI suggest week button */}
      <div style={{ ...styles.card, background: `linear-gradient(135deg, ${COLORS.olive}, #2a3420)`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ color: COLORS.gold, fontWeight: "bold", fontSize: "14px", marginBottom: "3px" }}>AI Meal Suggestions</div>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: `${COLORS.cream}AA`, lineHeight: 1.5 }}>
            {limitReached
              ? "You have used all 3 suggestions for today - come back tomorrow!"
              : inventory.length > 0
                ? `Using your ${inventory.length} pantry items to suggest budget-friendly meals.`
                : "Add items to your Kitchen Inventory first for best results."}
          </div>
          {!limitReached && (
            <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: `${COLORS.cream}66`, marginTop: "4px" }}>
              {tapsRemaining} of {DAILY_LIMIT} suggestions remaining today
            </div>
          )}
        </div>
        <button
          onClick={suggestWeek}
          disabled={loadingWeek || limitReached}
          style={{ ...styles.btnGold, opacity: (loadingWeek || limitReached) ? 0.5 : 1, whiteSpace: "nowrap", minWidth: "140px" }}
        >
          {loadingWeek ? "Thinking..." : limitReached ? "Limit reached" : "Suggest My Week"}
        </button>
      </div>

      {error && (
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#c0392b", background: "#fdf0ee", border: "1px solid #f5c6c0", borderRadius: "8px", padding: "10px 14px", marginBottom: "12px" }}>
          {error}
        </div>
      )}

      {/* Progress */}
      {filledCount > 0 && (
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: COLORS.muted, marginBottom: "10px" }}>
          {filledCount} of {DAYS.length * MEALS.length} meals planned
          <div style={styles.progressBar()}>
            <div style={styles.progressFill((filledCount / (DAYS.length * MEALS.length)) * 100)} />
          </div>
        </div>
      )}

      {/* Day cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {DAYS.map(day => (
          <div key={day} style={styles.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ fontWeight: "bold", fontSize: "15px", color: COLORS.olive }}>{day}</div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => suggestDay(day)}
                  disabled={loadingDay === day || limitReached}
                  style={{ ...styles.btnOutline, fontSize: "11px", padding: "5px 10px", borderColor: limitReached ? COLORS.muted : COLORS.gold, color: limitReached ? COLORS.muted : COLORS.gold, opacity: limitReached ? 0.5 : 1 }}
                >
                  {loadingDay === day ? "..." : "Suggest"}
                </button>
                <button onClick={() => clearDay(day)} style={{ ...styles.btnOutline, fontSize: "11px", padding: "5px 10px" }}>
                  Clear
                </button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {MEALS.map(meal => {
                const mealVal = meals[`${day}-${meal}`] || "";
                return (
                  <div key={meal} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: "700", color: COLORS.gold, width: "68px", flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {meal}
                    </div>
                    <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
                      <input
                        style={{ ...styles.input, flex: 1, padding: "8px 12px", fontSize: "13px", paddingRight: mealVal ? "80px" : "12px" }}
                        placeholder={`e.g. ${meal === "Breakfast" ? "Scrambled eggs & toast" : meal === "Lunch" ? "Lentil soup" : "Chicken stir fry"}`}
                        value={mealVal}
                        onChange={e => update(day, meal, e.target.value)}
                      />
                      {mealVal && (
                        <button
                          onClick={() => viewRecipe(mealVal)}
                          disabled={loadingRecipe === mealVal || recipeLimitReached}
                          style={{
                            position: "absolute", right: "6px",
                            background: recipeLimitReached ? COLORS.muted : COLORS.sage,
                            color: COLORS.white, border: "none", borderRadius: "6px",
                            fontSize: "10px", fontFamily: "Arial, sans-serif", fontWeight: "700",
                            padding: "4px 8px", cursor: recipeLimitReached ? "default" : "pointer",
                            opacity: recipeLimitReached ? 0.5 : 1, whiteSpace: "nowrap",
                          }}
                        >
                          {loadingRecipe === mealVal ? "..." : "Recipe"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Recipe limit indicator */}
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: COLORS.muted, textAlign: "center", marginTop: "4px", marginBottom: "8px" }}>
        {recipeLimitReached
          ? "Recipe limit reached for today - resets at midnight"
          : `${recipesRemaining} of ${RECIPE_LIMIT} recipe views remaining today - tap Recipe next to any meal`}
      </div>

      {/* Recipe error */}
      {recipeError && (
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#c0392b", background: "#fdf0ee", border: "1px solid #f5c6c0", borderRadius: "8px", padding: "10px 14px", marginBottom: "12px" }}>
          {recipeError}
        </div>
      )}

      {/* Recipe Modal */}
      {activeRecipe && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(61,74,46,0.7)", zIndex: 200,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
        }} onClick={() => setActiveRecipe(null)}>
          <div
            style={{
              background: COLORS.white, borderRadius: "20px 20px 0 0",
              padding: "24px 20px 40px", width: "100%", maxWidth: "600px",
              maxHeight: "85vh", overflowY: "auto",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Handle */}
            <div style={{ width: "40px", height: "4px", background: COLORS.darkCream, borderRadius: "2px", margin: "0 auto 16px" }} />

            {/* Title */}
            <div style={{ fontWeight: "bold", fontSize: "20px", color: COLORS.olive, marginBottom: "4px" }}>{activeRecipe.title}</div>
            <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: COLORS.muted, marginBottom: "16px" }}>
              Prep: {activeRecipe.prepTime} &nbsp;|&nbsp; Cook: {activeRecipe.cookTime} &nbsp;|&nbsp; Serves: {activeRecipe.servings}
            </div>

            {/* From Kitchen */}
            {activeRecipe.fromKitchen?.length > 0 && (
              <div style={{ ...styles.card, background: `${COLORS.sage}12`, border: `1px solid ${COLORS.sage}40`, marginBottom: "12px" }}>
                <div style={{ ...styles.label, color: COLORS.sage, marginBottom: "8px" }}>From Your Kitchen</div>
                {activeRecipe.fromKitchen.map((ing, i) => (
                  <div key={i} style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: COLORS.text, padding: "3px 0" }}>
                    v {ing}
                  </div>
                ))}
              </div>
            )}

            {/* Need to buy */}
            {activeRecipe.needToBuy?.length > 0 && (
              <div style={{ ...styles.card, background: `${COLORS.gold}12`, border: `1px solid ${COLORS.gold}40`, marginBottom: "12px" }}>
                <div style={{ ...styles.label, color: COLORS.gold, marginBottom: "8px" }}>You Will Need to Buy</div>
                {activeRecipe.needToBuy.map((ing, i) => (
                  <div key={i} style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: COLORS.text, padding: "3px 0" }}>
                    + {ing}
                  </div>
                ))}
              </div>
            )}

            {/* Steps */}
            <div style={styles.label}>Steps</div>
            {activeRecipe.steps?.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", marginTop: "6px" }}>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%", background: COLORS.olive,
                  color: COLORS.cream, fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: "700",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>{i + 1}</div>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: COLORS.text, lineHeight: 1.5, paddingTop: "3px" }}>{step}</div>
              </div>
            ))}

            {/* Tip */}
            {activeRecipe.tip && (
              <div style={{ background: COLORS.darkCream, borderRadius: "8px", padding: "12px 14px", marginTop: "8px" }}>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: "700", color: COLORS.gold, marginBottom: "3px" }}>Tip</div>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: COLORS.text, lineHeight: 1.5 }}>{activeRecipe.tip}</div>
              </div>
            )}

            <button
              onClick={() => setActiveRecipe(null)}
              style={{ ...styles.btn, width: "100%", marginTop: "16px", padding: "14px" }}
            >
              Close Recipe
            </button>
          </div>
        </div>
      )}

      <div style={{ ...styles.card, marginTop: "8px", background: COLORS.olive }}>
        <div style={{ color: COLORS.gold, fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>Budget Tip</div>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: COLORS.cream, lineHeight: 1.5 }}>
          Plan meals around what is already in your kitchen first, then build around weekly sales.
          Batch cooking 1-2 proteins on Sunday saves time and money all week.
        </div>
      </div>
    </div>
  );
}

// ─── Grocery List Tab ─────────────────────────────────────────────────────
function GroceryTab({ inventory, meals, groceryList, setGroceryList, checked, setChecked }) {
  const [newItem, setNewItem] = useState("");
  const [newCategory, setNewCategory] = useState("misc");
  const [collapsedCats, setCollapsedCats] = useState({});
  const [shareMsg, setShareMsg] = useState("");

  function getCategoryForItem(name) {
    for (const section of INVENTORY_SECTIONS) {
      if (section.items.some(i => i.toLowerCase() === name.toLowerCase())) return section.key;
    }
    return "misc";
  }

  const normalisedList = groceryList.map((item, idx) =>
    typeof item === "string"
      ? { id: `legacy-${idx}`, name: item, category: getCategoryForItem(item) }
      : item
  );

  const addItem = () => {
    const trimmed = newItem.trim();
    if (!trimmed) return;
    const alreadyExists = normalisedList.some(i => i.name.toLowerCase() === trimmed.toLowerCase());
    if (!alreadyExists) {
      const newEntry = { id: `item-${Date.now()}`, name: trimmed, category: newCategory };
      setGroceryList([...normalisedList, newEntry]);
    }
    setNewItem("");
  };

  const removeItem = (id) => {
    setGroceryList(normalisedList.filter(i => i.id !== id));
    setChecked(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  const toggleCheck = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCat = (key) => setCollapsedCats(prev => ({ ...prev, [key]: !prev[key] }));

  const clearChecked = () => {
    const checkedIds = new Set(Object.keys(checked).filter(id => checked[id]));
    setGroceryList(normalisedList.filter(i => !checkedIds.has(i.id)));
    setChecked({});
  };

  const shareList = () => {
    const uncheckedItems = normalisedList.filter(i => !checked[i.id]);
    if (uncheckedItems.length === 0) {
      setShareMsg("Nothing left to share - list is complete!");
      setTimeout(() => setShareMsg(""), 3000);
      return;
    }
    const grouped = INVENTORY_SECTIONS.map(section => ({
      ...section,
      groceries: uncheckedItems.filter(i => i.category === section.key),
    })).filter(s => s.groceries.length > 0);

    let text = "Root & Rise Grocery List\n\n";
    grouped.forEach(section => {
      text += section.emoji + " " + section.label + "\n";
      section.groceries.forEach(item => { text += "[ ] " + item.name + "\n"; });
      text += "\n";
    });
    text += "---\nGenerated by Root & Rise Meal Planner\nrootandrisefinancial.ca";

    if (navigator.share) {
      navigator.share({ title: "My Grocery List", text: text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setShareMsg("List copied to clipboard!");
        setTimeout(() => setShareMsg(""), 3000);
      }).catch(() => {
        setShareMsg("Sharing not supported on this browser.");
        setTimeout(() => setShareMsg(""), 3000);
      });
    }
  };

  const allKnownItems = INVENTORY_SECTIONS.flatMap(s => s.items);
  const mealText = Object.values(meals).join(" ").toLowerCase();
  const listNames = new Set(normalisedList.map(i => i.name.toLowerCase()));
  const suggestions = allKnownItems.filter(item =>
    !inventory.includes(item) &&
    !listNames.has(item.toLowerCase()) &&
    mealText.includes(item.toLowerCase())
  );

  const addSuggestion = (item) => {
    const newEntry = { id: `item-${Date.now()}-${item}`, name: item, category: getCategoryForItem(item) };
    setGroceryList([...normalisedList, newEntry]);
  };

  const done = normalisedList.filter(i => checked[i.id]).length;
  const total = normalisedList.length;

  const grouped = INVENTORY_SECTIONS.map(section => ({
    ...section,
    groceries: normalisedList.filter(i => i.category === section.key),
  })).filter(s => s.groceries.length > 0);

  const uncategorised = normalisedList.filter(i => !INVENTORY_SECTIONS.find(s => s.key === i.category));

  return (
    <div>
      <div style={styles.sectionTitle}>Grocery List</div>
      <div style={styles.sectionSub}>Only the gaps - organised by aisle so shopping is faster.</div>

      {total > 0 && (
        <div style={{ ...styles.card, background: `${COLORS.sage}12`, border: `1.5px solid ${COLORS.sage}40`, marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <div>
              <div style={{ fontWeight: "bold", color: COLORS.olive, fontSize: "15px" }}>{done} of {total} items collected</div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: COLORS.muted, marginTop: "2px" }}>{total - done} still needed</div>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button style={{ ...styles.btnGold, fontSize: "11px", padding: "5px 12px" }} onClick={shareList}>
                Share List
              </button>
              {done > 0 && (
                <button style={{ ...styles.btnOutline, fontSize: "11px", padding: "5px 10px", color: "#c0392b", borderColor: "#c0392b" }} onClick={clearChecked}>
                  Remove checked
                </button>
              )}
              <button style={{ ...styles.btnOutline, fontSize: "11px", padding: "5px 10px" }} onClick={() => setChecked({})}>
                Uncheck all
              </button>
            </div>
          </div>
          <div style={styles.progressBar()}>
            <div style={styles.progressFill(total ? (done / total) * 100 : 0)} />
          </div>
        </div>
      )}

      {shareMsg && (
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: COLORS.sage, background: `${COLORS.sage}15`, border: `1px solid ${COLORS.sage}40`, borderRadius: "8px", padding: "10px 14px", marginBottom: "12px", textAlign: "center", fontWeight: "600" }}>
          {shareMsg}
        </div>
      )}

      {suggestions.length > 0 && (
        <div style={styles.card}>
          <div style={styles.label}>Suggested from your meal plan</div>
          <div style={{ marginTop: "8px" }}>
            {suggestions.map(item => (
              <span key={item} style={styles.chip(false)} onClick={() => addSuggestion(item)}>
                + {item}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={styles.card}>
        <div style={styles.label}>Add an Item</div>
        <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
          <select
            style={{ ...styles.input, width: "auto", flex: "0 0 auto", cursor: "pointer" }}
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          >
            {INVENTORY_SECTIONS.map(s => (
              <option key={s.key} value={s.key}>{s.emoji} {s.label}</option>
            ))}
          </select>
          <input
            style={{ ...styles.input, flex: 1, minWidth: "140px" }}
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="Item name..."
            onKeyDown={e => e.key === "Enter" && addItem()}
          />
          <button style={styles.btn} onClick={addItem}>Add</button>
        </div>
      </div>

      {total === 0 && (
        <div style={{ ...styles.card, textAlign: "center", color: COLORS.muted, fontFamily: "Arial, sans-serif", fontSize: "13px", padding: "32px 20px" }}>
          Your list is empty. Add items above or fill in your meal plan to get suggestions.
        </div>
      )}

      {grouped.map(section => {
        const isCollapsed = collapsedCats[section.key];
        const sectionDone = section.groceries.filter(i => checked[i.id]).length;
        return (
          <div key={section.key} style={{ ...styles.card, padding: 0, overflow: "hidden", marginBottom: "10px" }}>
            <div
              onClick={() => toggleCat(section.key)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 18px", cursor: "pointer", background: isCollapsed ? COLORS.cream : COLORS.white, borderBottom: isCollapsed ? "none" : `1px solid ${COLORS.darkCream}` }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "18px" }}>{section.emoji}</span>
                <span style={{ fontWeight: "bold", fontSize: "14px", color: COLORS.olive }}>{section.label}</span>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: COLORS.muted }}>{sectionDone}/{section.groceries.length}</span>
              </div>
              <span style={{ color: COLORS.muted, fontSize: "18px", fontWeight: "300" }}>{isCollapsed ? "+" : "-"}</span>
            </div>
            {!isCollapsed && (
              <div style={{ padding: "8px 14px 12px" }}>
                {section.groceries.map(item => (
                  <div key={item.id} style={styles.groceryItem(checked[item.id])} onClick={() => toggleCheck(item.id)}>
                    <span style={{ fontSize: "16px" }}>{checked[item.id] ? "[x]" : "[ ]"}</span>
                    <span style={{ flex: 1 }}>{item.name}</span>
                    <span style={{ color: COLORS.muted, fontSize: "18px", cursor: "pointer", padding: "0 4px", lineHeight: 1 }} onClick={e => { e.stopPropagation(); removeItem(item.id); }}>x</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {uncategorised.length > 0 && (
        <div style={styles.card}>
          <div style={styles.label}>Other</div>
          {uncategorised.map(item => (
            <div key={item.id} style={styles.groceryItem(checked[item.id])} onClick={() => toggleCheck(item.id)}>
              <span style={{ fontSize: "16px" }}>{checked[item.id] ? "[x]" : "[ ]"}</span>
              <span style={{ flex: 1 }}>{item.name}</span>
              <span style={{ color: COLORS.muted, fontSize: "18px", cursor: "pointer", padding: "0 4px" }} onClick={e => { e.stopPropagation(); removeItem(item.id); }}>x</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Savings Tips Tab ─────────────────────────────────────────────────────────
function SavingsTab() {
  const tips = [
    {
      emoji: "📱",
      title: "Flipp App — Price Matching Made Easy",
      body: "Flipp aggregates weekly flyers from all major Canadian grocery chains (Superstore, Safeway, Save-On-Foods, Walmart, Costco, and more). Search any item on your list to see who has the best price this week — then price match at any store that offers it.",
      cta: "Download Flipp → flipp.com",
      link: "https://flipp.com",
    },
    {
      emoji: "🥦",
      title: "Imperfect Produce Boxes",
      body: "Imperfect produce boxes deliver cosmetically flawed fruits and vegetables at a steep discount — same nutrition, just not Instagram-worthy. Two great options for Victoria and BC: BCause is a Victoria-local option with a community focus, and Odd Bunch serves BC province-wide. Both are excellent for households that cook regularly and want to cut food costs while reducing waste.",
      links: [
        { label: "BCause (Victoria) → bcause.ca", url: "https://bcause.ca" },
        { label: "Odd Bunch (BC-wide) → oddbunch.ca", url: "https://oddbunch.ca" },
      ],
    },
    {
      emoji: "🏷️",
      title: "Price Match at Checkout",
      body: "Most major Canadian grocers will honour a competitor's flyer price without you having to drive anywhere. Bring up the Flipp app at the till, show the price, and ask for a match. No extra trips needed.",
    },
    {
      emoji: "🛒",
      title: "Shop the Perimeter First",
      body: "Fresh produce, proteins, and dairy are on the outer edges of the store. Fill your cart here first — these are typically the best value per nutrient. Processed items in the middle aisles cost more and add less to your budget per serving.",
    },
    {
      emoji: "❄️",
      title: "Frozen = Smart, Not Cheap",
      body: "Frozen vegetables are flash-frozen at peak nutrition and are often half the price of fresh. Keep a few bags on hand as a buffer for weeks when fresh produce is expensive.",
    },
    {
      emoji: "📦",
      title: "Subscription Box Strategy",
      body: "Food subscription boxes work best as a supplement, not a replacement. Use them for staples that are cheaper in bulk (Costco, Bulk Barn) and produce boxes for perishables. Compare per-unit cost before committing.",
    },
  ];

  return (
    <div>
      <div style={styles.sectionTitle}>Savings Strategies</div>
      <div style={styles.sectionSub}>Smart shopping tools and habits to stretch your grocery budget further.</div>

      {tips.map((tip, i) => (
        <div key={i} style={styles.tipBox}>
          <div style={{ fontSize: "24px", lineHeight: 1, marginTop: "2px" }}>{tip.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold", fontSize: "15px", color: COLORS.olive, marginBottom: "5px" }}>{tip.title}</div>
            <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: COLORS.text, lineHeight: 1.55 }}>{tip.body}</div>
            {tip.cta && (
              <div style={{ marginTop: "8px", fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: "700", color: COLORS.gold }}>
                {tip.link ? <a href={tip.link} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.gold, textDecoration: "none" }}>{tip.cta} ↗</a> : tip.cta}
              </div>
            )}
            {tip.links && (
              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {tip.links.map((l, idx) => (
                  <a key={idx} href={l.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: "700", color: COLORS.gold, textDecoration: "none" }}>
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      <div style={styles.goldCard}>
        <div style={{ fontSize: "13px", fontFamily: "Arial, sans-serif", letterSpacing: "2px", color: COLORS.gold, fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>Root & Rise Reminder</div>
        <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "6px", color: COLORS.cream }}>
          "The grocery store is where your budget wins or loses every week."
        </div>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: `${COLORS.cream}BB`, lineHeight: 1.55 }}>
          A 15-minute meal plan session on Sunday can save $200+ a month in impulse buys, wasted food, and takeout defaults. That's $2,400+ a year redirected toward your goals.
        </div>
      </div>
    </div>
  );
}

// ─── Welcome / Home Screen ────────────────────────────────────────────────────
function WelcomeScreen({ setTab, inventory, meals, groceryList }) {
  const steps = [
    {
      num: "1",
      emoji: "🥕",
      title: "Take Inventory",
      body: "Check off everything already in your kitchen — fridge, freezer, and pantry. This is your starting point.",
      tab: 1,
      cta: "Start Inventory"
    },
    {
      num: "2",
      emoji: "📅",
      title: "Build Your Meal Plan",
      body: "Plan the week's meals around what you already have. Use AI suggestions to fill in the gaps based on your pantry.",
      tab: 2,
      cta: "Plan My Week"
    },
    {
      num: "3",
      emoji: "🛒",
      title: "Build Your Grocery List",
      body: "Your grocery list is just the gaps — only what you need to buy to complete your meal plan. Nothing more.",
      tab: 3,
      cta: "See My List"
    },
    {
      num: "4",
      emoji: "💰",
      title: "Shop Smart & Save",
      body: "Use Flipp to price match, shop BCause or Odd Bunch for produce, and apply every savings strategy at checkout.",
      tab: 4,
      cta: "Savings Tips"
    },
    {
      num: "5",
      emoji: "📊",
      title: "Track Your Budget",
      body: "Log your spending as you shop and watch your running total in real time. Know exactly what you have left before you hit the checkout.",
      tab: 5,
      cta: "Open Budget Tracker"
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(145deg, ${COLORS.olive} 0%, #2a3420 100%)`,
        borderRadius: "16px",
        padding: "28px 24px",
        marginBottom: "24px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, fontSize: "100px", opacity: 0.06, lineHeight: 1 }}>🌿</div>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", color: COLORS.gold, textTransform: "uppercase", marginBottom: "8px" }}>
          Root & Rise Financial Coaching
        </div>
        <div style={{ fontSize: "26px", fontWeight: "bold", color: COLORS.cream, marginBottom: "8px", lineHeight: 1.25 }}>
          Your Weekly<br />Meal Planner
        </div>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: `${COLORS.cream}BB`, lineHeight: 1.6, marginBottom: "20px" }}>
          Plan your meals around what you already have, build a smarter grocery list, and keep more money in your pocket every week.
        </div>

      </div>

      {/* How it works label */}
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", color: COLORS.muted, textTransform: "uppercase", marginBottom: "12px", paddingLeft: "2px" }}>
        How It Works
      </div>

      {/* Step cards */}
      {steps.map((step, i) => (
        <div
          key={i}
          onClick={() => setTab(step.tab)}
          style={{
            background: COLORS.white,
            borderRadius: "14px",
            padding: "18px",
            marginBottom: "10px",
            border: `1.5px solid ${COLORS.darkCream}`,
            boxShadow: "0 2px 8px rgba(61,74,46,0.05)",
            cursor: "pointer",
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
            transition: "all 0.15s",
          }}
        >
          {/* Step number / done indicator */}
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
            background: COLORS.darkCream,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px",
            fontWeight: "700", fontFamily: "Arial, sans-serif",
            color: COLORS.muted,
          }}>
            {step.num}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px" }}>{step.emoji}</span>
              <span style={{ fontWeight: "bold", fontSize: "15px", color: COLORS.olive }}>{step.title}</span>
            </div>
            <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: COLORS.muted, lineHeight: 1.5, marginBottom: "10px" }}>
              {step.body}
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: "700",
              color: COLORS.gold,
            }}>
              {step.cta} →
            </div>
          </div>
        </div>
      ))}

      {/* Footer note */}
      <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", fontSize: "12px", color: COLORS.muted, marginTop: "16px", paddingBottom: "8px", lineHeight: 1.6 }}>
        Your data saves automatically on this device.<br />
        <span style={{ color: COLORS.gold }}>rootandrisefinancial.ca</span>
      </div>
    </div>
  );
}

// ─── Budget Tracker Tab ───────────────────────────────────────────────────────
function BudgetTab({ budget, setBudget, transactions, setTransactions }) {
  const [amountInput, setAmountInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [editingBudget, setEditingBudget] = useState(!budget.amount);

  const spent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const remaining = (budget.amount || 0) - spent;
  const pct = budget.amount ? Math.min((spent / budget.amount) * 100, 100) : 0;
  const isOver = remaining < 0;

  const addTransaction = () => {
    const val = parseFloat(amountInput);
    if (isNaN(val) || val <= 0) return;
    const entry = {
      id: `tx-${Date.now()}`,
      amount: val,
      note: noteInput.trim() || "Grocery trip",
      date: new Date().toLocaleDateString("en-CA", { month: "short", day: "numeric" }),
    };
    setTransactions(prev => [entry, ...prev]);
    setAmountInput("");
    setNoteInput("");
  };

  const removeTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const resetPeriod = () => {
    setTransactions([]);
  };

  const barColor = pct < 70 ? COLORS.sage : pct < 90 ? COLORS.gold : "#c0392b";

  return (
    <div>
      <div style={styles.sectionTitle}>Budget Tracker</div>
      <div style={styles.sectionSub}>Set your grocery budget and log spending as you shop.</div>

      {/* Budget setup */}
      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div style={styles.label}>My Grocery Budget</div>
          <button
            style={{ ...styles.btnOutline, fontSize: "11px", padding: "4px 10px" }}
            onClick={() => setEditingBudget(!editingBudget)}
          >
            {editingBudget ? "Done" : "Edit"}
          </button>
        </div>

        {editingBudget ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Period toggle */}
            <div style={{ display: "flex", gap: "0px", borderRadius: "8px", overflow: "hidden", border: `1.5px solid ${COLORS.darkCream}` }}>
              {["weekly", "monthly"].map(p => (
                <button
                  key={p}
                  onClick={() => setBudget(prev => ({ ...prev, period: p }))}
                  style={{
                    flex: 1, padding: "10px", border: "none", cursor: "pointer",
                    fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: "600",
                    background: budget.period === p ? COLORS.olive : COLORS.cream,
                    color: budget.period === p ? COLORS.cream : COLORS.muted,
                    textTransform: "capitalize", transition: "all 0.15s",
                  }}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
            {/* Amount input */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", fontWeight: "700", color: COLORS.muted }}>$</div>
              <input
                style={{ ...styles.input, fontSize: "20px", fontWeight: "700", textAlign: "center" }}
                type="number"
                min="0"
                placeholder="0.00"
                value={budget.amount || ""}
                onChange={e => setBudget(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: COLORS.muted, textAlign: "center" }}>
              Enter your {budget.period || "weekly"} grocery budget
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4px 0 8px" }}>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: COLORS.olive, fontFamily: "Georgia, serif" }}>
              ${(budget.amount || 0).toFixed(2)}
            </div>
            <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: COLORS.muted, textTransform: "capitalize" }}>
              {budget.period || "weekly"} budget
            </div>
          </div>
        )}
      </div>

      {/* Summary card */}
      {budget.amount > 0 && (
        <div style={{
          ...styles.card,
          background: isOver
            ? "linear-gradient(135deg, #c0392b, #922b21)"
            : `linear-gradient(135deg, ${COLORS.olive}, #2a3420)`,
          color: COLORS.cream,
          marginBottom: "16px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: `${COLORS.cream}88`, textTransform: "uppercase", marginBottom: "4px" }}>Spent</div>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>${spent.toFixed(2)}</div>
            </div>
            <div style={{ width: "1px", background: `${COLORS.cream}22` }} />
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: `${COLORS.cream}88`, textTransform: "uppercase", marginBottom: "4px" }}>
                {isOver ? "Over By" : "Remaining"}
              </div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: isOver ? "#f1948a" : COLORS.gold }}>
                ${Math.abs(remaining).toFixed(2)}
              </div>
            </div>
            <div style={{ width: "1px", background: `${COLORS.cream}22` }} />
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: `${COLORS.cream}88`, textTransform: "uppercase", marginBottom: "4px" }}>Budget</div>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>${(budget.amount || 0).toFixed(2)}</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: "8px", background: `${COLORS.cream}22`, borderRadius: "4px", overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${pct}%`,
              background: isOver ? "#f1948a" : barColor,
              borderRadius: "4px", transition: "width 0.4s",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Arial, sans-serif", fontSize: "11px", color: `${COLORS.cream}77`, marginTop: "5px" }}>
            <span>{Math.round(pct)}% used</span>
            <span>{isOver ? "⚠️ Over budget" : pct >= 90 ? "⚠️ Almost there" : "✓ On track"}</span>
          </div>
        </div>
      )}

      {/* Add a spend entry */}
      <div style={styles.card}>
        <div style={styles.label}>Log a Purchase</div>
        <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: "0 0 auto" }}>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: "16px", fontWeight: "700", color: COLORS.muted }}>$</span>
            <input
              style={{ ...styles.input, width: "90px", fontSize: "16px", fontWeight: "700", textAlign: "center" }}
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amountInput}
              onChange={e => setAmountInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTransaction()}
            />
          </div>
          <input
            style={{ ...styles.input, flex: 1, minWidth: "130px" }}
            placeholder="Note (e.g. Superstore run)"
            value={noteInput}
            onChange={e => setNoteInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTransaction()}
          />
          <button style={styles.btnGold} onClick={addTransaction}>Add</button>
        </div>
      </div>

      {/* Transaction history */}
      {transactions.length > 0 && (
        <div style={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div style={styles.label}>{transactions.length} Purchase{transactions.length !== 1 ? "s" : ""} This Period</div>
            <button
              style={{ ...styles.btnOutline, fontSize: "11px", padding: "4px 10px", color: "#c0392b", borderColor: "#c0392b" }}
              onClick={resetPeriod}
            >
              Reset period
            </button>
          </div>

          {transactions.map(t => (
            <div key={t.id} style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "10px 0",
              borderBottom: `1px solid ${COLORS.darkCream}`,
            }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: `${COLORS.sage}18`, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0,
              }}>🛒</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", fontWeight: "600", color: COLORS.text }}>{t.note}</div>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: COLORS.muted, marginTop: "1px" }}>{t.date}</div>
              </div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "15px", fontWeight: "700", color: COLORS.olive }}>
                ${t.amount.toFixed(2)}
              </div>
              <span
                style={{ color: COLORS.muted, fontSize: "18px", cursor: "pointer", padding: "0 2px", lineHeight: 1 }}
                onClick={() => removeTransaction(t.id)}
              >×</span>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px", fontFamily: "Arial, sans-serif" }}>
            <span style={{ fontWeight: "700", fontSize: "14px", color: COLORS.olive }}>Total spent</span>
            <span style={{ fontWeight: "700", fontSize: "14px", color: COLORS.olive }}>${spent.toFixed(2)}</span>
          </div>
        </div>
      )}

      {transactions.length === 0 && budget.amount > 0 && (
        <div style={{ ...styles.card, textAlign: "center", color: COLORS.muted, fontFamily: "Arial, sans-serif", fontSize: "13px", padding: "28px 20px" }}>
          No purchases logged yet. Add your first grocery trip above.
        </div>
      )}

      {/* Tip */}
      <div style={{ ...styles.card, background: COLORS.olive }}>
        <div style={{ color: COLORS.gold, fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>💡 Budget Tip</div>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: COLORS.cream, lineHeight: 1.55 }}>
          Log your spending right at the checkout — before you leave the store. It takes 10 seconds and keeps your budget accurate in real time.
        </div>
      </div>
    </div>
  );
}

// ─── Persistent storage hook ─────────────────────────────────────────────────
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.error(e);
    }
  };
  return [storedValue, setValue];
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState(0);
  const [inventory, setInventory] = useLocalStorage("rr_inventory", []);
  const [meals, setMeals] = useLocalStorage("rr_meals", {});
  const [groceryList, setGroceryList] = useLocalStorage("rr_groceryList", []);
  const [checked, setChecked] = useLocalStorage("rr_checked", {});
  const [preferences, setPreferences] = useLocalStorage("rr_preferences", []);
  const [budget, setBudget] = useLocalStorage("rr_budget", { amount: 0, period: "weekly" });
  const [transactions, setTransactions] = useLocalStorage("rr_transactions", []);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const resetAll = () => {
    setInventory([]);
    setMeals({});
    setGroceryList([]);
    setChecked({});
    setPreferences([]);
    setBudget({ amount: 0, period: "weekly" });
    setTransactions([]);
    setShowResetConfirm(false);
  };

  const screens = [
    {
      icon: "🏠", label: "Home",
      component: <WelcomeScreen setTab={setTab} inventory={inventory} meals={meals} groceryList={groceryList} />,
    },
    {
      icon: "🥕", label: "Inventory",
      component: <InventoryTab inventory={inventory} setInventory={setInventory} />,
    },
    {
      icon: "📅", label: "Meal Plan",
      component: <MealPlanTab meals={meals} setMeals={setMeals} inventory={inventory} preferences={preferences} setPreferences={setPreferences} />,
    },
    {
      icon: "🛒", label: "Grocery",
      component: <GroceryTab inventory={inventory} meals={meals} groceryList={groceryList} setGroceryList={setGroceryList} checked={checked} setChecked={setChecked} />,
    },
    {
      icon: "💰", label: "Savings",
      component: <SavingsTab />,
    },
    {
      icon: "📊", label: "Budget",
      component: <BudgetTab budget={budget} setBudget={setBudget} transactions={transactions} setTransactions={setTransactions} />,
    },
  ];

  const pageTitles = ["Home", "Kitchen Inventory", "Meal Plan", "Grocery List", "Savings Tips", "Budget Tracker"];

  return (
    <div style={{ ...styles.app, paddingBottom: "70px" }}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.logo}>Root & Rise</div>
          <div style={styles.logoSub}>Meal Planner</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!showResetConfirm ? (
            <button onClick={() => setShowResetConfirm(true)} style={{ background: "transparent", border: `1px solid ${COLORS.gold}44`, borderRadius: "8px", color: `${COLORS.cream}77`, fontFamily: "Arial, sans-serif", fontSize: "11px", padding: "4px 10px", cursor: "pointer" }}>
              Reset
            </button>
          ) : (
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: COLORS.cream }}>Clear all?</span>
              <button onClick={resetAll} style={{ background: "#c0392b", border: "none", borderRadius: "6px", color: COLORS.cream, fontFamily: "Arial, sans-serif", fontSize: "11px", padding: "4px 10px", cursor: "pointer", fontWeight: "700" }}>Yes</button>
              <button onClick={() => setShowResetConfirm(false)} style={{ background: `${COLORS.cream}22`, border: "none", borderRadius: "6px", color: COLORS.cream, fontFamily: "Arial, sans-serif", fontSize: "11px", padding: "4px 10px", cursor: "pointer" }}>No</button>
            </div>
          )}
        </div>
      </div>

      {/* Page title bar */}
      {tab !== 0 && (
        <div style={{ background: COLORS.darkCream, padding: "12px 20px 10px", borderBottom: `1px solid ${COLORS.sage}22` }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", fontWeight: "bold", fontSize: "17px", color: COLORS.olive }}>
            {pageTitles[tab]}
          </div>
        </div>
      )}

      {/* Content */}
      <div style={styles.content}>
        {screens[tab].component}
      </div>

      {/* Bottom nav */}
      <div style={styles.bottomNav}>
        {screens.map((screen, i) => (
          <button key={i} style={styles.navBtn(tab === i)} onClick={() => setTab(i)}>
            <span style={styles.navIcon(tab === i)}>{screen.icon}</span>
            <span style={styles.navLabel(tab === i)}>{screen.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
