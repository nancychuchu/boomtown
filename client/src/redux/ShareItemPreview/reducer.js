//New Actions
const UPDATE_ITEM = 'UPDATE_ITEM';
const RESET_ITEM = 'RESET_ITEM';
const RESET_IMAGE = 'RESET_IMAGE';

//Action creator
export const updateItem = item => ({
  type: UPDATE_ITEM,
  payload: item
});

export const resetItem = () => ({
  type: RESET_ITEM
});

export const resetImage = () => ({
  type: RESET_IMAGE
});

//Create initial State
const initialState = {
  title: 'Give your item a name',
  description: 'Give your item a description',
  tags: [],
  imageurl:
    'https://via.placeholder.com/350x250.png?text=Please+select+an+image',
  itemowner: {
    email: 'dummy@email.com'
  },
  created: new Date()
};

//Setup reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ITEM:
      return {
        ...state,
        ...action.payload
      };

    case RESET_ITEM:
      return {
        ...state
      };

    case RESET_IMAGE:
      return {
        ...state,
        imageurl: initialState.imageurl
      };

    default:
      return state;
  }
};
