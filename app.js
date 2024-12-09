// cuestionario
let contenedorCuestionario = document.querySelector("#cuestionario");
let contenedorVerdaderoFalso = document.querySelector("#tof");
let respuestasCorrectas = []; 




fetch("https://raw.githubusercontent.com/cesarmcuellar/CuestionarioWeb/refs/heads/main/cuestionario.json")



    .then(respuesta => respuesta.json())
    .then(datos => {


        // Verificar que existan las propiedades esperadas
        if (datos.multiple_choice_questions && datos.true_false_questions) {


            // Procesar preguntas de opción múltiple
            datos.multiple_choice_questions.forEach((pregunta, indice) => {
                contenedorCuestionario.innerHTML += `<h3>${pregunta.question}</h3>`;
                pregunta.options.forEach((opcion) => {
                    contenedorCuestionario.innerHTML += `
                        <label>
                            <input type="radio" name="multiple_${indice}" value="${opcion}">
                            ${opcion}
                        </label><br>
                    `;
                });
            });




            // Procesar preguntas de verdadero/falso
            datos.true_false_questions.forEach((pregunta, indice) => {
                contenedorVerdaderoFalso.innerHTML += `<h3>${pregunta.question}</h3>`;
                contenedorVerdaderoFalso.innerHTML += `
                    <label>
                        <input type="radio" name="true_false_${indice}" value="true">
                        Verdadero
                    </label><br>
                    <label>
                        <input type="radio" name="true_false_${indice}" value="false">
                        Falso
                    </label><br>
                `;
            });
        } else {
            console.error("Estructura de datos inesperada:", datos);
        }
    });




// Evento para reiniciar respuestas
document.getElementById("Reiniciar").addEventListener("click", function () {
    let opciones = document.querySelectorAll('input[type="radio"]');
    opciones.forEach(opcion => {
        opcion.checked = false;
    });
    respuestasCorrectas = []; // Limpiar respuestas anteriores
});





// Evento para enviar respuestas
document.getElementById('Enviar').addEventListener('click', () => {
    fetch("https://raw.githubusercontent.com/cesarmcuellar/CuestionarioWeb/refs/heads/main/cuestionario.json")
        .then(respuesta => respuesta.json())
        .then(datos => {
            let cantidadBuenas = 0;
            if (datos.multiple_choice_questions && datos.true_false_questions) {
                // Comparar respuestas de opción múltiple
                datos.multiple_choice_questions.forEach((pregunta, indice) => {
                    let respuestaSeleccionada = document.querySelector(`input[name="multiple_${indice}"]:checked`);
                    if (respuestaSeleccionada && respuestaSeleccionada.value === pregunta.correct_answer) {
                        cantidadBuenas += 1;
                    }
                });
                // Comparar respuestas de verdadero/falso
                datos.true_false_questions.forEach((pregunta, indice) => {
                    let respuestaSeleccionada = document.querySelector(`input[name="true_false_${indice}"]:checked`);
                    if (respuestaSeleccionada && respuestaSeleccionada.value === pregunta.correct_answer) {
                        cantidadBuenas += 1;
                    }
                });




                // Agregar respuestas correctas a la lista
                let totalPreguntas = datos.multiple_choice_questions.length + datos.true_false_questions.length; // Total de preguntas
                let porcentajeResultado = (cantidadBuenas * 100) / totalPreguntas;
                alert(`Tu resultado es: ${porcentajeResultado.toFixed(2)}%`);
            } else {
                console.error("Estructura de datos inesperada:", datos);
            }
        });
});
