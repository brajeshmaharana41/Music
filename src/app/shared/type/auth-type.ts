export interface LoginResponseType {
  body: LoggedBodyType;
  message: string;
  status: number;
}

export interface LoggedBodyType {
  status: boolean;
  token: string;
  user_data: BodyUserDataType;
  user_id: string;
}

export interface BodyUserDataType {
  gender: string;
  name: string;
  profile_pic: string;
  subscription_status: string;
}
