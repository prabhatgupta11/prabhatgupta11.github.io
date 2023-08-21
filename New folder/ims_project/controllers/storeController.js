const db = require("../models")
const Store = db.store;


const createStore = async (req, res) => {

    try {

        let info = {
            outletId,
            storeName,
            storeAddress,
            approve_b,
            approve_by,
            approve_date
        } = req.body

        const store = await Store.create(info)
        req.flash('message', 'Store added sucessfully');
        return res.redirect('/storeList')

    }

    catch (err) {
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
        console.log(err)
    }

}

// Get All Store Details
const getAllStoreDetails = async (req, res) => {
    const stores = await Store.findAll()
    res.status(200).send({
        success: true,
        stores
    })
}


// Update Store Details

const updateStore = async (req, res) => {
   
   try{
console.log(123)
    const store = await Store.update(req.body, { where: { outletId: req.params.id } })

    if (!store) {
        res.status(200).send({
            success: false,
            message: "Store Not Found"
        })
    }

    req.flash('message', 'Store Details updated sucessfully');
    return res.redirect('/storeList')

   }catch (err) {
    console.log(err.message)
    res.status(500).send({
        success: false,
        message: "something went wrong"
    })
}
    
    
}


//   store Approval List

const storeApprovalList = async function (req, res) {
    
    const approvalStatus = req.query.approvalStatus; // Get the approval status from query parameter
    
    let whereClause = {};
    
    if (approvalStatus === 'pending') {
      whereClause = { approve_b: null };
    } else if (approvalStatus === 'approved') {
      whereClause = { approve_b: "approved" };
    } else if (approvalStatus === 'rejected') {
      whereClause = { approve_b: "rejected" };
    }
    
    const store = await Store.findAll({ where: whereClause });
    
    res.render('approval/storeApprovalList', { title: 'Express', message: req.flash('message'),store });
}

const updateStoreApprovalStatus =  async (req, res) => {
console.log(123)
    const { action, selectedStoreIds } = req.body;
    if (action === 'approved' || action === 'rejected') {
    //   console.log(selectedstoreIds)
      selectedStoreIds.forEach(async outletId => {
        try {
          // Find the category by ID using Sequelize
          const store = await Store.findByPk(outletId);
        //   console.log(category.approve_b)
        //   console.log(action)
          if (store) {
            // Update the approval status of the category
            await Store.update({ approve_b : action }, { where : {outletId : outletId}});
          }
        } catch (error) {
          console.error('Error updating category:', error);
        }
      });
    }
    }



module.exports = {
    createStore,
    getAllStoreDetails,
    updateStore,
    storeApprovalList,
    updateStoreApprovalStatus
}