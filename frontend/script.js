const btn = document.getElementById('btnCalcular');

btn.addEventListener('click', async () => {
    const costoBase = document.getElementById('costoBase').value;
    const iva = document.getElementById('iva').value;
    const descuentos = document.getElementById('descuentos').value;

    // IMPORTANTE: Cambia esta URL por la que te de Render después de desplegar
    const API_URL = "https://tu-proyecto-en-render.onrender.com/calcular";

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                costoBase: parseFloat(costoBase),
                iva: parseFloat(iva),
                descuentos: parseFloat(descuentos)
            })
        });

        const data = await response.json();

        if (response.status === 200) {
            document.getElementById('valorTotal').innerText = data.resultado;
        } else {
            alert("Error 404: Datos inválidos enviados al servidor.");
            document.getElementById('valorTotal').innerText = "ERROR";
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("No se pudo conectar con el microservicio.");
    }
});