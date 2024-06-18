var connection = require("../config/db");

const pagesTbDataCount = () => {
  var query = `select count(*) as totalrows from new_pages`;
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const addErpPageData = (obj) => {
  const query = `
    INSERT INTO new_pages
    SET
      module_name = ?,
      sub_module_name = ?,
      action = ?,
      page_name_ref = ?,
      sub_module_name_icon = ?,
      module_p_icon = ?,
      module_icon = ?,
      status = ?,
      module_name_ref = ?
  `;

  const values = [
    obj.moduleName,
    obj.subModuleName,
    obj.action,
    obj.pageName,
    obj.subModuleIcon,
    obj.moduleRightSideIcon,
    obj.moduleLeftSideIcon,
    obj.status,
    obj.moduleNameRef,
  ];

  return new Promise((resolve, reject) => {
    connection.connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error adding ERP page data:", err);
        return reject(err);
      }

      const success = result.affectedRows > 0;
      resolve(success);
    });
  });
};

const checkCity = (obj) => {
  const query = `
    select * from cities
    where
    name = '${ obj.cityName}' and 
    states_id = ${obj.stateName}
     
  `;

  
 

  return new Promise((resolve, reject) => {
    connection.connection.query(query, (err, result) => {
      if (err) {
        console.error("Error adding ERP page data:", err);
        return reject(err);
      }

      const success = result.affectedRows > 0;
      resolve(success);
    });
  });
};
const addNewCityNam = (obj) => {
  const query = `
    INSERT INTO cities
    SET
    name = ?,
    states_id = ?
     
  `;

  const values = [
    obj.cityName,
    obj.stateName,
    
  ];

  return new Promise((resolve, reject) => {
    connection.connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error adding ERP page data:", err);
        return reject(err);
      }

      const success = result.affectedRows > 0;
      resolve(success);
    });
  });
};

const editCity = (obj) => {
  const query = `
    UPDATE cities
    SET
    name = ?,
    states_id = ?
     
    WHERE
      id = ?
  `;

  const values = [
    obj.cityName,
    obj.stateName,
   
    obj.id,
  ];

  return new Promise((resolve, reject) => {
    connection.connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error editing ERP page data:", err);
        return reject(err);
      }

      const success = result.affectedRows > 0;
      resolve(success);
    });
  });
};


const editErpPageData = (obj) => {
  const query = `
    UPDATE new_pages
    SET
      module_name = ?,
      sub_module_name = ?,
      action = ?,
      page_name_ref = ?,
      sub_module_name_icon = ?,
      module_p_icon = ?,
      module_icon = ?,
      status = ?,
      module_name_ref = ?
    WHERE
      id = ?
  `;

  const values = [
    obj.moduleName,
    obj.subModuleName,
    obj.action,
    obj.pageName,
    obj.subModuleIcon,
    obj.moduleRightSideIcon,
    obj.moduleLeftSideIcon,
    obj.status,
    obj.moduleNameRef,
    obj.id,
  ];

  return new Promise((resolve, reject) => {
    connection.connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error editing ERP page data:", err);
        return reject(err);
      }

      const success = result.affectedRows > 0;
      resolve(success);
    });
  });
};

const erpPageData = (id) => {
  var query = `select * from new_pages where id=${id}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const cityDataName = (id) => {
  var query = `SELECT c.name as cityName,s.name as stateName,s.id as stateId,c.id as cityId FROM cities c inner join states s  on(c.states_id=s.id) where c.id=${id}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const erpPagesData = (limit) => {
  var query = `select * from new_pages  limit ${limit}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const cityData = (cityName) => {
  var query = `SELECT c.name as cityName,s.name as stateName,c.id as cityId FROM cities c inner join states s on (c.states_id=s.id) where c.name like '%${cityName}%' limit 10`;

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
  pagesTbDataCount,
  addErpPageData,
  editErpPageData,
  erpPageData,
  erpPagesData,cityData,cityDataName,editCity,addNewCityNam,checkCity
};
