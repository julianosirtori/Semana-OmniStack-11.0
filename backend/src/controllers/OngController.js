const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const {
      nome, email, whatsapp, city, uf,
    } = request.body;

    const id = crypto.randomBytes(4).toString('Hex');

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
