const form = document.getElementById('form');
const firstname_input = document.getElementById('Firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password = document.getElementById('repeat-password');
const error_messageS = document.getElementById('error-message');

// Handle form submission for both sign up and sign in
form.addEventListener('submit', (e) => {
   e.preventDefault();  // Prevent form submission to show validation messages

   let errors = []

   // Check if this is a signup form (check if the first name field exists)
   if(firstname_input){
       errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password.value)
   }
   // If it's a login form, run the login validation
   else{
       errors = getLoginFormErrors(email_input.value, password_input.value)
   }

   // Show errors or allow form submission
   if(errors.length > 0) {
       error_messageS.innerText = errors.join(". ") 
   } else {
       // If no errors, submit the form (remove error display)
       error_messageS.innerText = '';
       form.submit();  
   }
});

// Signup validation function
function getSignupFormErrors(firstname, email, password, repeatPassword){
    let errors = []

    // First name validation
    if(firstname === '' || firstname == null) {
        errors.push('Firstname is required');
        firstname_input.parentElement.classList.add('incorrect');
    } else {
        firstname_input.parentElement.classList.remove('incorrect');
    }

    // Email validation
    if(email === '' || email == null) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    } else if (!validateEmail(email)) {
        errors.push('Please enter a valid email address');
        email_input.parentElement.classList.add('incorrect');
    } else {
        email_input.parentElement.classList.remove('incorrect');
    }

    // Password validation
    if(password === '' || password == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    } else {
        password_input.parentElement.classList.remove('incorrect');
    }

    // Repeat password validation
    if(repeatPassword !== password) {
        errors.push('Passwords do not match');
        repeat_password.parentElement.classList.add('incorrect');
    } else {
        repeat_password.parentElement.classList.remove('incorrect');
    }

    return errors;
}

// Login validation function
function getLoginFormErrors(email, password){
    let errors = []

    if(email === '' || email == null) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }

    if(password === '' || password == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    if(password.length < 8) {
        errors.push('Password must have at least 8 characters')
        password_input.parentElement.classList.add('incorrect')
    }
    if(password !== repeatPassword) {
        errors.push('Password does not match repeated password');
        password_input.parentElement.classList.add('incorrect');
        repeat_password.parentElement.classList.add('incorrect');
    }

    return errors;
}

// Email validation helper function
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

const allInputs = [firstname_input, email_input, password_input, repeat_password] 
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ''
        }
    })
}) 
