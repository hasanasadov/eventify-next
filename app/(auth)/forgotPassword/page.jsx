import { forgotPasswordAction } from "@/actions/auth";
import ForgotForm from "./ForgotForm";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full p-6">
      <div className="text-2xl mb-4 relative font-extrabold">
        Forgot password
        <div className="absolute left-0 bottom-0 h-[3px] w-6 bg-cyan-500" />
      </div>
      <ForgotForm actionFn={forgotPasswordAction} />
    </div>
  );
}
