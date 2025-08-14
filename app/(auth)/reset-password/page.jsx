// app/reset-password/page.jsx
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage({ searchParams }) {
  const token = searchParams.token || "";
  return <ResetPasswordForm token={token} />;
}
