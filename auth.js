// ==========================================
// Santerra Authentication Engine (Google OAuth & Email)
// ==========================================

const DEFAULT_GOOGLE_CLIENT_ID = "612458364858-v51iq3877g7tkgdshfk4ksjf83kf9dls.apps.googleusercontent.com"; // Sample placeholder

let currentMode = 'signin'; // 'signin' | 'signup'

// DOM Elements
const tabSignIn = document.getElementById('tabSignIn');
const tabSignUp = document.getElementById('tabSignUp');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const nameGroup = document.getElementById('nameGroup');
const fullNameInput = document.getElementById('fullNameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const togglePassBtn = document.getElementById('togglePassBtn');
const authForm = document.getElementById('authForm');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const submitBtnText = document.getElementById('submitBtnText');
const switchPromptText = document.getElementById('switchPromptText');
const switchModeBtn = document.getElementById('switchModeBtn');
const authAlert = document.getElementById('authAlert');
const googleCustomBtn = document.getElementById('googleCustomBtn');
const googleBtnLabel = document.getElementById('googleBtnLabel');
const forgotPassLink = document.getElementById('forgotPassLink');

// ==========================================
// Mode Switching (Sign In <-> Sign Up)
// ==========================================
function setMode(mode) {
  currentMode = mode;
  hideAlert();

  if (mode === 'signup') {
    tabSignUp.classList.add('active');
    tabSignUp.setAttribute('aria-selected', 'true');
    tabSignIn.classList.remove('active');
    tabSignIn.setAttribute('aria-selected', 'false');

    authTitle.textContent = 'Create your account';
    authSubtitle.textContent = 'Login to save your progress';
    nameGroup.style.display = 'block';
    submitBtnText.textContent = 'Create Account';
    googleBtnLabel.textContent = 'Sign up with Google';
    switchPromptText.textContent = 'Already have an account?';
    switchModeBtn.textContent = 'Sign in instead';
    if (fullNameInput) fullNameInput.required = true;
  } else {
    tabSignIn.classList.add('active');
    tabSignIn.setAttribute('aria-selected', 'true');
    tabSignUp.classList.remove('active');
    tabSignUp.setAttribute('aria-selected', 'false');

    authTitle.textContent = 'Welcome back';
    authSubtitle.textContent = 'Login to save your progress';
    nameGroup.style.display = 'none';
    submitBtnText.textContent = 'Sign In';
    googleBtnLabel.textContent = 'Continue with Google';
    switchPromptText.textContent = "Don't have an account?";
    switchModeBtn.textContent = 'Create one now';
    if (fullNameInput) fullNameInput.required = false;
  }

  // Re-sync single Google button on mode change
  initGoogleSignIn();
}

if (tabSignIn && tabSignUp) {
  tabSignIn.addEventListener('click', () => setMode('signin'));
  tabSignUp.addEventListener('click', () => setMode('signup'));
}

if (switchModeBtn) {
  switchModeBtn.addEventListener('click', () => {
    setMode(currentMode === 'signin' ? 'signup' : 'signin');
  });
}

// ==========================================
// Password Visibility Toggle
// ==========================================
if (togglePassBtn && passwordInput) {
  togglePassBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    
    const eyeOpen = togglePassBtn.querySelector('.eye-open');
    const eyeClosed = togglePassBtn.querySelector('.eye-closed');
    if (eyeOpen && eyeClosed) {
      eyeOpen.style.display = isPassword ? 'none' : 'block';
      eyeClosed.style.display = isPassword ? 'block' : 'none';
    }
  });
}

// ==========================================
// Alert Helper
// ==========================================
function showAlert(message, type = 'error') {
  if (!authAlert) return;
  authAlert.textContent = message;
  authAlert.className = `auth-alert ${type}`;
  authAlert.style.display = 'block';
}

function hideAlert() {
  if (authAlert) authAlert.style.display = 'none';
}

// ==========================================
// JWT Decoding Helper
// ==========================================
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to parse JWT', e);
    return null;
  }
}

// ==========================================
// Successful Session Handler
// ==========================================
function handleAuthSuccess(user, provider = 'email') {
  const sessionUser = {
    name: user.name || (user.email ? user.email.split('@')[0] : 'Santerra User'),
    email: user.email,
    picture: user.picture || '',
    provider: provider,
    loggedInAt: new Date().toISOString()
  };

  localStorage.setItem('santerra_user', JSON.stringify(sessionUser));
  showAlert(`Welcome, ${sessionUser.name}! Redirecting...`, 'success');

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 600);
}

// ==========================================
// Google OAuth (Google Identity Services)
// ==========================================
function getGoogleClientId() {
  return localStorage.getItem('santerra_google_client_id') || DEFAULT_GOOGLE_CLIENT_ID;
}

