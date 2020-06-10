package swim.todo;

import swim.api.SwimRoute;
import swim.api.agent.AgentRoute;
import swim.api.plane.AbstractPlane;
import swim.client.ClientRuntime;
import swim.kernel.Kernel;
import swim.server.ServerLoader;

/**
 * Basic swim plane. sets up routes to WebAgent and
 * starts the server and plane
 */
public class TodoPlane extends AbstractPlane {

  /**
   * define a main route to our ListAgent
   */
  @SwimRoute("/todo")
  private AgentRoute<ListAgent> listAgent;

  /**
   * define a pattern by which different ListAgents can be addressed.
   * concrete examples include /todo/1, /todo/mylist
   */
  @SwimRoute("/todo/:id")
  private AgentRoute<ListAgent> idListAgent;

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
  public static void main(String[] args) throws InterruptedException {
    final Kernel kernel = ServerLoader.loadServer();  // define our swim server kernel

    kernel.start();
    System.out.println("Running Todo plane...");
    kernel.run();

    // Send data to the above Swim server. Could (and in practice, usually will)
    // be done in external processes instead
    final ClientRuntime client = new ClientRuntime();
    client.start();
  }

}
