


// Scroll suave al bloque "Cómo funciona"
const btnScroll = document.getElementById("btn-scroll");
const featuresSection = document.getElementById("como");

btnScroll?.addEventListener("click", () => {
  featuresSection?.scrollIntoView({ behavior: "smooth" });
});

// Efecto de pulso controlado por JS en el botón principal
const btnPulso = document.getElementById("btn-pulso");

if (btnPulso) {
  btnPulso.addEventListener("mouseenter", () => {
    btnPulso.style.boxShadow = "0 0 0 0 rgba(99,102,241,0.7)";
    btnPulso.animate(
      [
        { boxShadow: "0 0 0 0 rgba(129,140,248,0.7)", transform: "scale(1)" },
        {
          boxShadow: "0 0 0 14px rgba(129,140,248,0)",
          transform: "scale(1.03)",
        },
        {
          boxShadow: "0 0 0 0 rgba(129,140,248,0)",
          transform: "scale(1)",
        },
      ],
      {
        duration: 800,
        easing: "ease-out",
      }
    );
  });

  btnPulso.addEventListener("click", () => {
    // Efecto ligero al hacer clic
    btnPulso.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.96)" },
        { transform: "scale(1)" },
      ],
      {
        duration: 180,
        easing: "ease-out",
      }
    );
  });
}

// Modal QR
const modal = document.getElementById("modal-qr");
const qrImage = document.getElementById("qr-image");
const modalClose = document.getElementById("modal-close");

qrImage.addEventListener("click", () => {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
});

function closeModal() {
  modalClose.classList.add("spin-out");
  // Espera a que termine la animación antes de esconder modal y quitar clase
  modalClose.addEventListener(
    "animationend",
    () => {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
      modalClose.classList.remove("spin-out");
    },
    { once: true }
  );
}

modalClose.addEventListener("click", closeModal);

// Cerrar si presionan fuera del contenido del modal
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Manejo simple del formulario (sin backend)
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre")?.value.trim();

  statusEl.textContent = "Enviando...";
  statusEl.style.color = "#9ca3af";

  setTimeout(() => {
    statusEl.textContent =
      nombre
        ? `Gracias, ${nombre}. Tu mensaje se ha enviado (demo).`
        : "Gracias. Tu mensaje se ha enviado (demo).";
    statusEl.style.color = "#4ade80";
    form.reset();
  }, 900);
});
