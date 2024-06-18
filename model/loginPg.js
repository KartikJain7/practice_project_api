var connection = require("../config/db");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");

const login = (obj) => {
  var query = `select id,email_id as email,user_name as name from users where email_id=${mysql.escape(
    obj.email
  )} &&  password=${mysql.escape(obj.password)} && user_status=1`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      } else {
        if (res.length > 0) {
          var token = jwt.sign(
            {
              name: res[0].name,
              email: res[0].email,
              id: res[0].id,
            },
            "randomtoken123",

            {
              expiresIn: "1d",
            }
          );
          var obj = {
            token: token,
            data: res,
            err: false,
          };

          resolve(JSON.parse(JSON.stringify(obj)));
        } else {
          let obj = {
            err: true,
          };
          resolve(JSON.parse(JSON.stringify(obj)));
        }
      }
    });
  });
};

const updateUsers = (id) => {
  var query = `update users set last_login_datetime=now() , log_in_status=1  where id=${id}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const getUserStatus = (id) => {
  var query = `select user_status from users where id=${id}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const getModuleName = () => {
  var query = `SELECT module_name_ref,module_icon,module_p_icon,module_name FROM new_pages group by module_name_ref order by sorting`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const getParentModuleName = (item) => {
  var query = `select module_name_ref from new_pages where module_name='${item}'`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const updateUsrLogInStatus = (id) => {
  var query = `update users set  log_in_status=0  where id=${id}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const getPageNames = async (moduleName, id) => {
  var query = `SELECT page_name_ref,new_pages.id,sub_module_name_icon,sub_module_name ,module_name FROM new_pages inner join users_rights on(users_rights.pages_id=new_pages.id)  where module_name_ref=${moduleName} and action='' and users_id=${id} group by page_name_ref`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const getPagesId = async (id) => {
  var query = `SELECT new_pages.id FROM new_pages inner join users_rights on(users_rights.pages_id=new_pages.id)  where  users_id=${id}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const subModuleData = async (pageName) => {
  var query = `SELECT * FROM new_pages WHERE page_name_ref='${pageName}'  and action=''`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const usrStatus = (id) => {
  var query = `SELECT user_status FROM users WHERE id=${id}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const getPages = (id) => {
  var query = `SELECT pages_id FROM users_rights WHERE users_id=${id}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const pageDetails = (arr) => {
  var query = `SELECT page_name_ref,new_pages.id,sub_module_name_icon,sub_module_name ,module_name,module_name_ref,module_icon,module_p_icon  FROM new_pages  WHERE id in(${arr}) and action=''`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
module.exports = {
  login,
  updateUsers,
  getUserStatus,
  getModuleName,
  updateUsrLogInStatus,
  getPageNames,
  getPagesId,
  subModuleData,
  getParentModuleName,
  usrStatus,
  getPages,
  pageDetails,
};
