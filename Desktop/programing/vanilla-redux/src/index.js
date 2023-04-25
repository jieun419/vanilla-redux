import { createStore } from 'redux';

const add = document.querySelector('#add');
const minus = document.querySelector('#minus');
const number = document.querySelector('span');

number.textContent = 0

const countModifier = (count = 0, action) => {
  if(action.type === 'ADD'){
    return count + 1;
  }else if(action.type === 'MINUS'){
    return count - 1;
  }else{
    return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.textContent = countStore.getState()
}

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: 'ADD' })
}

const handleMinus = () => {
  countStore.dispatch({ type: 'MINUS'  })
}

add.addEventListener('click', handleAdd)
minus.addEventListener('click', handleMinus)
