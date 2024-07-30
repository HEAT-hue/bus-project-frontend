'use server'
import {
    BASE_URL,
    Bus,
    BUS_OPERATIONAL_STATUS,
    PagedResponse,
} from "../definitions";
import { FetchError } from "../FetchError";
import { BookBusResponse } from "../definitions";

export type FetchBookingsParams = {
    busId: number
}

export type UpdateBookingsParams = {
    bookingId: number
}

// Function to fech a bus
export async function fetchBookings(token: string, requestParams: FetchBookingsParams): Promise<BookBusResponse[]> {
    const apiUrl = new URL(`${BASE_URL}/bookings/${requestParams.busId}`);

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

export async function updateBookings(token: string, params: UpdateBookingsParams): Promise<Response> {

    // Verify credentials && get the user
    const apiUrl = new URL(`${BASE_URL}/bookings/${params.bookingId}/update`);

    // Construct the headers, including the Authorization header if the token is provided
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: headers
        });

        if (!response.ok) {
            if (response.status == 400) {
                throw new FetchError(response.status, `Incorrect credentials`);
            }
            throw new FetchError(response.status, `Failed to Login user: ${response.statusText}`);
        }

        return await response.json();
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