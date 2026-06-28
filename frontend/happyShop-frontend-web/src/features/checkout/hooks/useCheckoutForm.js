import { useState, useCallback } from "react";
import { createOrder } from "../../cart/services/cartApi";

const INITIAL_RECIPIENT = {
  name: "",
  phone: "",
  city: "台北市",
  district: "",
  zipCode: "",
  address: "",
  saveInfo: false,
};

const INITIAL_CREDIT_CARD = {
  cardNumber: "",
  expiry: "",
  cvv: "",
  holderName: "",
};

const INITIAL_INVOICE = {
  ownerType: "personal",
  type: "electronic",
  companyName: "",
  taxId: "",
  mobileBarcode: "",
};

export default function useCheckoutForm({ items = [], onSuccess } = {}) {
  const [shippingMethod, setShippingMethod] = useState("blackCat");
  const [recipient, setRecipient] = useState(INITIAL_RECIPIENT);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [creditCard, setCreditCard] = useState(INITIAL_CREDIT_CARD);
  const [invoice, setInvoice] = useState(INITIAL_INVOICE);
  const [remark, setRemark] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const updateRecipient = useCallback((field, value) => {
    setRecipient((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateCreditCard = useCallback((field, value) => {
    setCreditCard((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateInvoice = useCallback((field, value) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  }, []);

  const buildPayload = useCallback(() => {
    const payload = {
      shippingMethod,
      recipient: {
        name: recipient.name,
        phone: recipient.phone,
        city: recipient.city,
        district: recipient.district,
        zipCode: recipient.zipCode,
        address: recipient.address,
      },
      paymentMethod,
      invoice: {
        ownerType: invoice.ownerType,
        type: invoice.type,
      },
      remark,
      items: items.map((item) => ({
        productId: item.productId ?? item.id,
        quantity: item.quantity,
      })),
    };

    if (paymentMethod === "creditCard") {
      payload.creditCard = { ...creditCard };
    }

    if (invoice.ownerType === "business") {
      payload.invoice.companyName = invoice.companyName;
      payload.invoice.taxId = invoice.taxId;
    }

    if (invoice.type === "mobileBarcode") {
      payload.invoice.mobileBarcode = invoice.mobileBarcode;
    }

    return payload;
  }, [
    shippingMethod,
    recipient,
    paymentMethod,
    creditCard,
    invoice,
    remark,
    items,
  ]);

  const handleSubmit = useCallback(async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const data = buildPayload();
      const result = await createOrder({ data });
      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [buildPayload, onSuccess]);

  return {
    shippingMethod,
    setShippingMethod,
    recipient,
    updateRecipient,
    paymentMethod,
    setPaymentMethod,
    creditCard,
    updateCreditCard,
    invoice,
    updateInvoice,
    remark,
    setRemark,
    isSubmitting,
    error,
    handleSubmit,
  };
}
