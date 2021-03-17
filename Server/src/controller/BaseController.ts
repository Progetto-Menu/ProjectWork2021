export interface BasePresenter<T> {
    create(obj: T): Promise<T>;
    update(obj: T): Promise<T>;
    delete(obj: T): Promise<T>;
    get(id: number): Promise<T>;
    getAll(): Promise<T[]>;
}