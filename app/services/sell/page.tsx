import 'leaflet/dist/leaflet.css';
import WhyUs from '@/components/why-us/why-us';
import Form from '@/components/form/form';

export default function SellYourPropertyPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 flex flex-col justify-between font-sans">
      <main className="grow flex flex-col items-center justify-center px-4 py-8">
        
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
            Sell Your Property
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900">
            Book a Property Valuation
          </h1>
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Form/>
          <WhyUs />
        </div>

      </main>
    </div>
  );
}