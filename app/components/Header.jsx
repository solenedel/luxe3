import { Inter, DM_Serif_Display, Golos_Text } from 'next/font/google';

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
});

function Header() {
  return (
    <header className="flex px-10 py-5 flex justify-center">
      <h1
        className={dmSerifDisplay.className}
        style={{ fontSize: '40px', color: '#ff6b6b', letterSpacing: '3px' }}>
        {' '}
        Forever.Luxe
      </h1>
    </header>
  );
}

export default Header;
