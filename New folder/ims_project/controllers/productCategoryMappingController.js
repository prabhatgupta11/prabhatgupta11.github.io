const db = require("../models")
const ProductStock = db.productStock

// Add Category product and store wise and create productAtock

const productCategoryMapping = async (req, res) => {

    try {

        if(req.body.store_selection == 'applied_to_all'){
            const sameCategoryForAllStore = await ProductStock.update({ Cat1: req.body.cat1, Cat2: req.body.cat2 }, { where: { itemId: req.body.itemId } })
        }

        const productStock = await ProductStock.findOne({ where: { itemId: req.body.itemId, outletId: req.body.outletId } })

        if (productStock) {
            await ProductStock.update({ Cat1: req.body.cat1, Cat2: req.body.cat2 }, { where: { itemId: req.body.itemId, outletId: req.body.outletId } })
        }
        else {
            const info = {
                itemId: req.body.itemId,
                outletId: req.body.outletId,
                stock: req.body.stock,
                bufferStock: req.body.bufferStock,
                supplierName: req.body.supplierName,
                mrp: req.body.mrp,
                salePrice: req.body.salePrice,
                taxPercentage: req.body.taxPercentage,
                itemReferenceCode: req.body.itemReferenceCode,
                Cat1: req.body.cat1,
                Cat2: req.body.cat2,
                Cat3: req.body.cat3,
                Cat4: req.body.cat4,
                Cat5: req.body.cat5,
                Cat6: req.body.cat6,
                Cat7: req.body.cat7,
                Cat8: req.body.cat8,
                Cat9: req.body.Cat9,
                Cat10: req.body.Cat10,
                itemTimeStamp: req.body.itemTimeStamp,
                appliesOnline: req.body.appliesOnline,
                itemEANcode: req.body.itemEANcode,
                hsnCode: req.body.hsnCode,
                packing: req.body.packing,
                freeQty: req.body.freeQty,
                purchasePrice: req.body.purchasePrice,
                discountType: req.body.discountType,
                discount: req.body.discount,
                others: req.body.others,
                recommended: req.body.recommended,
                variantName: req.body.variantName,
                shelf: req.body.shelf,
                specialPrice: req.body.specialPrice,
                costPriceWithoutTax: req.body.costPriceWithoutTax,
                originalPrice: req.body.originalPrice,
                minSaleQuantity: req.body.minSaleQuantity,
                pack: req.body.pack,
                flatOffer: req.body.flatOffer,
                aliasCode: req.body.aliasCode,
                approve_b:req.body.approve_b,
                approve_by:req.body.approve_by,
                approve_date:approve_date
            }

            const addInProductStock = await ProductStock.create(info)

            req.flash('message', 'Product added into productStock sucessfully');
        }
        return res.redirect('/productDetailsList')
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}

// Product Category Mapping Approval Listing

const proCatMapApprovalList = async function (req, res) {

    const approvalStatus = req.query.approvalStatus; // Get the approval status from query parameter
    
    let whereClause = {};
    
    if (approvalStatus === 'pending') {
      whereClause = { approve_b: null };
    } else if (approvalStatus === 'approved') {
      whereClause = { approve_b: "approved" };
    } else if (approvalStatus === 'rejected') {
      whereClause = { approve_b: "rejected" };
    }
    
    const productStock = await ProductStock.findAll({ where: whereClause });
    
    res.render('approval/proCatMapApprovalList', { title: 'Express', message: req.flash('message'),productStock });
}

const updateProCatMapApprovalStatus =  async (req, res) => {

    const { action, selectedItemIds } = req.body;
    if (action === 'approved' || action === 'rejected') {
      console.log(selectedItemIds)
      selectedItemIds.forEach(async itemId => {
        try {
          // Find the category by ID using Sequelize
          const productStock = await ProductStock.findByPk(itemId);
          console.log(productStock.approve_b)
          console.log(action)
          if (productStock) {
            // Update the approval status of the category
            await ProductStock.update({ approve_b : action }, { where : {itemId : itemId}});
          }
        } catch (error) {
          console.error('Error updating category:', error);
        }
      });
    }
    }
module.exports = {
    productCategoryMapping,
    proCatMapApprovalList,
    updateProCatMapApprovalStatus
}



