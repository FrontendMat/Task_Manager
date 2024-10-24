export interface ITask {
    id?: number,
    title?: string,
    description?: string,
    status?: boolean,
    file?: File | null
}