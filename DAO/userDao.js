const db = require('../DAO/connection.js');

exports.getAll = callback => {
  let sql = "SELECT * FROM users WHERE deleted_at IS NULL ";
  let response;
  db.connection.query(sql, (err, rows) => {
    if (err) {
      console.log("error", err);

      throw err;
    }

    response = rows;

    return callback(err, response);
  });
};

exports.createUser = (user, callback) => {
  
  let { name, lastName, email, password,id_role } = user;
  let created_at = time()
  let sql = `INSERT INTO users (name, lastName, email, password, created_at,updated_at,id_role) VALUES (?, ?, ?, ?,?,?,?)`;
  db.connection.query(
    sql,
    [name, lastName, email,  password, created_at,created_at, id_role],
    (err, rows) => {
      if (err) throw err;
      callback(err,rows)
    }
  );
};

exports.getUser = (id, callback) => {
  let sql = `SELECT * FROM users WHERE id = (?) AND deleted_at IS null`;
  db.connection.query(sql, [id], (err, rows) => {
    if (err) throw err;

    response = rows;
    return callback(err, response);
  });
};

exports.isExist = (id, callback) => {
  let sql = `SELECT * FROM users WHERE id = (?) AND deleted_at IS null`;
  db.connection.query(sql, [id], (err, rows) => {
    if (err) throw err;

    return callback(err, rows);
  });
};

exports.updateUser = (user, callback) => {
  let {
    id,
    pass,
    confirmPass    
  } = user;
  if(pass ===confirmPass){
    let sql = `UPDATE users SET  password = ?  WHERE id = ? AND deleted_at IS NULL`;
    db.connection.query(sql, [pass, id], (err, rows) => {
      if (err) throw err;
      return callback(err, rows);
    });
  }

};

exports.deleteUser = (user, callback) => {
  let {
    id,
    userName,
    password,
    created_at,
    updated_at,
    deleted_at,
    id_role
  } = user;

  let currentTime = time();
  let sql = `UPDATE users SET deleted_at = ?  WHERE id = ? AND deleted_at IS NULL`;
  db.connection.query(sql, [currentTime, id], (err, rows) => {
    if (err) throw err;
  });
};


exports.getUserByNamePass = (email, callback) => {
  let sql = `SELECT * FROM users WHERE email = (?) and deleted_at is null `;
  db.connection.query(sql, [email], (err, rows) => {
    if (err) throw err;
    return callback(err, rows);
  });
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