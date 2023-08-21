let express = require('express');
let router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const storeController = require("../controllers/storeController")
const productStockController = require('../controllers/productStockController')
const productRaiseController = require("../controllers/productRaiseController")
const stockInOutController = require("../controllers/stockInOutController")
const manufacturerController = require("../controllers/manufacturerController")
const categoryController = require("../controllers/categoryMasterController")
const productRaise = require('../controllers/productRaiseController');
const productCategoryMapping = require('../controllers/productCategoryMappingController')
const userStoreMapping = require("../controllers/userStoreMappingController")
const orderController = require("../controllers/orderController")
const checkUser = require("../middleware/checkUser")
// const checkRole = require("../middleware/checkRole")
const db = require("../models");
const Store = db.store
const Product = db.products
const Manufacturer = db.manufacturer
const Category = db.category
const ProductStock = db.productStock
const User = db.user
const UserStoreMapping = db.userStoreMapping
const Order = db.order;
const OrderItems = db.orderItems
let multer = require('multer');
const upload = multer({ dest: 'public/' })



// Register User Api

router.get('/register', function (req, res) {
  res.render('register', { title: 'Express' });
});

router.post("/register", userController.registerUser);





// Login User Api

router.get('/', function (req, res) {

  res.render('login', { title: 'Express', message: req.flash('message') });

});

router.post("/login", userController.loginUser);




// logout Api

router.get('/logout', function (req, res) {
  req.session.isLoggedIn = false
  req.flash('message', 'You are Sucessfully Logout.');
  res.redirect('/');
});



// Dashboard Api

router.get('/dashboard', checkUser, function (req, res) {
  res.render('dashboard', { title: 'Express', message: req.flash('message') });
});


// Create User Api

router.get('/user', async function (req, res) {
  const user = await User.findAll()
  res.render('user/user', { title: 'Express', message: req.flash('message'),user });
});

router.post('/createUser', userController.createUser)



// User Listing Api

router.get('/userList', function (req, res) {
  
  res.render('user/userList', { title: 'Express', message: req.flash('message') });
});


router.get('/userMasterList',  async function (req, res) {
  

  let draw = req.query.draw;

  let start = parseInt(req.query.start);

  let length = parseInt(req.query.length);

  let where = {}


  if (req.query.search.value) {
    console.log(req.query.search.value)
    where[Op.or] = [
      { id: { [Op.like]: `%${req.query.search.value}%` } },
      { firstname: { [Op.like]: `%${req.query.search.value}%` } },
      { lastname: { [Op.like]: `%${req.query.search.value}%` } },
      { email: { [Op.like]: `%${req.query.search.value}%` } },
      { mobileNumber: { [Op.like]: `%${req.query.search.value}%` } },
    ];
  }

  const user = await User.findAll({
    limit: length,
    offset: start,
    where: where
  })
  const count = await User.count()

  let data_arr = []
  for (let i = 0; i < user.length; i++) {
    data_arr.push({
      'id': user[i].id,
      'firstName': user[i].firstName,
      'lastName': user[i].lastName,
      'email': user[i].email,
      'password' :user[i].password,
      'mobileNumber': user[i].mobileNumber
    });
  }
  let output = {
    'draw': draw,
    'iTotalRecords': count,
    'iTotalDisplayRecords': count,
    'aaData': data_arr
  };
  res.json(output)
})



// Update User Api


router.get('/userUpdate/:id', async function (req, res) {
  console.log(123)
  const user = await User.findOne( { where : { id : req.params.id}})
  res.render('user/userUpdate', { title: 'Express', message: req.flash('message') , user});
});

router.post('/updateUser/:id', userController.updateUser)



// User Store Mapping Api

router.get('/userStoreMapping', async function (req, res) {
  const user = await User.findAll();
  const store = await Store.findAll()
  res.render('userStoreMapping', { title: 'Express', message: req.flash('message'),user,store });
});

router.post('/userStoreMapping', userStoreMapping.addUserStoreMapping)

router.get('/getSelectedStores/:userId', userStoreMapping.getUserStoreData)

// router.post('/deselectStore/:userId/:outletId', userStoreMapping.deselectStore)



// Create Product Api

router.get('/product', checkUser, async function (req, res) {
  const manufacturer = await Manufacturer.findAll()
  res.render('product/product', { title: 'Express', message: req.flash('message'), manufacturer });
});

router.post('/createProduct', upload.single('imageUrl'), productController.createProduct)



// Product Deatail Listing Api

router.get('/productDetailsList', checkUser, async function (req, res) {
  res.render('product/productDetailsList', { title: 'Express', message: req.flash('message')});
});

