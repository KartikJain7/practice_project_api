const users = require("../model/userManagement");

const usersList = async (req, res) => {
  try {
    let usersResp = await users.getUsersList();
    res.send({
      status_code: 0,
      status_message: "success",
      userData: usersResp,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateUsrStatus = async (req, res) => {
  try {
    let usersStatusResp = await users.usrStats(req.body);

    if (usersStatusResp.changedRows == 1) {
      res.send({
        status_code: 0,
        status_message: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getAccountDetail = async (req, res) => {
  try {
    let accountResp = await users.getUsrAccountDetail(req.params.id);
    if (accountResp.length > 0) {
      res.send({
        status_code: 0,
        status_message: "success",
        accDetailData: accountResp,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUsrDetail = async (req, res) => {
  try {
    let checkEmailResp = await users.verifyExistingMail(req.body.id);

    if (checkEmailResp.length > 0) {
      if (checkEmailResp[0].email_id === req.body.email) {
        if (checkEmailResp[0].password === req.body.password) {
          let resp = await users.updateUsrAccDetails(req.body, 1);
          if (resp) {
            let object = {
              status_code: 0,
              status_message: "success",
            };
            res.send(object);
          }
        } else {
          let resp = await users.updateUsrAccDetails(req.body, 2);
          if (resp) {
            let object = {
              status_code: 0,
              status_message: "success",
            };
            res.send(object);
          }
        }
      } else {
        let response = await users.verifyEmail(req.body.email);

        if (response.length > 0) {
          let objects = {
            status_code: 1,
            status_message: "error",
          };
          res.send(objects);
        } else {
          if (checkEmailResp[0].password === req.body.password) {
            let resp = await users.updateUsrAccDetails(req.body, 1);
            if (resp) {
              let object = {
                status_code: 0,
                status_message: "success",
              };
              res.send(object);
            }
          } else {
            let resp = await users.updateUsrAccDetails(req.body, 2);
            if (resp) {
              let object = {
                status_code: 0,
                status_message: "success",
              };
              res.send(object);
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const updateUsrDetailAdmin = async (req, res) => {
  try {
    let checkEmailResp = await users.verifyExistingMail(req.body.id);

    if (checkEmailResp) {
      if (checkEmailResp[0].email_id === req.body.email) {
        if (checkEmailResp[0].password === req.body.password) {
          let resp = await users.updateUsrAccDetailsAdmin(req.body, 1);
          if (resp) {
            if (checkEmailResp[0].role_id === req.body.role) {
              let object = {
                status_code: 0,
                status_message: "success",
              };
              res.send(object);
            } else {
              let userRightResp = await users.updateUsersRight(req.body.id);
              if (userRightResp) {
                let getPagesResp = await users.getPages(req.body.role);
                if (getPagesResp) {
                  for (g = 0; g < getPagesResp.length; g++) {
                    let insertUsersRightResp = await users.insertUsersRights(
                      req.body.id,
                      getPagesResp[g].pages_id
                    );
                  }

                  let object = {
                    status_code: 0,
                    status_message: "success",
                  };
                  res.send(object);
                }
              }
            }
          }
        } else {
          let resp = await users.updateUsrAccDetailsAdmin(req.body, 2);
          if (resp) {
            if (checkEmailResp[0].role_id === req.body.role) {
              let object = {
                status_code: 0,
                status_message: "success",
              };
              res.send(object);
            } else {
              let userRightResp = await users.updateUsersRight(req.body.id);
              if (userRightResp) {
                let getPagesResp = await users.getPages(req.body.role);
                if (getPagesResp) {
                  for (g = 0; g < getPagesResp.length; g++) {
                    let insertUsersRightResp = await users.insertUsersRights(
                      req.body.id,
                      getPagesResp[g].pages_id
                    );
                  }

                  let object = {
                    status_code: 0,
                    status_message: "success",
                  };
                  res.send(object);
                }
              }
            }
          }
        }
      } else {
        let response = await users.verifyEmail(req.body.email);

        if (response.length > 0) {
          let objects = {
            status_code: 1,
            status_message: "error",
          };
          res.send(objects);
        } else {
          if (checkEmailResp[0].password === req.body.password) {
            let resp = await users.updateUsrAccDetails(req.body, 1);
            if (resp) {
              if (checkEmailResp[0].role_id === req.body.role) {
                let object = {
                  status_code: 0,
                  status_message: "success",
                };
                res.send(object);
              } else {
                let userRightResp = await users.updateUsersRight(req.body.id);
                if (userRightResp) {
                  let getPagesResp = await users.getPages(req.body.role);
                  if (getPagesResp) {
                    for (g = 0; g < getPagesResp.length; g++) {
                      let insertUsersRightResp = await users.insertUsersRights(
                        req.body.id,
                        getPagesResp[g].pages_id
                      );
                    }

                    let object = {
                      status_code: 0,
                      status_message: "success",
                    };
                    res.send(object);
                  }
                }
              }
            }
          } else {
            let resp = await users.updateUsrAccDetails(req.body, 2);
            if (resp) {
              if (checkEmailResp[0].role_id === req.body.role) {
                let object = {
                  status_code: 0,
                  status_message: "success",
                };
                res.send(object);
              } else {
                let userRightResp = await users.updateUsersRight(req.body.id);
                if (userRightResp) {
                  let getPagesResp = await users.getPages(req.body.role);
                  if (getPagesResp) {
                    for (g = 0; g < getPagesResp.length; g++) {
                      let insertUsersRightResp = await users.insertUsersRights(
                        req.body.id,
                        getPagesResp[g].pages_id
                      );
                    }

                    let object = {
                      status_code: 0,
                      status_message: "success",
                    };
                    res.send(object);
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
function convertArray(inputArray) {
  const resultArray = [];

  const moduleMap = new Map();

  inputArray.forEach((item) => {
    const {
      module_name_ref,
      module_icon,
      module_p_icon,
      module_name,
      page_name_ref,
      id,
      sub_module_name_icon,
      sub_module_name,
      sub_sub_module_name,
    } = item;

    if (!moduleMap.has(module_name_ref)) {
      moduleMap.set(module_name_ref, {
        moduleName: module_name_ref,
        moduleLeftIcon: module_icon,
        moduleRightIcon: module_p_icon,
        moduleUrl: module_name,
        pageNameArr: [],
      });
    }

    const module = moduleMap.get(module_name_ref);

    const pageIndex = module.pageNameArr.findIndex(
      (page) => page.page_name === page_name_ref
    );

    if (pageIndex === -1) {
      module.pageNameArr.push({
        page_name: page_name_ref,
        id,
        page_icon: sub_module_name_icon,
        page_name_url: sub_module_name,
        module_url: module_name,
        subModeArr: sub_sub_module_name
          ? [
              {
                name: sub_sub_module_name.trim(),
                icon: sub_module_name_icon,
                page_name_url: sub_module_name,
                module_url: module_name,
              },
            ]
          : [],
      });
    } else {
      module.pageNameArr[pageIndex].subModeArr.push({
        name: sub_module_name.trim(),
        icon: sub_module_name_icon,
        page_name_url: sub_module_name,
        module_url: module_name_ref,
      });
    }
  });

  resultArray.push(...moduleMap.values());

  return resultArray;
}
const moduleName = async (req, res) => {
  try {
    let pageDetails = await users.pageDetails();
    const outputArray = convertArray(pageDetails);

    res.send(outputArray);
  } catch (error) {
    console.log(error);
  }
};
const currntUsrRights = async (req, res) => {
  try {
    let rightsResp = await users.getCurntUserRights(req.params.id);
    if (rightsResp.length > 0) {
      let userRightsArr = [];
      for (i = 0; i < rightsResp.length; i++) {
        userRightsArr.push(rightsResp[i].pages_id);
      }
      let object = {
        status_code: 0,
        status_message: "success",
        array: userRightsArr,
      };
      res.send(object);
    }
  } catch (error) {
    console.log(error);
  }
};
const updateUserRights = async (req, res) => {
  try {
    let rightsResp = await users.getCurntUserRights(req.body.id);
    if (rightsResp.length > 0) {
      let userRightsArr = [];
      for (i = 0; i < rightsResp.length; i++) {
        userRightsArr.push(rightsResp[i].pages_id);
      }
      for (k = 0; k < req.body.rightsArr.length; k++) {
        if (userRightsArr.includes(req.body.rightsArr[k])) {
        } else {
          let insertNewRightResp = await users.insertNewRight(
            req.body.rightsArr[k],
            req.body.id
          );
        }
      }
      for (l = 0; l < userRightsArr.length; l++) {
        if (req.body.rightsArr.includes(userRightsArr[l])) {
        } else {
          let rightsResp = await users.deleteExistingRight(
            userRightsArr[l],
            req.body.id
          );
        }
      }
      let object = {
        status_code: 0,
        status_message: "success",
      };
      res.send(object);
    }
  } catch (error) {
    console.log(error);
  }
};
const addNewUser = async (req, res) => {
  try {
    let response = await users.verifyEmail(req.body.email);

    if (response.length > 0) {
      let objects = {
        status_code: 1,
        status_message: "error",
      };
      res.send(objects);
    } else {
      let resp = await users.addNewUser(req.body);
      if (resp) {
        let respo = await users.getDefaultRights(req.body.role_id);
        if (respo) {
          for (i = 0; i < respo.length; i++) {
            let data = await users.insertUsersRights(
              resp.insertId,
              respo[i].pages_id
            );
          }

          let object = {
            status_code: 0,
            status_message: "success",
          };
          res.send(object);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getRoles = async (req, res) => {
  try {
    let response = await users.getRoles();
    if (response) {
      res.send(response);
    }
  } catch (error) {
    console.log(error);
  }
};

const roleRights = async (req, res) => {
  try {
    let rights = await users.getRolesRights(req.params.id);
    if (rights.length > 0) {
      let rolesRightArr = [];
      for (d = 0; d < rights.length; d++) {
        rolesRightArr.push(rights[d].pages_id);
      }
      let object = {
        status_code: 0,
        status_message: "success",
        array: rolesRightArr,
      };
      res.send(object);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateRolesRight = async (req, res) => {
  try {
    let deleteCurrRight = await users.deleteExistingRoleRight(req.body.id);
    const rightArrLength = req.body.rightsArr.length;
    for (let d = 0; d < rightArrLength; d++) {
      let insertNewRightResp = await users.insertNewRoleRight(
        req.body.rightsArr[d],
        req.body.id
      );
    }

    let object = {
      status_code: 0,
      status_message: "success",
    };
    res.send(object);
  } catch (error) {
    console.log(error);
  }
};
const addNewRole = async (req, res) => {
  try {
    let nameResp = await users.insertNewRole(req.body.name);
    if (nameResp) {
      for (p = 0; p < req.body.rightsArr.length; p++) {
        let rolesRight = await users.insertNewRoleRight(
          req.body.rightsArr[p],
          nameResp.insertId
        );
      }
      let object = {
        status_code: 0,
        status_message: "success",
      };
      res.send(object);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  usersList,
  updateUsrStatus,
  getAccountDetail,
  updateUsrDetail,
  updateUsrDetailAdmin,
  moduleName,
  currntUsrRights,
  updateUserRights,
  roleRights,
  updateRolesRight,
  addNewRole,
  addNewUser,
  getRoles,
};
