import { Link, LinkProps, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface NavLinkProps extends LinkProps {
  active?: boolean;
}

function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname === props.to;

  return (
    <Link
      {...props}
      className={twMerge(
        "text-sm hover:text-foreground/80 cursor-pointer transition-colors duration-150 delay-0",
        isActive ? "text-foreground" : "text-foreground/50",
        props.className
      )}
    />
  );
}

export default NavLink;
