const swimUrl = `warp://${window.location.host}`;
const urlParams = new URLSearchParams(window.location.search);
const listId = urlParams.get('list');
let totoList = null;
let nodeRef = null;
let todoLink = null;
let inputField = null;
let listElement = null;
let listItems = [];

/**
 * method to start up the ToDo list on the page
 */
function start() {
  // grab some dom elements for later use
  inputField = document.getElementById('textInput');
  listElement = document.getElementById('mainList');

  // create a node reference to our todo plane in swim
  if(listId !== null) {
    nodeRef = swim.nodeRef(swimUrl, `/todo/${listId}`);
  } else {
    nodeRef = swim.nodeRef(swimUrl, '/todo');
  }


  // create a Map downlink to our 'list' lane
  // this is how we get updates from the MapLane inside the WebAgent
  todoLink = nodeRef.downlinkMap().laneUri('list')
      // when an new item is added to the list, append it to listItems
      .didUpdate((key, newValue) => {
        key = key.numberValue();
        // add new item to listItems
        listItems[key] = {key, ...newValue.toAny()};
        // refresh the ui
        renderList();

      // handle when a item is removed from the list, remove it from listItems
      }).didRemove((removeKey)=> {

        // create a new array by filtering out the removed key
        // this is just one of several ways to do this in JS
        let newArr = [];
        for(const key in listItems) {
          if(key !== removeKey.value.toString()) {
            newArr[key] = listItems[key];
          }
        }

        // update the global listItems variable with new array
        listItems = newArr;
        // update the UI
        renderList();
      }).open();
}

/**
 * function which loops over the global listItems
 * and outputs a <li> for each on inside of listElement
 */
function renderList() {
  listElement.innerHTML = ''; // clear the element by brute force

  // for each key in listItems,
  // create a <li> element with the value of the item
  // and a remove button, append <li> to listElement
  for(const key in listItems) {

    // grab current list item
    const currItem = listItems[key];

    // create the <li> element
    const domElement = document.createElement('li');
    domElement.className = "list-group-item d-flex justify-content-between align-items-center";

    // create a <span> to hold the label for the list item
    const labelElement = document.createElement('span');
    labelElement.style.overflow = "hidden"
    labelElement.innerText = currItem.label;

    // create the remove button
    const removeButton = document.createElement('input');
    removeButton.type = "button";
    removeButton.value = "X"
    removeButton.className = "btn btn-danger";
    removeButton.key = key;
    removeButton.onclick = () => { handleRemove(key) };

    // append everything together
    domElement.appendChild(labelElement);
    domElement.appendChild(removeButton);
    listElement.appendChild(domElement);
  }
}

/**
 * Add button click handler
 * Send Command to Swim WebAgent to add a list item
 * This will call the addItem command lane in the ToDo WebAgent
 * UUID is generated automatically by the command lane adding new value to the list
 */
function handleAdd() {

  // get the input value
  const newItemText = inputField.value;

  // make sure the input is of a reasonable length
  if(newItemText.length > 0 && newItemText.length <= 255) {
    nodeRef.command('addItem', newItemText);
    inputField.value = '';
    inputField.focus();
  }
}

/**
 * Remove button click handler
 * Send Command to Swim WebAgent to remove a list item by UUID
 * This will call the removeItem command lane in the ToDo WebAgent
 *
 * @param {*} uuid - UUID of item to remove
 */
function handleRemove(uuid) {
  nodeRef.command('removeItem', uuid);
}
