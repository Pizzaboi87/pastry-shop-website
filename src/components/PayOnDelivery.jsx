import { useContext } from "react";
import { CartContext, UserContext } from "../context";
import { usePayment } from "../utils/usePayment";
import { Theme_Button, deliveryStyle, paymentFormStyle } from "../styles";

const PayOnDelivery = () => {
  const { text, userLanguage } = useContext(UserContext);
  const { orderDetails } = useContext(CartContext);
  const { setLoading, handleError, handleSuccess } = usePayment();

  const testFunction = () => {
    setLoading(true);
    setTimeout(() => {
      handleSuccess();
    }, 3000);
  };

  const {
    fullName,
    address,
    city,
    zipCode,
    country,
    phone,
    products,
    currency,
  } = orderDetails;

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

  const currencyCorr = (price) => {
    if (currency.name === "HUF") {
      return Math.ceil((price * currency.value) / 100) * 100;
    } else {
      return (price * currency.value).toFixed(1);
    }
  };

  return (
    <div className={deliveryStyle.wrapper}>
      <div className={deliveryStyle.container}>
        <h1 className={deliveryStyle.mainTitle}>{text.delivery.summary}</h1>

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
                    {`${(currencyCorr(item.product.price) * item.quantity)
                      .toFixed(currency.name == "HUF" ? 0 : 1)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${
                      currency.symbol
                    }`}
                  </p>
                  <hr className={deliveryStyle.border} />
                </span>
              );
            })}
          </div>
        </div>
        <h1 className={deliveryStyle.total}>{`${
          text.delivery.total
        } ${orderDetails.amount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}${
          orderDetails.currency.symbol
        }`}</h1>
      </div>
      <Theme_Button
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        className={paymentFormStyle.payButton}
        onClick={testFunction}
      >
        {text.payment.payNow}
      </Theme_Button>
    </div>
  );
};

export default PayOnDelivery;
