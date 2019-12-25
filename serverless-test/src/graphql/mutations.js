/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTestTodo = `mutation CreateTestTodo($id: ID, $name: String, $description: String) {
  createTestTodo(id: $id, name: $name, description: $description)
}
`;
export const updateTestTodo = `mutation UpdateTestTodo($input: UpdateTodoInput) {
  updateTestTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const deleteTestTodo = `mutation DeleteTestTodo($input: DeleteTodoInput) {
  deleteTestTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const createTodo = `mutation CreateTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const updateTodo = `mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const deleteTodo = `mutation DeleteTodo($input: DeleteTodoInput!) {
  deleteTodo(input: $input) {
    id
    name
    description
  }
}
`;
