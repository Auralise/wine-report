// Theoretically retain for CSS
// import './App.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Import pages/components 
import PageContainer from "./pages/pageContainer";

//URI might be changed
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <PageContainer />
    </ApolloProvider>
  );
}

export default App;