router.get('/productsDetailsList', checkUser, async function (req, res) {
  let draw = req.query.draw;
  let start = parseInt(req.query.start);
  let length = parseInt(req.query.length);
  let where = {}; // Define the where object for filtering

  if (req.query.search.value) {
    where[Op.or] = [
      { '$product.itemName$': { [Op.like]: `%${req.query.search.value}%` } },
      { '$store_master.storeName$': { [Op.like]: `%${req.query.search.value}%` } },
      { Cat1: { [Op.like]: `%${req.query.search.value}%` } },
      { Cat2: { [Op.like]: `%${req.query.search.value}%` } },
    ];
  }

  const productStock = await ProductStock.findAll({
    include: [
      {
        model: Product,
        // attributes:['itemName']
      },
      {
        model: Store,
        // attributes:['storeName']
      },
    ],
    limit: length,
    offset: start,
    where: where, // Apply the filtering
  });
// console.log(productStock)
  const count = await ProductStock.count();

  let data_arr = [];
  for (let i = 0; i < productStock.length; i++) {
    data_arr.push({
      itemName: productStock[i].product.itemName,
      storeName: productStock[i].store_master.storeName,
      stock: productStock[i].stock,
      salePrice: productStock[i].salePrice,
      mrp: productStock[i].mrp,
      Cat1: productStock[i].Cat1,
      Cat2: productStock[i].Cat2,
    });
  }

  let output = {
    draw: draw,
    iTotalRecords: count,
    iTotalDisplayRecords: count,
    aaData: data_arr,
  };

  res.json(output);
});




// Product Master Listing Api

router.get('/productMasterList', checkUser, async function (req, res) {
  res.render('product/productMasterList', { title: 'Express', message: req.flash('message')});
});

router.get('/productsMasterList', checkUser, async function (req, res) {
 
  let draw = req.query.draw;

  let start = parseInt(req.query.start);

  let length = parseInt(req.query.length);

  let where = {}
 
  if (req.query.search.value) {
    where[Op.or] = [
      { itemName: { [Op.like]: `%${req.query.search.value}%` } },
      { description: { [Op.like]: `%${req.query.search.value}%` } },
    ];
  }

  const product = await Product.findAll({
    limit: length,
    offset: start,
    where: where
  })
  console.log(product)


  const count = await Product.count()
  

  let data_arr = []
  for (let i = 0; i <product.length; i++) {
    data_arr.push({
      'itemId' : product[i].itemId,
      'itemName' : product[i].itemName,
      'description': product[i].description,
      'imageUrl': product[i].imageUrl,
    });
  }
  
  let output = {
    'draw': draw,
    'iTotalRecords': count,
    'iTotalDisplayRecords': count,
    'aaData': data_arr
  };

  res.json(output)
});




// Product Update Api
router.get('/updateProduct/:id', checkUser, async function (req, res) {

  const product = await Product.findOne({where:{itemId:req.params.id}})

  const manufacturer = await Manufacturer.findAll()

  res.render('product/productUpdate', { title: 'Express', message: req.flash('message'), manufacturer, product });
});

router.post('/updateProduct/:id', upload.single('imageUrl'), productController.updateProduct)




// Product Stock Api

router.post('/addProductStock', productStockController.addProductStock)




// Product Category Mapping

router.get('/productCategoryMapping', checkUser, async function (req, res) {
  const store = await Store.findAll()
  const product = await Product.findAll()
  const category = await Category.findAll()
  res.render('productCategoryMapping', { title: 'Express', message: req.flash('message'),store,product,category});
});

router.post('/productCategoryMapping', productCategoryMapping.productCategoryMapping)




// Store Master Api

router.get('/storeMaster', checkUser, function (req, res) {
  res.render('store/storeMaster', { title: 'Express', message: req.flash('message') });
});

router.post("/createStore", storeController.createStore);



// Store List Api

router.get('/storeList', checkUser, async function (req, res) {
  res.render('store/storeMasterList', { title: 'Express', message: req.flash('message') });   
})

router.get('/storemasterList',  async function (req, res) {

  let draw = req.query.draw;

  let start = parseInt(req.query.start);

  let length = parseInt(req.query.length);

  let where = {}


  if (req.query.search.value) {
    console.log(req.query.search.value)
    where[Op.or] = [
      { storeName: { [Op.like]: `%${req.query.search.value}%` } },
      { storeAddress: { [Op.like]: `%${req.query.search.value}%` } },
    ];
  }

  const store = await Store.findAll({
    limit: length,
    offset: start,
    where: where
  })
  const count = await Store.count()

  let data_arr = []
  for (let i = 0; i < store.length; i++) {
    data_arr.push({
      'outletId': store[i].outletId,
      'storeName': store[i].storeName,
      'storeAddress': store[i].storeAddress
    });
  }
  let output = {
    'draw': draw,
    'iTotalRecords': count,
    'iTotalDisplayRecords': count,
    'aaData': data_arr
  };
  res.json(output)
})


