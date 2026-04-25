const btn = document.getElementById('btnCalcular');

btn.addEventListener('click', async () => {
    const costoBase = document.getElementById('costoBase').value;
    const iva = document.getElementById('iva').value;
    const descuentos = document.getElementById('descuentos').value;

    // URL corregida con /calcular al final
    const API_URL = "https://calcular-descuento-microservicios.onrender.com/calcular";

    // Validar que los campos no estén vacíos antes de enviar
    if (!costoBase || !iva || !descuentos) {
        alert("Por favor, llena todos los campos numéricos.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'cors', // Forzamos el modo CORS
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                costoBase: parseFloat(costoBase),
                iva: parseFloat(iva),
                descuentos: parseFloat(descuentos)
            })
        });

        // Verificamos si la respuesta es exitosa (Código 200)
        if (response.ok) {
            const data = await response.json();
            document.getElementById('valorTotal').innerText = data.resultado;
        } else {
            // Si el servidor responde pero con error (ej. 404 por validación)
            alert("Error del servidor: Los datos enviados no son permitidos.");
            document.getElementById('valorTotal').innerText = "ERROR";
        }

    } catch (error) {
        console.error("Error detallado:", error);
        alert("No se pudo establecer conexión. El servidor de Render podría estar despertando, intenta de nuevo en 30 segundos.");
    }
});