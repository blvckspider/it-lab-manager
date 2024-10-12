import mysql, { type Pool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // load .env file's variables
let pool: Pool | null = null;

export async function mysqlconnFn(): Promise<mysql.PoolConnection> {
  if(!pool){
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  return pool.getConnection();
}

export async function queryDatabase(query: string, values: any[]): Promise<any> {
  const connection = await mysqlconnFn();
  
  try{
    const [rows] = await connection.query(query, values);
    return rows;
  }
  catch(error){
    console.error('Error executing query:', error);
    throw error;
  }
  finally{ connection.release(); }
}