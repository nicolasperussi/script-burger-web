import NavLink from "./nav-link";
import { ChevronDown, LogOut, SunMoon } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { toggleDarkMode } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function Header() {
  return (
    <header className="w-full h-14 border-b border-border">
      <div className="container flex h-14 max-w-screen-2xl items-center gap-8">
        <div className="flex gap-4 items-center">
          <svg
            className="size-8 fill-foreground transition-colors duration-150 delay-0"
            width="800px"
            height="800px"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M412.717,89.012c-35.578-20.985-82.545-32.541-132.246-32.541H239.529c-49.7,0-96.668,11.556-132.246,32.541C69.054,111.56,48,142.453,48,176v16H472V176C472,142.453,450.946,111.56,412.717,89.012ZM82.8,160c14.153-40.121,80.185-71.529,156.731-71.529h40.942c76.546,0,142.578,31.408,156.731,71.529Z" />
            <rect width="424" height="32" x="48" y="304" />
            <path d="M387.2,224.039c-24.785,0-37.77,6.125-49.227,11.529-10.034,4.733-17.96,8.471-35.576,8.471s-25.54-3.738-35.574-8.471c-11.456-5.4-24.441-11.529-49.225-11.529s-37.769,6.125-49.225,11.529c-10.033,4.733-17.957,8.471-35.572,8.471s-25.54-3.738-35.573-8.471c-11.456-5.4-24.441-11.529-49.225-11.529v32c17.615,0,25.54,3.738,35.573,8.471,11.456,5.4,24.441,11.529,49.225,11.529s37.768-6.125,49.224-11.529c10.033-4.733,17.958-8.471,35.573-8.471s25.54,3.738,35.573,8.471c11.457,5.4,24.441,11.529,49.226,11.529s37.77-6.125,49.227-11.529c10.034-4.733,17.959-8.471,35.576-8.471s25.542,3.738,35.576,8.471c11.457,5.4,24.442,11.529,49.227,11.529v-32c-17.617,0-25.542-3.738-35.576-8.471C424.967,230.164,411.982,224.039,387.2,224.039Z" />
            <path d="M48,448a24.028,24.028,0,0,0,24,24H448a24.028,24.028,0,0,0,24-24V368H48Zm32-48H440v40H80Z" />
          </svg>
          <h1 className="hidden font-bold sm:inline-block transition-colors duration-150 delay-0">
            Script Burger
          </h1>
        </div>
        <nav className="flex gap-4 lg:gap-6 flex-1">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/orders">Pedidos</NavLink>
          <NavLink to="/products">Produtos</NavLink>
          <NavLink to="/chat">Mensagens</NavLink>
          <NavLink to="/couriers">Entregadores</NavLink>
        </nav>
        <div className="flex gap-4">
          <Button onClick={toggleDarkMode} variant="ghost" size="icon">
            <SunMoon className="size-6" />

            {/* {isDarkMode() ? (
              <MoonStar className="size-4" />
            ) : (
              <SunIcon className="size-4" />
            )} */}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2 items-center cursor-pointer group outline-none">
              <Avatar className="group-hover:text-foreground/80 transition-colors duration-150 delay-0">
                <AvatarFallback>SB</AvatarFallback>
              </Avatar>
              <ChevronDown className="size-4 group-hover:text-foreground/80 transition-colors duration-150 delay-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Script Burger</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-red-400 cursor-pointer">
                <LogOut className="size-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
