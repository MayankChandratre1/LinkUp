export type FunctionType = {
    id: string,
  title: string,
  desc: string,
  date: string,
  category: string,
  thumbnail_url: string,
  joined_users: string[],
  groups: string[],
  location: {
    latitude: number,
    longitude: number,
    city: string
  }
}