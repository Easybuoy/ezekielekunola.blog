---
title: Getting started with React & Apollo Client
author: Ezekiel Ekunola
date: 2019-09-16
hero: ./images/preview.png
excerpt: What is Apollo Client?
---

#### **What is Apollo Client**
Apollo Client is a complete state management library for JavaScript apps.
It makes use of a GraphQL API to handle data fetching. What this means is in order to make use of Apollo Client, you need to have a GraphQL API that you would connect to.

#### **What is GraphQL**
GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. GraphQL makes use of Mutation and Query to achieve this.


#### **What is a Query and Mutation**
- **Query**: A GraphQL query is used to read or fetch data.
A sample GraphQL query is shown in the example below.
```
{
  query getUserDetails {
    users {
      id
      name
      email
     }
   }
} 
```
**Note: The above query is named `getUserDetails` and it gets back the id, name and email fields.**

- **Mutation**: Mutations are used for any type of request that changes the data, creating, updating and deleting operations.
A sample GraphQL mutation looks like the example shown below.

```
{
  mutation addUser(name: String!, email: String!){
    addUser(name: $name, email: $email){
      id
      name
      email
      created_at
    }
  }
}
```
**Note: In the mutation example above, it receives `name` and `email` as parameters and gets back the id, name, email and created_at fields as response.**

#### Setup React Application
I'll be using create-react-app boilerplate to setup my react application. On your terminal run the command below to generate a react boilerplate
```
npx create-react-app rick-and-morty
```
after the above command completes, open the generated folder in your Integrated Development Environment.


#### Install Dependencies
```
npm install apollo-boost graphql react-apollo
```

#### Connect Client
To connect the react application to the Graphql API, in the `index.js` file of your react application, add the following code below.

```js
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql/', //URL of the GraphQL server
  });
```

...then wrap your sub-components with the ApolloProvider, passing in the client we defined above as prop. An example is shown below.

```js
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
```
Once the above is done, we have successfully setup a basic apollo client connection to the backend GraphQL API.
**Note: Find more [here](http://apollographql.com/docs/react/essentials/get-started/#apollo-boost), for more advanced Apollo client setup and configurations.**

There are different methods of consuming a Graphql API when using Apollo Client, they are:

- Render Props
- Hooks 
- Higher-Order Component (HOC)

All the different methods of consuming a GraphQL API can be done with the use of the `react-apollo` package we installed earlier.


## Queries
#### Render Props
To make queries with the Render Prop method, we need to use the `Query` component from `react-apollo`. An example is shown below.
```js
import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const GET_CHARACTERS = gql`
  query getCharacters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

export default function CharacterWithRender() {
  return (
    <Query query={GET_CHARACTERS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <div className="characters">
            {data.characters.results.map(character => (
              <div key={character.name} className="character">
                <img src={character.image} alt={character.name} />
                <p>{character.name}</p>
              </div>
            ))}
          </div>
        );
      }}
    </Query>
  );
}

```
#### Hooks
To make queries with the Hooks method, we need to use the `useQuery` hook from `react-apollo`. An example is shown below.


An example is shown below
```js
import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";

const GET_CHARACTERS = gql`
  query getCharacters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

function CharacterWithHook() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return (
      <div className="App">
        <h2>Loading...</h2>
      </div>
    );
  }
  if (data) {
    if (data.characters.results.length > 0) {
      return (
        <div className="characters">
          {data.characters.results.map(character => (
            <div key={character.name} className="character">
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default CharacterWithHook;
```

#### Higher Order Component (HOC)
We can also use the `withApollo` Higher Order Component to make queries, you can do so by simply wrapping your component's export with `withApollo`. This injects a client prop into the component, thus enables you to make GraphQL queries.
An example is shown below

```js
import React, { useState } from "react";
import { gql } from "apollo-boost";
import { withApollo } from "react-apollo";

const GET_CHARACTERS = gql`
  query getCharacters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

