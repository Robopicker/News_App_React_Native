const initState = {
  data: [],
  indexsData: [],
};
export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SAVE_BOOK_MARK_ITEM': {
      return {
        data: [action.payload, ...state.data],
        indexsData: [...state.indexsData, action.payload?.id],
      };
    }
    default:
      return state;
  }
}
