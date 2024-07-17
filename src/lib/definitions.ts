export const BASE_URL = process.env.BACKEND_BASE_URL;
export const ROUTE_SECRET = process.env.ROUTE_SECRET;


const BASE_NAVIGATION = "/app"

export const COOOKIE_EXPIRY = 10000;

export type AuthRequest = {
    email: string,
    password: string
}

export enum NAVIGATION {
    ADMIN = "/admin",
    ADMIN_MANAGEMENT = `${ADMIN}/management`,
    ADMIN_CHALLENGE = `${ADMIN}/challenges`,
    USER = "/user",
    USER_BOOK = `${USER}/book`,
    CAPTAIN = "/captain",
    LOGIN = "/login",
    HOME = `${BASE_NAVIGATION}`,
    IDEA_MARKET = `${BASE_NAVIGATION}/ideas`,
    INNOVATION_CHALLENGE = `${BASE_NAVIGATION}/challenge`,
    LEADERBOARD = `${BASE_NAVIGATION}/leaderboard`,
    ENGAGEMENT = `${LEADERBOARD}/engagements`,
    INTERACTION = `${LEADERBOARD}/interactions`
}


export enum USER_AUTHORITES {
    USER = 'USER',
    ADMIN = "ADMIN",
    CAPTAIN = "CAPTAIN"
}

export type User = {
    "authorities": string,
    "level": string,
    "firstName": string,
    "lastName": string,
    "username": string
}

export type AuthResponse = {
    "token": string,
    "authorities": string,
    "level": string,
    "firstName": string,
    "lastName": string,
    "username": string
}

export type Session = AuthResponse & {
    exp: number
}

export type Bus = {
    id: string
    name: string,
    route: string,
    busNumber: string
}