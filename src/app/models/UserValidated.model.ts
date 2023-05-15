import { PermissionsModel } from './Permissions.model';
import { UserModel } from './User.model';

export class UserValidatedModel {
  user?: UserModel;
  token?: string = '';
  menu: PermissionsModel[] = [];
}
