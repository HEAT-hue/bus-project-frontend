export const encryptData = (data: any) => {
    const jsonString = JSON.stringify(data);
    return btoa(jsonString);
};

export const decryptData = (data: any) => {
    const decodedData = atob(data)
    return JSON.parse(decodedData);
};