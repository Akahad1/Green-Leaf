export interface IQurey {
  name?: string | undefined;
  value?: string | undefined;
}
export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
  details: string;
  image: string;
  coverImage: string;
  passwordChange: boolean;
  favourite: [string];
  followers: [string];
  followed: [string];
  verified: boolean;
};
