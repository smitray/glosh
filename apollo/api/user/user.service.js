import Crud from '~lib/Crud';
// import reporter from 'core/logger';
import userModel from './user.model';

class UserService extends Crud {
  // constructor(model) {
  //   super(model);
  // }
}

const userCrud = new UserService(userModel);

export default userCrud;
