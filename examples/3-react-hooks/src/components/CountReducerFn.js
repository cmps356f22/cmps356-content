// action: {type: string, playload: {}}
export default function countReducer(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      case "reset":
          return { count: 0 };
      case "init":
            return { count: action.payload };
      default:
        throw new Error();
    }
  }