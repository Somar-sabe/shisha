// pages/dashboard/orders/view/order-view.js
import { useRouter } from 'next/router';

const OrderView = () => {
  const router = useRouter();
  const { orderId } = router.query; // Get the query parameter from the URL

  if (!orderId) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order ID: {orderId}</h1>
    </div>
  );
};

export default OrderView;
