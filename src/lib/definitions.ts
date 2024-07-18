import { AuthResponse } from "./actions";

export const BASE_URL = process.env.BACKEND_BASE_URL;
export const ROUTE_SECRET = process.env.ROUTE_SECRET;

const BASE_NAVIGATION = "/app";

export const COOOKIE_EXPIRY = 10000;

const SESSION_EXPIRY = 10000;

export enum ROLES {
  USER = "USER",
  ADMIN = "ADMIN",
  CAPTAIN = "CAPTAIN",
  DRIVER = "DRIVER",
}

export type BaseEntity = {
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
};

export enum BUS_OPERATIONAL_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum NAVIGATION {
  /*************************** Admin Routes ********************************************/
  ADMIN = "/admin",
  ADMIN_MANAGEMENT = `${ADMIN}/management`,
  ADMIN_BSMGT = `${ADMIN}/bsmgt`,
  ADMIN_STMGT = `${ADMIN}/stmgt`,
  ADMIN_RTMGT = `${ADMIN}/rtmgt`,
  ADMIN_REPORT = `${ADMIN}/report`,

  ADMIN_CHALLENGE = `${ADMIN}/challenges`,

  /*************************** User Routes ********************************************/
  USER = "/user",
  USER_BOOK = `${USER}/book`,
  USER_CHECKOUT = `${USER}/checkout`,

  /*************************** Captain Routes ********************************************/
  CAPTAIN = "/captain",

  /*************************** Login Routes ********************************************/
  LOGIN = "/login",
}

export enum USER_AUTHORITES {
  USER = "USER",
  ADMIN = "ADMIN",
  CAPTAIN = "CAPTAIN",
}

export type User = {
  authorities: string;
  level: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type Session = AuthResponse & { SESSION_EXPIRY: number };

export type Account = {};

export type Bus = {
  busId: number;
  busNumber: string;
  operationalStatus: BUS_OPERATIONAL_STATUS;
  busModel: string;
  busCapacity: number;
  busColor: string;
  routeName: string;
  driverId: number;
  captainId: number;
  busStops: BusStop[];
  accounts: Account[];
} & BaseEntity;

export type BusStop = {
  busStopId: string;
  busStopName: string;
} & BaseEntity;

export type PagedResponse<T> = {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};
