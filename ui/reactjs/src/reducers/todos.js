export const CLOSE_LINK = 'CLOSE_LINK';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SUBSCRIBE_ITEM = 'SUBSCRIBE_ITEM';
export const EVENT_HANDLER = 'EVENT_HANDLER';

const initState = {
  add: false,
  update: false,
  remove: false,
  list: [],
  msg: ''
};

export default (state = initState, action) => {
  switch (action.type) {

    // update state base on subscribe payload event
    case SUBSCRIBE_ITEM: 
      const payload = action.payload;
      let update = false;
      const updateState = state.list.map((item)=> { 
        if(payload.key === item.key) {
          update = true;
          return Object.assign({}, item, payload);
        } else {
          return item;
        };
      });
      
      return state = {
        ...state,
        add: !update,
        update: update,
        list: (!update)? [payload, ...state.list] : updateState,
      }

    // Remove item from list
    case REMOVE_ITEM: 
      return state = {
        ...state,
        list: state.list.filter((item)=> {
          return item.key !== action.payload;
        })
      }

    // Change state initState 
    case CLOSE_LINK:
      return state = {
        ...state,
        ...initState
      }

    // Keep update what event have been tigger
    case EVENT_HANDLER:
      return {
        ...state,
        msg: action.payload
      };

    default:
      return state;
  }
};