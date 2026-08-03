import { AiFillGoogleCircle } from "react-icons/ai";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";

import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      const resultFromGoogle =
        await signInWithPopup(auth, provider);

      const res = await fetch("http://localhost:5000/api/auth/google",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            name:
              resultFromGoogle.user
                .displayName,

            email:
              resultFromGoogle.user
                .email,

            photo:
              resultFromGoogle.user
                .photoURL,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));

        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="flex items-center justify-center gap-2 w-full border-2 border-pink-500 text-pink-500 rounded-lg py-2 font-medium hover:bg-pink-500 hover:text-white transition-colors"
    >
      <AiFillGoogleCircle className="w-6 h-6" />

      Continue With Google
    </button>
  );
}