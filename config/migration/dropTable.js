import client from "../db.js";

async function dropTable() {
  const sql = `DROP TABLE IF EXISTS public.tb_user`;
  await client.connect();
  const run = await client.query(sql);
  await client.end();
  return run;
}

dropTable();