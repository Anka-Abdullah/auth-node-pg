import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Client } = pg;
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password:  process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
}
});

// const client  = new Client("postgres://ovtdqxuuiknikq:d66ea8c5347ba3f9c3af99e748e944254865de09220887ece19db81e07e8c4fb@ec2-34-194-158-176.compute-1.amazonaws.com:5432/d8nag6bqn5nr2")

export default client;
