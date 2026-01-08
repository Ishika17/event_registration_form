    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterMessage = document.getElementById("newsletterMessage");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {

            const emailInput = this.querySelector('input[type="email"]');
            const consentCheckbox =
                document.getElementById("newsletterConsent");
            const email = emailInput.value.trim();

    
            if (!email) {
                showNewsletterMessage(
                    "Please enter your email address",
                    "error"
                );
                return;
            }

            if (!isValidEmail(email)) {
                showNewsletterMessage(
                    "Please enter a valid email address",
                    "error"
                );
                return;
            }

            if (!consentCheckbox.checked) {
                showNewsletterMessage(
                    "Please agree to receive emails",
                    "error"
                );
                return;
            }

            showNewsletterMessage("Subscribing...", "info");

            setTimeout(() => {
                showNewsletterMessage(
                    "Successfully subscribed! Check your email for confirmation.",
                    "success"
                );
                newsletterForm.reset();

                setTimeout(() => {
                    newsletterMessage.style.display = "none";
                }, 5000);
            }, 1500);
        });
    }

    function showNewsletterMessage(text, type) {
        newsletterMessage.textContent = text;
        newsletterMessage.className = "newsletter-message " + type;
        newsletterMessage.style.display = "block";
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

