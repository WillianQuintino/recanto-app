import { Href } from "expo-router/build/types";

// Defina um tipo para o objeto routesConfig
export interface RouteParams {
    title: string;
    drawerLabel: string;
    href: Href;
}

// Defina explicitamente o tipo de routesConfig
export const routesConfig: { [key: string]: RouteParams } = {
  index: {
    title: 'Início',
    drawerLabel: 'Início',
    href: '/',
  },
  about: {
    title: 'Sobre',
    drawerLabel: 'Sobre',
    href: '/about',
  },
};