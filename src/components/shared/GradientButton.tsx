import Link from "next/link";

interface IButton {
  label: string;
  href: string;
}

const GradientButton = ({ label, href }: IButton) => {
  return (
    <Link
      href={href}
      className="bg-gradient-to-br from-[#84f5ff] via-[#49d1fe] to-[#25b6fe] hover:from-[#84f5ff]/90 hover:to-[#25b6fe]/90 text-neutral-800 font-medium text-lg px-8 py-3 w-fit rounded-3xl"
    >
      {label}
    </Link>
  );
};

export default GradientButton;
