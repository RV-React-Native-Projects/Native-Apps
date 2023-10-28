import React from "react";
import {
  StackActions,
  TabActions,
  DrawerActions,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import _ from "lodash";
import { Navigator } from "@contexts/NavigatorContext";
import Home from "@screens/Home/Home";
import Config from "../../app.json";
import navigationConfig from "@navigation/navigationConfig";
// import qs from "qs";
// const { v4: uuidv4 } = require("uuid");

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

class NavigationManager {
  initialize = () => {
    console.log("Hello from Navigation Manger==>");
    this.reactNavigationRef = React.createRef();
    this.mobileNavigationConfig = navigationConfig["mobile"];
    this.desktopNavigationConfig = navigationConfig["desktop"];
    this.isDesktop = false;
    this.showModal = true;
    Navigator.addObserver(this);
    console.log("mobileNavigationConfig==>", this.mobileNavigationConfig);
    console.log("this.reactNavigationRef==>", this.reactNavigationRef);
  };

  get ref() {
    return this.reactNavigationRef;
  }

  handleNavigationEvent = (event, params = {}) => {
    if (!this.reactNavigationRef.current?.getRootState()) {
      return;
    }

    const { tabName, tabRootName, screenName, screenParams = {}, pop } = params;
    console.log("Handling Event :NavigationManager ", event, {
      tabName,
      tabRootName,
      screenName,
      screenParams,
      pop,
    });
    console.log("this.isDesktop", this.isDesktop);
    if (this.isDesktop && event === "push") {
      event = "modal";
    }
    switch (event) {
      case "openDrawer":
        this.handleOpenDrawer();
        break;
      case "closeDrawer":
        this.handleCloseDrawer();
        break;
      case "toggleDrawer":
        this.handleToggleDrawer();
        break;
      case "switchDrawerItem":
        this.handleSwitchDrawerItem(tabName, pop);
        break;
      case "jumpTab":
        this.handleJumpTab(tabName, screenName, screenParams);
        break;
      case "goBack":
        this.goBack();
        break;
      case "navigate":
        this.handleNavigate(screenName, screenParams);
        break;
      case "replace":
        this.handleReplace(screenName + "_MODAL", screenParams);
        break;
      case "push":
        this.handleNavigate(screenName, screenParams);
        break;
      case "modal":
        this.handleNavigate(screenName + "_MODAL", screenParams);
        break;
      case "switchTab":
        this.switchTab(tabName, pop);
        break;
      case "closeModal":
        this.closeModal(tabName, pop);
        break;
      case "openModal":
        this.openModal(tabName, pop);
        break;
      case "popToTop":
        this.popToTop(tabName);
        break;
    }
  };
  closeModal = () => {
    this.showModal = false;
  };
  openModal = () => {
    this.showModal = true;
  };
  getModalStatus = () => {
    return this.showModal;
  };
  handleToggleDrawer = () => {
    this.reactNavigationRef.current?.dispatch(DrawerActions.toggleDrawer());
  };

  handleCloseDrawer = () => {
    this.reactNavigationRef.current?.dispatch(DrawerActions.closeDrawer());
  };

  handleOpenDrawer = () => {
    this.reactNavigationRef.current?.dispatch(DrawerActions.openDrawer());
  };

  handleSwitchDrawerItem = (tabName, pop = false) => {
    this.reactNavigationRef.current?.dispatch(DrawerActions.jumpTo(tabName));
    if (pop) {
      this.reactNavigationRef.current?.dispatch(
        StackActions.popToTop({ animationEnabled: false }),
      );
    }
  };

  handleJumpTab = (tabName, tabRootName, screenName, params = {}) => {
    this.jumpTab(tabName, tabRootName, screenName, params);
  };

  handleNavigate = (screen, params) => {
    this.reactNavigate(screen, params);
  };
  handleReplace = (screen, params) => {
    this.reactReplace(screen, params);
  };

  handlePush = (screen, params) => {
    this.push(screen, params);
  };

  goBack = () => {
    this.reactNavigationRef.current?.goBack();
  };

  handleEmit = ({ event, params }) => {
    if (event.display == "push") {
      this.handlePush({ screen: event.screen, params: params });
    } else if (event.display == "modal") {
      this.handleNavigate({ screen: event.screen + "_MODAL", params: params });
    } else {
      this.handleReplace({ screen: event.screen + "_MODAL", params: params });
    }
  };

  switchTab = (tabName, pop = false) => {
    this.reactNavigationRef.current?.dispatch(TabActions.jumpTo(tabName));
    if (pop) {
      if (this.reactNavigationRef.current?.canGoBack()) {
        this.reactNavigationRef.current?.dispatch(
          StackActions.popToTop({ animationEnabled: false }),
        );
      }
    }
  };

  popToTop = (tabName) => {
    this.reactNavigationRef.current?.dispatch(TabActions.jumpTo(tabName));
    if (this.reactNavigationRef.current?.canGoBack()) {
      this.reactNavigationRef.current?.dispatch(
        StackActions.popToTop({ animationEnabled: false }),
      );
    }
  };

  renderTree = (loggedIn, desktop) => {
    this.isDesktop = desktop;
    this.navigationConfig = this.mobileNavigationConfig;
    return this.createNavigationTree(loggedIn, desktop);
  };

  findModalScreens(navigationConfig, exclude) {
    return _.filter(
      _.map(_.keys(navigationConfig.screens), (key) => {
        return {
          name: key,
          screen: navigationConfig.screens[key],
        };
      }),
      (a) => {
        return a.name + "_MODAL" !== exclude;
      },
    );
  }

  findPushScreens(screen, navigationConfig, exclude) {
    return _.filter(
      _.map(_.keys(navigationConfig.screens), (key) => {
        return {
          name: key,
          screen: navigationConfig.screens[key],
        };
      }),
      (a) => {
        return a.name !== exclude;
      },
    );
  }

  createTabRootScreensNavigationTree = (root) => {
    const tabScreens = root.tabScreens;
    console.log("tabScreens==>", tabScreens);

    const screens = _.map(tabScreens, (tabScreen) => {
      const screensOfTab = this.findPushScreens(
        this.navigationConfig.screens[tabScreen.screen],
        this.navigationConfig,
        tabScreen.screen,
      );

      let Stack = createStackNavigator();
      const tabScreenStack = _.map(screensOfTab, (tab) => {
        const Header = tab.screen.header;
        return (
          <Stack.Screen
            key={tab.name}
            component={tab.screen.component}
            name={tab.name}
            initialParams={tab.screen}
            options={{
              header: ({ scene, previous, navigation }) => {
                if (tab.screen.header) {
                  const { options } = scene.descriptor;
                  return (
                    <Header
                      scene={scene}
                      previous={previous}
                      options={options}
                      title={options.title || tab.screen.title}
                      {...tab.screen.headerParams}
                      navigation={navigation}
                    />
                  );
                } else {
                  return undefined;
                }
              },
            }}
          ></Stack.Screen>
        );
      });

      const Header = this.navigationConfig.screens[tabScreen.screen].header;
      return (
        <Stack.Navigator
          initialRouteName={tabScreen.screen}
          headerMode="screen"
        >
          <Stack.Screen
            component={
              this.navigationConfig.screens[tabScreen.screen].component
            }
            options={{
              header: ({ scene, previous, navigation }) => {
                if (Header) {
                  const { options } = scene.descriptor;
                  return (
                    <Header
                      scene={scene}
                      previous={previous}
                      options={options}
                      title={
                        options.title ||
                        this.navigationConfig.screens[tabScreen.screen]
                          .component
                      }
                      {...this.navigationConfig.screens[tabScreen.screen]
                        .headerParams}
                      navigation={navigation}
                    />
                  );
                } else {
                  return undefined;
                }
              },
            }}
            name={tabScreen.screen}
          ></Stack.Screen>
          {tabScreenStack}
        </Stack.Navigator>
      );
    });

    return screens;
  };

  findAllModalScreens = (root) => {
    return this.findModalScreens(this.navigationConfig);
  };

  findMain = (loggedIn) => {
    if (this.navigationConfig["main"]) {
      return this.navigationConfig.main;
    } else {
      return this.navigationConfig.logged_out && !loggedIn
        ? this.navigationConfig.logged_out
        : this.navigationConfig.logged_in;
    }
  };

  generateLinkingForScreen = (modal, all, toplevel) => {
    if (modal.screen.type === "TABS") {
      return {};
    } else {
      if (toplevel) {
        return {
          [modal.name + "_MODAL"]: {
            path: modal.screen.path,
          },
        };
      }
    }
  };

  generateLinking = (loggedIn) => {
    const modals = this.findAllModalScreens();
    const linking = {
      config: {
        TABS: {
          path: "tabs",
          screens: {
            HOME: {
              path: "",
              screens: {
                HOME_TAB_SCREEN: "home",
              },
            },
            CATEGORIES: {
              path: "categories",
              screens: {
                BROWSE_SCREEN: "browse",
              },
            },
          },
        },
      },
    };
    let config = {};
    _.forEach(modals, (modal) => {
      const c = this.generateLinkingForScreen(modal, modals, true);
      config = { ...config, ...c };
    });
    return {
      config,
    };
  };

  createNavigationTree = (loggedIn, independent = false) => {
    const linking = this.generateLinking(loggedIn);
    let Main = this.findMain(loggedIn);

    console.log("Screen Name=====>", Main);
    const root = this.navigationConfig.screens[Main];
    const RootStack = createStackNavigator();
    const modalScreens = this.findAllModalScreens(root);
    console.log("Component display name ", JSON.stringify(root));
    if (root?.type === "TABS") {
      const Component = root.component;
      console.log("====================================");
      console.log(Component);
      console.log("====================================");
      const screens = this.createTabRootScreensNavigationTree(root);
      const component = (
        <NavigationContainer
          documentTitle={{
            formatter: () => "APP", //App Name to Be fetch from ConfigFile @Ranvijay
          }}
          linking={independent ? undefined : linking}
          ref={this.ref}
          independent={independent}
        >
          <RootStack.Navigator
            mode={"modal"}
            initialRouteName={Main}
            headerMode="none"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: "transparent" },
              cardOverlayEnabled: true,
            }}
          >
            <RootStack.Screen
              component={Component}
              name={Main}
              initialParams={{
                screens: screens,
                tabConfigs: root.tabScreens,
                hideTabbar: independent,
              }}
            />
            {_.map(modalScreens, (msc) => {
              const Header = msc.screen.header;
              return (
                <RootStack.Screen
                  key={`${msc.name + "_MODAL"}`}
                  component={msc.screen.component}
                  name={`${msc.name + "_MODAL"}`}
                  options={{
                    headerShown: !!Header,
                    header: ({ scene, previous, navigation }) => {
                      if (Header) {
                        const { options } = scene.descriptor;
                        return (
                          <Header
                            scene={scene}
                            previous={previous}
                            options={options}
                            title={options.title || msc.screen.title}
                            {...msc.screen.headerParams}
                            navigation={navigation}
                          />
                        );
                      } else {
                        return undefined;
                      }
                    },
                    cardStyleInterpolator: msc.screen?.fadeIn
                      ? forFade
                      : undefined,
                  }}
                />
              );
            })}
          </RootStack.Navigator>
        </NavigationContainer>
      );
      return component;
    } else if (root?.type === "DRAWER") {
      const Component = root.component;
      const screens = this.createTabRootScreensNavigationTree(root);
      const component = (
        <NavigationContainer
          documentTitle={{
            formatter: () => "APP", //App Name to Be fetch from ConfigFile @Ranvijay
          }}
          ref={this.ref}
          linking={independent ? undefined : linking}
          independent={independent}
        >
          <RootStack.Navigator
            mode="modal"
            initialRouteName={Main}
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: "transparent" },
              cardOverlayEnabled: true,
            }}
          >
            <RootStack.Screen
              component={Component}
              name={Main}
              initialParams={{ screens: screens, tabConfigs: root.tabScreens }}
            />
            {_.map(modalScreens, (msc) => {
              const Header = msc.screen.header;
              return (
                <RootStack.Screen
                  key={`${msc.name + "_MODAL"}`}
                  component={msc.screen.component}
                  name={`${msc.name + "_MODAL"}`}
                  options={{
                    headerShown: !!Header,
                    header: ({ scene, previous, navigation }) => {
                      if (Header) {
                        const { options } = scene.descriptor;
                        return (
                          <Header
                            scene={scene}
                            previous={previous}
                            options={options}
                            title={options.title || msc.screen.title}
                            {...msc.screen.headerParams}
                            navigation={navigation}
                          />
                        );
                      } else {
                        return undefined;
                      }
                    },
                    cardStyleInterpolator: msc.screen?.fadeIn
                      ? forFade
                      : undefined,
                  }}
                />
              );
            })}
          </RootStack.Navigator>
        </NavigationContainer>
      );
      return component;
    } else {
      // const Component = root?.component;
      const component = (
        <NavigationContainer
          documentTitle={{ formatter: () => Config?.expo?.name }}
          theme={{ colors: { background: "transparent" } }}
          // linking={independent ? undefined : linking}
          independent={true}
          // ref={this.ref}
        >
          <RootStack.Navigator
            // mode="modal"
            initialRouteName={Main}

            // screenOptions={{
            //   headerShown: false,
            //   cardStyle: { backgroundColor: "transparent" },
            //   cardOverlayEnabled: true,
            // }}
          >
            <RootStack.Screen
              component={Home}
              name={Main}
              options={{ headerShown: false }}
            />
            {_.map(modalScreens, (msc) => {
              return (
                <RootStack.Screen
                  key={`${msc.name + "_MODAL"}`}
                  component={msc.screen.component}
                  name={`${msc.name + "_MODAL"}`}
                  // options={
                  //   msc.screen?.fadeIn ? { cardStyleInterpolator: forFade } : {}
                  // }
                />
              );
            })}
          </RootStack.Navigator>
        </NavigationContainer>
      );
      return component;
    }
  };

  reactNavigate = (...args) => {
    this.reactNavigationRef.current?.navigate(...args);
  };

  reactReplace = (name, params) => {
    this.reactNavigationRef.current?.dispatch(
      StackActions.replace(name, params),
    );
    //this.reactNavigationRef.current?.replace(...args);
  };

  push = (...args) => {
    this.reactNavigationRef.current?.dispatch(StackActions.push(...args));
    //this.reactNavigationRef.current.push(...args);
  };

  jumpTab = (tabName, screenName, params = {}) => {
    const tabRootName = _.find(
      this.navigationConfig.screens["TABS"].tabScreens,
      (ts) => {
        return ts.name === tabName;
      },
    );

    this.reactNavigationRef.current?.dispatch(TabActions.jumpTo(tabName));
    const timeout = 600;

    if (screenName) {
      setTimeout(() => {
        if (
          this.reactNavigationRef.current?.getCurrentRoute().name !==
          tabRootName
        ) {
          this.reactNavigationRef.current?.dispatch(
            StackActions.popToTop({ animationEnabled: false }),
          );
          setTimeout(() => {
            this.reactNavigationRef.current?.dispatch(
              StackActions.push(screenName, params),
            );
          }, timeout);
        } else {
          setTimeout(() => {
            this.reactNavigationRef.current?.dispatch(
              StackActions.push(screenName, params),
            );
          }, timeout);
        }
      }, timeout);
    } else {
      setTimeout(() => {
        if (
          this.reactNavigationRef.current?.getCurrentRoute().name !==
          tabRootName
        ) {
          this.reactNavigationRef.current?.dispatch(
            StackActions.popToTop({ animationEnabled: false }),
          );
        }
      }, timeout);
    }
  };

  navigateTo = (targetUrl) => {
    console.log("My Targer URL===>", targetUrl);
    if (targetUrl === "app/shop") {
      this.jumpTab("NEARBY_VENDORS");
    } else if (_.startsWith(targetUrl, "app/vendor")) {
      const vendorId = _.split(targetUrl, "/")[2];
      this.push("VENDOR", {
        vendor: { id: vendorId },
      });
    } else if (_.startsWith(targetUrl, "app/categoryItem")) {
      console.log("targetUrl===>", targetUrl);
      const merchantId = _.split(targetUrl, "/")[2];
      const categoryId = _.split(targetUrl, "/")[3];
      const itemId = _.split(targetUrl, "/")[4];
      this.jumpTab("DISCOVER", "DISCOVER_PAGE", "VENDOR_PAGE", {
        vendorId: merchantId,
        itemId: itemId,
        categoryId: categoryId,
      });
    } else if (_.startsWith(targetUrl, "app/searchCatalog")) {
      const categoryId = _.split(targetUrl, "/")[2];
      this.jumpTab("DISCOVER", "DISCOVER_PAGE", "VENDOR_PAGE", {
        vendorId: categoryId,
      });
    } else if (targetUrl === "app/home") {
      this.jumpTab("HOME");
    } else if (_.startsWith(targetUrl, "app/item")) {
      const itemId = _.split(targetUrl, "/")[2];
      this.push("ITEM_DETAIL_SCREEN", {
        itemId: itemId || null,
      });
    }
  };

  jumpNewTab = (tabName, tabRootName, screenName, params = {}) => {
    this.reactNavigationRef.current?.dispatch(TabActions.jumpTo(tabName));
    const timeout = 600;

    if (screenName) {
      setTimeout(() => {
        if (
          this.reactNavigationRef.current?.getCurrentRoute().name !==
          tabRootName
        ) {
          this.reactNavigationRef.current?.dispatch(
            StackActions.popToTop({ animationEnabled: false }),
          );
          setTimeout(() => {
            this.reactNavigationRef.current?.dispatch(
              StackActions.push(screenName, params),
            );
          }, timeout);
        } else {
          setTimeout(() => {
            this.reactNavigationRef.current?.dispatch(
              StackActions.push(screenName, params),
            );
          }, timeout);
        }
      }, timeout);
    } else {
      setTimeout(() => {
        if (
          this.reactNavigationRef.current?.getCurrentRoute().name !==
          tabRootName
        ) {
          this.reactNavigationRef.current?.dispatch(
            StackActions.popToTop({ animationEnabled: false }),
          );
        }
      }, timeout);
    }
  };
}

export default new NavigationManager();
