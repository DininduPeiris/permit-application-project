import { NextFunction, Request, Response } from "express";
import { PermitApplicationResponseDto } from "../types/interfaces/responses/permit-dto";
import { PermitApplicationRequestDto } from "../types/interfaces/requests/permit-dto";
import { permitService } from "../services/permit-service";
import { handleResponse } from "../helpers/response.helper";

class PermitController {
  public createPermitApplication = async (
    req: Request,
    res: Response<PermitApplicationResponseDto>,
    next: NextFunction,
  ) => {
    const request: PermitApplicationRequestDto = req.body;
    try {
      const newPermitApplication =
        await permitService.createPermitApplication(request);
      handleResponse(
        res,
        200,
        "Permit application created successfully",
        newPermitApplication,
      );
    } catch (error) {
      next(error);
    }
  };

  public getAllPermits = async (
    req: Request,
    res: Response<PermitApplicationResponseDto[]>,
    next: NextFunction,
  ) => {
    try {
      const { status } = req.query;

      const permits = await permitService.getAllPermits(
        status as string | undefined,
      );

      handleResponse(res, 200, "Permits retrieved successfully", permits);
    } catch (error) {
      next(error);
    }
  };

  public getPermitById = async (
    req: Request,
    res: Response<PermitApplicationResponseDto>,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const permit = await permitService.getPermitById(Number(id));
      handleResponse(res, 200, "Permit retrieved successfully", permit);
    } catch (error) {
      next(error);
    }
  };

  public getPermitByCitizenId = async (
    req: Request,
    res: Response<PermitApplicationResponseDto>,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id as string;
      const permit = await permitService.getPermitByCitizenId(id);
      handleResponse(res, 200, "Permit retrieved successfully", permit);
    } catch (error) {
      next(error);
    }
  };

  public updatePermitStatus = async (
    req: Request,
    res: Response<PermitApplicationResponseDto>,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedPermit = await permitService.updatePermitStatus(
        Number(id),
        status,
      );

      handleResponse(
        res,
        200,
        "Permit status updated successfully",
        updatedPermit,
      );
    } catch (error) {
      next(error);
    }
  };
}

export const permitController = new PermitController();
