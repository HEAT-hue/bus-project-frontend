'use server'
import {
  BASE_URL, BookBusParams, BookBusResponse,
  Bus,
  ErrorResponse,
  FetchBusParams, PagedResponse
} from "../definitions";
import { FetchError } from "../FetchError";

// Function to fech a bus
export async function fetchBus(token: string, requestParams: FetchBusParams): Promise<PagedResponse<Bus>> {

  const apiUrl = new URL(`${BASE_URL}/bus/list`);

  // Append query parameters
  Object.entries(requestParams).forEach(([key, value]) => {
    if (value !== undefined) {
      apiUrl.searchParams.append(key, value.toString());
    }
  });

  // Adjust 'page' parameter to be zero-based
  if (requestParams.page !== undefined) {
    apiUrl.searchParams.set("page", (requestParams.page - 1).toString());
  }

  // Construct the headers, including the Authorization header if the token is provided
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: headers,
    });



    if (!response.ok) {
      if (response.status == 401) {
        throw new FetchError(
          response.status,
          `Unauthorized: ${response.statusText}`
        );
      }
      throw new FetchError(
        response.status,
        `Failed to fetch bus: ${response.statusText}`
      );
    }

    // Return the parsed JSON response
    return await response.json();
  } catch (error) {
    // Handle custom FetchError
    if (error instanceof FetchError) {
      return Promise.reject({
        status: error.status,
        message: error.message,
      });
    }
    // Handle generic errors
    return Promise.reject({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

// Function to book a bus
export async function bookBus(
  token: string,
  requestParams: BookBusParams
): Promise<BookBusResponse> {
  const apiUrl = new URL(`${BASE_URL}/bookings/book`);

  // Append query parameters
  Object.entries(requestParams).forEach(([key, value]) => {
    if (value !== undefined) {
      apiUrl.searchParams.append(key, value.toString());
    }
  });

  // Construct the headers, including the Authorization header if the token is provided
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(apiUrl.toString(), {
      method: "POST",
      headers: headers,
    });

    if (!response.ok) {
      const res: ErrorResponse = await response.json();
      return Promise.reject(new FetchError(
        response.status,
        `Failed to book bus: ${res.errorMessage}`
      ))
    }

    // Return the parsed JSON response
    // return await response.json();

    const busResponse = await response.json()

    return busResponse
  } catch (error) {
    // Handle custom FetchError
    if (error instanceof FetchError) {
      return Promise.reject({
        status: error.status,
        message: error.message,
      });
    }
    // Handle generic errors
    return Promise.reject({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

