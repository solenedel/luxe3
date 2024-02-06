function Modal({ showModal, setShowModal }) {
  return (
    <section className="fixed inset-0 z-50 bg-black text-white w-full h-full overflow-auto">
      modal here!!!
      <button onClick={() => setShowModal(!showModal)}>close modal</button>
    </section>
  );
}

export default Modal;
