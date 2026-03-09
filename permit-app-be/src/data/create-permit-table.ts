import pool from "../config/db.js";

const createPermitTable = async () => {
  const queryText = `
        CREATE TABLE IF NOT EXISTS permit_applications (
            id SERIAL PRIMARY KEY,
            citizenId VARCHAR(100) UNIQUE NOT NULL,
            businessName VARCHAR(100) NOT NULL,
            permitType VARCHAR(100) NOT NULL,
            permitStatus VARCHAR(50) NOT NULL,
            createdAt TIMESTAMP DEFAULT NOW(),
            updatedAt TIMESTAMP DEFAULT NOW()
        );
    `;

  try {
    pool.query(queryText);
    console.log("Permit Applications table created if not exists");
  } catch (error) {
    console.log("Error creating Permit Applications table : ", error);
  }
};

export default createPermitTable;
