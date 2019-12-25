import React from 'react';
export const ListTodos = ({todoList, deleteTodoHandler, updateTodoHandler}) => {
    return (
        <div>
          <h4>Todo List</h4>
          <div>
            <table className="Todo-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>                
              </thead>
              <tbody>
                {
                  todoList.map((todo, index) => {
                    return <tr key={todo.id}>
                      <td>{index}</td>
                      <td>{todo.name}</td>
                      <td>{todo.description}</td>
                      <td>
                        <button onClick={() => { updateTodoHandler(todo)}}>Update</button>
                        <button onClick={() => { deleteTodoHandler(todo.id)}}>Delete</button>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
    )
}