// Update Store Master Api

router.get('/updateStoreMaster/:id', checkUser, async function (req, res) {
  console.log(123)
  console.log(req.params.id)
  let store = await Store.findOne({where:{outletId :  req.params.id}})
  console.log(store)
  res.render('store/storeMasterUpdate', { title: 'Express', message: req.flash('message'),store });
});

router.post("/updateStore/:id", storeController.updateStore);


// Product Rate Api 

router.get('/productRaise', checkUser, async function (req, res) {

  const store = await Store.findAll()

  const product = await Product.findAll()

  res.render('productRaise/productRaise', { title: 'Express', message: req.flash('message'), store, product });
});

router.post('/productRaise', productRaise.addProductRaise)


// Update Product Rate Api 

router.get('/updateProductRaise/:id', checkUser, async function (req, res) {
  console.log(123)
console.log(req.params.itemId)
  const store = await Store.findAll()

  const product = await Product.findAll()

  const productStock = await ProductStock.findOne({ where : { itemId :  req.params.id } })

  res.render('productRaise/productRaiseUpdate', { title: 'Express', message: req.flash('message'), store, product,productStock });
});

router.post('/productRaise', productRaise.updateProductRaise)



// Stock In/Out Api

router.get('/stockInOut', checkUser, async function (req, res) {
  const store = await Store.findAll()
  const product = await Product.findAll()
  // console.log(product,store)  
  res.render('stockInOut', { title: 'Express', message: req.flash('message'), store, product });
});

router.post('/stockInOut', stockInOutController.stockInOut)




// Manufacturer Master Api

router.get('/manufacturer', checkUser, function (req, res) {
  res.render('manufacturer/manufacturer', { title: 'Express', message: req.flash('message') });
});

router.post('/addManufacturer', manufacturerController.addManufacturer)


// Manufacturer approval Api

router.get('/admin/manufacturer/approvalList', manufacturerController.adminView)

router.post('/admin/approval/:manufacturerId', manufacturerController.adminApprove)



// Manufacturer Listing Api

router.get('/manufacturerList', checkUser, function (req, res) {
  res.render('manufacturer/manufacturerList', { title: 'Express', message: req.flash('message') });
});

router.get('/manufacturerMasterList',  async function (req, res) {

  let draw = req.query.draw;

  let start = parseInt(req.query.start);

  let length = parseInt(req.query.length);

  let where = {}


  if (req.query.search.value) {
    console.log(req.query.search)
    where[Op.or] = [
      { shortDescription: { [Op.like]: `%${req.query.search.value}%` } },
      { longDescription: { [Op.like]: `%${req.query.search.value}%` } },
    ];
  }

  const manufacturer = await Manufacturer.findAll({
    limit: length,
    offset: start,
    where: where
  })
  console.log(manufacturer)
  const count = await Manufacturer.count()
  console.log(count)

  let data_arr = []
  for (let i = 0; i <manufacturer.length; i++) {
    data_arr.push({
      'manufacturerId': manufacturer[i].manufacturerId,
      'shortDescription': manufacturer[i].shortDescription,
      'longDescription': manufacturer[i].longDescription
    });
  }
  let output = {
    'draw': draw,
    'iTotalRecords': count,
    'iTotalDisplayRecords': count,
    'aaData': data_arr
  };

  res.json(output)
})



// Update Manufacturer Master Api

router.get('/updateManufacturer/:id', checkUser, async function (req, res) {
  const manufacturer = await Manufacturer.findOne({ where  : { manufacturerId : req.params.id } } )
  res.render('manufacturer/manufacturerUpdate', { title: 'Express', message: req.flash('message'),manufacturer });
});

router.post('/updateManufacturer/:id', manufacturerController.updateManufacturer)


// Category Master Api

router.get('/category', checkUser, function (req, res) {
  res.render('category/category', { title: 'Express', message: req.flash('message') });
});

router.post('/addcategory', categoryController.addCategory)


// Category Listing Api

router.get('/categoryList', checkUser, function (req, res) {
  res.render('category/categoryList', { title: 'Express', message: req.flash('message') });
});

