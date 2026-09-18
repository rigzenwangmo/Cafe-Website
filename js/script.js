// Wangmo's Coffee — shared site interactions

const FORM_ENDPOINT = "https://formsubmit.co/ajax/rigzenwangmo28@gmail.com";

function setupEmailForm(formId, successId, buttonText) {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const originalText = button ? button.textContent : "";

    if (button) {
      button.disabled = true;
      button.textContent = "Sending…";
    }
    if (success) {
      success.style.display = "none";
      success.textContent = "";
    }

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Unable to send the form.");
      }

      form.reset();
      if (success) {
        success.textContent = formId === "contact-form"
          ? "Thanks! Your message has been sent to rigzenwangmo28@gmail.com."
          : "Thank you! Your feedback has been sent to rigzenwangmo28@gmail.com.";
        success.style.display = "block";
      }
    } catch (error) {
      if (success) {
        success.textContent = "We couldn't send your message right now. Please email rigzenwangmo28@gmail.com directly.";
        success.style.display = "block";
      }
      console.error("Wangmo's Coffee form error:", error);
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText || buttonText;
      }
    }
  });
}

setupEmailForm("contact-form", "contact-success", "Send message →");
setupEmailForm("feedback-form", "success", "Send feedback →");

// Mobile navigation
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
if (menuBtn && links) {
  menuBtn.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => links.classList.remove("open"))
  );
}

// Footer year
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
