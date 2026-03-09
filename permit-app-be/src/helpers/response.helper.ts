import { Response } from "express";

// Standardized response function
export const handleResponse = (
  res: Response,
  status: number,
  message: string,
  data: any = null,
) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};
