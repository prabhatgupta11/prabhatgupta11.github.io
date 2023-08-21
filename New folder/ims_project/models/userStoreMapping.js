const { DataTypes } = require("sequelize");
const { sequelize, user } = require(".");

module.exports = (sequelize, DataTypes) => {
    
    const UserStoreMapping = sequelize.define('user_store_mapping', {

        id : {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        userFk : {
            type : DataTypes.BIGINT(20),
        },
        storeFk : {
            type : DataTypes.BIGINT(20),
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

    return UserStoreMapping
}