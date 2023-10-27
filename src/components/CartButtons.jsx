import { useContext } from "react";
import { Theme_Button, shop } from "../styles";
import { CartContext } from "../context";
import { Icon } from "@iconify/react";

export const CartButton = ({
  children,
  isPlusItem,
  product,
  extraClass,
  normalButton,
}) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <Theme_Button
      $bgcolor="logo"
      $textcolor="textlight"
      $bordercolor="transparent"
      $hoverbgcolor={normalButton ? null : "dark"}
      $hovertextcolor={normalButton ? null : "textlight"}
      className={`${shop.cardButton} ${extraClass}`}
      onClick={
        isPlusItem ? () => addToCart(product) : () => removeFromCart(product)
      }
    >
      {children}
    </Theme_Button>
  );
};

const CartButtons = ({ product }) => {
  const { cart } = useContext(CartContext);

  return (
    <div className={shop.buttonContainer}>
      <CartButton isPlusItem={false} product={product}>
        <Icon icon="carbon:shopping-cart-minus" className={shop.icon} />
      </CartButton>

      <CartButton normalButton extraClass="cursor-default">
        <p className={shop.quantity}>
          {cart.find((item) => item.product.id === product.id).quantity}
        </p>
      </CartButton>

      <CartButton isPlusItem product={product}>
        <Icon icon="carbon:shopping-cart-plus" className={shop.icon} />
      </CartButton>
    </div>
  );
};

export default CartButtons;
