const connection = require("../config/db");
const mysql = require("mysql");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const getUsersList = async () => {
  var query = `select u.id,u.user_name,u.email_id,u.phone ,u.last_login_datetime,u.user_status,u.created_by,r.roles from users as u INNER JOIN roles as r on(u.role_id=r.id)`;
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const usrStats = async (obj) => {
  var query = `update users set user_status=${obj.status} where id=${obj.id}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const getUsrAccountDetail = async (id) => {
  var query = `select users.*,roles.roles from users INNER JOIN roles on(users.role_id=roles.id)  where users.id=${id}`;
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const updateUsrAccDetails = async (obj, status) => {
  if (status == 1) {
    var query =
      "update users set user_name=" +
      mysql.escape(obj.name) +
      ",email_id=" +
      mysql.escape(obj.email) +
      ",phone='" +
      obj.phone +
      "',password='" +
      obj.password +
      "',salt='" +
      obj.salt +
      "' where id=" +
      obj.id;
  } else if ((status = 2)) {
    var query =
      "update users set user_name=" +
      mysql.escape(obj.name) +
      ",email_id=" +
      mysql.escape(obj.email) +
      ",phone='" +
      obj.phone +
      "',password='" +
      md5(obj.password) +
      "',salt='" +
      obj.salt +
      "' where id=" +
      obj.id;
  }

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const verifyExistingMail = async (id) => {
  var query = `select email_id,password,role_id from users where id=${id}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const updateUsrAccDetailsAdmin = async (obj, status) => {
  if (status == 1) {
    var query =
      "update users set user_name=" +
      mysql.escape(obj.name) +
      ",email_id=" +
      mysql.escape(obj.email) +
      ",phone='" +
      obj.phone +
      "',password='" +
      obj.password +
      "',role_id='" +
      obj.role +
      "',salt='" +
      obj.salt +
      "' where id=" +
      obj.id;
  } else if ((status = 2)) {
    var query =
      "update users set user_name=" +
      mysql.escape(obj.name) +
      ",email_id=" +
      mysql.escape(obj.email) +
      ",phone='" +
      obj.phone +
      "',password='" +
      md5(obj.password) +
      "',role_id='" +
      obj.role +
      "',salt='" +
      obj.salt +
      "' where id=" +
      obj.id;
  }

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const updateUsersRight = (id) => {
  var query = `Delete from users_rights where users_id=${id}`;
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
  var query = `select pages_id from roles_right where roles_id=${id}`;
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const insertUsersRights = (id, pageId) => {
  var query = `insert into users_rights set users_id=${id},pages_id=${pageId}`;
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
  var query = `SELECT module_name_ref FROM new_pages group by module_name`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const getPageNames = async (moduleName) => {
  var query = `SELECT page_name_ref,id FROM new_pages  where module_name_ref=${moduleName}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const getCurntUserRights = async (id) => {
  var query = `select pages_id from users_rights where users_id=${id}`;
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const deleteExistingRight = (pagesId, id) => {
  var query = `Delete from users_rights where users_id=${id} and pages_id= ${pagesId}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const insertNewRight = (pagesId, id) => {
  var query = `insert into users_rights set users_id=${id} , pages_id=${pagesId}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const getRolesRights = async (id) => {
  var query = `select pages_id from roles_right where roles_id=${id}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const deleteExistingRoleRight = (id) => {
  const query = "DELETE FROM roles_right WHERE roles_id = ?";

  return new Promise((resolve, reject) => {
    connection.connection.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error deleting role right:", err);
        return reject(err);
      }

      const affectedRows = results.affectedRows || 0;
      resolve(affectedRows);
    });
  });
};

const insertNewRoleRight = (pagesId, id) => {
  var query = `insert into roles_right set roles_id=${id} , pages_id=${pagesId}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const insertNewRole = (name) => {
  var query = `insert into roles set roles=${name}`;
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const pageDetails = () => {
  var query = `SELECT page_name_ref,new_pages.id,sub_module_name_icon,sub_module_name ,module_name,module_name_ref,module_icon,module_p_icon  FROM new_pages`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const verifyEmail = (email) => {
  var query = "select * from users where email_id=" + mysql.escape(email) + "";

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const addNewUser = (obj) => {
  var query =
    "insert into users set email_id=" +
    mysql.escape(obj.email) +
    ",user_name=" +
    mysql.escape(obj.name) +
    ",phone='" +
    obj.phone +
    "',password='" +
    md5(obj.password) +
    "',role_id='" +
    obj.role_id +
    "',salt='" +
    obj.salt +
    "',created_on=now(),user_status=1,created_by='" +
    obj.createdBy +
    "'";

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const getRoles = () => {
  var query = "select id,roles as name from roles";
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const getDefaultRights = (roleId) => {
  var query = "select pages_id from roles_right where roles_id=" + roleId;
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
  getUsersList,
  usrStats,
  getUsrAccountDetail,
  updateUsrAccDetails,
  verifyExistingMail,
  updateUsrAccDetailsAdmin,
  updateUsersRight,
  getPages,
  getModuleName,
  getPageNames,
  getCurntUserRights,
  insertNewRight,
  deleteExistingRight,
  getRolesRights,
  deleteExistingRoleRight,
  insertNewRoleRight,
  insertNewRole,
  pageDetails,
  verifyEmail,
  addNewUser,
  getRoles,
  getDefaultRights,
  insertUsersRights,
};
