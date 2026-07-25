import type { FC, SVGProps } from "react";

const PackagistIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="3" y="4" width="18" height="16" rx="3" fill="#F28D1A" />
    <path d="M7 8h5l3 4-3 4H7z" fill="#fff" />
  </svg>
);

export default PackagistIcon;
