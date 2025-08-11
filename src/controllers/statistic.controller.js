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
            value: response.data.credit_limits.total - response.data.remaining.total
        },
        {
            name: 'Disponible',
            value: response.data.remaining.total
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