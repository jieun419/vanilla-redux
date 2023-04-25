# Vanilla Redux

Learning vanilla-Redux and React-Redux
Redux에서는 **Action → Dispatch → Reducer → Store** 순서로 데이터가 단방향으로 흐른다.

---

## Store
- 상태가 관리되는 오직 하나뿐인 저장소 역할
- state가 저장되어 있는 공간
```jsx
import {createState} from 'redux';
//reducer 함수가 인자로 받아야한다.
const store = createStore(rootReducer)
```

## Reducer
- Dispatch에서 전달받은 Action 객체의 type값에 따라 상태를 변경시키는 함수
- 순수함수여야 한다.
```jsx
const count = 1

// Reducer를 생성할 때에는 초기 상태를 인자로 요구한다.
// 첫번째 인자: state, 두번째 인자: action
const counterReducer = (state = count, action) => {

  // Action 객체의 type 값에 따라 분기하는 switch 조건문
  switch (action.type) {

    //action === 'INCREASE'일 경우
    case 'INCREASE':
			return state + 1

    // action === 'DECREASE'일 경우
    case 'DECREASE':
			return state - 1

    // 해당 되는 경우가 없을 땐 기존 상태를 그대로 리턴
    default:
      return state;
	}
}
// Reducer가 리턴하는 값이 새로운 상태가 된다.
```

- 여러개의 Reducer를 사용하는 경우 `combineReducers` 메서드를 사용해 하나의 Reducer로 합쳐줄 수 있다.
```jsx
// combineReducers 불러오기
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  //reducer 함수 추가
  counterReducer,
  anyReducer,
  ...
});
```

## Action
- Action은 객체 형식으로 type을 필수로 지정해 주어야한다.
- patload는 필수는 아니지만 필요에 따라 구체적인 값을 전달해 줄 수 있다.

```jsx
{type: 'INCREASE'}
{type: 'INCREASE', payload: 5}
```

- 액션 생성자(Action Creator) : Action 객체를 생성하는 함수를 만들어 사용하는 경우가 많다.
```jsx
const increase = () => {
  return {
    type: 'INCREASE'
  }
}
```
- type의 경우 상수로 선언해 관리하면 오타로 인한 오류를 줄일 수 있다.
```jsx
const INCREASE = 'INCREASE'

const increase = () => {
  return {
    type: INCREASE
  }
}
```

## Dispatch
- Reducer로 Action을 전달해 주는 함수
- 절달인자는 Action 객체
```jsx
dispatch( { type: 'INCREASE' } )
```



- state는 새로운 값을 리턴한다. (원본을 훼손하지 않는다.)