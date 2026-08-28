import { Booking } from "@/components/booking";
import {
  Details,
  Hero,
  Services,
  Shop,
  TrustStrip,
  Visit,
} from "@/components/sections";
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
        <Booking />
        <Shop />
        <Details />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
