var log = require("../model/loginPg");
var md5 = require("md5");
const crypto = require("crypto");

async function encryptObject(object, key) {
  const text = JSON.stringify(object);
  const encodedText = Buffer.from(text, "utf-8");

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);

  let encryptedData = cipher.update(encodedText, "utf8", "hex");

  encryptedData += cipher.final("hex");

  return iv.toString("hex") + encryptedData;
}

async function decryptObject(encryptedData, key) {
  if (encryptedData) {
    const iv = Buffer.from(encryptedData.slice(0, 32), "hex");
    const encryptedText = encryptedData.slice(32);

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(key),
      iv
    );

    let decryptedText = decipher.update(encryptedText, "hex", "utf8");

    decryptedText += decipher.final("utf8");

    return JSON.parse(decryptedText);
  }
}

async function encryptAndDecrypt(inputText) {
  const key = process.env.ENCRYPT_DECRYPT_SECRET_KEY;

  const encryptedData = await encryptObject(inputText, key);

  const decryptedObject = await decryptObject(encryptedData, key);

  return { encryptedData: encryptedData, decryptedObject: decryptedObject };
}
const login = async (req, res) => {
  
  try {
    let obj = {
      email: req.body.email,
      password: md5(req.body.password),
    };
   
    let response = await log.login(obj);
    if (response) {
      let object = {
        loginData: response,
      };
      res.send(object);
      if (response.err == false) {
        let resp = await log.updateUsers(response.data[0].id);
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
        module_url: module_name,
      });
    }
  });

  resultArray.push(...moduleMap.values());

  return resultArray;
}
const getUserRights = async (req, res) => {
  try {
    let getUsrStatus = await log.usrStatus(req.params.id);
    if (getUsrStatus[0].user_status) {
      let getPages = await log.getPages(req.params.id);

      pageArr = getPages.map((item, index) => item.pages_id);

      let pageDetails = await log.pageDetails(pageArr);
      const outputArray = convertArray(pageDetails);

      let data = await encryptAndDecrypt(outputArray);

      res.send(data.encryptedData);
    } else {
      let object = {
        status: 1,
        status_text: "failed",
      };
      res.send(object);
    }
  } catch (error) {
    console.log(error);
  }
};
const decryptData = async (req, res) => {
  try {
    const key = process.env.ENCRYPT_DECRYPT_SECRET_KEY;
    const decryptedObject = await decryptObject(JSON.parse(req.body.data), key);
    res.send(decryptedObject);
  } catch (error) {
    console.log(error);
  }
};
const getParentModule = async (req, res) => {
  let module = await log.getParentModuleName(req.params.moduleName);
  if (module.length > 0) {
    res.send(module[0].module_name_ref);
  }
};
const logout = async (req, res) => {
  try {
    if (req.body.userId) {
      let status = await log.updateUsrLogInStatus(req.body.userId);
      if (status.changedRows == 1) {
        let succesObject = {
          status_code: 0,
          status_message: "successfully logged out ",
        };

        res.send(succesObject);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const getUserActionRights = async (req, res) => {
  try {
    let actionRights = await log.getPagesId(req.params.id);

    let logInResp = await log.getUserStatus(req.params.id);
    if (actionRights && logInResp[0].user_status === 1) {
      res.send(actionRights);
    } else {
      let object = {
        status: 1,
        status_text: "failed",
      };
      res.send(object);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  login,
  getUserRights,
  logout,
  getUserActionRights,
  getParentModule,
  decryptData,
};
