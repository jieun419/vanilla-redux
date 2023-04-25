import { createStore } from 'redux';

const add = document.querySelector('#add');
const minus = document.querySelector('#minus');
const number = document.querySelector('span');

const ADD = 'ADD';
const MINUS = 'MINUS';

number.textContent = 0

const countModifier = (count = 0, action) => {
  switch(action.type){
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.textContent = countStore.getState()
}

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: ADD })
}

const handleMinus = () => {
  countStore.dispatch({ type: MINUS  })
}

add.addEventListener('click', handleAdd)
minus.addEventListener('click', handleMinus)
