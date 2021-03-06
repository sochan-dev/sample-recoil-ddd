import React, { VFC, useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useTodo } from 'hooks/todo';
import { stateTodos } from 'states/todo/entity';
import { Todo } from 'types/todo';

const apiResponse = {
  todos: [
    { id: 1, title: 'hoge', description: 'hogehogehoge', isDone: false },
    { id: 2, title: 'fuga', description: 'fugafugafuga', isDone: true },
    { id: 3, title: 'fizz', isDone: false },
    { id: 4, title: 'buzz', description: 'buzzbuzzbuzz', isDone: false },
  ],
};

export const TodoList: VFC = () => {
  const todos = useRecoilValue(stateTodos);
  const { setFromArray, insertTodo, removeTodo } = useTodo();

  useEffect(() => {
    setFromArray(apiResponse.todos);
  }, []);

  const handleCreateDummyTodo = useCallback(() => {
    // NOTE: APIリクエストを送る Idの自動生成など
    // ここでは最後のidの+1

    const newTodoId = todos.length !== 0 ? todos[todos.length - 1].id + 1 : 1;

    insertTodo({
      id: newTodoId,
      title: 'dummy',
      description: "it's dummy todo.",
      isDone: false,
    });
  }, [todos, insertTodo]);

  const toggleTodoStatus = useCallback(
    (todo: Todo) => {
      insertTodo({
        ...todo,
        isDone: !todo.isDone,
      });
    },
    [insertTodo],
  );

  return (
    <div>
      <h1>Recoil Todo List Sample</h1>
      <button onClick={handleCreateDummyTodo}>Add Dummy Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <p>
                タイトル: {todo.title} {todo.isDone && '(Done)'}
              </p>
              {todo.description && <p>詳細: {todo.description}</p>}
            </div>
            <button onClick={() => removeTodo(todo.id)}>remove</button>
            <button onClick={() => toggleTodoStatus(todo)}>toggle status</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
