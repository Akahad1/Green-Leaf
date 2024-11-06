import { FieldValues } from "react-hook-form";

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
export type User = {
  data: {
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
  mesages: string;
  success: boolean;
};

export type TPost = {
  _id: string;
  user: TUser;
  image: string;
  text: string;
  premium: boolean;
  upvote: number;
  downvote: number;
  createdAt: string;
  downvotedUsers: [string];
  upvotedUsers: [string];
  catagory: "Vegetables" | "Flowers" | "Herbs" | "Fruits";
};
export type TPostData = {
  data: TPost[];
  mesages: string;
  success: boolean;
};
export type Tcommet = {
  _id: string;
  user: TUser;
  post: TPost;
  text: string;
};

export interface logInUser {
  email: string;
  _id: string;
  role: string;
}

export interface updateInfo {
  data: {
    text: string;
    image: string;
    category: string;
  };
  postid: string;
}

export interface profileImage {
  user: string;
  data: FieldValues;
}
export interface TPostvote {
  id: string;
  user: string;
  vote: string;
}

export interface TFollow {
  userId: string;
  followerId: string;
}
