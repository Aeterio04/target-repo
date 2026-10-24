// Calculate quote with pricing logic in integer cents
const items = require('./items');
const { applyDiscount } = require('./discounts');
const { centsToDollars } = require('./format');

function quote(quantities, coupon) {
  // Calculate subtotal in cents
  let subtotalCents = 0;
  for (const [id, qty] of Object.entries(quantities)) {
    const item = items[id];
    if (item && qty > 0) {
      subtotalCents += Math.round(item.price * 100) * qty;
    }
  }

  // Apply discount in cents
  const discountCents = applyDiscount(subtotalCents, coupon);
  const taxableCents = subtotalCents - discountCents;

  // Calculate tax (8% of taxable amount), round to nearest cent
  const taxCents = Math.round(taxableCents * 0.08);
  const totalCents = taxableCents + taxCents;

  // Convert to dollars
  return {
    subtotal: centsToDollars(subtotalCents),
    discount: centsToDollars(discountCents),
    tax: centsToDollars(taxCents),
    total: centsToDollars(totalCents)
  };
}

module.exports = { quote };
