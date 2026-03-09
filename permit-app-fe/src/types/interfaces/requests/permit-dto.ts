export interface PermitApplicationRequestDto {
  citizenId: string;
  businessName: string;
  permitType: string;
  status?: string;
}

export interface PermitStatusChangeRequestDto {
  status?: string;
}
