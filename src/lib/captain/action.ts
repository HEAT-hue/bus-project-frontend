'use server'
import {
    BASE_URL,
    BookBusResponse,
    Bus,
    BUS_OPERATIONAL_STATUS,
    PagedResponse,
} from "../definitions";
import { FetchError } from "../FetchError";

export type FetchBookingsParams = {
    busId: number
}


// Function to fech a bus
export async function fetchBookings(token: string, requestParams: FetchBookingsParams): Promise<BookBusResponse[]> {
    const apiUrl = new URL(`${BASE_URL}/booking/${requestParams.busId}/bookings`);

    // Append query parameters
    Object.entries(requestParams).forEach(([key, value]) => {
        if (value !== undefined) {
            apiUrl.searchParams.append(key, value.toString());
        }
    });

    // Adjust 'page' parameter to be zero-based
    if (requestParams.page !== undefined) {
        apiUrl.searchParams.set('page', (requestParams.page - 1).toString());
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