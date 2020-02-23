
import ApolloServer from '~api';
import connectDb from '~lib/database';

export const config = {
  api: {
    bodyParser: false
  }
};

const server = ApolloServer.createHandler({ path: '/api/graphql' });
export default connectDb(server);
