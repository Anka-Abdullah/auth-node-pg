import client from "./db.js";

async function clientDemo() {
  await client.connect();
  const now = await client.query("SELECT NOW()");
  await client.end();
  return now;
}

(async () => {
  const clientResult = await clientDemo();
  console.log(
    "database successfully accessed. \nTime with client: " +
      clientResult.rows[0]["now"]
  );
})();
