class Auth {
  constructor() {}

  //signup
  // create user
  createUser(table, obj) {
    let sql = `INSERT INTO ${table} (name, email, password) values ('${obj.name}', '${obj.email}', '${obj.pass}')`;
    return sql;
  }

  //find user
  find(table, email) {
    let sql = `SELECT * FROM ${table} WHERE email = '${email}'`;
    return sql;
  }

  //update password
  updatePass(table, email, pass) {
    let sql = `UPDATE ${table} SET password = '${pass}' WHERE email = '${email}'`;
    return sql;
  }
}

module.exports = Auth;
