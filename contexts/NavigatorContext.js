import React, { createContext } from "react";
import _ from "lodash";

class NavigationEmitter {
  constructor() {
    this.observers = [];
  }
  addObserver = (obj) => {
    if (!_.find(this.observers, (o) => o == obj)) {
      this.observers.push(obj);
    }
  };

  emit = ({ event, params }) => {
    _.forEach(this.observers, (observer) => {
      observer.handleNavigationEvent(event, params);
    });
  };
}

export const Navigator = new NavigationEmitter();
const NavigatorContext = createContext();

export function NavigatorContextProvider(props) {
  return (
    <NavigatorContext.Provider value={{ Navigator }}>
      {props.children}
    </NavigatorContext.Provider>
  );
}

export default NavigatorContext;
