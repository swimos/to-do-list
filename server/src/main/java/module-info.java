open module swim.todo {
  requires transitive swim.loader;
  requires transitive swim.client;

  exports swim.todo;

  provides swim.api.plane.Plane with swim.todo.TodoPlane;
}
