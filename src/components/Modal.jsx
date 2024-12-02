import React from "react";

const Modal = ({
  isOpen,
  onClose,
  product,
  cart,
  handleAddToCart,
  handleRemoveFromCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {" "}
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-xl relative z-60">
        {" "}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="flex flex-col items-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-64 w-64 object-contain mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
          <p className="text-gray-600 my-4 text-center">
            {product.description}
          </p>
          <div className="text-lg font-semibold text-gray-700">
            Price: ${product.price}
          </div>

          {cart[product.id] ? (
            <div className="mt-4 flex justify-center items-center gap-4">
              <button
                onClick={() => handleRemoveFromCart(product)}
                className="text-xl bg-gray-700 text-white rounded-full px-3 py-1"
              >
                -
              </button>
              <div className="text-lg font-semibold text-black">
                {cart[product.id]}
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="text-xl bg-gray-700 text-white rounded-full px-3 py-1"
              >
                +
              </button>
            </div>
          ) : (
            <div className="mt-4 flex justify-center items-center gap-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Add to Cart
              </button>
            </div>
          )}

          <div className="mt-4 flex justify-center items-center gap-2">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
