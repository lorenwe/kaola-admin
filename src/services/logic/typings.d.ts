declare namespace LOGIC {

  type LoginType = 'phone' | 'account';

  interface LoginInput {
    username?: string;
    password?: string;
    login_type?: LoginType;
    mobile?: string;
    captcha?: string;
  }

  interface LoginParams {
    username?: string;
    password?: string;
    login_type?: LoginType;
    mobile?: string;
    captcha?: string;
  }

  interface LoginResponse {
    id:number;
    user_id:number;
    token:string;
    username?:string;
    nickname?:string;
    avatar?: string;
  }
  
}