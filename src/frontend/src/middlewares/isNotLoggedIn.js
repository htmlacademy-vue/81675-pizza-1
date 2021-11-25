import jwtService from "@/services/jwtService";

export default function isNotLoggedIn({ next }) {
  const hasToken = !!jwtService.getToken();
  hasToken ? next({ name: "Profile" }) : next();
}
