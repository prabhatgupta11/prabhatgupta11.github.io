const { DataTypes } = require("sequelize");
const { sequelize, user } = require(".");

module.exports = (sequelize, DataTypes) => {
    
    const Store = sequelize.define('store_master', {
        outletId: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        storeName : {
            type : DataTypes.STRING(255),
            allowNull : false,
        },
        storeAddress : {
            type : DataTypes.STRING(255),
            allowNull : false,
        },
        approve_b : {
            type : DataTypes.STRING,
        },
        approve_by : {
            type : DataTypes.STRING,
        },
        approve_date : {
            type : DataTypes.DATE,
        }
    
    })

    return Store
}