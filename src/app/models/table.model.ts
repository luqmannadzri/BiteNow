export interface ITable {
    _id?: number
    numberOfSits: number
    location: string
    selectable?: boolean
}

export interface ITableFilter {
    numberOfSits: number
    date: Date
}
