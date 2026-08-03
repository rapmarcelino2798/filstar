import Link from 'next/link';
import { getPropertiesById } from '@/src/data/properties';
import InquiryForm from '@/components/inquiry-form/inquiry-form';

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params directly instead of using React's use() hook
  const resolvedParams = await params;
  const property = await getPropertiesById(resolvedParams.id);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#fafaf9] text-gray-800 overscroll-y-none">
      {/* Main Content */}
      <main className="flex-grow py-12 px-6 sm:px-8 max-w-6xl mx-auto w-full space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-2">
          <Link href="/properties" className="hover:text-amber-700 transition-colors">Properties</Link>
          <span>/</span>
          <span className="text-gray-700">{property.title}</span>
        </div>

        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <span className="bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {property.tag}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-gray-900 mt-3 tracking-tight uppercase">
              {property.title}
            </h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
              📍 {property.location}
            </p>
          </div>
          <div className="text-3xl font-serif font-semibold text-[#b45309]">
            {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
              maximumFractionDigits: 0,
            }).format(Number(property.price))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 h-[340px] sm:h-[420px] rounded-2xl overflow-hidden shadow-sm bg-gray-100">
            <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 h-[340px] sm:h-[420px]">
            <div className="h-full rounded-2xl overflow-hidden shadow-sm bg-gray-100">
              <img src={property.images[1]} alt="Interior view" className="w-full h-full object-cover" />
            </div>
            <div className="h-full rounded-2xl overflow-hidden shadow-sm bg-gray-100">
              <img src={property.images[2]} alt="Additional view" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Details & Inquiry Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Description & Specifications */}
          <div className="lg:col-span-2 space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">Property Overview</h2>
              <div 
                className="text-gray-600 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: property.description }} 
              />
            </div>

           
          </div>

          {/* Right Column: Contact/Inquiry Card */}
          <InquiryForm />
        </div>
      </main>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100">
      <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold">{label}</span>
      <span className="block text-sm font-semibold text-gray-900 mt-1">{value}</span>
    </div>
  );
}