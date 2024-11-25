// Wait for the DOM to be ready before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {

    // Get form element
    const form = document.getElementById('appointment-form');
    const doctorSelect = document.getElementById('doctor');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const contactInput = document.getElementById('contact');
    const dateInput = document.getElementById('appointment-date');
    const messageInput = document.getElementById('message');

    // Form validation function
    function validateForm() {
        let isValid = true;
        // Reset previous error messages
        clearErrors();

        // Check if all required fields are filled
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            isValid = false;
        }
        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
            showError(emailInput, 'Valid email is required.');
            isValid = false;
        }
        if (contactInput.value.trim() === '' || !isValidPhone(contactInput.value)) {
            showError(contactInput, 'Valid contact number is required.');
            isValid = false;
        }
        if (dateInput.value.trim() === '') {
            showError(dateInput, 'Preferred appointment date is required.');
            isValid = false;
        }

        return isValid;
    }

    // Function to show error message
    function showError(inputElement, message) {
        const errorSpan = document.createElement('span');
        errorSpan.classList.add('error-message');
        errorSpan.textContent = message;
        inputElement.parentElement.appendChild(errorSpan);
    }

    // Function to clear error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
    }

    // Check if email is valid
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    // Check if phone number is valid (basic validation)
    function isValidPhone(phone) {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    }

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent actual form submission

        // Validate form fields
        if (validateForm()) {
            alert('Appointment request submitted successfully!');
            // You can add AJAX to send data to the server here
            
            // Optionally, reset form fields after successful submission
            form.reset();
        } else {
            alert('Please fill out the form correctly.');
        }
    });

    // Handling dropdown change (example of dynamic actions)
    doctorSelect.addEventListener('change', (event) => {
        const selectedDoctor = event.target.value;
        console.log(`Selected Doctor: ${selectedDoctor}`);
        // Additional logic like updating other form elements based on selection
    });
});
