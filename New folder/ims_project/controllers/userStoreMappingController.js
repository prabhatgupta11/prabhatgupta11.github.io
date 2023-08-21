const db = require("../models")
// const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
// const config = require("../config/auth.config")
const User = db.user
const Store = db.store
const UserStoreMapping = db.userStoreMapping
const session = require('express-session');


const addUserStoreMapping = async (req, res) => {

  const selectedUserId = req.body.id;
  const selectedStoreIds = req.body.outletId; // An array of selected ouletIds
// console.log(selectedUserId,selectedStoreIds)
  try {
    // Find the user by selectedUserId
    const user = await User.findByPk(selectedUserId);

    // Create associations between the user and selected stores
    for (const selectedStoreId of selectedStoreIds) {
      const store = await Store.findByPk(selectedStoreId);
      if (store) {
        // Create a UserStoreMapping entry
        await UserStoreMapping.create({
          userFk: user.id,
          storeFk: store.outletId
        });
      }
    }
    req.flash('message', 'Added stores for this user Sucessfully.');
    return res.redirect('/userStoreMapping')

  } catch (error) {
    console.log(error)
  }
}




//  get user store data from database and show into selected checkbox

const getUserStoreData = async (req, res) => {
  // console.log(123)
  const userId = req.params.userId;
  try {

    const store = await Store.findAll()

    let selectedStore = await UserStoreMapping.findAll({ where: { userFk: userId } })

    let arr = []
    let userStoreIds = []

    for (i = 0; i < selectedStore.length; i++) {
      userStoreIds.push(selectedStore[i].storeFk)
    }

    function onlyUnique(value, index, array) {
      return array.indexOf(value) === index;
    }
    var unique = userStoreIds.filter(onlyUnique);
    // console.log(unique)

    for (i = 0; i < store.length; i++) {
      let flag = false
      
      for (let j = 0; j < userStoreIds.length; j++) {
        if (store[i].outletId == userStoreIds[i]) {
          flag = true
        }
      }

      if (flag == true) {
        arr.push({ ...store[i].dataValues, checked: true })
      } else {
        arr.push({ ...store[i].dataValues, checked: false })
      }
    }

    // console.log(userStoreIds)

    res.json(arr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// deselect a store 

// const deselectStore = async (req, res) => {
//   console.log(123)
//   const userId = req.params.userId;
//   const outletId = req.params.outletId;
// console.log(userId,outletId)
//   try {
//       // Remove the store from the UserStoreMapping table
//       console.log(456)
//     const removeStore =  await UserStoreMapping.destroy({ where: { userFk: userId, storeFk: outletId } });
// console.log(removeStore)
// req.flash('message', 'stores update Sucessfully.');
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// User Store Management Approval List

const  userStoreMappingApprovalList = async function (req, res) {

  const approvalStatus = req.query.approvalStatus; // Get the approval status from query parameter
  
  let whereClause = {};
  
  if (approvalStatus === 'pending') {
    whereClause = { approve_b: null };
  } else if (approvalStatus === 'approved') {
    whereClause = { approve_b: "approved" };
  } else if (approvalStatus === 'rejected') {
    whereClause = { approve_b: "rejected" };
  }
  
  const userStore = await UserStoreMapping.findAll({ where: whereClause });
  
  res.render('approval/userStoreMappingApprovalList', { title: 'Express', message: req.flash('message'),userStore });
}

const updateUserStoreMappingApprovalStatus =  async (req, res) => {

  const { action, selectedUserIds } = req.body;
  if (action === 'approved' || action === 'rejected') {
    console.log(selectedUserIds)
    selectedUserIds.forEach(async userFk => {
      try {
        // Find the category by ID using Sequelize
        const userStore = await UserStoreMapping.findByPk(userFk);
        console.log(userStore.approve_b)
        console.log(action)
        if (userStore) {
          // Update the approval status of the category
          await UserStoreMapping.update({ approve_b : action }, { where : {userFk : userFk}});
        }
      } catch (error) {
        console.error('Error updating category:', error);
      }
    });
  }
  }


module.exports = {
  addUserStoreMapping,
  getUserStoreData,
  // deselectStore,
  userStoreMappingApprovalList,
  updateUserStoreMappingApprovalStatus

}