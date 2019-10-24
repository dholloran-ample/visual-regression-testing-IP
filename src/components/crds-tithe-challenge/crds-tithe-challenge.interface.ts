export interface TitheUser {
  nickName: string;
  groups: Groups[];
  donations: Donation[]
}

export interface Groups {
  endDate: number
  id: number
  name: string
  userStartDate: number
  userEndDate: number
}

export interface Donation {
  id: number
  amount: number
  date: number
}
