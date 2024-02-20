function Footer() {
  return (
    <footer className="mt-20 py-4 flex px-10 text-gray-900 justify-between relative bottom-0 w-full">
      <h1 className="tracking-wider font-semibold tracking-wider text-2xl">
        Luxe³
      </h1>
      <div>
        <p>contact@luxe2marketplace.io</p>
      </div>
      <span className="text-lg">© {new Date().getFullYear()} Luxe³, Inc.</span>
    </footer>
  );
}

export default Footer;
