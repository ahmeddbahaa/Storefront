import Logger from '../../middlewares/logger';
import Common from '../../utils/common';
import { ICreateUser, IUser, IUserSerialized } from './user.interfaces';

class User {
  static tableName: string = 'users';

  static async findOneById(id: number): Promise<IUserSerialized | null>{
    try {
      const rows = await Common.dbFetch(User.tableName, { id });
      if(rows?.length){
        const user = rows[0] as IUserSerialized;

        // removing password from the object before serializing it
        user.password = undefined;
        return user;
      }
    } catch (error) {
      Logger.log('User Model Error', error);
    }
    return null;
  }

  static async findOneByEmail(email: string): Promise<IUser | null>{
    const rows = await Common.dbFetch(User.tableName, { email });
    if(rows == undefined)
      return null;
    if(rows.length){
      return rows[0] as IUser;
    }
    return null;
  }
  static async findOneByEmailAndPassword(email: string, password: string): Promise<IUser | null>{
    try {
      const user = await Common.dbFetch(User.tableName, { email });
      console.log(user, password);
      const rows = await Common.dbFetch(User.tableName, { email, password});
      console.log(rows);
      if(rows == undefined)
        return null;
      if(rows.length){
        return rows[0] as IUser;
      }
    } catch (error) {
      Logger.log('User Model Error', error);
    }

    return null;
  }

  static async findAll(): Promise<IUserSerialized[] | null>{
    try {
      const rows = await Common.dbFetch(
        User.tableName,
        null,
        [
          'id',
          'firstname',
          'lastname',
          'email',
          'created_at',
        ],
      );
      return rows as IUserSerialized[];
    } catch (error) {
      Logger.log('User Model Error', error);
    }
    return null;
  }

  static async create(user: ICreateUser): Promise<IUserSerialized | null>{
    try {
      const insertQuery = await Common.dbInsertion(User.tableName, user);
      if(insertQuery && insertQuery.inserted){
        const newUser = insertQuery.data[0] as IUserSerialized;

        // removing password from the object before serializing it
        newUser.password = undefined;
        return newUser;
      }
    } catch (error) {
      Logger.log('User Model Error', error);
    }
    return null;
  }
}

export default User;