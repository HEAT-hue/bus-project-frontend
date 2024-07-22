import { BusStop, Account, Bus, BUS_OPERATIONAL_STATUS } from "../definitions";

const mockBusStops: BusStop[] = [
    { busStopId: "BS1", busStopName: "Main Street", createdAt: new Date(), updatedAt: new Date(), createdBy: 1, updatedBy: 1 },
    { busStopId: "BS2", busStopName: "2nd Avenue", createdAt: new Date(), updatedAt: new Date(), createdBy: 1, updatedBy: 1 },
    { busStopId: "BS3", busStopName: "3rd Avenue", createdAt: new Date(), updatedAt: new Date(), createdBy: 1, updatedBy: 1 },
];

const mockAccounts: Account[] = [
    { accountId: 1, accountName: "Driver Account", balance: 1000, createdAt: new Date(), updatedAt: new Date() },
    { accountId: 2, accountName: "Captain Account", balance: 1500, createdAt: new Date(), updatedAt: new Date() },
];

export const mockBuses: Bus[] = Array.from({ length: 10 }, (_, index) => ({
    busId: index + 1,
    busNumber: `Bus-${index + 1}`,
    operationalStatus: index % 1 === 0 ? BUS_OPERATIONAL_STATUS.ACTIVE : BUS_OPERATIONAL_STATUS.INACTIVE,
    busModel: `Model-${index + 1}`,
    busCapacity: 40 + index * 2,
    busColor: ["Red", "Blue", "Green", "Yellow", "White"][index % 5],
    routeName: `Route-${index + 1}`,
    driverId: index + 100,
    captainId: index + 200,
    busStops: mockBusStops,
    accounts: mockAccounts,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 1, updatedBy: 1
}));
