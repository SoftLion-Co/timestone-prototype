import CardComponent from '@/components/CardComponent';
import WatchPhoto from '@/images/test-card-component/watch.png';

export default function Home() {
  return (
    <>
      <div className="mx-auto mt-20 flex justify-center items-center">
        <CardComponent
          case_color="black"
          country="USA"
          model="Molumenzeit S 7"
          photo_url={WatchPhoto}
          price={15.555}
          product_id="randomid12312"
          strap_color="white"
          type="Watch"
          case="316L Stainless-steel"
          case_size={42}
          dial_color="Black Metallic"
          coating="Color anodized anti-scratch"
          glass="Sapphire Crystal"
          instantaneus_rate="-10/ +20 sec/month"
          movement="Movement: Swiss Parts RONDA 762E"
          standard_battery_life="10 years"
          straps="Quick release"
          water_resistance="5 ATM/50 meters"
        />
      </div>
    </>
  );
}
