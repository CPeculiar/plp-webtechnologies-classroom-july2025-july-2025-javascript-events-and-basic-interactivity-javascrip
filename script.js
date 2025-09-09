// Part 1: Event Handling and Interactive Elements

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
let isDarkMode = false;

themeToggle.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Part 2: Interactive Element 1 - Counter Game
const counterValue = document.getElementById('counterValue');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');
let count = 0;

// Increase counter
increaseBtn.addEventListener('click', function() {
    count++;
    counterValue.textContent = count;
    updateCounterColor();
});

// Decrease counter
decreaseBtn.addEventListener('click', function() {
    count--;
    counterValue.textContent = count;
    updateCounterColor();
});

// Reset counter
resetBtn.addEventListener('click', function() {
    count = 0;
    counterValue.textContent = count;
    updateCounterColor();
});

// Update counter color based on value
function updateCounterColor() {
    if (count > 0) {
        counterValue.style.color = 'green';
    } else if (count < 0) {
        counterValue.style.color = 'red';
    } else {
        counterValue.style.color = 'black';
    }
}

// Part 2: Interactive Element 2 - Collapsible FAQ Section
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isOpen = answer.style.display === 'block';
        
        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
        });
        
        // Toggle current answer
        answer.style.display = isOpen ? 'none' : 'block';
        
        // Update button appearance
        faqQuestions.forEach(q => q.classList.remove('active'));
        if (!isOpen) {
            this.classList.add('active');
        }
    });
});

// Part 3: Form Validation with JavaScript
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');

// Real-time validation on input
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
phoneInput.addEventListener('input', validatePhone);

// Form submission handler
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPhoneValid = validatePhone();
    
    if (isNameValid && isEmailValid && isPasswordValid && isPhoneValid) {
        showSuccessMessage('Form submitted successfully!');
        contactForm.reset();
        clearErrors();
    }
});

// Name validation function
function validateName() {
    const name = nameInput.value.trim();
    const nameError = document.getElementById('nameError');
    
    if (name.length < 2) {
        showError(nameError, 'Name must be at least 2 characters long');
        return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError(nameError, 'Name can only contain letters and spaces');
        return false;
    }
    
    clearError(nameError);
    return true;
}

// Email validation function
function validateEmail() {
    const email = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showError(emailError, 'Please enter a valid email address');
        return false;
    }
    
    clearError(emailError);
    return true;
}

// Password validation function
function validatePassword() {
    const password = passwordInput.value;
    const passwordError = document.getElementById('passwordError');
    
    if (password.length < 8) {
        showError(passwordError, 'Password must be at least 8 characters long');
        return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        showError(passwordError, 'Password must contain uppercase, lowercase, and number');
        return false;
    }
    
    clearError(passwordError);
    return true;
}

// Phone validation function
function validatePhone() {
    const phone = phoneInput.value.trim();
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^\d{10,15}$/;
    
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        showError(phoneError, 'Please enter a valid phone number (10-15 digits)');
        return false;
    }
    
    clearError(phoneError);
    return true;
}

// Helper function to show error messages
function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Helper function to clear error messages
function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

// Helper function to clear all errors
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

// Helper function to show success message
function showSuccessMessage(message) {
    const successElement = document.getElementById('successMessage');
    successElement.textContent = message;
    successElement.style.display = 'block';
    
    // Hide success message after 3 seconds
    setTimeout(() => {
        successElement.style.display = 'none';
    }, 3000);
}
