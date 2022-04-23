/**
 * WARNING .... !!!
 * examples of helper use
 
 * > 1. sqlInsertHelper(table_name(string), inputted_data(object));
     example : sqlInsertHelper("users", { userName: "John", email:"john@gmail.com", password: "12345678" });

 * > 2. sqlGetDataHelper(table_name(string), search_data(object), limit(number), offset(number), order_by(string));
     example : sqlGetDataHelper("users", { userName: "John" }, 10, 0, "userID");

 * > 3. sqlCountHelper(table_name(string), search_data(object));
     example : sqlCountHelper("users", { userName: "John" });

 * > 4. update(table_name(string), where_data(object), update_data(object));
     example : update("users", { userName: "John" }, { userName: "John", email:"
 */

const objLoop = (obj) => {
  let str = "";
  const operator = ["AND", "OR"];
  Object.keys(obj).map((key) => {
    const x = obj[key];

    if (key === "default") {
      str += "AND " + x;
    }
    if (operator.includes(x[0])) {
      const strQ = ` ${x[0]} ${table}.${key} = ${x[1]}`,
        strIlike = `ILIKE '%${x[1]}%'`;

      typeof x[1] === "number"
        ? (str += strQ)
        : (str += strQ.split("=")[0] + strIlike);
    } else {
      str += ` ${table}.${key} ` + strIlike;
    }
  });
  return str
}

const sqlInsertHelper = (table, d) => {
  let column = "",
    value = [];
  Object.keys(d).map((key) => {
    column += `${key}, `;
    value.push(d[key]);
  });
  return `INSERT INTO ${table}(${column}) VALUES(${value
    .map((v) => `'${v}'`)
    .join(", ")})`;
};

const sqlGetDataHelper = (table, search, limit, offset, orderBy) => {
  const order = orderBy ? ` ORDER BY ${orderBy}` : "",
    page = limit ? ` LIMIT ${limit} OFFSET ${offset || 0}` : "",
    searchBy = objLoop(search);
    
  return `SELECT * FROM ${table} WHERE ${searchBy.slice(0, -4) + order + page}`;
};

const update = (table, where, data) => {
  let searchBy = "",
    arrUpdate = [];
  // create 'where' sql query
  Object.keys(where).map((key) => {
    const x = where[key];

    if (key === "default") {
      searchBy += "AND " + x;
    }
    if (operator.includes(x[0])) {
      const strQ = ` ${x[0]} ${table}.${key} = ${x[1]}`,
        strIlike = `ILIKE '%${x[1]}%'`;

      typeof x[1] === "number"
        ? (searchBy += strQ)
        : (searchBy += strQ.split("=")[0] + strIlike);
    } else {
      searchBy += ` ${table}.${key} ` + strIlike;
    }
  });

  Object.keys(data).map((key) => {
    const payload =
      typeof data[key] === "number" ? data[key] : `'${data[key]}'`;
    arrUpdate.push(`${key} = ${payload}, `);
  });

  // execute query
  return `UPDATE ${table} SET ${arrUpdate
    .join("")
    .slice(0, -2)} WHERE ${searchBy}`;
};
