import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigateFooter = useNavigate();
  return (
    <footer className="bg-slate-100  h-16 flex justify-center items-center relative bottom-0 w-full ">
      <span onClick={() => navigateFooter("/agradecimentos")} className="text-black font-bold text-md">@2022 Copyrigth</span>
    </footer>
  );
}