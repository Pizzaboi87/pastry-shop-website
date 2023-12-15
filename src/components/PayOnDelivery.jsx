import { useContext } from "react";
import { CartContext, UserContext } from "../context";
import { usePayment } from "../utils/usePayment";
import { useCurrency } from "../utils/useCurrency";
import { Theme_Button, deliveryStyle, paymentFormStyle } from "../styles";
import { useNavigate } from "react-router-dom";

const DetailSpan = ({ data }) => {
  return (
    <span className={deliveryStyle.span}>
      {data.map((item) => (
        <p className={deliveryStyle.text} key={item.title}>
          <strong className={deliveryStyle.textBold}>{item.title} </strong>
          {item.value}
        </p>
      ))}
      <hr className={deliveryStyle.border} />
    </span>
  );
};

const PayOnDelivery = ({ oldOrder, isAdminPage }) => {
  const { text, userLanguage } = useContext(UserContext);
  const { orderDetails, setCart } = useContext(CartContext);
  const { setPaymentInProgress, setPaymentSuccess } = usePayment();
  const navigate = useNavigate();

  const orderAgain = (order) => {
    setCart(order.products);
    navigate("/mycart");
  };

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

  return (
    <div className={deliveryStyle.wrapper}>
      <div className={deliveryStyle.container}>
        {!oldOrder && (
          <h1 className={deliveryStyle.mainTitle}>{text.delivery.summary}</h1>
        )}

        <div className={deliveryStyle.detailsContainer}>
          <div className={deliveryStyle.addressContainer}>
            {oldOrder && isAdminPage && (
              <div className={deliveryStyle.adminContainer}>
                <h2 className={deliveryStyle.subTitle}>
                  {text.orderPageTitle}
                </h2>
                <DetailSpan
                  data={[
                    {
                      title: text.delivery.orderId,
                      value: oldOrder.orderID,
                    },
                    {
                      title: text.delivery.orderTime,
                      value: oldOrder.orderTime.slice(0, 19),
                    },
                    {
                      title: text.delivery.paymentMethod,
                      value: oldOrder.paymentMethod,
                    },
                  ]}
                />
              </div>
            )}
            <h2 className={deliveryStyle.subTitle}>{text.delivery.delivery}</h2>
            <DetailSpan
              data={[
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
                  value: country[userLanguage],
                },
                {
                  title: text.delivery.phone,
                  value: "+" + phone,
                },
              ]}
            />
          </div>

          <div className={deliveryStyle.orderContainer}>
            <h2 className={deliveryStyle.subTitle}>{text.delivery.order}</h2>

            {products.map((item) => {
              const { fullPrice } = useCurrency(
                currency,
                item.product.price,
                item.quantity
              );

              return (
                <DetailSpan
                  key={item.product.name[userLanguage]}
                  data={[
                    {
                      title: text.delivery.product,
                      value: item.product.name[userLanguage],
                    },
                    {
                      title: text.delivery.quantity,
                      value: item.quantity,
                    },
                    {
                      title: text.delivery.price,
                      value: `${fullPrice} ${currency.symbol}`,
                    },
                  ]}
                />
              );
            })}
          </div>
          <span className={deliveryStyle.total}>
            {oldOrder && !isAdminPage && (
              <Theme_Button
                $bgcolor="logo"
                $textcolor="textlight"
                $bordercolor="transparent"
                $hoverbgcolor="dark"
                $hovertextcolor="textlight"
                className={deliveryStyle.orderAgain}
                onClick={() => orderAgain(oldOrder)}
              >
                {text.delivery.orderAgain}
              </Theme_Button>
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
