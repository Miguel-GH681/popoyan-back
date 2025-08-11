const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
    id_message: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    chat_role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_chat: {
        type: DataTypes.INTEGER,
        allowNull: false
    }},
    {
        tableName: 'message',
        timestamps: false
    }
);

module.exports = Message;