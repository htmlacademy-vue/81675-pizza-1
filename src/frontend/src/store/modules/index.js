import auth from "@/store/modules/auth";
import builder from "@/store/modules/builder";
import cart from "@/store/modules/cart";
import orders from "@/store/modules/orders";
import address from "@/store/modules/address";
import publicModule from "@/store/modules/public";

export default {
  Auth: auth,
  Builder: builder,
  Cart: cart,
  Orders: orders,
  Address: address,
  Public: publicModule,
};
