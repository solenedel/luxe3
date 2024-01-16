function ProfilePage() {
  return (
    <main className="flex flex-col items-center pt-16">
      <h1 className="text-2xl font-semibold">My Profile</h1>
      <aside>
        Pending actions: You have purchased ####. If you have received the
        physical item, please confirm reception so that the previous owner can
        receive their payment.
      </aside>
      <section>
        <h2>My items</h2>
        <h2>Starred items / wishlist</h2>
      </section>
    </main>
  );
}

export default ProfilePage;
