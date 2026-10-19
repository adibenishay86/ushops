const form = document.querySelector('#form');
const statusEl = document.querySelector('#status');
const button = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  button.disabled = true;
  statusEl.className = 'status';
  statusEl.textContent = 'שולח...';

  try {
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`);
    form.reset();
    statusEl.className = 'status ok';
    statusEl.textContent = 'הפרטים נשלחו בהצלחה. תודה!';
  } catch (error) {
    console.error(error);
    statusEl.className = 'status error';
    statusEl.textContent = 'השליחה נכשלה. אנא נסו שוב.';
  } finally {
    button.disabled = false;
  }
});
