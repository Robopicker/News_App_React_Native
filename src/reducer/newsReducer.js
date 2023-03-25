const initState = {
  data: [],
  topNews: [],
};
export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SAVE_NEWS': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'SAVE_TOP_NEWS': {
      return {
        ...state,
        topNews: action.payload,
      };
    }
    default:
      return state;
  }
}
