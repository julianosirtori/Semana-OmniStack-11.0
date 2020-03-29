const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const {
      nome, email, whatsapp, city, uf,
    } = request.body;

    const id = generateUniqueId();

    await connection('ongs').insert({
      id,
      nome,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  },
};
