import Left from "./Left";
import Middle from "./Middle";
import Right from "./Right";

function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-20">
      <div className="flex justify-between max-w-5xl px-2 py-3 mx-auto">
        <Left />
        <Middle />
        <Right />
      </div>
    </header>
  );
}

export default Header;
