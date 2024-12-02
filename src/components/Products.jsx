import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Modal from "./Modal";
import Stars from "./Stars";
import CartModal from "./Cart";

const API_URL = "https://fakestoreapi.com";

const Products = () => {
  const [data, setData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setData(response.data);
    } catch (error) {
      setError("Mahsulotlarni olishda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: (prevCart[product.id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => {
      if (prevCart[product.id] > 1) {
        return {
          ...prevCart,
          [product.id]: prevCart[product.id] - 1,
        };
      }
      const newCart = { ...prevCart };
      delete newCart[product.id];
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const totalItems = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () =>
      Object.entries(cart).reduce((sum, [id, qty]) => {
        const product = data?.find((prod) => prod.id === parseInt(id));
        return sum + (product ? product.price * qty : 0);
      }, 0),
    [cart, data]
  );

  const productItem = data?.map((pro) => (
    <div
      key={pro.id}
      onClick={() => openModal(pro)}
      className="h-[386px] flex flex-col justify-between shadow-lg border border-gray-300 rounded-lg p-4 text-center bg-sky-100 cursor-pointer hover:shadow-2xl hover:bg-sky-200 transition-all duration-300 hover:scale-105"
    >
      <div className="bg-white rounded-lg overflow-hidden h-[180px] flex items-center justify-center">
        <img
          src={pro.image}
          alt={pro.title}
          className="h-full w-auto max-h-[150px] object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold mt-4 mb-2 overflow-hidden text-ellipsis whitespace-nowrap mx-auto max-w-[80%]">
        {pro.title}
      </h3>
      <div className="flex justify-center items-center mb-2">
        <Stars rating={pro.rating.rate} />
        <div className="bg-yellow-400 text-black rounded-lg px-2 py-1 text-sm font-bold ml-2">
          {pro.rating.rate}
        </div>
      </div>
      <h3 className="text-lg font-bold mb-4">${pro.price}</h3>
  
      {cart[pro.id] ? (
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFromCart(pro);
            }}
            className="text-xl bg-gray-500 text-white rounded-full px-3 py-1"
          >
            -
          </button>
          <div className="text-lg font-semibold">{cart[pro.id]}</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(pro);
            }}
            className="text-xl bg-gray-500 text-white rounded-full px-3 py-1"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(pro);
          }}
          className="flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-400 to-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:from-cyan-500 hover:to-cyan-700 transition-all duration-300"
        >
          Add to cart
        </button>
      )}
    </div>
  ));
  
  return (
    <div className="bg-sky-50 text-black flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-sky-700">
        Explore Our Products
      </h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-6 mx-auto p-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {productItem}
        </div>
      </div>
      {selectedProduct && isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
          cart={cart}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      )}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={closeCartModal}
        cart={cart}
        data={data || []}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
      />
  
  <div className="fixed bottom-4 right-4 bg-slate-500 text-warmGray-50 p-4 rounded-lg shadow-lg w-60 z-50">
  <h2 className="text-xl font-semibold">Basket 🗑</h2>
  <div className="mt-2">
    <p className="text-sm">Products: {totalItems}</p>
    <p className="text-sm">Total: ${totalPrice.toFixed(2)}</p>
  </div>
  <button
    onClick={openCartModal}
    className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-800 w-full"
  >
    Go to cart
  </button>
  <button
    onClick={clearCart}
    className="mt-4 bg-indigo-400 text-white px-4 py-2 rounded hover:bg-pink-400 w-full"
  >
    Clear
  </button>
</div>

    </div>
  );
  
};

export default Products;
