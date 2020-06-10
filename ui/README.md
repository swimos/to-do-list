# Swim with HTML 

In the HTML folder, there is a simple todo list application using HTML with the Swim client. This application illustrates how to use Swim API. Through this application, you will learn how to connect to Swim using a downlink, how to subscribe to the todo list, how to create agents with downlink, and how to use a command lane to add and remove an item from the todo list. 

# Swim with UI framework

<img align="right" src="https://github.com/swimos/to-do-list/blob/master/assets/framework-screenshot.png" alt="To-do List Screenshot" width="35%">

The following application is an example of how to use Swim API with different UI frameworks. The application is a simple todo list that allows the user to add and remove an item, mark items completed, and update the labels. 

In this example, the setup is to connect to a Map downlink when the page is initializing. This allows subscribing to `list` lane in the ListAgent to receive a record todos list. When receiving a record on `didUpdate` or `didRemove` callback, we would store the data or remove the data. With the data store, we would output to the view. 

The view would have a few event handlers that allow the user to add, remove, and update the list item. For every event, we have a method that sends commands into Swim to update the todos list. Once the todos list is updated, the `list` lane will be trigger `didUpdate` or `didRemove`.

## HTML with Swim

In the html-swim folder is an example application of HTML with Swim client and UI.

## Angular

In the Angular folder is an example application using Angular and provider service.

## Reactjs

In the Reactjs folder is an exmaple application using Reactjs and Rudex.

## Vue

In the Vue folder is an exmaple application using Vue and Vuex. 
