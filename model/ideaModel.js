class Idea {
  constructor() {}

  //signup
  // create user
  fetchAll(table) {
    let sql = `CALL fetch_all_ideas();`;
    return sql;
  }

  //find user
  // find(table, email){
  //     let sql = `SELECT * FROM ${table} WHERE email = '${email}'`;
  //     return sql;
  // }

  insertIdea(table, obj) {
    let sql = `INSERT INTO ${table} (title, description, userId) VALUES ('${obj.title}', '${obj.description}', (SELECT id FROM user WHERE email = '${obj.userEmail}'))`;
    console.log(sql);
    console.log(obj.userEmail);
    return sql;
  }
}

module.exports = Idea;
