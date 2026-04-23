const RESPONSES = {
  "landlord letter": `Here's a professional landlord permission letter template:\n\n---\nDear [Landlord's Name],\n\nI am writing to formally request permission to sublet the spare room(s) at [Property Address] to one or two suitable lodgers.\n\nI am a responsible tenant with a strong rental history. I will personally screen all applicants, conduct viewings, and ensure any lodger signs a proper lodger agreement. I will remain fully responsible for the total rent and all property obligations.\n\nThis arrangement will not affect the property condition or your legal position, as the lead tenancy remains solely in my name.\n\nI would be happy to discuss this further at your convenience.\n\nYours sincerely,\n[Your Name]\n[Date]`,

  "find tenants": `To find tenants for your spare rooms quickly:\n\n1. **SpareRoom.co.uk** — Most popular UK flatmate site, free to list\n2. **Rightmove / Zoopla** — Great for professional tenants\n3. **Facebook Groups** — Search "London rooms to rent" groups\n4. **Gumtree** — Good for quick local listings\n\n**Tips for faster results:**\n- Include photos (natural light makes a big difference)\n- Mention nearby tube stations\n- List bills included/excluded clearly\n- Respond to enquiries within 2 hours`,

  "lodger contract": `A lodger agreement should include:\n\n1. **Names** — Your name (licensor) and lodger's name\n2. **Property address**\n3. **Room description** and any shared areas\n4. **Rent amount** and payment date\n5. **Notice period** — typically 28 days\n6. **House rules** — guests, noise, cleaning\n7. **Deposit amount** (note: lodger deposits don't need protection under a scheme)\n8. **Start date**\n\nYou can find free UK lodger agreement templates on:\n- gov.uk\n- Shelter.org.uk\n- SpareRoom's template library`,

  "calculate savings": `Here's a rough savings estimate for London:\n\n**Example: Renting a 3-bed house**\n- Total rent: £2,400/month\n- Your share (1 room): £800/month\n- Two lodgers paying: £700 each = £1,400/month\n\n✅ **Your net cost: £1,000/month**\n💰 **Saving vs. a studio: ~£600–£900/month**\n📅 **Annual saving: £7,200–£10,800**\n\nAreas with best value for 3-beds:\n- **Lewisham / Catford** — from £1,900/month\n- **Walthamstow** — from £2,000/month\n- **Tooting / Streatham** — from £2,100/month`,

  "best areas": `Best London areas for the NestMate strategy (3-bed + subletting):\n\n🟢 **Best value zones:**\n- **Lewisham** — Zone 2/3, good transport, 3-beds from £1,900\n- **Walthamstow** — Zone 3, Victoria line, vibrant community\n- **Tooting** — Zone 3, Northern line, strong rental demand\n- **Catford** — Zone 3, affordable, improving area\n\n🔵 **Mid-range options:**\n- **Brixton** — Zone 2, excellent transport, from £2,300\n- **Peckham** — Zone 2, popular with graduates\n- **Stratford** — Zone 3, Crossrail, new developments\n\n💡 **Tip:** Aim for Zone 2-3 with direct tube or overground access — lodgers pay more for good commutes.`,

  "budget": `Let me help you calculate your budget.\n\nTo use the NestMate strategy effectively:\n\n1. Find your **target total rent** (3-bed house)\n2. Divide by 3 rooms to estimate per-room value\n3. Set lodger rent at market rate (check SpareRoom)\n4. Subtract lodger income from your total rent\n\n**Quick formula:**\nYour cost = Total rent − (Lodger 1 rent + Lodger 2 rent)\n\nTell me your monthly budget and I'll show you which areas and property types work best for you.`,

  "default": `I can help you with:\n\n- 🏠 **Landlord letters** — professional permission requests\n- 👥 **Finding tenants** — where to list and what to say\n- 📄 **Lodger contracts** — what to include\n- 💰 **Savings calculator** — see your real monthly cost\n- 📍 **Best areas** — Zone 2-3 value spots in London\n\nJust ask me anything about renting in London!`
};

function getResponse(text) {
  const t = text.toLowerCase();
  if (t.includes("landlord") || t.includes("letter") || t.includes("permission")) return RESPONSES["landlord letter"];
  if (t.includes("tenant") || t.includes("find") || t.includes("room") || t.includes("sublet")) return RESPONSES["find tenants"];
  if (t.includes("contract") || t.includes("agreement") || t.includes("lodger")) return RESPONSES["lodger contract"];
  if (t.includes("saving") || t.includes("calculat") || t.includes("cost") || t.includes("money") || t.includes("budget")) return RESPONSES["calculate savings"];
  if (t.includes("area") || t.includes("where") || t.includes("location") || t.includes("zone") || t.includes("london")) return RESPONSES["best areas"];
  return RESPONSES["default"];
}
