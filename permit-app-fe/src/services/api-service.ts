import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  data: T; 
  success: boolean;
  message: string;
}

export interface CommonApiResponse<T> {
  data: T;
  status?: number;
  message: string;
}

const errorHandling = (error: AxiosError): never => {
  throw error;
};

const responseHandling = <T>(
  response: AxiosResponse<CommonApiResponse<T>>,
): ApiResponse<T> => ({
  data: response.data.data,
  success: response.data.status === 200,
  message: response.data.message,
});

class ApiService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:5001/api",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async apiPOST<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
  ): Promise<ApiResponse<TResponse>> {
    try {
      const response = await this.http.post(path, body);
      return responseHandling<TResponse>(response);
    } catch (error) {
      return errorHandling(error as AxiosError);
    }
  }

  async apiPUT<TResponse, TBody = unknown>(
    path: string,
    id: string | number,
    body: TBody,
  ): Promise<ApiResponse<TResponse>> {
    try {
      const response = await this.http.put(`${path}/${id}`, body);
      return responseHandling<TResponse>(response);
    } catch (error) {
      return errorHandling(error as AxiosError);
    }
  }

  async apiGET<T>(path: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.http.get(path);
      return responseHandling<T>(response);
    } catch (error) {
      return errorHandling(error as AxiosError);
    }
  }
}

export default new ApiService();