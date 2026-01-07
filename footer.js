
document.addEventListener("DOMContentLoaded", function () {

    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterMessage = document.getElementById("newsletterMessage");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();

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


    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
      
        window.addEventListener("scroll", function () {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = "1";
                backToTopBtn.style.visibility = "visible";
                backToTopBtn.style.transform = "translateY(0)";
            } else {
                backToTopBtn.style.opacity = "0";
                backToTopBtn.style.visibility = "hidden";
                backToTopBtn.style.transform = "translateY(10px)";
            }
        });

 
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });

    
        backToTopBtn.style.transition = "all 0.3s ease";
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.visibility = "hidden";
        backToTopBtn.style.transform = "translateY(10px)";
    }

 
    const languageSelect = document.querySelector(".language-selector select");

    if (languageSelect) {
        languageSelect.addEventListener("change", function () {
       
            console.log("Language changed to:", this.value);

           
            const message = document.createElement("div");
            message.textContent = "Language preference saved";
            message.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(193, 18, 31, 0.9);
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                z-index: 1000;
                font-size: 14px;
            `;
            document.body.appendChild(message);

            setTimeout(() => {
                message.remove();
            }, 3000);
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

    const socialLinks = document.querySelectorAll(".social-link");

    socialLinks.forEach((link) => {
        link.addEventListener("mouseenter", function () {
            const icon = this.querySelector("i");
            if (icon) {
                icon.style.transform = "scale(1.2)";
                setTimeout(() => {
                    icon.style.transform = "scale(1)";
                }, 150);
            }
        });
    });
});
