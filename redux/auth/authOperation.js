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
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      await updateProfile(user, {
        email: user.email,
      });

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
          email: user.email,
        })
      );
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

      await updateProfile(user, {
        displayName: login,
        email: user.email,
      });

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
          email: user.email,
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
      dispatch(
        authSlice.actions.updateUserProfile({
          nickname: user.displayName,
          userId: user.uid,
        })
      );

      dispatch(
        authSlice.actions.authStateChange({
          stateChange: true,
        })
      );
    }
  });
};

export { authSignInUser, authStateChangeUser, authSignOutUser, authSignUpUser };
