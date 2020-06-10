import * as swim from '@swim/system';
import { CLOSE_LINK, EVENT_HANDLER, REMOVE_ITEM, SUBSCRIBE_ITEM } from './../reducers/todos';

const HOST = 'ws://localhost:9001';
const NODE = '/todo';

/**
  * subscribe to a Map downlink to our 'list' lane
  * this is how we get updates from the MapLane inside the WebAgent
  */
export const TodoOpenLink = ()=> {
  return swim.downlinkMap().hostUri(HOST).nodeUri(NODE).laneUri('list').open();
}

/**
 * Reactjs Action is to show that link have been close 
 * and reset the state
 */
export const TodoCloseLink = () => {
  return { type: CLOSE_LINK };
}

/**
 * Reactjs Action to add playload to todos list
 */
export const TodoSubscribeItem = (data) => {
  return { type: SUBSCRIBE_ITEM, payload: data };
}

/**
 * Reactjs Action to remove playload to todos list
 */
export const TodoSubscribeRemoveItem = (key) => {
  return { type: REMOVE_ITEM, payload: key };
}

/**
 * Reactjs Action to send payload message for event handler state
 * Send Command to Swim WebAgent to remove a list item by UUID
 * This will call the removeItem command lane in the ToDo WebAgent
 */
export const TodoRemoveItem = (key) => {
  swim.command(HOST, NODE, 'removeItem' , key);
  return { type: EVENT_HANDLER, payload: `[Remove] Item ${key}` };
}

/**
  * Reactjs Action to send payload message for event handler state
  * Send Command to Swim WebAgent to add a list item
  * This will call the addItem command lane in the ToDo WebAgent
  * UUID is generated automatically by the command lane adding new value to the list
 */
export const TodoAddItem = (text) => {
  swim.command(HOST, NODE, 'addItem' , text);
  return { type: EVENT_HANDLER, payload: `[Add] New Item ${text}` };
}

/**
 * Reactjs Action to send payload message for event handler state
 * Send Command to Swim WebAgent to update label of list item by UUID
 * This will call the editItem command lane in the ToDo WebAgent
 */
export const TodoEditLabel = (key, text) => {
  swim.command(HOST, NODE, 'editItem' , {key, label: text} );
  return { type: EVENT_HANDLER, payload: `[Update] Label Item ${key}` };
}

/**
 * Reactjs Action to send payload message for event handler state
 * Send Command to Swim WebAgent to update label of list item by UUID
 * This will call the updateCompletedItem command lane in the ToDo WebAgent
 */
export const TodoUpdateCompleted = (key, value) => {
  swim.command(HOST, NODE, 'updateCompletedItem' , {key, completed: value} );
  return { type: EVENT_HANDLER, payload: `[Update] Status Item ${key}` };
}
