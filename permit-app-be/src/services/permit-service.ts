import { permitRepository } from "../repository/permit-repository";
import { PermitStatus } from "../types/enums/permit-enum";
import { PermitApplicationRequestDto } from "../types/interfaces/requests/permit-dto";

class PermitService {
  async createPermitApplication(request: PermitApplicationRequestDto) {
    return await permitRepository.createPermitApplication(request);
  }

  async getAllPermits(permitStatus?: string) {
    return await permitRepository.getAllPermits(permitStatus);
  }

  async getPermitById(id: number) {
    return await permitRepository.getPermitById(id);
  }

  async getPermitByCitizenId(id: string) {
    return await permitRepository.getPermitByCitizenId(id);
  }

  async updatePermitStatus(id: number, status: string) {
    const permit = await permitRepository.getPermitById(id);

    if (!permit) {
      throw new Error("Permit not found");
    }

    const oldStatus = permit.permitstatus;

    const validTransitions: Record<string, string[]> = {
      SUBMITTED: [PermitStatus.UNDER_REVIEW],
      UNDER_REVIEW: [PermitStatus.APPROVED, PermitStatus.REJECTED],
    };

    const allowedNextStatuses = validTransitions[oldStatus];

    if (!allowedNextStatuses || !allowedNextStatuses.includes(status)) {
      throw new Error(
        `Invalid status transition from ${oldStatus} to ${status}`,
      );
    }

    const updatedPermit = await permitRepository.updatePermitStatus(id, status);

    const event = {
      permitId: id,
      oldStatus: oldStatus,
      newStatus: status,
      timestamp: new Date().toISOString(),
    };

    console.log("PermitStatusChanged Event:", event);

    return updatedPermit;
  }
}

export const permitService = new PermitService();
