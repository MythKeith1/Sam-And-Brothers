
/* =========================================
   SAM & BROTHERS
   CONSTRUCTION GROUP
   STAGE 03 — JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       01. DOM ELEMENTS
    ===================================== */

    const siteHeader = document.getElementById("site-header");

    const mobileMenuToggle = document.getElementById(
        "mobile-menu-toggle"
    );

    const mainNavigation = document.getElementById(
        "main-navigation"
    );

    const navLinks = document.querySelectorAll(".nav-link");

    const quoteForm = document.getElementById("quote-form");

    const formFeedback = document.getElementById(
        "form-feedback"
    );

    const currentYear = document.getElementById("current-year");

    const serviceSelect = document.getElementById(
        "project-service"
    );

    const serviceLinks = document.querySelectorAll(
        ".service-link[data-service]"
    );

    const faqItems = document.querySelectorAll(".faq-item");


    /* =====================================
       02. CONFIGURATION
    ===================================== */

    /*
       IMPORTANT:

       Replace this number with the official
       Sam & Brothers WhatsApp business number.

       Use international format without:
       +, spaces, brackets or hyphens.

       Example format:
       27123456789

       Leave empty until the real number is known.
    */

    const WHATSAPP_NUMBER = "";


    /* =====================================
       03. MOBILE NAVIGATION
    ===================================== */

    function openMobileMenu() {

        if (!mobileMenuToggle || !mainNavigation) return;

        mainNavigation.classList.add("active");

        mobileMenuToggle.classList.add("active");

        mobileMenuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    }


    function closeMobileMenu() {

        if (!mobileMenuToggle || !mainNavigation) return;

        mainNavigation.classList.remove("active");

        mobileMenuToggle.classList.remove("active");

        mobileMenuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    if (mobileMenuToggle && mainNavigation) {

        mobileMenuToggle.addEventListener("click", () => {

            const menuIsOpen =
                mainNavigation.classList.contains("active");

            if (menuIsOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });


        navLinks.forEach(link => {

            link.addEventListener("click", closeMobileMenu);

        });


        const navCta = mainNavigation.querySelector(".nav-cta");

        if (navCta) {
            navCta.addEventListener("click", closeMobileMenu);
        }


        document.addEventListener("click", event => {

            const clickedInsideMenu =
                mainNavigation.contains(event.target);

            const clickedToggle =
                mobileMenuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMobileMenu();
            }

        });


        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }

        });


        window.addEventListener("resize", () => {

            if (window.innerWidth > 850) {
                closeMobileMenu();
            }

        });

    }


    /* =====================================
       04. STICKY HEADER
    ===================================== */

    function updateHeader() {

        if (!siteHeader) return;

        if (window.scrollY > 40) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================
       05. ACTIVE NAVIGATION
    ===================================== */

    const observedSections = document.querySelectorAll(
        "main section[id]"
    );


    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const activeId = entry.target.id;

                    navLinks.forEach(link => {

                        const linkTarget =
                            link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            linkTarget === `#${activeId}`
                        );

                    });

                });

            },
            {
                root: null,
                rootMargin: "-30% 0px -60% 0px",
                threshold: 0
            }
        );


        observedSections.forEach(section => {

            sectionObserver.observe(section);

        });

    }


    /* =====================================
       06. SMOOTH SCROLLING
    ===================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                siteHeader ? siteHeader.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

            closeMobileMenu();

        });

    });


    /* =====================================
       07. SERVICE ENQUIRY SHORTCUTS
    ===================================== */

    serviceLinks.forEach(link => {

        link.addEventListener("click", () => {

            const selectedService =
                link.dataset.service;

            if (!serviceSelect || !selectedService) return;

            serviceSelect.value = selectedService;

        });

    });


    /* =====================================
       08. FAQ ACCORDION
    ===================================== */

    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (!item.open) return;

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {
                    otherItem.open = false;
                }

            });

        });

    });


    /* =====================================
       09. FORM VALIDATION
    ===================================== */

    function showFormFeedback(message, type = "success") {

        if (!formFeedback) return;

        formFeedback.textContent = message;

        formFeedback.style.color =
            type === "error" ? "#B42318" : "#267344";

    }


    function getFormData() {

        if (!quoteForm) return null;

        const formData = new FormData(quoteForm);

        return {

            name: String(formData.get("name") || "").trim(),

            phone: String(formData.get("phone") || "").trim(),

            email: String(formData.get("email") || "").trim(),

            service: String(formData.get("service") || "").trim(),

            property: String(formData.get("property") || "").trim(),

            location: String(formData.get("location") || "").trim(),

            budget: String(formData.get("budget") || "").trim(),

            message: String(formData.get("message") || "").trim(),

            consent: formData.get("consent") === "on"

        };

    }


    function validateForm(data) {

        if (!data) {
            return "The enquiry form could not be accessed.";
        }

        if (!data.name || !data.phone || !data.service ||
            !data.location || !data.message) {

            return "Please complete all required fields.";

        }


        if (data.name.length < 2) {

            return "Please enter your full name.";

        }


        const phoneDigits = data.phone.replace(/\D/g, "");

        if (phoneDigits.length < 7 || phoneDigits.length > 15) {

            return "Please enter a valid phone number.";

        }


        if (data.email) {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(data.email)) {

                return "Please enter a valid email address.";

            }

        }


        if (data.message.length < 10) {

            return "Please provide a little more detail about your project.";

        }


        if (!data.consent) {

            return "Please confirm that we may contact you about your enquiry.";

        }


        return null;

    }


    /* =====================================
       10. BUILD WHATSAPP MESSAGE
    ===================================== */

    function createWhatsAppMessage(data) {

        return `
SAM & BROTHERS — NEW PROJECT ENQUIRY

CUSTOMER DETAILS

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || "Not provided"}

PROJECT DETAILS

Service: ${data.service}
Property Type: ${data.property || "Not specified"}
Location: ${data.location}
Estimated Budget: ${data.budget || "Not specified"}

PROJECT DESCRIPTION

${data.message}

Consent: Customer agreed to be contacted about this enquiry.
        `.trim();

    }


    /* =====================================
       11. FORM SUBMISSION
    ===================================== */

    if (quoteForm) {

        quoteForm.addEventListener("submit", event => {

            event.preventDefault();

            const data = getFormData();

            const validationError = validateForm(data);


            if (validationError) {

                showFormFeedback(
                    validationError,
                    "error"
                );

                return;

            }


            const whatsappMessage =
                createWhatsAppMessage(data);


            if (!WHATSAPP_NUMBER) {

                showFormFeedback(
                    "Your details passed validation, but the business WhatsApp number has not been configured. Please connect a real enquiry destination before publishing.",
                    "error"
                );

                return;

            }


            const whatsappURL =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;


            showFormFeedback(
                "Your enquiry is ready. WhatsApp will open so you can send it to the business."
            );


            const whatsappWindow = window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );


            if (!whatsappWindow) {

                window.location.href = whatsappURL;

            }

        });

    }


    /* =====================================
       12. FORM FIELD INTERACTIONS
    ===================================== */

    if (quoteForm) {

        const formFields = quoteForm.querySelectorAll(
            "input, select, textarea"
        );


        formFields.forEach(field => {

            field.addEventListener("input", () => {

                if (formFeedback) {

                    formFeedback.textContent = "";

                }

            });


            field.addEventListener("change", () => {

                if (formFeedback) {

                    formFeedback.textContent = "";

                }

            });

        });

    }


    /* =====================================
       13. SCROLL REVEAL ANIMATIONS
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".about-content, .service-card, .why-feature, " +
        ".project-card, .process-card, .faq-item, " +
        ".quote-form-wrapper"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    }


    /* =====================================
       14. FOOTER YEAR
    ===================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================
       15. IMAGE FALLBACK
    ===================================== */

    const pageImages = document.querySelectorAll("img");


    pageImages.forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            image.alt = "Project image currently unavailable";

        });

    });


    /* =====================================
       16. INITIALIZATION
    ===================================== */

    closeMobileMenu();

    updateHeader();


    console.log(
        "Sam & Brothers website initialized successfully."
    );

});