function CharacterWithHOC({ client }) {
  const [characters, setCharacters] = useState([]);

  client
    .query({ query: GET_CHARACTERS })
    .then(res => setCharacters(res.data.characters.results))
    .catch(err => console.log(err));

  if (characters.length > 0) {
    return (
      <div className="characters">
        {characters.map(character => (
          <div key={character.name} className="character">
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="App">
      <h2>Loading...</h2>
    </div>
  );
}

export default withApollo(CharacterWithHOC);

```

## Mutations
#### Render Props
To make mutations with the Render Prop method, we need to use the `Mutation` component from `react-apollo`. An example is shown below.
```js
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const LOGIN_MUTATION = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      username
      email
      id
      token
    }
  }
`;

export default function MutationWithRender() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Mutation mutation={LOGIN_MUTATION}>
      {(loginUser, { loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <form
            id="signinForm"
            className="text-center  p-4"
            onSubmit={e => {
              e.preventDefault();
              loginUser({ variables: { email, password } });
            }}
          >
            <p className="h4 mb-4 f-1">Sign In</p>

            <input
              title="Email"
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              required
            />
            <input
              title="Password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <div className="form-group my-4">
              <button className="btn btn-block" type="submit">
                Sign In
              </button>
            </div>
          </form>
        );
      }}
    </Mutation>
  );
}

```
#### Hooks
To make mutations with the Hooks method, we need to use the `useMutation` hook from `react-apollo`. An example is shown below.


An example is shown below
```js
import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const LOGIN_MUTATION = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      username
      email
      id
      token
    }
  }
`;

export function MutationWithHook() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { data, error, loading }] = useMutation(LOGIN_MUTATION);

  if (error) {
    alert('Error Logging In User');
  }

  if (data) {
    alert('Successfully Logged In');
  }

  return (
    <form
      id="signinForm"
      className="text-center  p-4"
      onSubmit={e => {
        e.preventDefault();
        loginUser({ variables: { email, password } });
      }}
    >
      <p className="h4 mb-4 f-1">Sign In</p>

      <input
        title="Email"
        id="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        required
      />
      <input
        title="Password"
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <div className="form-group my-4">
        <button className="btn btn-block" type="submit">
          Sign In
        </button>
      </div>
    </form>
  );
}

export default MutationWithHook;

```

#### Higher Order Component (HOC)
We can also use the `withApollo` Higher Order Component to make mutations, you can do so by simply wrapping your component's export with `withApollo`. This injects a client prop into the component, thus enables you to make GraphQL mutations.

An example is shown below

```js
import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

const LOGIN_MUTATION = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      username
      email
      id
      token
    }
  }
`;

export function MutationWithHOC({ client }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate } = client;

  const onSubmit = async e => {

    try {
      e.preventDefault();
      const res = await mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email,
          password
        }
      });

      setSuccess(res.data);
    } catch (err) {
      setError(err);
    }
  };

  if(error) {
    alert('Error Logging In User');
  }

  if (success) {
    alert('Successfully Logged In');
  }

  return (
    <form id="signinForm" className="text-center  p-4" onSubmit={onSubmit}>
      <p className="h4 mb-4 f-1">Sign In</p>

      <input
        title="Email"
        id="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        required
      />
      <input
        title="Password"
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <div className="form-group my-4">
        <button className="btn btn-block" type="submit">
          Sign In
        </button>
      </div>
    </form>
  );
}

export default withApollo(MutationWithHOC);

```

## Conclusion
A lot more can be accomplished with the Apollo Client, like caching, refetching, subscriptions and a whole lot more. 

In this article, we looked at how to set up a basic apollo client with react, the different methods we can use to make queries and mutations and also examples of how to make queries and mutations in our react components.

**Find the code used in this project on [Github](https://github.com/Easybuoy/rick-and-morty)**

**Find more information on Apollo Client [here](https://www.apollographql.com/docs/react/get-started)**

If you have any questions or feedback about this article, feel free to leave a comment.

Thanks for reading.
