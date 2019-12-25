import React, { useState , useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import {createTestTodo, deleteTestTodo, updateTestTodo, createTodo} from './graphql/mutations';
import {todosList, listTodos } from './graphql/queries';
import { onUpdateTodoTest } from './graphql/subscriptions';
import {AddEditForm} from './AddEdit';
import {ListTodos} from './ListTodos';

const App = () => {
  let [todoList, setTodoList] = useState([]);
  let [todoData, setTodoData] = useState({id: null, name: '', description: ''});
  const getListTodos = async() => {
    let {data} = await API.graphql(graphqlOperation(todosList, {limit: 5, nextToken: null}));
    setTodoList(data.todosList.items);
    let listTodosRes = await API.graphql(graphqlOperation(listTodos, {limit: 5, nextToken: null}));
    console.log('listTodosRes:::::', listTodosRes);
  }
  const handleEvent = async(entry) => {
    
    // const result = await API.post('lambdaTestApi', '/test', {
    //   body: {
    //     name: "todo6",
    //     description: "description todo test6"
    //   }
    // })
    if(todoData.id) {
      const response = await API.graphql(graphqlOperation(updateTestTodo, entry))
    } else {
      const rdata = await API.graphql(graphqlOperation(createTestTodo, entry));
    }    
    getListTodos();
    setTodoData({id: null, name: '', description: ''});
  }
  const deleteTodoHandler = async(detail) => {
    let data = {
      input: {
        id: detail
      }
    }
    const response = await API.graphql(graphqlOperation(deleteTestTodo, data));
    getListTodos();
  }
  const updateTodoHandler = async(detail) => {
    setTodoData({...detail});    
  }
  const subscriptionData = () => {
    const subscription = API.graphql(graphqlOperation(onUpdateTodoTest))
    .subscribe({
      next: (todoDetails) => {
        subscription.unsubscribe();
        console.log('subscription::::::::', todoDetails);
      }
    })    
  }
  subscriptionData();
  useEffect(() => {
    getListTodos();    
  }, [])
    return (
      <div className="App">
        <header className="App-header">
            Learn React
        </header>
        <div>
          <h4>Create Todo</h4>
          <div>
            <AddEditForm handleEvent={handleEvent} todoData={todoData}></AddEditForm>
          </div>
        </div>
        <ListTodos todoList={todoList} 
                    deleteTodoHandler={deleteTodoHandler} 
                    updateTodoHandler={updateTodoHandler}>
        </ListTodos>
      </div>
    );
}

export default withAuthenticator(App, {includeGreetings: true});
