let fecha = new Date();
let tareas = {};

function generarCalendario() {
  const calendario = document.getElementById("calendario");
  const mesAnio = document.getElementById("mes-anio");
  calendario.innerHTML = "";

  const mes = fecha.getMonth();
  const anio = fecha.getFullYear();
  const primerDia = new Date(anio, mes, 1).getDay();
  const totalDias = new Date(anio, mes + 1, 0).getDate();

  mesAnio.textContent = `${fecha.toLocaleString('es-EC', { month: 'long' })} ${anio}`;

  for (let i = 0; i < primerDia; i++) {
    const vacio = document.createElement("div");
    calendario.appendChild(vacio);
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const celda = document.createElement("div");
    celda.classList.add("dia");

    const clave = `${anio}-${mes + 1}-${dia}`;
    celda.setAttribute("data-fecha", clave);

    celda.innerHTML = `<h4>${dia}</h4>`;
    if (tareas[clave]) {
      tareas[clave].forEach(tarea => {
        const div = document.createElement("div");
        div.classList.add("tarea");
        div.style.background = tarea.color;
        div.textContent = tarea.texto;
        celda.appendChild(div);
      });
    }

    celda.onclick = () => abrirModal(clave);
    calendario.appendChild(celda);
  }
}

function cambiarMes(valor) {
  fecha.setMonth(fecha.getMonth() + valor);
  generarCalendario();
}

function abrirModal(fechaTexto) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("fechaSeleccionada").textContent = `Agregar tarea al ${fechaTexto}`;
  document.getElementById("modal").setAttribute("data-fecha", fechaTexto);
  document.getElementById("tareaTexto").value = "";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function guardarTarea() {
  const fechaTexto = document.getElementById("modal").getAttribute("data-fecha");
  const texto = document.getElementById("tareaTexto").value;
  const color = document.getElementById("materiaColor").value;

  if (!tareas[fechaTexto]) {
    tareas[fechaTexto] = [];
  }

  tareas[fechaTexto].push({ texto, color });
  cerrarModal();
  generarCalendario();
}

generarCalendario();
