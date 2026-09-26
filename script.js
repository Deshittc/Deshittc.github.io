const inputImagen = document.getElementById('subirImagen');
const imagenPrevia = document.getElementById('imagenPrevia');
const textoResultado = document.getElementById('resultado');

let modelo = undefined;

// Cargar el modelo MobileNet al iniciar la página
async function cargarModelo() {
    textoResultado.innerText = "Cargando modelo de IA...";
    modelo = await mobilenet.load();
    textoResultado.innerText = "¡Modelo listo! Sube una imagen.";
}

// Procesar la imagen cuando el usuario la seleccione
inputImagen.addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
        const lector = new FileReader();
        lector.onload = function (evento) {
            imagenPrevia.src = evento.target.result;
            imagenPrevia.style.display = 'block';
            imagenPrevia.onload = async function () {
                textoResultado.innerText = "Analizando imagen...";
                // Realizar la predicción
                const predicciones = await modelo.classify(imagenPrevia);
                if (predicciones && predicciones.length > 0) {
                    textoResultado.innerText = `Predicción: ${predicciones[0].className} (${(predicciones[0].probability * 100).toFixed(2)}%)`;
                } else {
                    textoResultado.innerText = "No se pudo clasificar la imagen.";
                }
            }
        }
        lector.readAsDataURL(archivo);
    }
});

cargarModelo();