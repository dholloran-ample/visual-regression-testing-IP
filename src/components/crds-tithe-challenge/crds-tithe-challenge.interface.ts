export interface TitheUser {
  nickName: string;
  groups: Groups[];
  donations: Donation[]
  recurringGifts: RecurringGift[]
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

export interface RecurringGift {
  id: number
  amount: number
  active: boolean
}

export interface Response {
  id: number
  content: string
  value: string
}
