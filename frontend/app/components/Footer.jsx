function Footer() {
  return (
    <footer className="mt-20 py-8 flex px-10 bg-gray-900/[0.8] text-gray-50 justify-between ">
      <h1 className="tracking-wider font-semibold tracking-wider text-2xl">
        Luxe²
      </h1>
      <div>
        <h4>Contact us</h4>
        <p>contact@luxe2marketplace.io</p>
      </div>
      <span className="text-lg">© {new Date().getFullYear()} Luxe², Inc.</span>
    </footer>
  );
}

export default Footer;
