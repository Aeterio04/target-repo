// Apply coupon discount to subtotal in cents
function applyDiscount(subtotalCents, coupon) {
  const code = (coupon || "").trim().toUpperCase();
  if (code === "SAVE10") {
    return Math.round(subtotalCents * 0.10);
  }
  return 0;
}

module.exports = { applyDiscount };
