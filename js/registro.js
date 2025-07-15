// Mostrar u ocultar campos según el tipo de usuario
document.getElementById("tipoUsuario").addEventListener("change", function () {
  const camposProveedor = document.getElementById("camposProveedor");
  camposProveedor.classList.toggle("d-none", this.value !== "proveedor");
});

// Validación en tiempo real del correo electrónico
document.getElementById("email").addEventListener("input", function () {
  /* Conectarse al back */
  const feedback = document.getElementById("emailFeedback");
  if (!this.value.includes("@")) {
    feedback.textContent = "El correo debe contener '@'";
    feedback.style.color = "red";
  } else {
    feedback.textContent = "Formato válido";
    feedback.style.color = "green";
  }
});

// Vista previa de imágenes
document.getElementById("imagenesLogo").addEventListener("change", function () {
  const previewContainer = document.getElementById("preview");
  previewContainer.innerHTML = "";
  Array.from(this.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.maxWidth = "150px";
      img.style.margin = "10px";
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// Inicializar Tagify
const inputCategoria = document.getElementById("categoriaServicio");
new Tagify(inputCategoria, {
  whitelist: ["limpieza", "electricidad", "peluquería", "niñera", "plomería", "jardinería", "barbería", "masajes", "gasista", "costura", "carpintería"],
  dropdown: {
    enabled: 0,
    fuzzySearch: true,
    position: "all",
    caseSensitive: false
  }
});

// Guardar usuario en localStorage
document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const tipo = document.getElementById("tipoUsuario").value;
  const usuario = {
    tipo,
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    password: document.getElementById("password").value
  };

  if (tipo === "proveedor") {
    usuario.empresa = document.getElementById("nombreEmpresa").value;
    usuario.categoria = document.getElementById("categoriaServicio").value;
    usuario.descripcion = document.getElementById("descripcionServicio").value;
    usuario.ubicacion = document.getElementById("ubicacionEmpresa").value;
    usuario.modalidad = document.getElementById("modalidadServicio").value;
    usuario.certificados = [...document.getElementById("certificados").files].map(f => f.name);
    usuario.imagenes = [...document.getElementById("imagenesLogo").files].map(f => f.name);
  }

  /* Cambiar esto por comunicarse con el Back */
  const lista = JSON.parse(localStorage.getItem("usuariosServi")) || [];
  lista.push(usuario);
  localStorage.setItem("usuariosServi", JSON.stringify(lista));

  alert("¡Registro guardado con éxito!");
  this.reset();
  document.getElementById("camposProveedor").classList.add("d-none");
});

// ubicacion appi
function initAutocomplete() {
  const input = document.getElementById("ubicacionEmpresa");
  if (input) {
    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ["geocode"], // Opcional: solo direcciones
      componentRestrictions: { country: "ar" } // Opcional: limitar a Argentina
    });
  }
}

