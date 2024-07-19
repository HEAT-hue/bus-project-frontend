'use server'
import { revalidatePath } from "next/cache";
import { BASE_URL, NAVIGATION } from "../definitions";
import { FetchError } from "../FetchError";

export type CreateBusRequest = {
  "busNumber": string,
  "operationalStatus": "ACTIVE",
  "busModel": string,
  "busCapacity": number,
  "busColor": string
  "busRoute": string
};

export type CreateBusResponse = {
  "statusCode": string,
  "statusMsg": string
}

export async function CreateBus(token: string, payload: CreateBusRequest): Promise<CreateBusResponse> {

  // Verify credentials && get the user
  const apiUrl = new URL(`${BASE_URL}/bus/add`);

  // Construct the headers, including the Authorization header if the token is provided
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };


  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status == 400) {
        throw new FetchError(response.status, `Incorrect credentials`);
      }
      throw new FetchError(response.status, `Failed to Login user: ${response.statusText}`);
    }

    const result = await response.json() as CreateBusResponse;

    revalidatePath(NAVIGATION.ADMIN_BSMGT);
    revalidatePath(NAVIGATION.USER);
    return result;
  } catch (error) {

    // Custom error handling logic
    if (error instanceof FetchError) {
      return Promise.reject({
        status: error.status,
        message: error.message,
      });
    }
    return Promise.reject({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}


