package swim.todo;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.CommandLane;
import swim.api.lane.MapLane;

/**
 * This is a simple WebAgent to manage the list of items in the To-do list
 */
public class ListAgent extends AbstractAgent {

  /**
   * This MapLane holds each list item and uses a timestamp for a unique key
   */
  @SwimLane("list")
  MapLane<Long, String> todoList = this.<Long, String>mapLane();

  /**
   * This is a command lane used to add new items to the to-do list
   */
  @SwimLane("addListItem")
  public CommandLane<String> addListItem = this.<String>commandLane()
    .onCommand((String newListItem) -> {
      // create a new timestamp as our UUID
      final long newUuid = System.currentTimeMillis();
      // cap item length to 255 characters
      newListItem = newListItem.substring(0, Math.min(newListItem.length(), 255));

      // add the new item to the todoList MapLane
      todoList.put(newUuid, newListItem);
    });

  /**
   * This is a command lane used to remove items from the 
   * to-do list by its key (or uuid)
   */
  @SwimLane("removeListItem")
  public CommandLane<String> removeListItem = this.<String>commandLane()
    .onCommand((String uuidString) -> {
      // parse the value sent by the UI from a String to Long
      long uuidToRemove = Long.parseLong(uuidString);

      // remove the list item from the todoList MapLane
      todoList.remove(uuidToRemove);
    });
}
