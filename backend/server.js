const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(express.json());
app.use(cors()); // Permite que el front se conecte desde otra URL

// Ruta para ver la documentación: https://tu-url.render.com/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/calcular', (req, res) => {
    const { costoBase, iva, descuentos } = req.body;

    // Convertir a número para validar
    const numCosto = Number(costoBase);
    const numIva = Number(iva);
    const numDesc = Number(descuentos);

    // Validación según tus requisitos
    const esInvalido = (val) => {
        return isNaN(val) || val < 0 || val === Math.PI || val === Math.E;
    };

    if (esInvalido(numCosto) || esInvalido(numIva) || esInvalido(numDesc)) {
        return res.status(404).json({ error: "Datos no permitidos (negativos, e, o pi)" });
    }

    // Lógica: Descuento primero, luego IVA sobre ese subtotal
    const valorDescuento = numCosto * (numDesc / 100);
    const subtotal = numCosto - valorDescuento;
    const montoIva = subtotal * (numIva / 100);
    const totalFinal = subtotal + montoIva;

    res.status(200).json({ resultado: totalFinal.toFixed(2) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Microservicio corriendo en puerto ${PORT}`);
});