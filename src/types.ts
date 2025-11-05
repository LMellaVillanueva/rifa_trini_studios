export type User = {
    name: string,
    phone: string
}

export type CompleteUser = {
  user_id: number
  name: string
  phone: string
  rifa_numbers: string
  vouchers: string
  vouchersParsed?: Voucher[]
}

export type Admin = {
    email: string
    password: string
}

export type Voucher = {
  id: string
  image_url: string
  verified: boolean
}