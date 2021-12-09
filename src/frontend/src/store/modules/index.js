import auth from "@/store/auth";
import builder from "@/store/builder";
import cart from "@/store/cart";
import orders from "@/store/orders";
import address from "@/store/address";
import publicModule from "@/store/public";

export default {
  Auth: auth,
  Builder: builder,
  Cart: cart,
  Orders: orders,
  Address: address,
  Public: publicModule,
};
