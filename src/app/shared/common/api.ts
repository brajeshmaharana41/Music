import { environment } from '../../../environments/environment'

const baseURL = environment.baseURL;
export class API {

    public static Auth = {
        }


    public static Dashboard = {
        home: `${baseURL}home`,//http://3.111.212.219:3002/api/v1/
    }
}