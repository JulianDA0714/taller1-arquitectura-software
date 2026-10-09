const festivoRepositorio = require('../repositorios/festivo.repositorio');
const tipoFestivoServicio = require('./tipoFestivo.servicio');
const festivoValidador = require('../validadores/festivo.validador');

async function listarFestivosPorAnio(anio) {
    const tipos = await festivoRepositorio.listarTipos();
    const festivosCalculados = [];

    for (const tipo of tipos) {
        for (const festivo of tipo.festivos) {
            const fecha = tipoFestivoServicio.calcularFechaFestivo(
                tipo,
                festivo,
                anio
            );

            const fechaFormateada = [
                fecha.getFullYear(),
                String(fecha.getMonth() + 1).padStart(2, '0'),
                String(fecha.getDate()).padStart(2, '0')
            ].join('-');

            festivosCalculados.push({
                nombre: festivo.nombre,
                fecha: fechaFormateada,
                tipo: tipo.id
            });
        }
    }

    festivosCalculados.sort((a, b) =>
        a.fecha.localeCompare(b.fecha)
    );

    return festivosCalculados;
}


async function verificarFestivo(anio, mes, dia) {
    const festivos = await listarFestivosPorAnio(anio);

    const fecha = [
        anio,
        String(mes).padStart(2, '0'),
        String(dia).padStart(2, '0')
    ].join('-');

    const festivo = festivos.find(f => f.fecha === fecha);

    return {
        fecha,
        esFestivo: Boolean(festivo),
        nombre: festivo ? festivo.nombre : null
    };
}


async function agregarFestivo(idTipo, datosFestivo) {
    const errores = festivoValidador.validarFestivo(
        idTipo,
        datosFestivo
    );

    if (errores.length > 0) {
        return { errores };
    }

    const tipo = await festivoRepositorio.buscarTipoPorId(idTipo);

    if (!tipo) {
        return {
            errores: ['No se encontró el tipo de festivo']
        };
    }

    const festivo = {
        dia: idTipo <= 2 ? datosFestivo.dia : 0,
        mes: idTipo <= 2 ? datosFestivo.mes : 0,
        nombre: datosFestivo.nombre.trim()
    };

    if (idTipo === 3 || idTipo === 4) {
        festivo.diasPascua = datosFestivo.diasPascua;
    }

    const existe = tipo.festivos.some(
        f => f.nombre.toLowerCase() === festivo.nombre.toLowerCase()
    );

    if (existe) {
        return {
            errores: ['Ya existe un festivo con ese nombre en el tipo indicado']
        };
    }

    await festivoRepositorio.agregarFestivo(idTipo, festivo);

    return { festivo };
}


async function actualizarFestivo(idTipo, nombreActual, datosFestivo) {
    const errores = festivoValidador.validarFestivo(
        idTipo,
        datosFestivo
    );

    if (errores.length > 0) {
        return { errores };
    }

    const tipo = await festivoRepositorio.buscarTipoPorId(idTipo);

    if (!tipo) {
        return { errores: ['No se encontró el tipo de festivo'] };
    }

    const existente = tipo.festivos.find(
        f => f.nombre === nombreActual
    );

    if (!existente) {
        return { errores: ['No se encontró el festivo indicado'] };
    }

    const nombreNuevo = datosFestivo.nombre.trim();

    const duplicado = tipo.festivos.some(
        f => f.nombre.toLowerCase() === nombreNuevo.toLowerCase()
            && f.nombre !== nombreActual
    );

    if (duplicado) {
        return { errores: ['Ya existe otro festivo con ese nombre'] };
    }

    const festivo = {
        dia: idTipo <= 2 ? datosFestivo.dia : 0,
        mes: idTipo <= 2 ? datosFestivo.mes : 0,
        nombre: nombreNuevo
    };

    if (idTipo === 3 || idTipo === 4) {
        festivo.diasPascua = datosFestivo.diasPascua;
    }

    const resultado = await festivoRepositorio.actualizarFestivo(
        idTipo,
        nombreActual,
        festivo
    );

    if (resultado.matchedCount === 0) {
        return { errores: ['No se encontró el festivo para actualizar'] };
    }

    return { festivo };
}

async function eliminarFestivo(idTipo, nombre) {
    const tipo = await festivoRepositorio.buscarTipoPorId(idTipo);

    if (!tipo) {
        return { errores: ['No se encontró el tipo de festivo'] };
    }

    const existe = tipo.festivos.some(
        f => f.nombre === nombre
    );

    if (!existe) {
        return { errores: ['No se encontró el festivo indicado'] };
    }

    const resultado = await festivoRepositorio.eliminarFestivo(
        idTipo,
        nombre
    );

    if (resultado.modifiedCount === 0) {
        return { errores: ['No se pudo eliminar el festivo'] };
    }

    return { eliminado: true };
}


module.exports = {
    listarFestivosPorAnio,
    verificarFestivo,
    agregarFestivo,
    actualizarFestivo,
    eliminarFestivo
};
