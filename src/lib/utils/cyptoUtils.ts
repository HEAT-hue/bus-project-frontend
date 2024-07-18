export const encryptData = (data: any) => {
    console.log(data);
    const jsonString = JSON.stringify(data);
    console.log(jsonString)
    console.log(btoa(jsonString))
    return btoa(jsonString);
};

export const decryptData = (data: any) => {
    const decodedData = atob(data)
    console.log(decodedData);
    const jsonData = JSON.parse(decodedData);
    console.log(jsonData);
    return jsonData;
};