router.get('/categoryMasterList',  async function (req, res) {

  let draw = req.query.draw;

  let start = parseInt(req.query.start);

  let length = parseInt(req.query.length);

  let where = {}


  if (req.query.search.value) {
    console.log(req.query.search)
    where[Op.or] = [
      { shortDescription: { [Op.like]: `%${req.query.search.value}%` } },
      { longDescription: { [Op.like]: `%${req.query.search.value}%` } },
    ];
  }

  const category = await Category.findAll({
    limit: length,
    offset: start,
    where: where
  })
  console.log(category)
  const count = await Category.count()
  console.log(count)

  let data_arr = []
  for (let i = 0; i <category.length; i++) {
    data_arr.push({
      'categoryId': category[i].categoryId,
      'shortDescription': category[i].shortDescription,
      'longDescription': category[i].longDescription
    });
  }
  let output = {
    'draw': draw,
    'iTotalRecords': count,
    'iTotalDisplayRecords': count,
    'aaData': data_arr
  };

  res.json(output)
})



// Update Category Master Api

router.get('/updateCategory/:id', checkUser, async function (req, res) {
  console.log(123)
  console.log(req.params.categoryId)
  console.log(req.params.id)
  const category = await Category.findOne({ where : { categoryId : req.params.id } } )
  res.render('category/categoryUpdate', { title: 'Express', message: req.flash('message'),category });
});

router.post('/updateCategory/:id', categoryController.updateCategory)



// Category Approval List

router.get('/categoryApprovalList', categoryController.categoryApprovalList);

router.post('/updateCategoryApprovalStatus',categoryController.updateCategoryApprovalStatus)

// Manufacturer Approval List

router.get('/manufacturerApprovalList', manufacturerController.manufacturerApprovalList);

router.post('/updateManufacturerApprovalStatus',manufacturerController.updateManufacturerApprovalStatus)

// Store Approval List

router.get('/storeApprovalList', storeController.storeApprovalList);

router.post('/updateStoreApprovalStatus',storeController.updateStoreApprovalStatus)

// Product Approval List

router.get('/productApprovalList', productController.productApprovalList);

router.post('/updateProductApprovalStatus',productController.updateProductApprovalStatus)

// Product Category Mapping Approval List

router.get('/proCatMapApprovalList', productCategoryMapping.proCatMapApprovalList);

router.post('/updateProCatMapApprovalStatus',productCategoryMapping.updateProCatMapApprovalStatus)

// Product Rate Approval List

router.get('/productRaiseApprovalList', productRaiseController.productRaiseApprovalList);

router.post('/updateProductRaiseApprovalStatus',productRaiseController.updateProductRaiseApprovalStatus)


// Stock In/Out Approval List

router.get('/stockInOutApprovalList', stockInOutController.stockInOutApprovalList);

router.post('/updateStockInOutApprovalStatus',stockInOutController.updateStockInOutApprovalStatus)

// User Store Management Approval List

router.get('/userStoreMappingApprovalList', userStoreMapping.userStoreMappingApprovalList);

router.post('/updateUserStoreMappingApprovalStatus',userStoreMapping.updateUserStoreMappingApprovalStatus)


// Order Billing Api

router.get('/order', async function (req, res) {
  const store = await Store.findAll()
  const product = await Product.findAll()
  res.render('order', { title: 'Express', message: req.flash('message'), store, product});
});

router.post('/order',orderController.createOrderBill)


//order listing

router.get('/orderList', async function (req, res) {
console.log(123)
  res.render('orderList', { title: 'Express', message: req.flash('message')});
});


router.get('/orderDetailsList', async function (req, res) {
 console.log(456)
  let draw = req.query.draw;

  let start = parseInt(req.query.start);

  let length = parseInt(req.query.length);

  let where = {}


  const order = await Order.findAll({
    include: [ 
      {
        model: OrderItems,
      },
    ],
    limit: length,
    offset: start,
    where: where
  })
console.log(req.query.search.value)
  if (req.query.search.value) {
    console.log(123456789)
    where[Op.or] = [
      { orderId: { [Op.like]: `%${req.query.search.value}%` } },
      { customerName: { [Op.like]: `%${req.query.search.value}%` } },
      { '$orderItem.storeName$': { [Op.like]: `%${req.query.search.value}%` } },
    ];
  }
  
  const count = await Order.count()


  let data_arr = []
  for (let i = 0; i <order.length; i++) {
    data_arr.push({
      'orderId' : order[i].orderId,
      'customerName' : order[i].customerName,
      'storeName': order[i].orderItem.storeName,
      'totalAmount': order[i].totalAmount,
      'createdAt': order[i].createdAt,
    });
  }
  
  let output = {
    'draw': draw,
    'iTotalRecords': count,
    'iTotalDisplayRecords': count,
    'aaData': data_arr
  };

  res.json(output)
});

module.exports = router;
