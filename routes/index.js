const express = require("express");
const router = express.Router();

router.get("/", function (res) {
  res.send("Welcome to API. You are not allowed to be here ");
});

// file names
const contact = require("../controllers/contacts");
const master = require("../controllers/master");
const loginPg = require("../controllers/loginPg");
const userMngment = require("../controllers/userManagement");

//login APIs
router.post("/decryptData", loginPg.decryptData);
router.post("/postlogindata", loginPg.login);
router.get("/getPagesId/:id", loginPg.getUserRights);
router.get("/getParentModule/:moduleName", loginPg.getParentModule);
router.get("/getUserActionRights/:id", loginPg.getUserActionRights);
router.put("/logout", loginPg.logout);

//userMangmnt  APIs
router.get("/getUsrList", userMngment.usersList);
router.put("/updateUsersStatus", userMngment.updateUsrStatus);
router.get("/getAccDetails/:id", userMngment.getAccountDetail);
router.put("/updateUsrDetails", userMngment.updateUsrDetail);
router.put("/updateUsrDetailsAdmin", userMngment.updateUsrDetailAdmin);
router.get("/moduleName", userMngment.moduleName);
router.get("/getcurntUsrRght/:id", userMngment.currntUsrRights);
router.put("/updateUsersRights", userMngment.updateUserRights);
router.get("/getcurntRoleRght/:id", userMngment.roleRights);
router.put("/updateRolesRights", userMngment.updateRolesRight);
router.post("/addNewRole", userMngment.addNewRole);
router.post("/submitUserDetails", userMngment.addNewUser);
router.get("/getUserRole", userMngment.getRoles);
//Master APIs
router.get("/getErpPagesData", master.erpPages);
router.get("/getCityList", master.cityList);

router.get("/erpPagesCount", master.pagesTbCount);

router.post("/addNewCityName", master.addNewCity);
router.post("/addErpNewPage", master.addErpPage);
router.post("/updateExistingErpPage", master.editErpPage);
router.post("/updateCityName", master.editCityName);
router.get("/editErpPage/:id", master.editErpPageData);
router.get("/editCityName/:id", master.editCityNameData);
//Contact APIs
router.get("/contactListLength", contact.contactListLength);
router.get("/getAllContacts", contact.allContacts);
router.post("/addNewContact", contact.addContact);
router.get("/contactInfo/:id", contact.getContactInfo);
router.get("/deleteContact/:id", contact.deleteContact);
router.put("/updateContact", contact.updateContact);
router.post("/cityStateList", contact.getStates);
router.get("/stateList", contact.getStateList);


router.get("/userNames", contact.getUserNames);
router.post("/searchContacts", contact.getContacts);
router.post("/contactsExcel", contact.getContactExcel);
module.exports = router;
