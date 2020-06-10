package swim.todo;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.CommandLane;
import swim.api.lane.MapLane;
import swim.api.lane.ValueLane;

import swim.recon.Recon;
import swim.structure.Record;
import swim.structure.Value;

/**
 * This is a simple WebAgent to manage the list of items in the To-do list
 */
public class ListAgent extends AbstractAgent {

  /**
   * This MapLane holds each list item and uses a timestamp for a unique key
   */
  @SwimLane("list")
  private final MapLane<Long, Value> todoList = this.<Long, Value>mapLane()
    .didUpdate((key, newValue, oldValue) -> {
      System.out.println("Add New Item: " + key + " value: " + Recon.toString(newValue));
    }).didRemove((key, index)-> {
      System.out.println("Remove New Item: " + key);
    });

  /**
   * This ValueLane hold total size of list
   */
  @SwimLane("total")
  ValueLane<Integer> totalItem = this.<Integer>valueLane();

  /**
   * Set total size of list
   */
  private void setTotalItem() {
    totalItem.set( todoList.size() );
  }

  /**
   * This is a Command lane used to update completed status
   */
  @SwimLane("updateCompletedItem")
  public CommandLane<Value> updateCompletedItem = this.<Value>commandLane()
    .onCommand((Value value)-> {
      Long key = value.get("key").longValue();
      Boolean status = value.get("completed").booleanValue();
      Value item = todoList.get(key).updatedSlot("completed", status );
      todoList.put(key, item);
    });

  /**
   * String character limit 255
   */
  private String limitString(String text) {
    return text.substring(0, Math.min(text.length(), 255));
  }

  /**
   * This is a Command lane used to update label
   */
  @SwimLane("editItem")
  public CommandLane<Value> editItem = this.<Value>commandLane()
    .onCommand((Value value)-> {
      Long key = value.get("key").longValue();

      String label = value.get("label").stringValue("");
      label = limitString(label);

      Value item = todoList.get(key).updatedSlot("label", label);
      todoList.put(key, item);
    });

  /**
   * This is a command lane used to add new items to the to-do list
   */
  @SwimLane("addItem")
  public CommandLane<String> addItem = this.<String>commandLane()
    .onCommand((String text) -> {

      // create a new timestamp as our UUID
      long UUID = System.currentTimeMillis();

      // character limit 255
      text = limitString(text);
      Record item = Record.create(2)
        .slot("label", text)
        .slot("completed", false);

      // add the new item to the todoList MapLane
      todoList.put(UUID, item);

      // Set Total count of List
      setTotalItem();
    });

  /**
   * This is a command lane used to remove items from the
   * to-do list by its key (or uuid)
   */
  @SwimLane("removeItem")
  public CommandLane<String> removeItem = this.<String>commandLane()
    .onCommand((String uuidString) -> {
      // parse the value sent by the UI from a String to Long
      long key = Long.parseLong(uuidString);

      // remove the list item from the todoList MapLane
      todoList.remove(key);

      // Set Total count of List
      setTotalItem();
    });

}
