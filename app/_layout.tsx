import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Platform } from 'react-native';
import { Link, Slot } from 'expo-router';

import { routesConfig } from './routesConfig';


export default function Layout() {
   if (Platform.OS !== 'web') {
    // Use a basic custom layout on web.
    return (
      <div style={{ flex: 1 }}>
        <header>
          {Object.keys(routesConfig).map(key => (
            <Link key={key} href={routesConfig[key].href}>{routesConfig[key].drawerLabel}</Link>
          ))}
        </header>
        <Slot />
      </div>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        {Object.keys(routesConfig).map(key => {
            return (
              <Drawer.Screen
                key={key}
                name={key}
                options={{
                  drawerLabel: routesConfig[key].drawerLabel,
                  title: routesConfig[key].title,
                }}
              />
            );
          })}
      </Drawer>
    </GestureHandlerRootView>
  );
}