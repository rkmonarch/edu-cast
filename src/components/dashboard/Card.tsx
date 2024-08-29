import Image from "next/image";
import Link from "next/link";

type CardProps = {
  heading: string;
  title: string;
  img: string;
  link: string;
  color: string;
  style: string;
};

export const Card = ({
  heading,
  title,
  img,
  link,
  color,
  style,
}: CardProps) => {
  return (
    <div className="w-[90%] md:w-1/3 flex flex-col">
      <h1 className="text-neutral-600 font-bold text-sm pl-5 pb-3 dark:text-sky-100">
        {heading}
      </h1>
      <Link
        href={link}
        className={`flex items-center rounded-[30px] overflow-hidden shadow-lg  min-h-[100px] md:min-h-[150px] ${color}`}
      >
        <div className="px-6 py-4">
          <div className={`font-extrabold text-xl mb-2 text-center ${style}`}>
            {title}
          </div>
        </div>
        <div className="flex mx-auto justify-center w-[100%]">
          <Image
            src={img}
            width="100"
            height="100"
            alt="Icon"
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 duration-300"
          />
        </div>
      </Link>
    </div>
  );
};
