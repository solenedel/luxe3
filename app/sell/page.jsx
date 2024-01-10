export default function SellPage() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-3xl font-semibold self-center mb-12">
        Selling on our platform
      </h1>
      <aside className=" mb-20 text-xl bg-gradient-to-br from-blue-300 to-pink-300 px-14 py-10 rounded-md shadow-lg">
        Please read all the information on this page. Once you have read this,
        you can get started with Step 1 by filling in the Request to Send Form.
      </aside>
      <section>
        <ul className="text-xl flex flex-col gap-y-8">
          <li>
            <span className="text-2xl font-semibold mr-2 text-pink-800">
              Step 1:
            </span>
            Fill out this form with details and photos for the item you want to
            sell. We will get back to you with an initial approval or denial. If
            the bag is clearly inauthentic based on the photos you sent, we will
            deny the item from our platform.
          </li>
          <li>
            <span className="text-2xl font-semibold mr-2 text-pink-800">
              Step 2:
            </span>
            If we accept your initial request and the item seems authentic, we
            will allow you to send the item to our warehouse. We will contact
            you when the item has been received by us.
          </li>
          <li>
            <span className="text-2xl font-semibold mr-2 text-pink-800">
              Step 3:
            </span>
            We will use a third-party authentication service (not affiliated
            with our platform) to provide a final authentication of the item in
            person. If the item is inauthentic, we will send it back to you. If
            authentic, we will store it in our warehouse.
          </li>
          <li>
            <span className="text-2xl font-semibold mr-2 text-pink-800">
              Step 4:
            </span>
            We will create an NFT as a digital twin of the item and set the
            price within a range recommended by our authentication service. Your
            Wallet Address used to login to the service will be set as the
            initial owner of the NFT. You can at any time change the status of
            the NFT from &quot;for sale&quot; to &quot;not for sale&quot;.
          </li>
          <li>
            <span className="text-2xl font-semibold mr-2 text-pink-800">
              Step 5:
            </span>
            If/when someone purchases the NFT of your item, we will send them
            the physical item from our warehouse. The payment in ETH will be
            temporarily held by our platform until the buyer has received the
            physical item.
          </li>
          <li>
            <span className="text-2xl font-semibold mr-2 text-pink-800">
              Step 6:
            </span>
            Once the buyer has confirmed they have received the item, we will
            transfer the NFT ownership to the buyer. At the same time, we will
            unlock the funds and transfer 95% of the sale price to you (the
            seller). As per our policy, the platform receives 5% of the sale
            price.
          </li>
          <li>
            <span className="text-2xl font-semibold mr-2 text-pink-800">
              Step 7:
            </span>
            By default, the NFT will be marked as &quot;not for sale&quot; on
            our marketplace. The new owner can choose to mark it as &quot;for
            sale&quot; if they wish to re-sell in the future.
          </li>
        </ul>
      </section>
      <aside className="mt-28 ">
        <h3 className="text-2xl font-semibold text-gray-900 mb-5">
          Important points
        </h3>
        <ul className="text-xl flex flex-col gap-y-5 bg-gradient-to-br from-blue-300 to-pink-300 px-14 py-10 rounded-md shadow-xl">
          <li>
            ▶ The third-party authenticator will suggest a price range at which
            to sell the item. When you agree to sell on our platform, you agree
            that the sale price of the NFT must be within this certain range.
          </li>
          <li>
            ▶ An NFT listed on our platform will either have the status FOR
            SALE, NOT FOR SALE, or ON HOLD. This status can be changed by the
            seller any time, as long as there is no pending purchase/shipping at
            that point in time.
          </li>
          <li>
            ▶ Items listed as NOT FOR SALE and ON HOLD are still visible on the
            platform.
          </li>
          <li>
            ▶ Once in our warehouse, you may have the item returned to you at
            any point as long as there is no pending purchase/shipping at that
            point in time. If you wish to have the item returned, you must first
            mark the NFT as NOT FOR SALE. Returns from our warehouse once
            authenticated will be at your expense.
          </li>
        </ul>
      </aside>
    </main>
  );
}
