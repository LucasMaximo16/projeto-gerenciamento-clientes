export interface IDatabase {
    status: number,
    data: any,
}

export type IDatabaseResponse = Promise<IDatabase>