import { createStore } from 'redux';

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

// action 상수로 관리해 오타 오류를 줄일 수 있다.
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

// 액션 생성자 함수
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text
  };
};

// 액션 생성자 함수
const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}

// reducer 함수
// state는 오직 action을 통해 수정할 수 있다.
// 첫번째 인자: state, 두번째 인자: action
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      // 원본 훼손으로 하면 안된다. (깊은 복사로 수정하기)
      const newToDoObg = { text: action.text, id: Date.now() };
      return [newToDoObg, ...state];
    case DELETE_TODO:
      // filter(새로운 배열 리턴)을 이용해 id가 같이 않은 것만 반환하기
      // 삭제할 obj를 제외한 새로운 배열을 반환
      const cleaned = state.filter(toDo => toDo.id !== action.id);
      return cleaned;
    default:
      return state;
  }
}

const store = createStore(reducer);

//dispatch 함수
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text))
}

//dispatch 함수
const dispatchDeleteToDo = (e) => {
  // btn의 부모 요소의 id값 알아내기
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id))
}

const painToDos = () => {
  const toDos = store.getState();
  ul.textContent = '';
  toDos.forEach(toDo => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = 'DEL';
    btn.addEventListener('click', dispatchDeleteToDo);
    li.id = toDo.id;
    li.textContent = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

//UI 업데이트
store.subscribe(painToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  dispatchAddToDo(toDo);
}

form.addEventListener('submit', onSubmit);