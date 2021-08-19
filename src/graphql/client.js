import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: "https://my-apollo-music-app.herokuapp.com/v1/graphql"
});

export default client;