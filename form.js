// Event Registration Form - Enhanced JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const form = document.getElementById("registrationForm");
    const successMessage = document.getElementById("successMessage");
    const closeSuccessBtn = document.getElementById("closeSuccess");

    // Form fields
    const fullNameInput = document.getElementById("fullName");
    const mobileInput = document.getElementById("mobile");
    const emailInput = document.getElementById("email");
    const registrationTypeSelect = document.getElementById("registrationType");
    const eventTypeSelect = document.getElementById("eventType");

    // Error elements
    const emailError =
        document.getElementById("emailError") || createErrorElement(emailInput);

    // Regular expressions for validation
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;
    const NAME_REGEX = /^[a-zA-Z\u00C0-\u017F\s]{2,50}$/;

    // Validation configuration
    const DISPOSABLE_DOMAINS = [
        "tempmail.com",
        "mailinator.com",
        "guerrillamail.com",
        "10minutemail.com",
        "throwawaymail.com",
        "yopmail.com",
        "sharklasers.com",
        "guerrillamail.info",
    ];

    // Initialize form
    initializeForm();

    // ======================
    // INITIALIZATION
    // ======================
    function initializeForm() {
        // Add error styles dynamically
        addErrorStyles();

        // Set up real-time validation
        setupRealTimeValidation();

        // Set up form submission
        setupFormSubmission();

        // Set up success message close button
        setupSuccessMessage();
    }

    // ======================
    // VALIDATION FUNCTIONS
    // ======================

    function validateFullName(name, showError = true) {
        const isValid = name.trim() && NAME_REGEX.test(name.trim());

        if (!isValid && showError) {
            showFieldError(
                fullNameInput,
                "Please enter a valid full name (2-50 characters, letters only)"
            );
        } else if (showError) {
            clearFieldError(fullNameInput);
        }

        return isValid;
    }

    function validateMobile(mobile, showError = true) {
        // Remove all non-digit characters except plus sign
        const cleanedMobile = mobile.replace(/[^\d+]/g, "");
        const isValid =
            cleanedMobile.length >= 10 && PHONE_REGEX.test(cleanedMobile);

        if (!isValid && showError) {
            showFieldError(
                mobileInput,
                "Please enter a valid mobile number (minimum 10 digits)"
            );
        } else if (showError) {
            clearFieldError(mobileInput);
        }

        return isValid;
    }

    function validateEmail(email, showError = true) {
        const trimmedEmail = email.trim();

        // Check if empty
        if (!trimmedEmail) {
            if (showError) {
                showFieldError(
                    emailInput,
                    "Email address is required",
                    emailError
                );
            }
            return false;
        }

        // Check basic email format
        if (!EMAIL_REGEX.test(trimmedEmail)) {
            if (showError) {
                showFieldError(
                    emailInput,
                    "Please enter a valid email address (example@domain.com)",
                    emailError
                );
            }
            return false;
        }

        // Check for disposable emails
        const domain = trimmedEmail.split("@")[1].toLowerCase();
        if (DISPOSABLE_DOMAINS.includes(domain)) {
            if (showError) {
                showFieldError(
                    emailInput,
                    "Please use a permanent email address",
                    emailError
                );
            }
            return false;
        }

        // Check for common typos
        if (trimmedEmail.includes("..") || trimmedEmail.includes("@@")) {
            if (showError) {
                showFieldError(
                    emailInput,
                    "Email address contains invalid characters",
                    emailError
                );
            }
            return false;
        }

        if (showError) {
            clearFieldError(emailInput, emailError);
        }

        return true;
    }

    function validateSelect(selectElement, showError = true) {
        const isValid = selectElement.value && selectElement.value !== "";

        if (!isValid && showError) {
            showFieldError(
                selectElement,
                `Please select a ${selectElement.name || "value"}`
            );
        } else if (showError) {
            clearFieldError(selectElement);
        }

        return isValid;
    }

    function validateAllFields() {
        let isValid = true;

        // Validate each field
        if (!validateFullName(fullNameInput.value, false)) {
            showFieldError(fullNameInput, "Please enter a valid full name");
            isValid = false;
        }

        if (!validateMobile(mobileInput.value, false)) {
            showFieldError(mobileInput, "Please enter a valid mobile number");
            isValid = false;
        }

        if (!validateEmail(emailInput.value, false)) {
            isValid = false;
        }

        if (!validateSelect(registrationTypeSelect, false)) {
            showFieldError(
                registrationTypeSelect,
                "Please select a registration type"
            );
            isValid = false;
        }

        if (!validateSelect(eventTypeSelect, false)) {
            showFieldError(eventTypeSelect, "Please select an event type");
            isValid = false;
        }

        return isValid;
    }

    // ======================
    // UI HELPER FUNCTIONS
    // ======================

    function showFieldError(element, message, errorElement = null) {
        element.classList.add("error");

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        } else {
            // Create or find existing error element
            let existingError =
                element.parentElement.querySelector(".field-error");
            if (!existingError) {
                existingError = document.createElement("div");
                existingError.className = "field-error";
                element.parentElement.appendChild(existingError);
            }
            existingError.textContent = message;
            existingError.style.display = "block";
        }

        // Add aria-invalid attribute for accessibility
        element.setAttribute("aria-invalid", "true");
        element.setAttribute("aria-describedby", element.id + "-error");
    }

    function clearFieldError(element, errorElement = null) {
        element.classList.remove("error");
        element.removeAttribute("aria-invalid");

        if (errorElement) {
            errorElement.style.display = "none";
        } else {
            const existingError =
                element.parentElement.querySelector(".field-error");
            if (existingError) {
                existingError.style.display = "none";
            }
        }
    }

    function scrollToFirstError() {
        const firstError = form.querySelector(".error");
        if (firstError) {
            firstError.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            firstError.focus();
        }
    }

    function createErrorElement(inputElement) {
        const errorElement = document.createElement("div");
        errorElement.className = "field-error";
        errorElement.id = inputElement.id + "-error";
        errorElement.setAttribute("role", "alert");
        errorElement.style.display = "none";
        inputElement.parentElement.appendChild(errorElement);
        return errorElement;
    }

    // ======================
    // EVENT HANDLERS
    // ======================

    function setupRealTimeValidation() {
        // Full Name validation
        fullNameInput.addEventListener("blur", () => {
            validateFullName(fullNameInput.value);
        });

        fullNameInput.addEventListener("input", () => {
            clearFieldError(fullNameInput);
        });

        // Mobile validation
        mobileInput.addEventListener("blur", () => {
            validateMobile(mobileInput.value);
        });

        mobileInput.addEventListener("input", () => {
            clearFieldError(mobileInput);
        });

        // Email validation
        emailInput.addEventListener("blur", () => {
            validateEmail(emailInput.value);
        });

        emailInput.addEventListener("input", () => {
            clearFieldError(emailInput, emailError);
        });

        // Select validation
        registrationTypeSelect.addEventListener("change", () => {
            clearFieldError(registrationTypeSelect);
        });

        eventTypeSelect.addEventListener("change", () => {
            clearFieldError(eventTypeSelect);
        });
    }

    function setupFormSubmission() {
        form.addEventListener("submit", handleFormSubmit);
    }

    function setupSuccessMessage() {
        closeSuccessBtn.addEventListener("click", handleSuccessClose);

        // Close success message on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && successMessage.style.display === "flex") {
                handleSuccessClose();
            }
        });

        // Close success message on outside click
        successMessage.addEventListener("click", (e) => {
            if (e.target === successMessage) {
                handleSuccessClose();
            }
        });
    }

    // ======================
    // EVENT HANDLERS
    // ======================

    function handleFormSubmit(e) {
        e.preventDefault();

        // Clear all previous errors
        form.querySelectorAll(".error").forEach((el) =>
            el.classList.remove("error")
        );
        form.querySelectorAll(".field-error").forEach(
            (el) => (el.style.display = "none")
        );

        // Validate all fields
        const isValid = validateAllFields();

        if (isValid) {
            // Prepare form data
            const formData = {
                fullName: fullNameInput.value.trim(),
                mobile: mobileInput.value.trim(),
                email: emailInput.value.trim(),
                registrationType: registrationTypeSelect.value,
                eventType: eventTypeSelect.value,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
            };

            // Log data (in production, send to server)
            console.log("Form submitted with data:", formData);

            // Simulate API call with timeout
            simulateSubmission(formData);
        } else {
            scrollToFirstError();

            // Add form-level error for screen readers
            const formError = document.createElement("div");
            formError.className = "form-error";
            formError.id = "form-error-message";
            formError.setAttribute("role", "alert");
            formError.textContent =
                "Please fix the errors above before submitting.";
            formError.style.cssText = `
                background-color: #fff5f5;
                border: 1px solid #fed7d7;
                color: #c53030;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 20px;
                font-size: 14px;
            `;

            // Remove previous form error if exists
            const existingFormError =
                document.getElementById("form-error-message");
            if (existingFormError) existingFormError.remove();

            // Insert at beginning of form
            form.insertBefore(formError, form.firstChild);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (formError.parentElement) {
                    formError.remove();
                }
            }, 5000);
        }
    }

    function handleSuccessClose() {
        successMessage.style.display = "none";

        // Reset form
        form.reset();

        // Clear all errors
        form.querySelectorAll(".error").forEach((el) =>
            el.classList.remove("error")
        );
        form.querySelectorAll(".field-error").forEach(
            (el) => (el.style.display = "none")
        );

        // Remove form error if exists
        const formError = document.getElementById("form-error-message");
        if (formError) formError.remove();

        // Focus on first field
        fullNameInput.focus();
    }

    // ======================
    // UTILITY FUNCTIONS
    // ======================

    function simulateSubmission(formData) {
        // Show loading state
        const submitBtn = form.querySelector(".submit-btn");
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        // Simulate network delay
        setTimeout(() => {
            // Show success message
            successMessage.style.display = "flex";

            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Log successful submission
            console.log("Form submission successful:", formData);

            // Optional: Send to analytics or other services
            trackFormSubmission(formData);
        }, 1500);
    }

    function trackFormSubmission(data) {
        // In production, integrate with analytics services
        // Example: Google Analytics, Mixpanel, etc.
        if (typeof gtag !== "undefined") {
            gtag("event", "form_submission", {
                event_category: "engagement",
                event_label: "event_registration",
            });
        }
    }

    function addErrorStyles() {
        const style = document.createElement("style");
        style.textContent = `
            .error {
                border-color: #e53e3e !important;
                background-color: rgba(229, 62, 62, 0.05) !important;
                animation: shake 0.5s ease-in-out;
            }

            .error:focus {
                box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.2) !important;
            }

            .field-error {
                color: #e53e3e;
                font-size: 13px;
                margin-top: 5px;
                padding-left: 5px;
                display: none;
                font-weight: 500;
            }

            .input-wrapper i.error-icon {
                color: #e53e3e !important;
                animation: pulse 0.5s ease-in-out;
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }

            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }

            .submit-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
                transform: none !important;
            }

            .fa-spinner {
                animation: fa-spin 1s linear infinite;
            }

            @keyframes fa-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
});
