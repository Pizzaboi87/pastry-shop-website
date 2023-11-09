import GooglePayButton from "@google-pay/button-react";
import { CartContext, UserContext } from "../context";
import { useContext } from "react";
import { byCountry } from "country-code-lookup";
import { usePayment } from "../utils/usePayment";
import { paymentFormStyle } from "../styles";

const GooglePay = () => {
  const { orderDetails } = useContext(CartContext);
  const { userLanguage } = useContext(UserContext);
  const { setPaymentSuccess } = usePayment();

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleGatewayMerchantId",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: import.meta.env.VITE_GOOGLE_PAY_ID,
      merchantName: "Le Ciel Sucré",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: orderDetails.amount.toString(),
      currencyCode: orderDetails.currency.name,
      countryCode: byCountry(orderDetails.country).iso2,
    },
    shippingAddressRequired: true,
    callbackIntents: ["PAYMENT_AUTHORIZATION"],
  };

  const onLoadPaymentData = (paymentRequest) => {
    setPaymentSuccess(true);
  };

  const onPaymentAuthorized = (paymentData) => {
    return { transactionState: "SUCCESS" };
  };

  return (
    <GooglePayButton
      environment="TEST"
      paymentRequest={paymentRequest}
      onLoadPaymentData={onLoadPaymentData}
      onPaymentAuthorized={onPaymentAuthorized}
      existingPaymentMethodRequired="false"
      buttonColor="black"
      buttonSizeMode="fill"
      buttonLocale={userLanguage.slice(0, 2).toLowerCase()}
      className={paymentFormStyle.googleButton}
    />
  );
};

export default GooglePay;
