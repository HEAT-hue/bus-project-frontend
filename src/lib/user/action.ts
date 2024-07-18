import { revalidatePath } from "next/cache";
import { BASE_URL } from "../definitions";
import { FetchError } from "../FetchError";

// Function to book a bus
export async function bookBus(token: string, requestBody: any): Promise<any> {
    const apiUrl = new URL(`${BASE_URL}/book`);

    // Construct the headers, including the Authorization header if the token is provided
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(apiUrl.toString(), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new FetchError(response.status, `Failed to create idea: ${response.statusText}`);
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
            message: 'Internal Server Error',
        });
    }
}