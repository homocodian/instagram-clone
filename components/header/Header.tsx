import Left from "./Left";
import Middle from "./Middle";
import Right from "./Right";
function Header() {
  return (
    <header className="bg-white border-b">
      <div className="flex justify-between max-w-5xl px-2 lg:px-0 py-3 mx-auto">
        {/* left section header */}
        <Left />
        {/* middle section header */}
        <Middle />
        {/* right section header */}
        <Right />
      </div>
    </header>
  );
}

export default Header;
