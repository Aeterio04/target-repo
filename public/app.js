// Cart page logic
let items = {};
let currentCoupon = "";

async function loadItems() {
  const res = await fetch('/api/items');
  items = await res.json();
  renderItems();
  updateQuote();
}

function renderItems() {
  const container = document.getElementById('items');
  container.innerHTML = Object.entries(items)
    .map(([id, item]) => `
      <div class="item-row">
        <span class="item-name">${item.name} - $${item.cost.toFixed(2)}</span>
        <input type="number" 
               id="${id}" 
               data-testid="qty-${id}" 
               min="0" 
               value="1">
      </div>
    `)
    .join('');
  
  // Add event listeners after rendering
  for (const id of Object.keys(items)) {
    document.getElementById(id).addEventListener('change', updateQuote);
  }
}

async function updateQuote() {
  const quantities = {};
  for (const id of Object.keys(items)) {
    quantities[id] = parseInt(document.getElementById(id).value) || 0;
  }
  
  const res = await fetch('/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantities, coupon: currentCoupon })
  });
  
  const quote = await res.json();
  document.querySelector('[data-testid="subtotal"]').textContent = `$${quote.subtotal.toFixed(2)}`;
  document.querySelector('[data-testid="discount"]').textContent = `$${quote.discount.toFixed(2)}`;
  document.querySelector('[data-testid="tax"]').textContent = `$${quote.tax.toFixed(2)}`;
  document.querySelector('[data-testid="total"]').textContent = `$${quote.total.toFixed(2)}`;
}

document.getElementById('apply').addEventListener('click', () => {
  currentCoupon = document.getElementById('coupon').value.trim();
  const msg = currentCoupon ? "Coupon applied" : "No coupon applied";
  document.getElementById('coupon-msg').textContent = msg;
  updateQuote();
});

loadItems();
