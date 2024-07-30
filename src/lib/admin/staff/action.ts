"use server";
import { revalidatePath } from "next/cache";
import { Account, ACCOUNT_STATUS, BASE_URL, NAVIGATION, PagedResponse, ROLES } from "../../definitions";
import { FetchError } from "../../FetchError";

export type FetchUserParams = {
  page?: number;
  per_page?: number;
  name?: string
  role?: ROLES
  verificationStatus?: ACCOUNT_STATUS
  sort_by?: "createdAt"
};

export async function fetchUsers(token: string, requestParams: FetchUserParams): Promise<PagedResponse<Account>> {
  const apiUrl = new URL(`${BASE_URL}/users/list`);

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
        `Failed to fetch user: ${response.statusText}`
      );
    }

    // Return the parsed JSON response
    const result = await response.json();
    return result;
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

type UpdateStaffRequestParams = {
  userId: number;
};

type UpdateStaffStatusRequestPayload = {
  role?: ROLES
  verificationStatus?: ACCOUNT_STATUS
  specialNeeds?: boolean
};

type UpdateStaffStatusResponse = {
  id: number;
  email: string;
  authorities: string;
  createdAt: Date;
  level: string;
  telephone: string;
  verfified: ACCOUNT_STATUS;
};

export async function updateStaffProfile(token: string, params: UpdateStaffRequestParams, payload: UpdateStaffStatusRequestPayload): Promise<UpdateStaffStatusResponse> {

  const apiUrl = new URL(
    `${BASE_URL}/users/profile/${params.userId}/update-profile`
  );

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const body = JSON.stringify(payload);

  try {
    const response = await fetch(apiUrl.toString(), {
      method: "PATCH",
      headers: headers,
      body: body,
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
        `Failed to fetch user: ${response.statusText}`
      );
    }

    const data: UpdateStaffStatusResponse = await response.json();

    revalidatePath(NAVIGATION.ADMIN_STMGT);

    return data;
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



// type UpdateStaffRoleRequest = {
//   userId: number;
//   authorities: ROLES;
// };


// type UpdateStaffSpecialNeedsRequest = {
//   userId: number;
//   authorities: ROLES;
// };

// export async function updateStaffRole(
//   token: string,
//   params: UpdateStaffRoleRequest
// ): Promise<Account> {
//   const apiUrl = new URL(
//     `${BASE_URL}/auth/users/${params.userId}/update-authorities`
//   );

//   const headers: HeadersInit = {
//     "Content-Type": "application/json",
//     ...(token && { Authorization: `Bearer ${token}` }),
//   };

//   const body = JSON.stringify({ authorities: `${params.authorities}` });

//   try {
//     const response = await fetch(apiUrl.toString(), {
//       method: "PUT",
//       headers: headers,
//       body: body,
//     });

//     if (!response.ok) {
//       if (response.status == 401) {
//         throw new FetchError(
//           response.status,
//           `Unauthorized: ${response.statusText}`
//         );
//       }
//       throw new FetchError(
//         response.status,
//         `Failed to fetch user: ${response.statusText}`
//       );
//     }

//     const data: Account = await response.json();

//     revalidatePath(NAVIGATION.ADMIN_STMGT);

//     return data;
//   } catch (error) {
//     // Handle custom FetchError
//     if (error instanceof FetchError) {
//       return Promise.reject({
//         status: error.status,
//         message: error.message,
//       });
//     }
//     // Handle generic errors
//     return Promise.reject({
//       status: 500,
//       message: "Internal Server Error",
//     });
//   }
// }


// export async function updateStaffSpecialNeedsStatus(
//   token: string,
//   params: UpdateStaffRoleRequest
// ): Promise<Account> {
//   const apiUrl = new URL(
//     `${BASE_URL}/auth/users/${params.userId}/update-authorities`
//   );

//   const headers: HeadersInit = {
//     "Content-Type": "application/json",
//     ...(token && { Authorization: `Bearer ${token}` }),
//   };

//   const body = JSON.stringify({ authorities: `${params.authorities}` });

//   try {
//     const response = await fetch(apiUrl.toString(), {
//       method: "PUT",
//       headers: headers,
//       body: body,
//     });

//     if (!response.ok) {
//       if (response.status == 401) {
//         throw new FetchError(
//           response.status,
//           `Unauthorized: ${response.statusText}`
//         );
//       }
//       throw new FetchError(
//         response.status,
//         `Failed to fetch user: ${response.statusText}`
//       );
//     }

//     const data: Account = await response.json();

//     revalidatePath(NAVIGATION.ADMIN_STMGT);

//     return data;
//   } catch (error) {
//     // Handle custom FetchError
//     if (error instanceof FetchError) {
//       return Promise.reject({
//         status: error.status,
//         message: error.message,
//       });
//     }
//     // Handle generic errors
//     return Promise.reject({
//       status: 500,
//       message: "Internal Server Error",
//     });
//   }
// }

