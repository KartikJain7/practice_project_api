var contact = require("../model/contact");
const Excel = require("exceljs");

const contactListLength = async (req, res) => {
  try {
    let response = await contact.getLength(req.query);
    if (response) {
      let obj = {
        status_code: 0,
        status_message: "success",
        data: response,
      };
      res.send(obj);
      return;
    } else {
      let object = {
        status_code: 1,
        status_message: "error",
      };
      res.send(object);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
const allContacts = async (req, res) => {
  try {
    let response = await contact.allContacts(req.query);

    if (response) {
      let obj = {
        status_message: "success",
        status_code: "0",
        data: response,
      };
      res.send(obj);
      return;
    } else {
      let object = {
        status_message: "error",
        status_code: "1",
      };
      res.send(object);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
const getStates = async (req, res) => {
  try {
    let resp = await contact.getStateNames();
    let response = await contact.statesList(req.body.stateName);
    const stateArr = response.filter(
        (item, index, array) =>
          array.findIndex((i) => i.stateName === item.stateName) === index
      )
      .map((item) => ({ name: item.stateName, id: item.stateId }));

    const cityArr = response
      .filter(
        (item, index, array) =>
          array.findIndex((i) => i.cityName === item.cityName) === index
      )
      .map((item) => ({ name: item.cityName, id: item.cityId }));

    if (response === -1) {
      return res.status(400).json({
        status_message: "Error: Contact not added",
        status_code: 1,
      });
    }

    return res.status(200).json({ stateArr: resp, cityArr: cityArr });
  } catch (error) {
    console.error("Error adding contact:", error);
    return res.status(500).json({
      status_message: "Internal Server Error",
      status_code: 500,
    });
  }
};
const getStateList = async (req, res) => {
  try {
    let resp = await contact.getStateNames();
    
  
   


    res.send({ stateArr: resp });
  } catch (error) {
    console.error("Error adding contact:", error);
    return res.status(500).json({
      status_message: "Internal Server Error",
      status_code: 500,
    });
  }
};
const addContact = async (req, res) => {
  try {
    let originalArr=req.body.paramArr[1]
    let data=req.body.paramArr
    let id = await contact.getUsrId(data[4]);

    data.push(id[0].id);
    data.push(data[1][0]);
    data.splice(1,1);
    let response = await contact.addNewContact(data);
   
 
    let contacts=await contact.addCntctPhone(response.insertId,originalArr)
  
   

    if (response === -1) {
      return res.status(400).json({
        status_message: "Error: Contact not added",
        status_code: 1,
      });
    }

    return res.status(200).json({
      status_message: "Success: Contact added successfully",
      status_code: 0,
    });
  } catch (error) {
    console.error("Error adding contact:", error);
    return res.status(500).json({
      status_message: "Internal Server Error",
      status_code: 500,
    });
  }
};

const getContactInfo = async (req, res) => {
  try {
    
    let response = await contact.contactInfo(req.params.id);
  const phoneArr=  response.map((item,index)=>(
      item.mobile_number
  ))

response[0].phoneArra=phoneArr

    res.send(response[0]);
    return;
  } catch (error) {
    console.log(error);
  }
};
const deleteContact = async (req, res) => {
  try {
    let response = await contact.deleteContactInfo(req.params.id);

    res.send(response);
    return;
  } catch (error) {
    console.log(error);
  }
};
const updateContact = async (req, res) => {
  try {
    
  let data=req.body.updateArr
  
  let del=await contact.remCntctPhone(data[6])
  if(del){
    let contacts=await contact.addCntctPhone(data[6],data[1])
  }
  
    let id = await contact.getUsrId(data[5]);

    data.unshift(id[0].id);
    data.unshift(data[2][0]);
    data.splice(3,1)
    
    let response = await contact.updateContactInfo(data);

    if (response == 0) {
      let obj = {
        status_message: "success",
        status_code: "0",
      };
      res.send(obj);
      return;
    } else {
      let object = {
        status_message: "error",
        status_code: "1",
      };
      res.send(object);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

const getContacts = async (req, res) => {
  try {
  
    let data = await contact.contacts(req.body);
console.log(data)
    if (data === -1) {
      return res.status(400).json({
        status_message: "Error: Contact not added",
        status_code: 1,
      });
    }

    return res.status(200).json({
      status_message: "Success: Contact added successfully",
      status_code: 0,
      data: data,
    });
  } catch (error) {
    console.error("Error adding contact:", error);
    return res.status(500).json({
      status_message: "Internal Server Error",
      status_code: 500,
    });
  }
};
const getUserNames = async (req, res) => {
  let data = await contact.userNames(req.body);
  res.send(data);
};
function groupByUser(mainArray) {
  const subArrays = {};

  mainArray.forEach((item) => {
    const user = item.User;

    if (!subArrays[user]) {
      subArrays[user] = [];
    }

    subArrays[user].push(item);
  });

  return Object.values(subArrays);
}
const getContactExcel = async (req, res) => {
  try {
    const jsonData = req.body.data.map((item, index) => ({
      name: item.name,
      phone: item.phone,
      location: item.location,
      city: item.city,
      state: item.state,
      User: item.created_by,
    }));
    const result = groupByUser(jsonData);

    const workbook = new Excel.Workbook();
    for (let i = 0; i < result.length; i++) {
      const worksheet = workbook.addWorksheet(`${result[i][0].User}`);
      const headers = Object.keys(result[i][0]);
      worksheet.columns = headers.map((header) => ({
        header,
        key: header,
        width: 15,
      }));

      result[i].forEach((entry) => {
        worksheet.addRow(entry);
      });
    }
    const downloadPath = `${process.env.EXCEL_FILE_SAVE_PATH_LINK}data.xlsx`;

    await workbook.xlsx.writeFile(downloadPath);

    let path = `${process.env.EXCEL_FILE_DOWNLOAD_URL}data.xlsx`;

    res.send(path);
  } catch (err) {
    console.error("Error generating Excel file:", err);
  }
};
module.exports = {
  getContactExcel,
  getUserNames,
  getContacts,
  deleteContact,
  getStates,
  contactListLength,
  allContacts,
  addContact,
  getContactInfo,
  updateContact,getStateList
};
