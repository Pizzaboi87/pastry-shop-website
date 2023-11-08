import GooglePayButton from "@google-pay/button-react";
import { CartContext } from "../context";
import { useContext } from "react";
import { byCountry } from "country-code-lookup";

const GooglePay = () => {
  const { orderDetails } = useContext(CartContext);

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
    console.log("load payment data", paymentRequest);
  };

  const onPaymentAuthorized = (paymentData) => {
    console.log("payment authorized", paymentData);
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
      className="w-full"
    />
  );
};

export default GooglePay;
