const fechaServicio = require('./fecha.servicio');

function calcularFechaFestivo(tipo, festivo, anio) {
    let fecha;

    switch (tipo.id) {
        case 1:
            // Festivos con fecha fija
            fecha = new Date(anio, festivo.mes - 1, festivo.dia);
            break;

        case 2:
            // Festivos trasladados al siguiente lunes
            fecha = new Date(anio, festivo.mes - 1, festivo.dia);
            fecha = fechaServicio.siguienteLunes(fecha);
            break;

        case 3:
            // Festivos relativos al Domingo de Pascua
            fecha = fechaServicio.obtenerDomingoPascua(anio);
            fecha = fechaServicio.agregarDias(fecha, festivo.diasPascua);
            break;

        case 4:
            // Festivos relativos a Pascua y trasladados al lunes
            fecha = fechaServicio.obtenerDomingoPascua(anio);
            fecha = fechaServicio.agregarDias(fecha, festivo.diasPascua);
            fecha = fechaServicio.siguienteLunes(fecha);
            break;

        default:
            throw new Error(`Tipo de festivo no soportado: ${tipo.id}`);
    }

    return fecha;
}

module.exports = {
    calcularFechaFestivo
};
