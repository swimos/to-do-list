const HOST = 'warp://localhost:9001';
const NODE = '/todo';
const todos = {};
let listWrap = null;

/**
 * On DOM content is ready
 */
document.addEventListener('DOMContentLoaded', () => { 

  // Change normal DOM element to swim element and swim life cycle
  listWrap = swim.HtmlView.fromNode(document.querySelector('.todo-list'));

  // init function
  AddItemInput();
  OpenLink();
  NavEvent();
});

/**
  * subscribe to a Map downlink to our 'list' lane
  * this is how we get updates from the MapLane inside the WebAgent
 */
const OpenLink = ()=> {
  // open Map downlink
  swim.downlinkMap().hostUri(HOST).nodeUri(NODE).laneUri('list')
    .didUpdate((key, value)=> {

      // convert swim record to javascript object
      const data = {key: key.numberValue(), ...value.toAny()};

      // check if there is a todo item is created
      let elem = todos[data.key];
      if(!elem) { elem = todos[data.key] = createElem(data.key); }

      // update element content
      elem.completed = data.completed;
      elem.labelElem.text(data.label);
      elem.parent.className(`${(data.completed)? 'completed' : '' }`);
      render();
    })
    .didRemove((k)=>{
      let elem = todos[k.numberValue()];

      // remove element on todo list item element
      elem.parent.remove();
      delete elem;
    }).open();
}

/**
 * Render todos list view to DOM
 * Swim prependChildView will handle 
 * update view or new view
 */
const render = (href)=> {
  listWrap.removeAll();
  const hash = href || location.hash.substr(1);
  
  if(hash === 'active') { // filter only active todo list item
    for(const key in todos) {
      const data = todos[key];
      if(!data.completed) {
        listWrap.prependChildView(data.parent);
      }
    }
  } else if (hash === 'completed') {
    for(const key in todos) { // filter only completed todo list item
      const data = todos[key];
      if(data.completed) {
        listWrap.prependChildView(data.parent);
      }
    }
  } else { // show all todo list item
    for(const key in todos) {
      listWrap.prependChildView(todos[key].parent);
    }
  }
}

/**
 * Handle route and active class for nav
 */
const NavEvent = ()=> {
  const hash = location.hash.substr(1);
  const filter = document.querySelectorAll('.filter li');
  NavRemoveActive(filter);
  
  filter.forEach((elem)=> {
    const link = elem.querySelector('a');
    const href = link.href.split('#')[1];

    // set default active class base on href if set
    if(hash === href || href === '') { link.classList.add('active'); }

    // render todo list base on nav click
    link.addEventListener('click', (event)=> {
      NavRemoveActive(filter);
      link.classList.add('active');
      render((href === '')? '#' : href );
    });
  });
}

/**
 * Remove all the active class from nav
 */
const NavRemoveActive = (filter) => {
  filter.forEach((li)=> { li.querySelector('a').classList.remove('active'); });
}

/**
  * Send Command to Swim WebAgent to add a list item
  * This will call the addItem command lane in the ToDo WebAgent
  * UUID is generated automatically by the command lane adding new value to the list
  */
const AddItemInput = ()=> {
  // input on key press
  document.querySelector('.textInput').addEventListener('keypress', (event)=> {

    // when enter is trigger
    if(event.which === 13 || event.keyCode === 13 || event.key === "Enter") {
      const text = event.target.value.trim();

      // simple validation input text have more then 2 character
      if(text.length > 2) {

        // Send Command to Swim WebAgent to add a list item
        // This will call the addItem command lane in the ToDo WebAgent
        // UUID is generated automatically by the command lane adding new value to the list
        swim.command(HOST, NODE, 'addItem', text); 
        event.target.value = "";
      }
    }
  });
}

/**
  * Using Swim view to create DOM element
  * for todo list item and add event handler
  */
const createElem = (key)=> {

  // create parent element
  const parent = swim.HtmlView.create('li').className('todo-form');
  const checkbox = parent.append('input')
    .className('checkbox')
    .setAttribute('type', 'checkbox')
    .setAttribute('name', `list#${key}`);

  // When checkbox is click update complete status
  // Send Command to Swim WebAgent to update label of list item by UUID
  // This will call the updateCompletedItem command lane in the ToDo WebAgent
  checkbox.on('click', (evt)=> {
    evt.preventDefault();
    swim.command(HOST, NODE, 'updateCompletedItem', {key, completed: !todos[id].completed});
  });

  // double click event to enable edit input field
  const view = parent.append('div').className('view');
  view.on('dblclick', (evt)=> {
    evt.preventDefault();
    EditLabelInput(parent, view, key);
  });
  
  const labelElem = view.append('label')
    .setAttribute('for', `list#${key}`);

  const close = view.append('i')
    .className('material-icons')
    .text('clear');

  // When close button is click remove todo list item
  // Send Command to Swim WebAgent to remove a list item by UUID
  // This will call the removeItem command lane in the ToDo WebAgent
  close.on('click', (evt)=> {
    evt.stopPropagation();
    swim.command(HOST, NODE, 'removeItem', key);
  });

  return { parent, labelElem };
};

/**
 * When edit is enable append eidt input fields
 * add event handler on submit
 */
const EditLabelInput = (parent, view, id)=> {
  parent.addClass('edit');
  const input = view.append('input')
    .className('input-edit')
    .setAttribute('type', 'text')
    .setAttribute('placeholder', 'Edit Label')
    .setAttribute('maxlength', '254');

  // auto focus
  input.node.focus();

  // When edit input is press on enter blur the input.
  // The reason for blur is because you dont want to 
  // submit the data 2 time. Main hand data on blur
  input.on('keypress', (evt)=> {
    if(evt.which === 13 || evt.keyCode === 13 || evt.key === "Enter") {
      input.node.blur();
    }
  });

  // When on blur update update label
  input.on('blur', (evt)=> {
    const text = input.node.value.trim();
    parent.removeClass('edit');
    input.remove();

    if(text.length > 2) {

      // Send Command to Swim WebAgent to update label of list item by UUID
      // This will call the editItem command lane in the ToDo WebAgent
      swim.command(HOST, NODE, 'editItem', {key: id, label: label});
    }
  });
}