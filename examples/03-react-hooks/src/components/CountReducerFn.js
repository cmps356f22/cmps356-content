// in constants/appConstants.ts
// Create an object with constant values
export const actionType = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  INIT: 'INIT'
}

// action: {type: string, playload: {}}
export default function countReducer(state, action) {
    switch (action.type) {
      case actionType.INCREMENT:
        return { count: state.count + 1 };
      case actionType.DECREMENT:
        return { count: state.count - 1 };
      case actionType.RESET:
          return { count: 0 };
      case actionType.INIT:
            return { count: action.payload };
      default:
        throw new Error();
    }
  }