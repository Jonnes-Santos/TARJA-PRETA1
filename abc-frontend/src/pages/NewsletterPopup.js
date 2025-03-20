import React, { useState } from 'react';
import Modal from 'react-modal';

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => setIsOpen(false);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Newsletter Popup"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-2xl font-bold mb-4">Assine nossa newsletter</h2>
      <form className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Seu e-mail"
          className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Assinar
        </button>
      </form>
      <button
        onClick={closeModal}
        className="mt-4 text-gray-500 hover:text-gray-700"
      >
        Fechar
      </button>
    </Modal>
  );
};

export default NewsletterPopup;