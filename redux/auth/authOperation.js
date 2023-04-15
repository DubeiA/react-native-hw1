import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
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
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      // console.log("Register", user);

      await updateProfile(user, {
        displayName: login,
      });

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
        })
      );
    } catch (error) {
      console.log(error.code);
      alert(error.message);
    }
  };
const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);

  dispatch(authSlice.actions.authSignOut());
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log("auth2", user);
      dispatch(
        authSlice.actions.updateUserProfile({
          nickname: user.displayName,
          userId: user.uid,
        })
      );
      // console.log("auth3", user.displayName);
      dispatch(
        authSlice.actions.authStateChange({
          stateChange: true,
          // nickname: "n",
        })
      );
    }
  });
};

export { authSignInUser, authStateChangeUser, authSignOutUser, authSignUpUser };
