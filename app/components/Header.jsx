import { Inter, DM_Serif_Display, Golos_Text } from 'next/font/google';

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
});

function Header() {
  return (
    <header className="flex px-10 py-8 flex justify-center bg-blue-950">
      <h1
        className={dmSerifDisplay.className}
        style={{ fontSize: '40px', color: '#f1e4ff', letterSpacing: '3px' }}>
        {' '}
        Forever.Luxe
      </h1>
    </header>
  );
}

export default Header;
