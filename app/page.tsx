import {
  Book,
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
        <Book />
        <Shop />
        <Details />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
