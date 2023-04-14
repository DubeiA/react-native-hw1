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
// const authSignUpUser =
//   ({ email, password, login }) =>
//   async (dispatch, getState) => {
//     try {
//       const { user } = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       await onAuthStateChanged(auth, (user) => {
//         user.displayName = login;
//       });

//       dispatch(
//         authSlice.actions.updateUserProfile({
//           userId: user.uid,
//           nickname: user.displayName,
//         })
//       );

//       //   console.log("user", user);
//       //   console.log("name", name);
//     } catch (error) {
//       console.log(error.code);
//       console.log(error.message);
//     }
//   };
const authSignOutUser = () => async (dispatch, getState) => {};

const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("authState", user.displayName);
      const userUpdateProfile = {
        nickname: user.displayName,
        userId: user.uid,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      dispatch(
        authSlice.actions.authStateChange({
          stateChange: true,
          nickname: user.displayName,
        })
      );
    }
  });
};

export { authSignInUser, authSignOutUser, authStateChangeUser };
