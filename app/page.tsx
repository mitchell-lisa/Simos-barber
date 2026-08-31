import {
  Book,
  Details,
  Hero,
  Services,
  Shop,
  TrustStrip,
  Visit,
} from "@/components/sections";
import { BookingDialog } from "@/components/booking-dialog";
import { business } from "@/lib/business";
import { Footer, Header, PreviewNotice } from "@/components/site";

export default function Page() {
  return (
    <>
      <PreviewNotice />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Book />
        <Shop />
        <Details />
        <Visit />
      </main>
      <Footer />
      {business.booking.embedHtml && (
        <BookingDialog html={business.booking.embedHtml} />
      )}
    </>
  );
}
