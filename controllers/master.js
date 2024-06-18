var master = require("../model/master");

const pagesTbCount = async (req, res) => {
  try {
    let response = await master.pagesTbDataCount();
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

const erpPages = async (req, res) => {
  try {
    let limit1 = req.query.firstlimit;
    let limit2 = req.query.secondlimit;
    let limit3 = parseInt(limit1) + "," + parseInt(limit2);

    let response = await master.erpPagesData(limit3);

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
const cityList = async (req, res) => {
  try {
    let cityName = req.query.name;
   

    let response = await master.cityData(cityName);

    
      let obj = {
        status_message: "success",
        status_code: "0",
        data: response,
      };
      res.send(obj);
      
    
  } catch (error) {
    console.log(error);
  }
};
const addErpPage = async (req, res) => {
  try {
    let resp = await master.addErpPageData(req.body);
    if (resp) {
      let object = {
        status_code: 0,
        status_message: "success",
      };
      res.send(object);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
const addNewCity = async (req, res) => {
  try {
    let check =await  master.checkCity(req.body)
  
    if(!check){
      let resp = await master.addNewCityNam(req.body);
    }
    
    
      let object = {
        status_code: 0,
        status_message: "success",
      };
      res.send(object);
      return;
    
  } catch (error) {
    console.log(error); 
  }
};
const editCityName = async (req, res) => {
  try {
    let check =await  master.checkCity(req.body)
    if(!check){
    let resp = await master.editCity(req.body);}
 
      let object = {
        status_code: 0,
        status_message: "success",
      };
      res.send(object);
      return;
    
  } catch (error) {
    console.log(error);
  }
};
const editErpPage = async (req, res) => {
  try {
    let resp = await master.editErpPageData(req.body);
    if (resp) {
      let object = {
        status_code: 0,
        status_message: "success",
      };
      res.send(object);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
const editErpPageData = async (req, res) => {
  try {
    let response = await master.erpPageData(req.params.id);
    if (response) {
      res.send(response);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
const editCityNameData = async (req, res) => {
  try {
    let response = await master.cityDataName(req.params.id);
    if (response) {
      res.send(response);
      
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  pagesTbCount,
  erpPages,
  addErpPage,
  editErpPage,
  editErpPageData,cityList,editCityNameData,editCityName,addNewCity
};
