import { useContext } from "react";
import { CartContext, UserContext } from "../context";
import { usePayment } from "../utils/usePayment";
import { useCurrency } from "../utils/useCurrency";
import { Theme_Button, deliveryStyle, paymentFormStyle } from "../styles";

const PayOnDelivery = ({ oldOrder }) => {
  const { text, userLanguage } = useContext(UserContext);
  const { orderDetails } = useContext(CartContext);
  const { setPaymentInProgress, setPaymentSuccess } = usePayment();

  const makeOrder = () => {
    setPaymentInProgress(true);
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 3000);
  };

  const {
    amount,
    fullName,
    address,
    city,
    zipCode,
    country,
    phone,
    products,
    currency,
  } = oldOrder || orderDetails;

  const customer = [
    {
      title: text.delivery.name,
      value: fullName,
    },
    {
      title: text.delivery.address,
      value: address,
    },
    {
      title: text.delivery.city,
      value: zipCode + " " + city,
    },
    {
      title: text.delivery.country,
      value: country,
    },
    {
      title: text.delivery.phone,
      value: "+" + phone,
    },
  ];

  return (
    <div className={deliveryStyle.wrapper}>
      <div className={deliveryStyle.container}>
        {!oldOrder && (
          <h1 className={deliveryStyle.mainTitle}>{text.delivery.summary}</h1>
        )}

        <div className={deliveryStyle.detailsContainer}>
          <div className={deliveryStyle.addressContainer}>
            <h2 className={deliveryStyle.subTitle}>{text.delivery.delivery}</h2>

            <span className={deliveryStyle.span}>
              {customer.map((item) => {
                return (
                  <p className={deliveryStyle.text} key={item.title}>
                    <strong className={deliveryStyle.textBold}>
                      {item.title}{" "}
                    </strong>
                    {item.value}
                  </p>
                );
              })}
            </span>
          </div>

          <div className={deliveryStyle.orderContainer}>
            <h2 className={deliveryStyle.subTitle}>{text.delivery.order}</h2>

            {products.map((item) => {
              const { fullPrice } = useCurrency(
                item.product.price,
                item.quantity
              );
              return (
                <span
                  className={deliveryStyle.span}
                  key={item.product.name[userLanguage]}
                >
                  <p className={deliveryStyle.text}>
                    <strong className={deliveryStyle.textBold}>
                      {text.delivery.product}{" "}
                    </strong>
                    {item.product.name[userLanguage]}
                  </p>
                  <p className={deliveryStyle.text}>
                    <strong className={deliveryStyle.textBold}>
                      {text.delivery.quantity}{" "}
                    </strong>
                    {item.quantity}
                  </p>
                  <p className={deliveryStyle.text}>
                    <strong className={deliveryStyle.textBold}>
                      {text.delivery.price}{" "}
                    </strong>
                    {`${fullPrice} ${currency.symbol}`}
                  </p>
                  <hr className={deliveryStyle.border} />
                </span>
              );
            })}
          </div>
          <span className={deliveryStyle.total}>
            {oldOrder && (
              <button className="p-2 rounded-xl bg-orange-500">
                Order Again
              </button>
            )}
            <h1 className={!oldOrder ? deliveryStyle.onlyTotal : null}>{`${
              text.delivery.total
            } ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}${
              currency.symbol
            }`}</h1>
          </span>
        </div>
      </div>
      {!oldOrder && (
        <Theme_Button
          $bgcolor="logo"
          $textcolor="textlight"
          $bordercolor="transparent"
          $hoverbgcolor="dark"
          $hovertextcolor="textlight"
          className={paymentFormStyle.payButton}
          onClick={makeOrder}
        >
          {text.payment.payNow}
        </Theme_Button>
      )}
    </div>
  );
};

export default PayOnDelivery;
