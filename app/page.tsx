import { Booking } from "@/components/booking";
import {
  Details,
  Hero,
  OpeningStrip,
  Services,
  Shop,
  Visit,
} from "@/components/sections";
import { Footer, Header, PreviewBanner, StickyBar } from "@/components/site";

export default function Page() {
  return (
    <>
      <PreviewBanner />
      <Header />
      <main className="grain relative">
        <Hero />
        <Booking />
        <OpeningStrip />
        <Shop />
        <Services />
        <Details />
        <Visit />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
