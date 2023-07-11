export interface IOption {
    value: string;
    viewValue: string;
}

export interface IServerProduct {
    id: number;
    cost: number;
    name: string;
}

export interface IProduct extends IServerProduct {
    qty: number;
    tax: string;
    expandRow: boolean;
}