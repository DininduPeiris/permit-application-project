export interface PermitApplicationRequestDto {
  citizenId: string;
  businessName: string;
  permitType: string;
  status?: string;
}
