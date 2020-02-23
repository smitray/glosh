import {
  // AuthenticationError,
  UserInputError
} from 'apollo-server-micro';
import userService from './user.service';

let user;

const userResolvers = {
  Query: {
    users: async () => {
      try {
        const users = await userService.get();
        return users;
      } catch (error) {
        throw new UserInputError('Wrong input provided', {
          message: error.message,
          stack: error.stack
        });
      }
    },
    user: async (root, { _id }) => {
      try {
        user = await userService.single({
          qr: {
            _id
          }
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
    userCreate: async (root, { content }) => {
      try {
        user = await userService.create({
          content
        });
        return user;
      } catch (error) {
        throw new UserInputError('Wrong input provided', {
          message: error.message,
          stack: error.stack
        });
      }
    },
    userUpdate: async (root, { _id, content }) => {
      try {
        user = await userService.put({
          params: {
            qr: {
              _id
            }
          },
          body: {
            content
          }
        });
        return user;
      } catch (error) {
        throw new UserInputError('Wrong input provided', {
          message: error.message,
          stack: error.stack
        });
      }
    },
    userDelete: async (root, { _id }) => {
      try {
        user = await userService.delete({
          params: {
            qr: {
              _id
            }
          }
        });
        return user;
      } catch (error) {
        throw new UserInputError('Wrong input provided', {
          message: error.message,
          stack: error.stack
        });
      }
    }
  }
};

export default userResolvers;
