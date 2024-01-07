import Image from 'next/image';
function Header() {
  const links = ['Collections', 'Sell', 'About', 'Sign in'];

  return (
    <header className=" flex flex-col items-center bg-black pt-5">
      <Image
        className="opacity-70"
        src="/images/logo-2.png"
        alt="logo"
        width="180"
        height="70"
      />
      <h1 className="text-4xl text-white font-bold tracking-wider mb-5 z-10 relative bottom-20">
        {' '}
        FOREVER LUXE
      </h1>
      <nav className="w-full border-t tracking-wide text-white border-b font-semibold border-white flex gap-x-20 text-2xl py-4 justify-center">
        {links.map((link) => (
          <a
            key={link}
            href=""
            className="hover:text-pink-400 hover:scale-105 ">
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;
