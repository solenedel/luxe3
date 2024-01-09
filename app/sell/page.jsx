export default function SellPage() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-3xl font-semibold self-center mb-12">Sell an item</h1>
      <section>
        {/* <h2>How do I sell on the platform?</h2> */}
        <ul className="text-xl flex flex-col gap-y-8">
          <li>
            <span className="text-2xl font-semibold mr-4 text-pink-800">
              Step 1:
            </span>
            Fill out this form with details and photos for the item you want to
            sell. We will get back to you with an initial approval or denial. If
            the bag is clearly inauthentic based on the photos you sent, we will
            deny the item from our platform.
          </li>
          <li>
            <span className="text-2xl font-semibold mr-4 text-pink-800">
              Step 2:
            </span>
            If we accept your initial request and the item seems authentic, we
            will allow you to send the item to our warehouse. We will contact
            you when the item has been received by us.
          </li>
          <li>
            <span className="text-2xl font-semibold mr-4 text-pink-800">
              Step 3:
            </span>
            We will use a third-party authentication service (not affiliated
            with our platform) to provide a final authentication of the item in
            person. If the item is inauthentic, we will send it back to you. If
            authentic, we will store it in our warehouse.
          </li>
          <li>
            <span className="text-2xl font-semibold mr-4 text-pink-800">
              Step 4:
            </span>
            We will create an NFT as a digital twin of the item and set the
            price within a range recommended by our authentication service. Your
            Wallet Address used to login to the service will be set as the
            initial owner of the NFT.
          </li>
        </ul>
      </section>
      <aside className="mt-12">
        <h3 className="text-2xl font-semibold text-blue-800">Notes</h3>
        <ul>
          <li>
            If for some reason you wish to have the item returned to you before.
            also what price is decided.
          </li>
          <li>
            When authenticated by a third-party expert, they will suggest a
            price range at which to sell the item. When you agree to sell on our
            platform, you agree that the sale price of the NFT will be within a
            certain range.
          </li>
        </ul>
      </aside>
    </main>
  );
}
