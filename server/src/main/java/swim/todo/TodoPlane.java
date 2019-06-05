package swim.todo;

import java.io.IOException;
import swim.api.SwimRoute;
import swim.api.agent.AgentType;
import swim.api.plane.AbstractPlane;
import swim.api.server.ServerContext;
import swim.loader.ServerLoader;

/**
 * Basic swim plane. sets up routes to WebAgent and 
 * starts the server and plane
 */
public class TodoPlane extends AbstractPlane {

  /**
   * define a main route to our ListAgent
   */
  @SwimRoute("/todo")
  final AgentType<ListAgent> mainListAgent = agentClass(ListAgent.class);

  /**
   * define a pattern by which different ListAgents can be addressed.
   * concrete examples include /todo/1, /todo/mylist
   */
  @SwimRoute("/todo/:id")
  final AgentType<ListAgent> idListAgent = agentClass(ListAgent.class);


  /**
   * called after the server has started
   * useful if you need to pre-populate lanes on startup
   */
  @Override
  public void didStart() {
    System.out.println("Todo app started");
    // context.command("/unit/master", "WAKEUP", Value.absent());
  }

  /**
   * app main method. creates server, plane and starts everything
   */
  public static void main(String[] args) throws IOException {
    final ServerContext server = ServerLoader.load(TodoPlane.class.getModule()).serverContext();
    server.start();
    server.run();
  }
}
