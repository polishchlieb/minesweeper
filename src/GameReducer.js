const GameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELDS':
      return { ...state, fields: action.payload };
    case 'GAME_OVER':
      return { ...state, gameOver: true };
    case 'UPDATE_FIELDS':
      return { ...state, fields: [...state.fields] };
    case 'WIN':
      return { ...state, won: true };
    default:
      throw new Error('Unknown action type');
  }
}

export default GameReducer;