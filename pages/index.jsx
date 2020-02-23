import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button as Btn, withStyles } from '@material-ui/core';

const Button = withStyles(() => ({
  root: {
    color: '#fff',
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#ff9800'
    }
  }
}))(Btn);

const Index = () => {
  const { loading, data } = useQuery(gql`
    {
      users{
        name,
        createdAt
      }
    }
  `);
  return (
    <>
      <p>{!loading && data.users[0].name}</p>
      <Button
        variant="contained"
      >
        Test
      </Button>
    </>
  );
};

export default Index;
