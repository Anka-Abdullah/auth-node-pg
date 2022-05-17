import client from "../db.js";

async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS public.tb_user (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP 
     );`;
  await client.connect();
  // await client.query(sql)
  const {rowCount, rows} = await client.query(`select * from pg_tables where schemaname='public'`)
  await client.end();
  console.log('total :', rowCount);
  console.log('table : ', rows);
  return
}

createTable()

//DROP TABLE [IF EXISTS] table_name [CASCADE | RESTRICT];
