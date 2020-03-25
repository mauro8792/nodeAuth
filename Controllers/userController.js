const daoUser = require("../DAO/userDao.js");
const jwt = require('jsonwebtoken')

isExistUser = id => {
  let exist = false;
  let user = daoUser.isExist(id, (err, resp) => {
    if (resp) {
      console.log("resp", resp);
      if (Array.isArray(resp) && resp.length > 0) exist = true;
      else exist = false;
      console.log(exist);

      return exist;
    }
    return exist;
  });
};

exports.index = (req, res) => {
  //verifica
  jwt.verify(req.token, 'my_secret_key', (err,data)=>{
    if (err) {
      res.sendStatus(403)
    }else{
      daoUser.getAll((err, users) => {
        res.json({ users: users, data });
      });

    }
  })
};

exports.show = (req, res) => {
  let id = req.params.id;

  try {
    console.log(id);

    daoUser.getUser(id, (err, resp) => {
      if (err) {
        res.status(500).json({ result: false, message: "internal error" });
      } else {
        res.json({ user: resp });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

exports.update = (req, res) => {
  try {
    let { id, userName, password, id_role } = req.body;

    let user = {
      id: id,
      userName: userName,
      password: password,
      id_role: id_role
    };

    console.log("entro");

    daoUser.updateUser(user, (err, response) => {
      console.log("entro2");

      if (err) {
        res.status(500).json({ result: false, message: "internal error" });
      } else {
        console.log("update", response);

        res.json({ update: response });
      }
    });
  } catch (e) {
    console.log(e);
  }
};
exports.store = (req, res) => {
  let {name, lastName,email, password, id_role } = req.body;

  let created = time();
  try {
    let user = {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      id_role: id_role
    };
    console.log('user', user);
    
    daoUser.createUser(user,(err,response)=>{
      if(err){
        res.status(500).json({ result: false, message: "internal error" })
      }
      else{
        console.log("created",response);
        res.json({"created":response})
        
      }
    });
    
  } catch (e) {
    console.log(e);
  }
};

exports.delete = (req, res) => {
  
  try {
    let { id, userName, password, deleted_at, id_role } = req.body;
    let deleted = time();

    let user = {
      id: id,
      userName: userName,
      password: password,
      deleted_at: deleted_at,
      id_role: id_role
    };
    daoUser.deleteUser(user, (err,response) => {
      if(err){
        res.status(500).json({ result: false, message: "internal error" });
      }
      else{
        console.log("deleted",response);
        res.json({"deleted":response})
        
      }
    })
  } catch (e) {
    console.log(e);
  }
};

let time = () => {
  let today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var hour =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var created = date + " " + hour;
  return created;
};