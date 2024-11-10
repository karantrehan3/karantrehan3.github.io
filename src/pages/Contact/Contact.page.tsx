import { Header } from "@/components/Header/Header";
import config from "@/utils/Config";

export function ContactPage() {
  return (
    <>
      <Header />
      <iframe
        title="Connect on Calendar"
        src={config.get("CONTACT.CALENDAR.LINK")}
        style={{ border: 0 }}
        width="100%"
        height="600"
        frameborder="0"
      />
    </>
  );
}
