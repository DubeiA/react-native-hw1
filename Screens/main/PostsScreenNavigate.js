import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "../postScreenColection/PostsScreen";
import MapScreen from "../postScreenColection/MapScreen";
import CommentsScreen from "../postScreenColection/CommentsScreen";
import { CustomBtn } from "../main/CustomBtn";

const PostStack = createStackNavigator();

export const PostsScreenNavigate = ({ navigation }) => {
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        options={{
          headerRight: () => <CustomBtn navigation={navigation} />,
          headerLeft: () => null,
        }}
        name="Posts"
        component={PostsScreen}
      />
      <PostStack.Screen name="Comments" component={CommentsScreen} />

      <PostStack.Screen name="Map" component={MapScreen} />
    </PostStack.Navigator>
  );
};
