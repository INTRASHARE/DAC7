import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function fetchEmployeeData() {
  let  connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });

    const table = process.env.TABLENAME;

    const [rows] = await connection.execute(
      `Select * from ${table}`
    );

    return rows;
  } catch (error) {
    console.error("Error fetching employee data:", error);
    throw error;
  } finally {
    if(connection){
      await connection.end();
    }
  }
}

export default fetchEmployeeData;
