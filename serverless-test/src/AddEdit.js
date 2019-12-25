import React, { useState, useEffect } from "react";

export const AddEditForm = ({handleEvent, todoData}) => {
    let [todoDetail, setTodoDetail] = useState({id: null, name: '', description: ''});
    const textChangeHandler = (e) => {   
        let newData = {};
        if(e.target.name === 'todoName') {
            newData = {...todoDetail, name: e.target.value};
        } else {
            newData = {...todoDetail, description: e.target.value};
        }
        setTodoDetail(newData);
    }
    const formSubmitHandler = (e) => {
        e.preventDefault();
        let data = {
            name: e.target.todoName.value,
            description: e.target.todoDesc.value
        }
        let entry = {}
        if(todoDetail.id) {
            entry = {input: Object.assign({}, todoDetail, data)};
        } else {
            entry = Object.assign({}, todoDetail, {id: Math.floor(1000 + Math.random() * 9000), ...data});
        }
        handleEvent(entry);
    }
    useEffect(() => {
        console.log('newProp:::::', todoData);
        setTodoDetail({...todoData});
    }, [todoData]);
    return (
    <form id="todoForm" onSubmit={formSubmitHandler}>
        <input type="text" name="todoName" 
            value={todoDetail.name}
            onChange={textChangeHandler} />
        <input type="text" name="todoDesc" 
            value={todoDetail.description}
            onChange={textChangeHandler} />
        <button type="submit">Add Todo</button>
    </form>
  );
}