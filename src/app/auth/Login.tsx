import Logo from "../../../public/assets/Logo";
import LogoCCHub from "../../../public/assets/LogoCcHub";
import LoginForm from "../../components/forms/LoginForm";

export default function Login() {
  return (
    <div className="h-screen flex  lg:bg-[url(/assets/LoginBg.png)] bg-contain bg-right bg-no-repeat">
      <div className="grow flex flex-col items-center justify-between py-10">
        <div className="mt-10">
          <Logo />
        </div>
        <div className="w-full max-w-xl px-10 lg:bg-white/95 bg-slate-50/95 rounded-2xl p-20">
          <LoginForm />
        </div>
        <div className="flex gap-2 text-sm mb-5">
          Powered by
          <LogoCCHub />
        </div>
      </div>
      <div className="hidden lg:basis-1/2 lg:flex flex-col-reverse items-center">
        <div className="flex flex-col gap-2 mb-10 w-full max-w-80">
          <span className="text-white text-lg font-bold">
            Serving Patients During a Pandemic
          </span>
          <span className="text-white text-xs leading-5">
            Delivering essential medication to NIMR patients with adherence to
            quality of service, care and confidentiality.
          </span>
        </div>
      </div>
    </div>
  );
}
