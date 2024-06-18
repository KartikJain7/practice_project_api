var connection = require("../config/db");

const addNewContact = (values) => {
  const sqlQuery =
    "INSERT INTO contacts (name , location,city, created_by,state,users_id,phone,create_date) VALUES ( ?, ?, ?,?, ?,?,?,now())";
  return new Promise((resolve, reject) => {
    connection.connection.query(sqlQuery, values, function (err, result) {
      if (err) {
        console.error("Error executing query:", err);
        return reject(err);
      }

      if (result.affectedRows === 1) {
        resolve(result);
      } else {
        resolve(-1);
      }
    });
  });
};

const contactInfo = (id) => {
  var query = `select * from contacts c INNER JOIN contacts_phone_numbers cpn on(c.id=cpn.contacts_id) where c.id=${id}`;
  
console.log(query)
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const deleteContactInfo = (id) => {
  var query = `Delete from contacts where id=${id}`;
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const updateContactInfo = (values) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE contacts SET phone=?, users_id=?, name=?,  location=?,  city=?, state=?,created_by=?  WHERE id=?";

    connection.connection.query(query, values, function (err, res) {
      if (err) {
        console.error("Error updating contact info:", err);
        return reject(err);
      }

      resolve(0);
    });
  });
};

const getLength = (obj) => {
  var query = `select count(*) as totalrows from contacts`;
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }

      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const allContacts = (obj) => {
  var query = `select con.id as id ,  con.created_by as created_by, con.name,con.phone,con.location,c.name as city,s.name as state from contacts con inner join cities c on(c.id=con.city) inner join states s on(s.id=con.state)    limit ${obj.firstlimit},${obj.secondlimit}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const getStateNames = () => {
  var query = `select * from states  `;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const statesList = (state) => {
  const stateStr = state != "" ? ` where c.states_id=${state}` : ``;
  var query = `select s.name as stateName,c.name as cityName,c.id as cityId,s.id as stateId from cities c inner join states s on(c.states_id=s.id) ${stateStr} `;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const contacts = (obj) => {
  const id =
    obj.name.length > 0
      ? ` con.users_id in ( ${obj.name.map(
          (item, index) => `'${item.value}'`
        )})`
      : ``;
      const andStr = (obj.name.length && (obj.state || obj.city || obj.contactPhone || obj.contactName)) ? 'and ' : '';

  const state =
    obj.state.length > 0
      ? ` con.state in ( ${obj.state.map((item, index) => `'${item.value}'`)})`
      : ``;
  const andString = (obj.state.length && ( obj.city || obj.contactPhone || obj.contactName)) ? 'and ' : '';
  const city =
    obj.city.length > 0
      ? ` con.city in ( ${obj.city.map((item, index) => `'${item.value}'`)})`
      : ``;
const whereStr=(obj.name.length>0 || obj.state || obj.city || obj.contactPhone || obj.contactName)?`where`:``
      const andStrng = (obj.city.length && ( obj.contactPhone || obj.contactName)) ? 'and ' : '';
      const andStrn = (obj.contactPhone.length && ( obj.contactName)) ? 'and ' : '';
      const phone=obj.contactPhone.length>0 ? `cpn.mobile_number like '%${obj.contactPhone}%'`:``
      const contactName=obj.contactName.length>0 ? `con.name like '%${obj.contactName}%'`:``
  var query = `select DISTINCT(con.id) as id ,  u.user_name as created_by, con.name,con.phone,con.location,c.name as city,s.name as state from contacts con inner join cities c on(c.id=con.city) inner join states s on(s.id=con.state) inner join users u on(u.id=con.users_id) inner join contacts_phone_numbers cpn on(cpn.contacts_id=con.id) ${whereStr} ${id} ${andStr} ${state} ${andString} ${city} ${andStrng} ${phone} ${andStrn} ${contactName}`;

  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};

const getPhoneNos = (id) => {
  var query = `select mobile_number from contacts_phone_numbers where contacts_id=${id} `;
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const userNames = () => {
  var query = `select user_name,id from users `;
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
};
const remCntctPhone=(id)=>{
  var query=" delete from contacts_phone_numbers where contacts_id="+id
  return new Promise((resolve, reject) => {
    connection.connection.query(query, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });

}
const addCntctPhone=(id,arr)=>{
  var query="INSERT INTO contacts_phone_numbers (contacts_id, mobile_number) VALUES (?, ?) "
  arr.forEach(value => {
    let data=[id,value]
  return new Promise((resolve, reject) => {
    connection.connection.query(query,data, function (err, res) {
      if (err) {
        return resolve(-1);
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });})
}
const getUsrId = (id) => {
  var query = `SELECT id FROM users WHERE user_name='${id}'`;

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
  userNames,
  getStateNames,
  contacts,
  getUsrId,
  deleteContactInfo,
  statesList,
  getLength,
  allContacts,
  addNewContact,
  contactInfo,
  updateContactInfo,remCntctPhone,addCntctPhone,getPhoneNos
};
