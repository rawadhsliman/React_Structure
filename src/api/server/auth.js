import axios from '../index';

class AuthApi {
  static Login = (data) => {
    const params = {
      username: data.userName,
      password: data.password,
    };
    return axios.post(`/login`, params);
  };

  static Logout = () => {
    return axios.post(`/logout`);
  };
}

export default AuthApi;
