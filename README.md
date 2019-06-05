# To-do List Example

<img align="right" src="https://github.com/swimos/to-do-list/blob/master/ui/assets/images/list-screenshot.png" alt="To-do List Screenshot" width="35%">

This is a small and focused sample  application to demonstrating how to implement and use two specific types of lanes inside Swim. The application itself is an extremely simple to-do list which allows users to add and remove items from a to-do list via a web page. The web UI is also hosted by swim and uses vanilla javascript along with the Swim javascript client to get data from the server.

The server runs a simple Swim Plane called TodoPlane. This sets up the routing to our WebAgents and starts up the app. In this example TodoPlane simply sets up and tears down whatever is need the run the server and its WebAgents. The ListAgent itself is created the first time someone accesses the list.

It is possible to allow for more then one to-do list (and ListAgent) by changing the routing in the TodoPlane from `@SwimRoute("/todo")` to `@SwimRoute("/todo/:id")`. With the addition of the id the plane will automatically create a new ListAgent for every unique id you pass on the route from your Swim client. This allows for many lists within the same application.

The ListAgent itself consists of 3 lanes. First there is a MapLane which will hold all the list items. In this example, the map lane is keyed using a timestamp. This ensures the list will always show up in the same order for all users. Next are 2 command lanes. The first command lane is for adding new list items and likewise the second command lane is for removing list items.


In the UI, `ui/assets/js/todo.js` does most the of work. It sets up a Map downlink to the 'list' lane inside the ListAgent for that list. Next it has a simple method for rendering teh list onto the page. There are 2 methods to handle the click of the add and remove buttons. Finally there are 2 methods which send commands into Swim to add and remove list items. Anytime the list changes it will get re-rendered.




## Setup, Build, and Run:

You need java9+ to run the application and these instructions only cover running in a unix like environment. Gradle is not required as the project provides a gradle wrapper to use instead.

1. `git clone https://github.com/swimit/new-todo-list.git`

2. `cd todo-list/server`

3. `./gradlew run`

4. Navigate to `http://127.0.0.1:9001` and you should see an empty To-do list

5. Adding `?list=<listid>` to the url will create a new list for that listID. for example `http://127.0.0.1:9001?list=hellowWorld` will create a new ListAgent with the ID of 'helloWorld'.
