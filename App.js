import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { useRoute } from "./Screens/router";

export default function App() {
  const routing = useRoute(true);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
