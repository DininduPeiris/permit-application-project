import pool from "../config/db.js";
import { PermitStatus } from "../types/enums/permit-enum.js";
import { PermitApplicationRequestDto } from "../types/interfaces/requests/permit-dto.js";

class PermitRepository {
  async createPermitApplication(request: PermitApplicationRequestDto) {
    const result = await pool.query(
      "INSERT INTO permit_applications (citizenId, businessName, permitType, permitStatus, createdAt) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        request.citizenId,
        request.businessName,
        request.permitType,
        PermitStatus.SUBMITTED,
        new Date(),
      ],
    );
    return result.rows[0];
  }

  async getAllPermits(permitStatus?: string) {
    let query = "SELECT * FROM permit_applications";
    const values: string[] = [];

    if (permitStatus) {
      query += " WHERE permitstatus = $1";
      values.push(permitStatus);
    }

    const result = await pool.query(query, values);
    return result.rows;
  }

  async getPermitById(id: number) {
    const result = await pool.query(
      "SELECT * FROM permit_applications WHERE id=$1",
      [id],
    );
    return result.rows[0];
  }

  async getPermitByCitizenId(id: string) {
    const result = await pool.query(
      "SELECT * FROM permit_applications WHERE citizenid=$1",
      [id],
    );
    return result.rows[0];
  }

  async updatePermitStatus(id: number, status: string) {
    const result = await pool.query(
      "UPDATE permit_applications SET permitStatus = $1 WHERE id = $2 RETURNING *",
      [status, id],
    );
    return result.rows[0];
  }
}

export const permitRepository = new PermitRepository();
