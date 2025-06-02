import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../pages/Context";
import Home from "../pages/Home";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components
const Container = styled.div`
  background: radial-gradient(circle at top left, #0f1115, #0a0c10);
  color: #f0f0f0;
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
`;

const Heading = styled.h3`
  text-align: center;
  padding: 30px;
  font-size: 2.8rem;
  color: #fff;
  text-shadow: 2px 2px 10px #00e0ff;
`;

const CartWrapper = styled.div`
  background: #1a1c22;
  border-radius: 18px;
  margin: 20px auto;
  padding: 30px;
  width: 90%;
  max-width: 1200px;
`;

const ProductCard = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  background: linear-gradient(135deg, #1c1f27, #262b37);
  border: 2px solid #00e0ff55;
  border-radius: 20px;
  margin-bottom: 25px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 255, 255, 0.2);
  transition: all 0.4s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 16px 30px rgba(0, 255, 255, 0.4);
  }
`;

const CardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Checkbox = styled(motion.label)`
  display: flex;
  align-items: center;
  cursor: pointer;

  input[type="checkbox"] {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    accent-color: #00e0ff;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 0 8px rgba(0, 255, 255, 0.3);

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 12px rgba(0, 255, 255, 0.6);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 150px;
  border-radius: 12px;
  object-fit: cover;
  transition: transform 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
`;

const ProductInfo = styled.div`
  flex: 1;
  padding-left: 20px;

  h4 {
    font-size: 2rem;
    background: linear-gradient(to right, #00e0ff, #00ffa1);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
 
  }

  .stock-status {
    font-weight: bold;
    margin-top: 5px;
    color: ${({ status }) => (status === "in-stock" ? "#00ffa1" : "#ff4e4e")};
  }

  p {
    color: #ccc;
  }

  .price {
    font-size: 1.6rem;
    color: #00ffa1;
    text-shadow: 0 0 5px #00ffa1;
    font-weight: bold;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0;

  button {
    background: transparent;
    color: #00e0ff;
    border: 1px solid #00e0ff;
    border-radius: 8px;
    padding: 4px 12px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: #00e0ff;
      color: #000;
    }
  }

  span {
    font-weight: 600;
    color: #fff;
    font-size: 1.1rem;
  }
`;

const Summary = styled.div`
  text-align: right;
  margin-top: 30px;

  h3,
  h5 {
    color: #00ffa1;
    text-shadow: 1px 1px 4px #00ffa1;
  }
`;

const CheckoutButton = styled(motion.button)`
  background-color: #00e0ff;
  color: #000;
  border: none;
  padding: 15px 40px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 12px;
  display: block;
  margin: 40px auto 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #00ffa1;
    transform: scale(1.1);
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  border: 1px solid #ff4e4e;
  color: #ff4e4e;
  padding: 6px 14px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff4e4e;
    color: #000;
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 78, 78, 0.6);
  }
`;

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const { settotalitem, settotalamount } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await axios.get(`
${process.env.REACT_APP_BACKEND_URL}/user/apicarts`, {
          withCredentials: true,
        });

        const updated = Array.isArray(res.data)
          ? res.data.map((item) => ({ ...item, quantity: 1 }))
          : [];
        setCarts(updated);

        if (Object.keys(selectedItems).length === 0) {
          const initialSelection = {};
          updated.forEach((item) => {
            initialSelection[item._id] = false;
          });
          setSelectedItems(initialSelection);
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    };

    fetchCarts();
  }, []);

  const handleDelete = async (index, id) => {
    try {
      await axios.post(
        `
${process.env.REACT_APP_BACKEND_URL}/user/deletecart`,
        { id },
        { withCredentials: true }
      );
      setCarts((prev) => prev.filter((_, i) => i !== index));
      const updatedSelection = { ...selectedItems };
      delete updatedSelection[id];
      setSelectedItems(updatedSelection);
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const changeQty = (index, type) => {
    const updated = carts.map((item, i) => {
      if (i === index) {
        const qty =
          type === "plus" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: qty };
      }
      return item;
    });
    setCarts(updated);
  };

  const toggleSelection = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectedCarts = carts.filter((item) => selectedItems[item._id]);
  const totalAmount = selectedCarts.reduce((sum, item) => {
    const price =
      item.limitedTimeDeal && item.discountPrice
        ? item.discountPrice
        : item.price;
    return sum + price * item.quantity;
  }, 0);
  const selectedItemCount = selectedCarts.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  useEffect(() => {
    const allCartQuantity = carts.reduce((sum, item) => sum + item.quantity, 0);
    settotalitem(allCartQuantity);
  }, [carts, settotalitem]);

  useEffect(() => {
    settotalamount(totalAmount);
  }, [totalAmount, settotalamount]);

  const handleCheckout = () => {
    const productNames = selectedCarts.map((item) => item.product);
    navigate("/payment", {
      state: { productname: productNames, select: selectedItemCount },
    });
  };

  return (
    <Container>
      <Home />
      <Heading>🛒 Shopping Cart</Heading>
      <CartWrapper>
        {carts.map((item, index) => (
          <ProductCard
            key={item._id}
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <CardLeft>
              <Checkbox
                initial={false}
                animate={{ scale: selectedItems[item._id] ? 1.2 : 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => toggleSelection(item._id)}
              >
                <input
                  type="checkbox"
                  checked={selectedItems[item._id] || false}
                  readOnly
                />
              </Checkbox>
              <Image
                src={`
${process.env.REACT_APP_BACKEND_URL}${item.image1}`}
                alt={item.product}
              />
            </CardLeft>

            <ProductInfo status={item.stockStatus}>
              <h4>{item.product}</h4>
              <p className="stock-status">{item.stockStatus}</p>
              <p>{item.description}</p>

              <p
                style={{
                  color: "#ff4e4e",
                  fontWeight: "bold",
                  marginTop: "8px",
                }}
              >
                🔥 Limited Time Deal!
              </p>
              <p style={{ color: "#35ac75", fontWeight: "bolder" }}>
                {item.discountPrice}
              </p>
              <QuantityControls>
                <button onClick={() => changeQty(index, "minus")}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => changeQty(index, "plus")}>+</button>
              </QuantityControls>

              <h4 className="price"style={{marginTop:"-50px"}}>
                ₹
                {item.limitedTimeDeal && item.discountPrice
                  ? item.quantity * item.discountPrice
                  : item.quantity * item.price}
                {item.limitedTimeDeal && item.discountPrice && (
                  <span
                    style={{
                      marginLeft: "12px",
                      textDecoration: "line-through",
                      fontSize: "1rem",
                      color: "#888",
                    }}
                  >
                    ₹{item.quantity * item.price}
                  </span>
                )}
              </h4>

              <DeleteButton onClick={() => handleDelete(index, item._id)}>
                🗑 Delete
              </DeleteButton>
            </ProductInfo>
          </ProductCard>
        ))}

        <Summary>
          <h3>Total Selected Amount: ₹{totalAmount}</h3>
          <h5>Total Selected Items: {selectedItemCount}</h5>
        </Summary>

        {selectedCarts.length > 0 ? (
          <CheckoutButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </CheckoutButton>
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem", color: "#aaa" }}>
            No items selected
          </p>
        )}
      </CartWrapper>
    </Container>
  );
}
