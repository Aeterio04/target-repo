// Convert cents to dollars with 2 decimal places
function centsToDollars(cents) {
  return Number((cents / 100).toFixed(2));
}

// Format a number as currency
function formatMoney(n) {
  return `$${n.toFixed(2)}`;
}

module.exports = { centsToDollars, formatMoney };
