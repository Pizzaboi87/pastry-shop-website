import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { paymentFormStyle } from "../styles";
import { useContext } from "react";
import { CartContext, UserContext } from "../context";
import { byCountry } from "country-code-lookup";

const PayPal = () => {
  const { orderDetails } = useContext(CartContext);
  const { userLanguage } = useContext(UserContext);

  const items = orderDetails.products.map((product) => {
    return {
      name: product.product.name[userLanguage],
      quantity: product.quantity.toString(),
      unit_amount: {
        currency_code: orderDetails.currency.name,
        value:
          orderDetails.currency.name == "HUF"
            ? (
                Math.ceil(
                  (product.product.price * orderDetails.currency.value) / 100
                ) * 100
              ).toString()
            : (product.product.price * orderDetails.currency.value)
                .toFixed(1)
                .toString(),
      },
    };
  });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: orderDetails.currency.name,
            value: orderDetails.amount.toString(),
            breakdown: {
              item_total: {
                currency_code: orderDetails.currency.name,
                value: orderDetails.amount.toString(),
              },
            },
          },
          items: items,
          shipping: {
            address: {
              address_line_1: orderDetails.address,
              address_line_2: "",
              admin_area_2: orderDetails.city,
              admin_area_1: "",
              postal_code: orderDetails.zipCode,
              country_code: byCountry(orderDetails.country).iso2,
            },
          },
        },
      ],
      application_context: {
        brand_name: "Le Ciel Sucré",
      },
    });
  };

  const onApprove = (data, actions) => {
    // Tranzakció jóváhagyása, kifizetési folyamat lebonyolítása
    return actions.order.capture().then(function (details) {
      // Tranzakció részleteinek feldolgozása
      // Például: sikeres fizetés üzenet megjelenítése a felhasználónak
    });
  };

  return (
    <div className={paymentFormStyle.paymentContainer}>
      <PayPalScriptProvider
        options={{
          "client-id": import.meta.env.VITE_PAYPAL_ID,
          currency: orderDetails.currency.name,
        }}
      >
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPal;
