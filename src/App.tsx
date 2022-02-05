import React, { VFC } from 'react';
import { RecoilRoot } from 'recoil';
import { TodoList } from 'TodoList';

const App: VFC = () => {
  return (
    <RecoilRoot>
      <TodoList />
    </RecoilRoot>
  );
};

export default App;
