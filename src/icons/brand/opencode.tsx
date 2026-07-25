import type { FC, SVGProps } from "react";

const OpenCodeIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 512 512" {...props}>
    <rect
      width="512"
      height="512"
      className="fill-[#FDFCFC] dark:fill-[#131010]"
    />
    <path
      d="M320 224V352H192V224H320Z"
      className="fill-[#E6E5E6] dark:fill-[#5A5858]"
    />
    <path
      className="fill-[#17181C] dark:fill-white"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M384 416H128V96H384V416ZM320 160H192V352H320V160Z"
    />
  </svg>
);

export default OpenCodeIcon;
