const User = require('../models/User');
const TeamLeader = require('../models/teamLeader');
const VideoEditor = require('../models/videoEditor');
const Student = require('../models/student.model');
const FinanceManager = require('../models/financeManager.model');
const DigitalMarketer = require('../models/digitalMarketer');
const Designer = require('../models/Designer');
// const BDM = require('../models/bussinessDevelopmentManager.model');
const AssociateConsultant = require('../models/associateConsultantModel');
const BDM = require("../models/BDM");

// This function searches all models for the user by email
const findUserByEmailAndCheckPassword = async (email) => {
  console.log(email)
  const user =
    (await User.findOne({ email })) ||
    (await TeamLeader.findOne({ email })) ||
    (await VideoEditor.findOne({ email })) ||
    (await Student.findOne({ email })) ||
    (await FinanceManager.findOne({ email })) ||
    (await DigitalMarketer.findOne({ email })) ||
    (await Designer.findOne({ email })) ||
    (await BDM.findOne({ email })) ||
    (await AssociateConsultant.findOne({ email }));
  console.log(user)
  return user;

};
module.exports = { findUserByEmailAndCheckPassword };