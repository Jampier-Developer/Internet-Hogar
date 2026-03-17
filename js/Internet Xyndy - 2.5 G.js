


// ============================================
// VARIABLES GLOBALES
// ============================================
let currentZoom = 1;
const ZOOM_STEP = 0.1;
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.5;

// ============================================
// SCROLL SUAVE AL BLOQUE "CÓMO FUNCIONA"
// ============================================
const btnScroll = document.getElementById("btn-scroll");
const featuresSection = document.getElementById("como");

if (btnScroll) {
  btnScroll.addEventListener("click", () => {
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  });
}

// ============================================
// EFECTO DE PULSO EN EL BOTÓN PRINCIPAL
// ============================================
const btnPulso = document.getElementById("btn-pulso");

if (btnPulso) {
  btnPulso.addEventListener("mouseenter", () => {
    btnPulso.style.boxShadow = "0 0 0 0 rgba(99,102,241,0.7)";
    btnPulso.animate(
      [
        { boxShadow: "0 0 0 0 rgba(129,140,248,0.7)", transform: "scale(1)" },
        { boxShadow: "0 0 0 14px rgba(129,140,248,0)", transform: "scale(1.03)" },
        { boxShadow: "0 0 0 0 rgba(129,140,248,0)", transform: "scale(1)" },
      ],
      { duration: 800, easing: "ease-out" }
    );
  });

  btnPulso.addEventListener("click", () => {
    btnPulso.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.96)" },
        { transform: "scale(1)" },
      ],
      { duration: 180, easing: "ease-out" }
    );
  });
}

// ============================================
// FUNCIONES DEL MODAL QR
// ============================================

// Función para abrir el modal
window.openModal = function() {
  const modal = document.getElementById("modal-qr");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevenir scroll
  currentZoom = 1;
  updateZoom();
};

// Función para cerrar el modal
window.closeModal = function() {
  const modal = document.getElementById("modal-qr");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // Restaurar scroll
  currentZoom = 1;
  updateZoom();
};

// Función para actualizar el zoom
function updateZoom() {
  const modalImage = document.getElementById("modal-qr-image");
  const zoomLevelSpan = document.getElementById("zoom-level");
  
  if (modalImage) {
    modalImage.style.transform = `scale(${currentZoom})`;
  }
  if (zoomLevelSpan) {
    zoomLevelSpan.textContent = Math.round(currentZoom * 100) + '%';
  }
}

// Función para hacer zoom in
window.zoomIn = function() {
  if (currentZoom < MAX_ZOOM) {
    currentZoom += ZOOM_STEP;
    updateZoom();
  }
};

// Función para hacer zoom out
window.zoomOut = function() {
  if (currentZoom > MIN_ZOOM) {
    currentZoom -= ZOOM_STEP;
    updateZoom();
  }
};

// Función para resetear zoom
window.resetZoom = function() {
  currentZoom = 1;
  updateZoom();
};

