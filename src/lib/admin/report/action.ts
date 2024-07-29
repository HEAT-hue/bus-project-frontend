'use server'
import { BASE_URL, Report } from "@/lib/definitions";
import { FetchError } from "@/lib/FetchError";

export type FetchReportParams = {
    createdAt?: Date,
    per_page?: number,
    page?: number,
    name?: string,
    department?: string
}

// Function to fech a bus
export async function fetchReports(token: string, requestParams: FetchReportParams): Promise<Report[]> {
    const apiUrl = new URL(`${BASE_URL}/audit/reportspaginate`);

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