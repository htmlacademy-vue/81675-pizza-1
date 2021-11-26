import jwtService from "@/services/jwtService";

export default function isLoggedIn({ next }) {
  const hasToken = !!jwtService.getToken();
  hasToken ? next() : next({ name: "Index" });
}
