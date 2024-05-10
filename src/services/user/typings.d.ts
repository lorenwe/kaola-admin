declare namespace USER {

  interface MenuInfo {
    success: boolean;
    errorCode: number;
    data?: UserMenuDataItem[];
  }

  interface UserInfo {
    id:number;
    user_id:number;
    token:string;
    username?:string;
    nick_name?:string;
    avatar?: string;
    tags?: string[];
  }


  type Permissions = Array<string>;

}