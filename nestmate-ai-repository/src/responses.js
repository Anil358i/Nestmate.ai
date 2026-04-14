// =============================================
// responses.js — AI Chat Responses
// ADD NEW RESPONSES HERE when you want to
// update what the bot says
// =============================================

const RESPONSES = {

  // --- Budget questions ---
  "budget": `Great! Tell me your monthly budget and I'll calculate exactly how much you could save. 💰\n\nFor example, if your budget is £800/month:\n🏠 Rent 3-bed house: ~£2,300/mo\n🛏️ Rent 2 spare rooms at £900 each\n✅ <strong>Your actual cost: £500/mo</strong>`,

  // --- Landlord letter ---
  "landlord letter": `Here's your landlord permission letter — copy and send it:\n\n📄 <strong>"Dear [Landlord Name],\n\nI am writing to formally request permission to sub-let the spare bedrooms at [your address] to lodgers.\n\nI will remain the primary tenant responsible for all rent, bills and property matters. I will provide full details of any prospective lodger upon your request.\n\nThank you for your consideration.\n\n[Your name]"</strong>\n\nWant me to fill in your specific details?`,

  // --- Find tenants ---
  "find tenants": `I'll write your room listing now! 🏠\n\n<strong>SpareRoom listing title:</strong>\n"Bright double room in 3-bed house — Zone 3, bills included, international friendly"\n\n<strong>Best places to post:</strong>\n📱 SpareRoom.com\n👥 Facebook: "London Rooms for International Students"\n💬 Your university WhatsApp groups\n\nWant the full listing text written out?`,

  // --- Lodger contract ---
  "lodger contract": `✅ <strong>UK Lodger Agreement — Key Points:</strong>\n\nYour contract should include:\n• Monthly rent amount and payment date\n• 28 days notice period (standard UK)\n• Shared spaces and house rules\n• Deposit amount (usually 1 month)\n• What happens if they want to leave early\n\nThis is legally compliant with UK 2026 housing law.\nFree template: <strong>gov.uk/private-renting</strong>\n\nWant me to walk you through filling it in?`,

  // --- Calculate savings ---
  "savings": `Let's calculate! Tell me:\n1️⃣ Which area of London?\n2️⃣ Your monthly budget?\n\nI'll show you the exact numbers — how much rent, how much you collect from rooms, and your final cost. 📊`,

  // --- Best areas ---
  "areas": `🏘️ <strong>Best Areas for Your Strategy:</strong>\n\n🥇 <span class="highlight">Stratford E15</span> — ~£2,100/mo, Jubilee + Elizabeth Line\n🥈 <span class="highlight">Walthamstow E17</span> — ~£2,000/mo, trendy & young crowd\n🥉 <span class="highlight">Lewisham SE13</span> — ~£1,900/mo, cheapest option\n🏅 <span class="highlight">Ilford IG1</span> — ~£1,800/mo, large Asian community\n🏅 <span class="highlight">Woolwich SE18</span> — ~£1,850/mo, Elizabeth Line\n\nAll have strong international graduate communities. Which area interests you?`,

  // --- Visa questions ---
  "visa": `✅ <strong>100% legal on Graduate Visa!</strong>\n\nYou can:\n✅ Sign a rental contract as main tenant\n✅ Take in lodgers and charge them rent\n✅ Run this as a small business\n\nThe only things you cannot do:\n❌ Work as a professional sportsperson\n❌ Claim government housing benefits\n\nYou're completely fine. Want to know the next step?`,

  // --- Default fallback ---
  "default": `That's a great question! To give you the best answer, could you tell me:\n\n1️⃣ What's your monthly rent budget?\n2️⃣ Which area of London are you looking at?\n\nWith those two details I can give you exact numbers and next steps. 🏠`

};

// =============================================
// DO NOT EDIT BELOW THIS LINE
// (unless you know JavaScript)
// =============================================

function getResponse(userText) {
  const text = userText.toLowerCase();
  if (text.includes("budget") || text.includes("money") || text.includes("afford")) return RESPONSES["budget"];
  if (text.includes("landlord") || text.includes("letter") || text.includes("permission")) return RESPONSES["landlord letter"];
  if (text.includes("tenant") || text.includes("find") || text.includes("spareroom")) return RESPONSES["find tenants"];
  if (text.includes("contract") || text.includes("agreement") || text.includes("lodger")) return RESPONSES["lodger contract"];
  if (text.includes("saving") || text.includes("calculat") || text.includes("how much")) return RESPONSES["savings"];
  if (text.includes("area") || text.includes("zone") || text.includes("where") || text.includes("stratford") || text.includes("walthamstow")) return RESPONSES["areas"];
  if (text.includes("visa") || text.includes("legal") || text.includes("graduate") || text.includes("allowed")) return RESPONSES["visa"];
  return RESPONSES["default"];
}
