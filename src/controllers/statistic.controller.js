const axios = require('axios');

require('dotenv').config();

const getStatistics = async (req, res)=>{
    try {
        const response = await axios.get(`https://plant.id/api/v3/usage_info`, {
            headers: {
                'Api-Key': process.env.API_KEY
            }
        });

        let data = [];
        data.push({
            name: 'Usado',
            value: response.data.credit_limits.total - response.data.remaining.total,
            description: `Has consumido ${response.data.credit_limits.total - response.data.remaining.total} créditos en total.`,
            status: true
        },
        {
            name: 'Disponible',
            value: response.data.remaining.total,
            description: `Tienes disponible ${response.data.remaining.total} créditos`,  
            status: true
        },
        {
            name: 'Créditos totales',
            value: response.data.credit_limits.total,
            description: `Tu saldo inicial fue de ${response.data.credit_limits.total} créditos`,  
            status: false
        }
    );
        res.json(data);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

module.exports = {
    getStatistics
}