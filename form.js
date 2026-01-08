document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const successMessage = document.getElementById("successMessage");
    const closeSuccessBtn = document.getElementById("closeSuccess");
    const fullNameInput = document.getElementById("fullName");
    const mobileInput = document.getElementById("mobile");
    const emailInput = document.getElementById("email");
    const registrationTypeSelect = document.getElementById("registrationType");
    const eventTypeSelect = document.getElementById("eventType");
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;
    const NAME_REGEX = /^[a-zA-Z\u00C0-\u017F\s]{2,50}$/;


    initializeForm();
    function initializeForm() {
        addErrorStyles();
        setupRealTimeValidation();
        setupFormSubmission();
        setupSuccessMessage();
    }


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

        if (!trimmedEmail) {
            if (showError) {
                showFieldError(
                    emailInput,
                    "Email address is required"
                );
            }
            return false;
        }

        if (!EMAIL_REGEX.test(trimmedEmail)) {
            if (showError) {
                showFieldError(
                    emailInput,
                    "Please enter a valid email address (example@domain.com)"
                );
            }
            return false;
        }

        if (trimmedEmail.includes("..") || trimmedEmail.includes("@@")) {
            if (showError) {
                showFieldError(
                    emailInput,
                    "Email address contains invalid characters"
                );
            }
            return false;
        }

        if (showError) {
            clearFieldError(emailInput);
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

        if (!validateFullName(fullNameInput.value, false)) {
            showFieldError(fullNameInput, "Please enter a valid full name");
            isValid = false;
        }

        if (!validateMobile(mobileInput.value, false)) {
            showFieldError(mobileInput, "Please enter a valid mobile number");
            isValid = false;
        }

        if (!validateEmail(emailInput.value, false)) {
            showFieldError(emailInput, "Please enter a valid email");
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

    function showFieldError(element, message, errorElement = null) {
        element.classList.add("error");

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        } else {
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

    function setupRealTimeValidation() {
        fullNameInput.addEventListener("blur", () => {
            validateFullName(fullNameInput.value);
        });

        fullNameInput.addEventListener("input", () => {
            clearFieldError(fullNameInput);
        });

 
        mobileInput.addEventListener("blur", () => {
            validateMobile(mobileInput.value);
        });

        mobileInput.addEventListener("input", () => {
            clearFieldError(mobileInput);
        });

     
        emailInput.addEventListener("blur", () => {
            validateEmail(emailInput.value);
        });

        emailInput.addEventListener("input", () => {
            clearFieldError(emailInput);
        });


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

        successMessage.addEventListener("click", (e) => {
            if (e.target === successMessage) {
                handleSuccessClose();
            }
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        form.querySelectorAll(".error").forEach((el) =>
            el.classList.remove("error")
        );
        form.querySelectorAll(".field-error").forEach(
            (el) => (el.style.display = "none")
        );

        
        const isValid = validateAllFields();

        if (isValid) {
            const formData = {
                fullName: fullNameInput.value.trim(),
                mobile: mobileInput.value.trim(),
                email: emailInput.value.trim(),
                registrationType: registrationTypeSelect.value,
                eventType: eventTypeSelect.value,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
            };
            simulateSubmission(formData);
        }
    }

    function handleSuccessClose() {
        successMessage.style.display = "none";
        form.reset();
        form.querySelectorAll(".error").forEach((el) =>
            el.classList.remove("error")
        );
        form.querySelectorAll(".field-error").forEach(
            (el) => (el.style.display = "none")
        );   
        const formError = document.getElementById("form-error-message");
        if (formError) formError.remove();
        fullNameInput.focus();
    }


    function simulateSubmission(formData) {
        const submitBtn = form.querySelector(".submit-btn");
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        setTimeout(() => {
            successMessage.style.display = "flex";
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            trackFormSubmission(formData);
        }, 1500);
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
        `;
        document.head.appendChild(style);
    }
});
