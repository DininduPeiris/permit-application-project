import {
  PermitApplicationRequestDto,
  PermitStatusChangeRequestDto,
} from "../types/interfaces/requests/permit-dto";
import { PermitApplicationResponseDto } from "../types/interfaces/responses/permit-dto";
import apiService from "./api-service";

class PermitService {
  async create(request: PermitApplicationRequestDto) {
    return await apiService.apiPOST<PermitApplicationResponseDto>(
      "/permit",
      request,
    );
  }

  async updatePermitStatus(id: number, request: PermitStatusChangeRequestDto) {
    // return await apiService.apiPUT<PermitApplicationResponseDto>(
    //   "/permit",
    //   id,
    //   request,
    // );

    return await apiService.apiPATCH<PermitApplicationResponseDto>(
      `/permit/${id}/status`,
      request,
    );
  }

  async getPermitById(id: number) {
    return await apiService.apiGET<PermitApplicationResponseDto>(
      `/permit/${id}`,
    );
  }

  async getPermitByCitizenId(id: string) {
    return await apiService.apiGET<PermitApplicationResponseDto>(
      `/permit/${id}`,
    );
  }
}

export default new PermitService();
