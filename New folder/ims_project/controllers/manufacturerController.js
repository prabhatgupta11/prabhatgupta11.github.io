const db = require("../models")
const Manufacturer = db.manufacturer;


const addManufacturer = async (req, res) => {

    try {

        let info = {
            manufacturerId,
            shortDescription,
            longDescription,
            approve_b,
            approve_by,
            approve_date
        } = req.body

        const manufacturer = await Manufacturer.create(info)

        req.flash('message', 'Manufacturer added sucessfully');
        return res.redirect('/manufacturerList')

    }

    catch (err) {
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
        console.log(err)
    }

}


// Update Manufacturer Details

const updateManufacturer = async (req, res) => {
   
    try{
 
     const manufacturer = await Manufacturer.update(req.body, { where: { manufacturerId: req.params.id } })
 
     if (!manufacturer) {
         res.status(200).send({
             success: false,
             message: "Manufacturer Not Found"
         })
     }
 
     req.flash('message', 'Manufacturer Details updated sucessfully');
     return res.redirect('/manufacturerList')
 
    }catch (err) {
     console.log(err.message)
     res.status(500).send({
         success: false,
         message: "something went wrong"
     })
 }
     
     
 }

// Admin view for approving categories

const adminView = async (req,res) => {

    try {

        const pendingCategories = await Manufacturer.findAll(
            {
                where : { approve_b : null }
            }
        )
        return res.status(200).send({
            success : true ,
            pendingCategories
        })
    } catch(err){
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
        console.log(err)
    }
}

 // Admin approves a category

 const adminApprove = async (req, res) => {

    try {
        
      const manufacturerId = req.params.manufacturerId;
      console.log(123)
      console.log(manufacturerId)
      const manufacturer = await Manufacturer.update({ approve_b: 'yes' }, { where: { manufacturerId: manufacturerId } });
   
      res.status(200).send(manufacturer)
      //   res.redirect('/categories/admin');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred.');
    }
  }


//   Manufacturer Approval List

  const manufacturerApprovalList = async function (req, res) {

    const approvalStatus = req.query.approvalStatus; // Get the approval status from query parameter
    
    let whereClause = {};
    
    if (approvalStatus === 'pending') {
      whereClause = { approve_b: null };
    } else if (approvalStatus === 'approved') {
      whereClause = { approve_b: "approved" };
    } else if (approvalStatus === 'rejected') {
      whereClause = { approve_b: "rejected" };
    }
    
    const manufacturer = await Manufacturer.findAll({ where: whereClause });
    
    res.render('approval/manufacturerApprovalList', { title: 'Express', message: req.flash('message'),manufacturer });
}

const updateManufacturerApprovalStatus =  async (req, res) => {

    const { action, selectedManufacturerIds } = req.body;
    if (action === 'approved' || action === 'rejected') {
    //   console.log(selectedManufacturerIds)
      selectedManufacturerIds.forEach(async manufacturerId => {
        try {
          // Find the category by ID using Sequelize
          const manufacturer = await Manufacturer.findByPk(manufacturerId);
        //   console.log(category.approve_b)
        //   console.log(action)
          if (manufacturer) {
            // Update the approval status of the category
            await Manufacturer.update({ approve_b : action }, { where : {manufacturerId : manufacturerId}});
          }
        } catch (error) {
          console.error('Error updating category:', error);
        }
      });
    }
    }

module.exports = {
    addManufacturer,
    updateManufacturer,
    adminView,
    adminApprove,
    manufacturerApprovalList,
    updateManufacturerApprovalStatus
}