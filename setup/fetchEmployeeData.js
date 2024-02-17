import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function fetchEmployeeData(dbName, table) {
  let  connection;

  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '12345',
      database: dbName,
    });

    const [rows] = await connection.execute(
      `Select eId, name, email from ${table}`
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
