const form = document.getElementById('form');
const username = document.getElementById('username');
const title = document.getElementById('title');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const signupBtn = document.getElementById('signupbtn');
const signinBtn = document.getElementById('signinbtn');
const fBtn = document.getElementById('fbtn');

// Track form mode: sign up (default) or sign in
let isSignUp = true;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (isSignUp) {
        validateInputs();
    } else {
        // Handle sign in logic here
        if (email.value.trim() === '' || password.value.trim() === '') {
            alert('Please enter both email and password to sign in.');
        } else {
            alert('Sign In successful (fake alert)');
        }
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    let isValid = true;

    if (usernameValue === '') {
        setError(username, 'Username is required');
        isValid = false;
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
        isValid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters');
        isValid = false;
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
        isValid = false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords don't match");
        isValid = false;
    } else {
        setSuccess(password2);
    }

    if (isValid) {
        alert('Registration Successful (fake alert)');
        form.reset();
        document.querySelectorAll('.input-control').forEach(el => {
            el.classList.remove('success');
        });
    }
};

// Toggle to Sign In mode
signinBtn.addEventListener('click', () => {
    isSignUp = false;
    title.innerText = 'Sign In';
    signupBtn.innerText = 'Sign In';
    fBtn.classList.remove('disable');

    username.parentElement.style.display = 'none';
    password2.parentElement.style.display = 'none';
});

// Toggle to Sign Up mode
signupBtn.addEventListener('click', () => {
    if (!isSignUp) {
        isSignUp = true;
        title.innerText = 'Registration';
        signupBtn.innerText = 'Sign Up';
        fBtn.classList.add('disable');

        username.parentElement.style.display = 'flex';
        password2.parentElement.style.display = 'flex';
    }
});