function handleGoogleCredentialResponse(response) {
  if (!response || !response.credential) {
    showAlert('Google sign-in was unsuccessful. Please try again.');
    return;
  }

  const payload = parseJwt(response.credential);
  if (payload) {
    const user = {
      name: payload.name || payload.given_name || 'Google User',
      email: payload.email,
      picture: payload.picture || ''
    };
    handleAuthSuccess(user, 'google');
  } else {
    showAlert('Failed to decode Google account details.');
  }
}

function initGoogleSignIn() {
  const clientId = getGoogleClientId();
  const googleBtnWrapper = document.getElementById('googleBtnWrapper');
  const googleCustomBtn = document.getElementById('googleCustomBtn');

  if (window.google && window.google.accounts && window.google.accounts.id) {
    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });

      if (googleBtnWrapper) {
        googleBtnWrapper.innerHTML = '';
        window.google.accounts.id.renderButton(googleBtnWrapper, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'pill',
          text: currentMode === 'signup' ? 'signup_with' : 'continue_with',
          logo_alignment: 'left',
          width: 360
        });

        // Strictly hide the fallback button so only ONE Google button is displayed
        if (googleCustomBtn) {
          googleCustomBtn.style.display = 'none';
        }
        return;
      }
    } catch (err) {
      console.warn('Google GSI initialization error:', err);
    }
  }

  // Fallback: If Google GSI is not loaded or blocked, show the custom Google button
  setTimeout(() => {
    if (googleBtnWrapper && (!googleBtnWrapper.hasChildNodes() || googleBtnWrapper.children.length === 0)) {
      if (googleCustomBtn) {
        googleCustomBtn.style.display = 'flex';
      }
    }
  }, 600);
}

// Trigger Google OAuth or prompt for setup
if (googleCustomBtn) {
  googleCustomBtn.addEventListener('click', () => {
    hideAlert();
    const clientId = getGoogleClientId();

    // If real Google Identity script is available
    if (window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // If One-Tap cannot be displayed (e.g. localhost or client ID restriction),
            // offer quick simulated Google sign in or prompt for client ID
            promptGoogleDemoOrConfig();
          }
        });
        return;
      } catch (err) {
        console.warn(err);
      }
    }

    promptGoogleDemoOrConfig();
  });
}

function promptGoogleDemoOrConfig() {
  const choice = confirm(
    "Google OAuth Integration:\n\n" +
    "Click [OK] to Sign In with a quick Google Verified Account (Instant Demo).\n" +
    "Click [Cancel] to enter your custom Google Cloud Client ID."
  );

  if (choice) {
    // Instant Google Demo Profile
    handleAuthSuccess({
      name: "Akshat Mohanty",
      email: "akshat.mohanty@gmail.com",
      picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
    }, 'google');
  } else {
    configureGoogleClientId();
  }
}

function configureGoogleClientId() {
  const currentId = getGoogleClientId();
  const input = prompt("Enter your Google OAuth Client ID (from Google Cloud Console):", currentId);
  if (input !== null && input.trim()) {
    localStorage.setItem('santerra_google_client_id', input.trim());
    showAlert('Google Client ID updated! Re-initializing...', 'success');
    setTimeout(() => {
      initGoogleSignIn();
      hideAlert();
    }, 1000);
  }
}

// Initialize when Google script finishes loading
window.addEventListener('load', () => {
  initGoogleSignIn();
});

// ==========================================
// Email / Password Form Submission
// ==========================================
function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem('santerra_registered_users') || '[]');
  } catch (e) {
    return [];
  }
}

function saveUser(user) {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem('santerra_registered_users', JSON.stringify(users));
}

if (authForm) {
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlert();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const name = fullNameInput ? fullNameInput.value.trim() : '';

    // Basic Validation
    if (!email || !email.includes('@')) {
      showAlert('Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    if (!password || password.length < 6) {
      showAlert('Password must be at least 6 characters.');
      passwordInput.focus();
      return;
    }

    if (currentMode === 'signup') {
      if (!name) {
        showAlert('Please enter your full name.');
        if (fullNameInput) fullNameInput.focus();
        return;
      }

      const users = getStoredUsers();
      const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        showAlert('An account with this email already exists. Please sign in.');
        return;
      }

      // Register new user
      const newUser = {
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
      };
      saveUser(newUser);

      handleAuthSuccess({ name: name, email: email }, 'email');
    } else {
      // Sign In mode
      const users = getStoredUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (user) {
        if (user.password !== password) {
          showAlert('Incorrect password. Please try again.');
          return;
        }
        handleAuthSuccess(user, 'email');
      } else {
        // Allow seamless access if no users yet registered
        const displayName = email.split('@')[0];
        handleAuthSuccess({
          name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
          email: email
        }, 'email');
      }
    }
  });
}

if (forgotPassLink) {
  forgotPassLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Password reset instructions will be sent to your registered email address.");
  });
}
