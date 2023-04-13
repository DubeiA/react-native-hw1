import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/config";

import { authSlice } from "./authSlice";

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };
const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await onAuthStateChanged(auth, (user) => {
        console.log((user.displayName = login));
      });

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
        })
      );
      //   console.log("user", user);
      //   console.log("name", name);
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };
const authSignOutUser = () => async (dispatch, getState) => {};

export { authSignInUser, authSignUpUser, authSignOutUser };
