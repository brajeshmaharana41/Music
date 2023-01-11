import { environment } from '../../../environments/environment';

const baseURL = environment.baseURL;
const baseURL2 = environment.baseURL2;
export class API {
  public static Auth = {};

  public static Dashboard = {
    home: `${baseURL}home`, //http://3.111.212.219:3002/api/v1/
  };

  public static User = {
    otpGeneration: `${baseURL}user/otp-generation`,
    otpValidation: `${baseURL}user/otp-validation`,
    signUp: `${baseURL}user/signup`,
    signinByEmail: `${baseURL2}user/login`,
  };

  public static Song = {
    searchSong: `${baseURL}song/search/v1.0`,
  };

  public static Admin = {
    artistList: `${baseURL}admin/artists`,
    actorList: `${baseURL}admin/actors`,
  };
}
