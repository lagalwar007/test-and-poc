/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const todosList = `query TodosList($limit: Int, $nextToken: String) {
  todosList(limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
export const getOneTodo = `query GetOneTodo($id: ID) {
  getOneTodo(id: $id) {
    id
    name
    description
  }
}
`;
export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
  }
}
`;
export const listTodos = `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
