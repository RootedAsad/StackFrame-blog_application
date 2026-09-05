import { AiFillGoogleCircle } from "react-icons/ai";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { app } from "../firebase";
import { BASE_URL } from "../config";
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
      const resultFromGoogle = await signInWithPopup(
        auth,
        provider
      );

      const res = await fetch(BASE_URL + "/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          photo: resultFromGoogle.user.photoURL,
        }),
      });

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
      className="
        group
        flex
        h-[58px]
        w-full
        items-center
        justify-center
        gap-3
        rounded-full
        border
        border-gray-200
        bg-white
        px-5
        text-[16px]
        font-semibold
        text-gray-700
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-teal-300
        hover:bg-teal-50
        hover:text-gray-900
        hover:shadow-[0_10px_25px_rgba(20,184,166,0.16)]
        active:translate-y-0
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-teal-500
        focus-visible:outline-offset-2
        dark:border-gray-700
        dark:bg-white/[0.04]
        dark:text-gray-200
        dark:hover:border-teal-700
        dark:hover:bg-teal-950/30
        dark:hover:text-white
        motion-reduce:transform-none
      "
      style={{
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <AiFillGoogleCircle
        className="
          h-7
          w-7
          shrink-0
          text-[#4285F4]
          transition-transform
          duration-300
          group-hover:scale-110
          motion-reduce:transform-none
        "
        aria-hidden="true"
      />

      <span>Continue With Google</span>
    </button>
  );
}