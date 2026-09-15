// ============ Shared auth form logic (login + register) ============
// NOTE: This is front-end validation only. It does NOT create real
// accounts or log anyone in. To make it real you must connect it to a
// backend / auth service (see the section marked "REAL AUTH GOES HERE").

/** Show a message in the form's message box. */
function showMessage(box, text, type) {
  if (!box) return;
  box.textContent = text;
  box.className = 'form-message show ' + type;
}

/** Set or clear an inline error under a field. */
function setError(id, text) {
  const el = document.getElementById(id + '-error');
  if (el) el.textContent = text || '';
}

function isValidEmail(value) {
  // Simple, practical email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// -------- LOGIN --------
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const box = document.getElementById('form-message');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let ok = true;
    setError('email', '');
    setError('password', '');

    if (!isValidEmail(email)) {
      setError('email', 'Please enter a valid email address.');
      ok = false;
    }
    if (password.length < 6) {
      setError('password', 'Password must be at least 6 characters.');
      ok = false;
    }
    if (!ok) return;

    // ===== REAL AUTH GOES HERE =====
    // e.g. fetch('/api/login', { method:'POST', body: JSON.stringify({email,password}) })
    showMessage(box, 'Form looks good! (Login backend not connected yet.)', 'success');
    loginForm.reset();
  });
}

// -------- REGISTER --------
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const box = document.getElementById('form-message');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    const terms = document.getElementById('terms').checked;

    let ok = true;
    ['name', 'email', 'password', 'confirm', 'terms'].forEach((f) => setError(f, ''));

    if (name.trim().length < 2) {
      setError('name', 'Please enter your full name.');
      ok = false;
    }
    if (!isValidEmail(email)) {
      setError('email', 'Please enter a valid email address.');
      ok = false;
    }
    if (password.length < 6) {
      setError('password', 'Password must be at least 6 characters.');
      ok = false;
    }
    if (confirm !== password) {
      setError('confirm', 'Passwords do not match.');
      ok = false;
    }
    if (!terms) {
      setError('terms', 'You must accept the terms to continue.');
      ok = false;
    }
    if (!ok) return;

    // ===== REAL AUTH GOES HERE =====
    // e.g. fetch('/api/register', { method:'POST', body: JSON.stringify({name,email,password}) })
    showMessage(box, 'Account details valid! (Registration backend not connected yet.)', 'success');
    registerForm.reset();
  });
}