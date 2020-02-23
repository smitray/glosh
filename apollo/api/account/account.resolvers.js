import {
  AuthenticationError,
  UserInputError
} from 'apollo-server-micro';
import accountService from './account.service';
import { userService } from '../user';

let account;

const accountResolvers = {
  Query: {
    accounts: async (root, { accType = 'student' }) => {
      try {
        const accounts = await accountService.get({
          qr: {
            accType
          }
        });
        return accounts;
      } catch (error) {
        throw new UserInputError('Wrong input provided', {
          message: error.message,
          stack: error.stack
        });
      }
    },
    account: async (root, { _id }) => {
      try {
        account = await accountService.single({
          qr: {
            _id
          }
        });
        return account;
      } catch (error) {
        throw new UserInputError('Wrong input provided', {
          message: error.message,
          stack: error.stack
        });
      }
    }
  },
  Account: {
    user: async ({ _id }) => {
      try {
        const user = await userService.single({
          accountId: _id
        });
        return user;
      } catch (error) {
        throw new UserInputError('Wrong input provided', {
          message: error.message,
          stack: error.stack
        });
      }
    }
  },
  Mutation: {
    accountCreate: (root, content) => {
      account = accountService.createAccount({
        ...content
      });
      return account;
    },
    accountUpdate: (root, {
      username,
      email,
      phone,
      password
    }, {
      accountId
    }) => {
      if (!accountId) {
        throw new AuthenticationError('User must be authenticated');
      }
      try {
        account = accountService.updateAccount({
          params: {
            qr: {
              _id: accountId
            }
          },
          body: {
            username,
            email,
            phone,
            password
          }
        });
        return account;
      } catch (error) {
        throw new UserInputError('Wrong input provided', {
          message: error.message,
          stack: error.stack
        });
      }
    },
    accountDelete: async (root, _, { accountId }) => {
      if (!accountId) {
        throw new AuthenticationError('User must be authenticated');
      }
      try {
        account = await accountService.delete({
          params: {
            qr: {
              _id: accountId
            }
          }
        });
        return account;
      } catch (error) {
        throw new UserInputError('Wrong input provided', {
          message: error.message,
          stack: error.stack
        });
      }
    },
    accountLogin: (root, credentials) => {
      account = accountService.login({
        ...credentials
      });
      return account;
    }
  }
};

export default accountResolvers;
