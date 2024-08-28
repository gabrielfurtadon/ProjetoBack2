module.exports = {
    getPaginationParams: function(limite, pagina) {
        const validLimits = [5, 10, 30];

        // Valida e define o limite
        const limit = validLimits.includes(parseInt(limite)) ? parseInt(limite) : 5;

        // Calcula o offset (deslocamento) com base na página
        const page = parseInt(pagina) > 0 ? parseInt(pagina) : 1;
        const offset = (page - 1) * limit;

        return { limit, offset };
    }
};