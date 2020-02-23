import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { UserInputError, AuthenticationError } from 'apollo-server-micro';
import { sign } from 'jsonwebtoken';
import Crud from '~lib/Crud';
import accountModel from './account.model';
import { userService } from '../user';

const passwordGenerate = (password) => {
  const salt = genSaltSync();
  const hash = hashSync(password, salt);
  return hash;
};
const secret = process.env.SERVER_SECRET;

const generateJwt = (data) => new Promise((resolve, reject) => {
  sign(data, secret[0], {
    expiresIn: '6h'
  }, (err, token) => {
    if (err) {
      reject(err);
    }
    resolve(token);
  });
});

class AccountService extends Crud {
  constructor(model) {
    super(model);
    this.userService = userService;
    this.passwordGenerate = passwordGenerate;
    this.generateJwt = generateJwt;
  }

  async createAccount({
    name,
    username,
    phone,
    email,
    password,
    accType
  }) {
    try {
      const account = await this.create({
        username,
        phone,
        email,
        accType,
        password: this.passwordGenerate(password)
      });
      const user = await this.userService.create({
        accountId: account._id,
        name
      });
      account.token = await this.generateJwt({
        accountId: account._id,
        userId: user._id,
        accType: account.accType
      });
      return account;
    } catch (error) {
      throw new UserInputError('Wrong input provided', {
        message: error.message,
        stack: error.stack
      });
    }
  }

  async updateAccount({
    _id,
    username,
    email,
    phone,
    password
  }) {
    const body = {
      username,
      email,
      phone
    };
    try {
      let psd;
      if (password) {
        psd = this.passwordGenerate(password);
        body.password = psd;
      }
      const account = await this.put({
        params: {
          qr: {
            _id
          }
        },
        body
      });
      return account;
    } catch (error) {
      throw new UserInputError('Wrong input provided', {
        message: error.message,
        stack: error.stack
      });
    }
  }

  async login({
    cred,
    password
  }) {
    try {
      const account = await this.single({
        qr: {
          $or: [{
            username: cred
          }, {
            email: cred
          }, {
            phone: cred
          }]
        }
      });
      if (!account) {
        throw new AuthenticationError('No user found');
      } else if (account && !compareSync(password, account.password)) {
        throw new AuthenticationError('Wrong credentials');
      }
      const user = await this.userService.single({
        qr: {
          accountId: account._id
        }
      });
      account.token = await this.generateJwt({
        accountId: account._id,
        userId: user._id,
        accType: account.accType
      });
      return account;
    } catch (error) {
      throw new UserInputError('Wrong input provided', {
        message: error.message,
        stack: error.stack
      });
    }
  }
}

const accountCrud = new AccountService(accountModel);

export default accountCrud;
