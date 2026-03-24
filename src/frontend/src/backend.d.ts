import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Building {
    x: bigint;
    y: bigint;
    id: bigint;
    height: bigint;
    name: string;
    width: bigint;
}
export type BoothId = bigint;
export interface Booth {
    id: BoothId;
    timeLimit?: bigint;
    owner: Principal;
    area: bigint;
    name: string;
    businessType: BoothType;
    reservedUntil?: bigint;
    reservedBy: Reserved;
    price: bigint;
    location: string;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export type Reserved = {
    __kind__: "reserved";
    reserved: Principal;
} | {
    __kind__: "unreserved";
    unreserved: null;
};
export interface UserProfile {
    name: string;
    businessName: string;
    description?: string;
    email?: string;
    image?: string;
    phone?: string;
}
export type BoothType = {
    __kind__: "retail";
    retail: BoothRetailType;
} | {
    __kind__: "other";
    other: string;
} | {
    __kind__: "food";
    food: BoothFoodType;
} | {
    __kind__: "tech";
    tech: BoothTechType;
};
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum BoothFoodType {
    organic = "organic",
    streetFood = "streetFood",
    snacks = "snacks",
    foodTrucks = "foodTrucks",
    beverages = "beverages",
    restaurant = "restaurant"
}
export enum BoothRetailType {
    art = "art",
    clothing = "clothing",
    traditionalProducts = "traditionalProducts",
    sportsEquipment = "sportsEquipment",
    handmadeCrafts = "handmadeCrafts",
    jewelry = "jewelry",
    furniture = "furniture",
    stationery = "stationery",
    books = "books",
    electronics = "electronics"
}
export enum BoothTechType {
    techHardware = "techHardware",
    fintech = "fintech",
    startup = "startup",
    education = "education",
    hardwareRental = "hardwareRental",
    devTools = "devTools"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    filterBoothsByType(boothType: BoothType): Promise<Array<Booth>>;
    getBuildingByCoordinates(x: bigint, y: bigint): Promise<Building | null>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    requestApproval(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
}
