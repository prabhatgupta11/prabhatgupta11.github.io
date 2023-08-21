const db = require("../models")
const ProductRaise = db.productRaise;
const ProductStock = db.productStock;



const addProductRaise = async (req, res) => {

    try {


        if(req.body.store_selection == 'applied_to_all'){
            console.log(123)
            const sameProductPriceForAllStore = await ProductStock.update({ mrp: req.body.mrp, salePrice: req.body.price }, { where: { itemId: req.body.itemId} })
        }


        const productStock = await ProductStock.findOne({ where: { itemId: req.body.itemId, outletId: req.body.outletId } })


        if (!productStock) {
            return res.status(500).send({
                success: false,
                message: "ProductStock is not found"
            })
        }

        const addMrpPriceInStock = await ProductStock.update({ mrp: req.body.mrp, salePrice: req.body.price }, { where: { itemId: req.body.itemId, outletId: req.body.outletId } })


        const info = {
            itemId: req.body.itemId,
            outletId: req.body.outletId,
            mrp: req.body.mrp,
            price: req.body.price,
            approve_b:req.body.approve_b,
            approve_by:req.body.approve_by,
            approve_date:req.body.approve_date
        }

        const addProductRaise = await ProductRaise.create(info)

        req.flash('message', 'MRP and Price Added.');
        return res.redirect('/productDetailsList')

    }

    catch (err) {
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
        console.log(err)
    }

}

const updateProductRaise = async (req, res) => {

    console.log(123)
    console.log(req.params.id)
    try {

        const productStock = await ProductStock.update({ ...req.body, mrp: req.body.mrp, salePrice: req.body.price }, { where: { itemId: req.params.id } })
        
        if (!productStock) {
            return res.status(500).send({
                success: false,
                message: "ProductStock is not found"
            })
        }

        req.flash('message', 'MRP and Price Updated.');
        return res.redirect('/productDetailsList')

    }

    catch (err) {
        console.log(err.message)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
        console.log(err)
    }

}



// Product Rate Approval Listing

const productRaiseApprovalList = async function (req, res) {
console.log(123)
    const approvalStatus = req.query.approvalStatus; // Get the approval status from query parameter
    
    let whereClause = {};
    
    if (approvalStatus === 'pending') {
      whereClause = { approve_b: null };
    } else if (approvalStatus === 'approved') {
      whereClause = { approve_b: "approved" };
    } else if (approvalStatus === 'rejected') {
      whereClause = { approve_b: "rejected" };
    }
    
    const productRaise = await ProductRaise.findAll({ where: whereClause });
    
    res.render('approval/productRaiseApprovalList', { title: 'Express', message: req.flash('message'),productRaise });
}

const updateProductRaiseApprovalStatus =  async (req, res) => {
console.log(456)
    const { action, selectedItemIds } = req.body;
    if (action === 'approved' || action === 'rejected') {
      console.log(selectedItemIds)
      selectedItemIds.forEach(async itemId => {
        try {
          // Find the category by ID using Sequelize
          const productRaise = await ProductRaise.findByPk(itemId);
          console.log(productRaise.approve_b)
          console.log(action)
          if (productRaise) {
            // Update the approval status of the category
            await ProductRaise.update({ approve_b : action }, { where : {itemId : itemId}});
          }
        } catch (error) {
          console.error('Error updating category:', error);
        }
      });
    }
    }

module.exports = {
    addProductRaise,
    updateProductRaise,
    productRaiseApprovalList,
    updateProductRaiseApprovalStatus
}