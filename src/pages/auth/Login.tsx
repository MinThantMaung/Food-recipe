import { LoginForm } from "@/components/auth/LoginForm";
import Banner from "../../data/images/foodBanner.jpeg"

function Login() {
  return (
    <div>
      <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center items-center w-full px-4">
          <LoginForm />
        </div>
        <div className="relative hidden lg:block">
          <img
            src={Banner}
            alt="Food Recipe"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </main>
    </div>
  );
}

export default Login;
