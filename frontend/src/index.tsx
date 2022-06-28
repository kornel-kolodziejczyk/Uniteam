import "./index.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // cache: new InMemoryCache({dataIdFromObject: (o:any) => o.id}),
  cache: new InMemoryCache({ dataIdFromObject: (o: any) => o.id }),
  connectToDevTools: true,
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
