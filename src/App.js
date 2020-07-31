import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  gql,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000/graphql',
  cache: new InMemoryCache()
});



function App() {

  const [books, setBooks] = useState([])

  const ChannelsList = (props) => {
    console.log('props', props);
    return books.map((item, index) => {
      return (
        <div className="list" key={index}>
          <li>序号：{item.id}</li>
          <li>书籍名称：{item.name}</li>
          <li>作者：{item.author.name}</li>
          <li>年龄：{item.author.age}</li>
        </div>
      )
    })
  }
  
  const booksListQuery = gql`
     query booksListQuery {
      # 这里的books查询是需要跟接口的query类型相同
      books {
        id
        name,
        author {
          name,
          age
        }
       }
     }
   `
  const booksListQuery1 = gql`
     query booksListQuery {
      # 这里的books查询是需要跟接口的query类型相同
      books {
        name,
        author {
          name,
        }
       }
     }
   `
  const getData = (v) => {
    client
    .query({
      query: v
    })
    .then(result => {
      setBooks(result.data.books)
    });
  }

  useEffect(() => {
    getData(booksListQuery1)
  }, [])

  return (
    <ApolloProvider client={client} className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="tap" onClick={() => getData(booksListQuery)}>欢迎使用graphql</h1>
        <div className="list-box">
          {
            books.length ?
            <ChannelsList /> :
            ''
          }
        </div>
        {/* <ChannelsListWithData /> */}
      </header>
    </ApolloProvider>
  );
}

export default App;
