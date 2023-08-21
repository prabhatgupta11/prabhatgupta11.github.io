
const dbConfig = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
   dbConfig.dbName,
   dbConfig.user,
   dbConfig.password,
   {
      host: dbConfig.host,
      dialect: dbConfig.dialect
   }
);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require("./productModel")(sequelize, DataTypes)
db.productStock = require("./productStockModel")(sequelize, DataTypes)
db.user = require("./userModel")(sequelize, DataTypes)
db.store = require('./storeModel')(sequelize, DataTypes)
db.productRaise = require('./productRaiseModel')(sequelize, DataTypes)
db.stockInOut = require('./stockInOutModel')(sequelize, DataTypes)
db.manufacturer = require('./manufacturerMasterModel')(sequelize, DataTypes)
db.category = require('./categoryMasterModel')(sequelize, DataTypes)
db.productCategoryMapping = require('./productCategoryMappingModel')(sequelize, DataTypes)
db.userStoreMapping = require('./userStoreMapping')(sequelize, DataTypes)
db.order = require('./orderModel')(sequelize, DataTypes)
db.orderItems = require('./orderItemsModel')(sequelize, DataTypes)

// db.products.belongsTo(db.store, { sourceKey: "outletId", foreignKey: "outletId" });
db.productStock.belongsTo(db.products, { sourceKey: "itemId", foreignKey: "itemId" });
db.productStock.belongsTo(db.store, { sourceKey: "outletId", foreignKey: "outletId" });
db.products.belongsTo(db.manufacturer, { sourceKey: "manufacturerId", foreignKey: "manufacturerId" } )
// db.products.hasOne(db.productStock, { sourceKey: "id", foreignKey: "itemId" });s
db.user.belongsToMany(db.store, { through: db.userStoreMapping, foreignKey: 'userFk', as: 'selectedStores' });
db.store.belongsToMany(db.user, { through: db.userStoreMapping, foreignKey: 'storeFk' });
db.order.belongsTo(db.orderItems, { sourceKey: 'orderPK', foreignKey: 'orderId' });

db.sequelize.sync({ force: false })
   .then(() => {
      console.log("yes re-sync done")
   })

module.exports = db;
