function validarFestivo(idTipo, festivo) {
    const errores = [];

    if (!Number.isInteger(idTipo) || idTipo < 1 || idTipo > 4) {
        errores.push('El tipo de festivo debe estar entre 1 y 4');
    }

    if (!festivo || typeof festivo !== 'object' || Array.isArray(festivo)) {
        return ['Debe proporcionar un objeto con los datos del festivo'];
    }

    if (typeof festivo.nombre !== 'string' || !festivo.nombre.trim()) {
        errores.push('El nombre del festivo es obligatorio');
    }

    if (idTipo === 1 || idTipo === 2) {
        if (!Number.isInteger(festivo.mes) ||
            festivo.mes < 1 || festivo.mes > 12) {
            errores.push('El mes debe estar entre 1 y 12');
        }

        if (!Number.isInteger(festivo.dia) ||
            festivo.dia < 1 || festivo.dia > 31) {
            errores.push('El día debe estar entre 1 y 31');
        }

        if (
            Number.isInteger(festivo.mes) &&
            festivo.mes >= 1 && festivo.mes <= 12 &&
            Number.isInteger(festivo.dia) &&
            festivo.dia >= 1 && festivo.dia <= 31
        ) {
            const fecha = new Date(2024, festivo.mes - 1, festivo.dia);

            if (
                fecha.getMonth() !== festivo.mes - 1 ||
                fecha.getDate() !== festivo.dia
            ) {
                errores.push('El día no corresponde al mes indicado');
            }
        }
    }

    if (idTipo === 3 || idTipo === 4) {
        if (!Number.isInteger(festivo.diasPascua)) {
            errores.push('Los días relativos a Pascua deben ser un número entero');
        }
    }

    return errores;
}

module.exports = {
    validarFestivo
};