// Función para descargar QR
window.downloadQR = function() {
  const modalImage = document.getElementById("modal-qr-image");
  const link = document.createElement('a');
  link.href = modalImage.src;
  link.download = 'QR-Internet-Xyndy.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Mostrar mensaje de confirmación
  const msg = document.createElement('div');
  msg.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #00b894, #00cec9);
    padding: 1rem 2rem;
    border-radius: 50px;
    color: white;
    font-weight: 600;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    z-index: 2000;
    animation: slideUp 0.3s ease;
  `;
  msg.innerHTML = '<i class="fas fa-check-circle"></i> QR descargado';
  document.body.appendChild(msg);
  
  setTimeout(() => {
    msg.style.animation = 'slideDown 0.3s ease';
    setTimeout(() => msg.remove(), 300);
  }, 2000);
};

// ============================================
// INICIALIZACIÓN DEL MODAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById("modal-qr");
  const qrImage = document.getElementById("qr-image");
  const modalClose = document.getElementById("modal-close");
  const modalOverlay = document.getElementById("modal-overlay");
  const zoomInBtn = document.getElementById("zoom-in");
  const zoomOutBtn = document.getElementById("zoom-out");
  const resetZoomBtn = document.getElementById("reset-zoom");
  const downloadBtn = document.getElementById("download-qr");
  const modalImage = document.getElementById("modal-qr-image");
  
  // Evento para abrir modal al hacer clic en el QR
  if (qrImage) {
    qrImage.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    });
    
    // También permitir clic en el wrapper
    const qrWrapper = document.querySelector('.qr-wrapper');
    if (qrWrapper) {
      qrWrapper.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal();
      });
    }
  }
  
  // Evento para cerrar modal con la X
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }
  
  // Evento para cerrar modal al hacer clic fuera (en el overlay)
  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }
  
  // Eventos para los botones de zoom
  if (zoomInBtn) {
    zoomInBtn.addEventListener("click", zoomIn);
  }
  
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener("click", zoomOut);
  }
  
  if (resetZoomBtn) {
    resetZoomBtn.addEventListener("click", resetZoom);
  }
  
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadQR);
  }
  
  // Zoom con la rueda del mouse
  if (modalImage) {
    modalImage.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    });
    
    // Doble clic para resetear zoom
    modalImage.addEventListener("dblclick", resetZoom);
  }
  
  // Cerrar con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
  
  // Manejo de error de carga de imagen QR
  if (qrImage) {
    qrImage.onerror = function() {
      console.log('Error al cargar la imagen QR');
      this.style.display = 'none';
      const parent = this.parentElement;
      
      if (!parent.querySelector('.qr-placeholder')) {
        const placeholder = document.createElement('div');
        placeholder.className = 'qr-placeholder';
        placeholder.style.cssText = `
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: white;
          font-size: 2rem;
          border-radius: 10px;
          min-height: 210px;
        `;
        placeholder.innerHTML = '📱 QR';
        parent.appendChild(placeholder);
      }
    };
  }
});

// ============================================
// FUNCIÓN PARA SIMULAR ESCANEO
// ============================================
window.simulateScan = function() {
  // Guardar texto original del botón
  const btnEscanear = document.getElementById("btn-pulso");
  const originalText = btnEscanear ? btnEscanear.innerHTML : '<i class="fas fa-camera"></i> Escanear ahora';
  
  if (btnEscanear) {
    btnEscanear.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Escaneando...';
    btnEscanear.disabled = true;
  }
  
  // Crear overlay de escaneo
  const scanOverlay = document.createElement('div');
  scanOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    z-index: 3500;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    animation: fadeIn 0.3s ease;
  `;
  
  scanOverlay.innerHTML = `
    <div style="width: 280px; height: 280px; border: 4px solid #6366f1; border-radius: 30px; position: relative; margin-bottom: 2rem; box-shadow: 0 0 30px rgba(99,102,241,0.5);">
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, transparent, #4f46e5, #ec4899, #f97316, transparent); animation: scanLine 2s linear infinite;"></div>
      <i class="fas fa-qrcode" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 4rem; opacity: 0.3;"></i>
    </div>
    <p style="color: white; font-size: 1.5rem; margin-bottom: 1rem;">Escaneando código QR...</p>
    <p style="color: rgba(255,255,255,0.6); margin-bottom: 2rem;">Apunta la cámara al código QR</p>
    <button id="cancelar-escaneo" style="padding: 1rem 2rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 50px; color: white; font-weight: 600; cursor: pointer;">
      <i class="fas fa-times"></i> Cancelar
    </button>
  `;
  
  document.body.appendChild(scanOverlay);
  
  // Simular resultado después de 3 segundos
  setTimeout(() => {
    if (document.body.contains(scanOverlay)) {
      scanOverlay.innerHTML = `
        <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #00b894, #00cec9); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; box-shadow: 0 0 30px #00b894; animation: pulse 0.5s;">
          <i class="fas fa-check" style="color: white; font-size: 3rem;"></i>
        </div>
        <h2 style="color: white; font-size: 2rem; margin-bottom: 1rem;">¡QR Detectado!</h2>
        <p style="color: #00b894; font-size: 1.2rem; margin-bottom: 2rem; background: rgba(0,184,148,0.1); padding: 0.8rem 2rem; border-radius: 50px;">
          <i class="fas fa-wifi"></i> Internet Xyndy - 2.5G
        </p>
        <div style="display: flex; gap: 1rem;">
          <button id="conectar-ahora" style="padding: 1rem 2.5rem; background: linear-gradient(135deg, #4f46e5, #ec4899); border: none; border-radius: 50px; color: white; font-weight: 600; cursor: pointer;">
            <i class="fas fa-wifi"></i> Conectar Ahora
          </button>
          <button id="cerrar-escaneo" style="padding: 1rem 2rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 50px; color: white; font-weight: 600; cursor: pointer;">
            <i class="fas fa-times"></i> Cerrar
          </button>
        </div>
      `;
      
      // Evento para conectar
      document.getElementById('conectar-ahora')?.addEventListener('click', () => {
        scanOverlay.remove();
        
        // Mostrar mensaje de éxito
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
          position: fixed;
          top: 30px;
          right: 30px;
          background: linear-gradient(135deg, #00b894, #00cec9);
          padding: 1rem 2rem;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          z-index: 3600;
          animation: slideInRight 0.3s ease;
        `;
        successMsg.innerHTML = '<i class="fas fa-wifi"></i> Conectado a Internet Xyndy - 2.5G';
        document.body.appendChild(successMsg);
        
        setTimeout(() => successMsg.remove(), 3000);
        
        // Restaurar botón
        if (btnEscanear) {
          btnEscanear.innerHTML = originalText;
          btnEscanear.disabled = false;
        }
      });
      
      // Evento para cerrar
      document.getElementById('cerrar-escaneo')?.addEventListener('click', () => {
        scanOverlay.remove();
        if (btnEscanear) {
          btnEscanear.innerHTML = originalText;
          btnEscanear.disabled = false;
        }
      });
    }
  }, 3000);
  
  // Botón de cancelar
  document.getElementById('cancelar-escaneo')?.addEventListener('click', () => {
    scanOverlay.remove();
    if (btnEscanear) {
      btnEscanear.innerHTML = originalText;
      btnEscanear.disabled = false;
    }
  });
};

// ============================================
// BOTÓN "Escanear ahora" - MENÚ DE OPCIONES
// ============================================
const btnEscanear = document.getElementById("btn-pulso");

if (btnEscanear) {
  btnEscanear.addEventListener("click", () => {
    // Crear menú de opciones
    const menuHTML = `
      <div class="scan-menu-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); backdrop-filter:blur(10px); z-index:3000; display:flex; align-items:center; justify-content:center;">
        <div style="background:linear-gradient(135deg, #1a1a2e, #16213e); padding:2rem; border-radius:20px; max-width:400px; width:90%; border:1px solid rgba(255,255,255,0.1); box-shadow:0 20px 40px rgba(0,0,0,0.3); animation: modalZoomIn 0.3s ease;">
          
          <h2 style="color:white; margin-bottom:1.5rem; text-align:center;">
            <i class="fas fa-qrcode" style="color:#6366f1;"></i> Escanear QR
          </h2>
          
          <p style="color:rgba(255,255,255,0.7); margin-bottom:2rem; text-align:center;">
            Elige cómo quieres escanear el código QR:
          </p>
          
          <div style="display:flex; flex-direction:column; gap:1rem;">
            <button id="scan-option-modal" style="padding:1.5rem; background:rgba(99,102,241,0.1); border:1px solid #6366f1; border-radius:15px; color:white; cursor:pointer; text-align:left; transition:all 0.3s; display:flex; align-items:center; gap:1rem;">
              <div style="width:50px; height:50px; background:#6366f1; border-radius:50%; display:flex; align-items:center; justify-content:center;">
                <i class="fas fa-qrcode" style="color:white; font-size:1.5rem;"></i>
              </div>
              <div>
                <strong style="font-size:1.2rem;">Ver QR ampliado</strong>
                <p style="color:rgba(255,255,255,0.6); font-size:0.9rem; margin-top:0.3rem;">Abre el código QR en grande para escanear</p>
              </div>
            </button>
            
            <button id="scan-option-simulate" style="padding:1.5rem; background:rgba(16,185,129,0.1); border:1px solid #10b981; border-radius:15px; color:white; cursor:pointer; text-align:left; transition:all 0.3s; display:flex; align-items:center; gap:1rem;">
              <div style="width:50px; height:50px; background:#10b981; border-radius:50%; display:flex; align-items:center; justify-content:center;">
                <i class="fas fa-play" style="color:white; font-size:1.5rem;"></i>
              </div>
              <div>
                <strong style="font-size:1.2rem;">Simular escaneo</strong>
                <p style="color:rgba(255,255,255,0.6); font-size:0.9rem; margin-top:0.3rem;">Muestra una animación de escaneo</p>
              </div>
            </button>
            
            <button id="scan-option-cancel" style="padding:1rem; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:15px; color:white; cursor:pointer; transition:all 0.3s;">
              <i class="fas fa-times"></i> Cancelar
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Añadir menú al body
    const menu = document.createElement('div');
    menu.innerHTML = menuHTML;
    document.body.appendChild(menu.firstElementChild);
    
    // Opción 1: Ver QR ampliado
    document.getElementById('scan-option-modal')?.addEventListener('click', () => {
      document.querySelector('.scan-menu-overlay')?.remove();
      openModal(); // Abrir modal del QR
    });
    
    // Opción 2: Simular escaneo
    document.getElementById('scan-option-simulate')?.addEventListener('click', () => {
      document.querySelector('.scan-menu-overlay')?.remove();
      simulateScan(); // Llamar a la función de simulación
    });
    
    // Opción 3: Cancelar
    document.getElementById('scan-option-cancel')?.addEventListener('click', () => {
      document.querySelector('.scan-menu-overlay')?.remove();
    });
    
    // Cerrar al hacer clic fuera
    document.querySelector('.scan-menu-overlay')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        e.target.remove();
      }
    });
  });
}

// ============================================
// ESTILOS ADICIONALES
// ============================================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scanLine {
    0% { top: 0; }
    100% { top: 100%; }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes modalZoomIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .scan-option-modal:hover, .scan-option-simulate:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }
  
  #scan-option-cancel:hover {
    background: rgba(255,78,80,0.2) !important;
    border-color: #ff4e50 !important;
  }
`;
document.head.appendChild(style);

// ============================================
// ANIMACIÓN AL CARGAR LA PÁGINA
// ============================================
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.5s ease';
});
