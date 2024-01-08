import Image from 'next/image';
function Header() {
  const links = ['Collections', 'Sell', 'About', 'Sign in'];

  return (
    <header className=" flex flex-col items-center bg-gray-950 pt-5 shadow-lg">
      <Image
        className="opacity-70"
        src="/images/logo-2.png"
        alt="logo"
        width="180"
        height="70"
      />
      <h1 className="text-4xl text-white font-bold tracking-wider mb-5 z-10 relative bottom-20">
        {' '}
        <a href="/"> FOREVER LUXE</a>
      </h1>
      <nav className="w-full border-t border-blue-100 tracking-wide text-white font-semibold flex gap-x-20 text-2xl py-4 justify-center">
        {links.map((link) => (
          <a
            key={link}
            href="/collections"
            className="text-pink-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-br hover:from-blue-400 hover:to-pink-400 hover:scale-105 ">
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;
