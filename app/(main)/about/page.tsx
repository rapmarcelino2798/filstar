import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { ShieldCheck, Target, Eye, Award, History, HeartHandshake } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col bg-[#FAF8F4] text-[#21252E] px-4 md:px-8 py-16 items-center">
      
      {/* Page Title Header */}
      <div className="w-full max-w-5xl flex flex-col items-center text-center mb-16">
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#c9a86a] uppercase mb-2">
          ESTABLISHED 2004
        </span>
        <h1 className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold text-[#21252E] tracking-tight mb-4`}>
          About Us
        </h1>
        <div className="w-20 h-1 bg-[#c9a86a] rounded-full" />
      </div>

      {/* Main Overview Section */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="flex flex-col space-y-6">
          <h2 className={`${playfair.className} text-3xl font-bold text-[#21252E]`}>
            Your Trusted Real Estate Partner
          </h2>
          <p className="text-[#6B7280] leading-relaxed text-sm sm:text-base">
            Filstar Real Estate Brokerage provides property acquisition, sale, and documentation services. We are your trusted real estate partner because we are a team of professionals committed to providing outstanding service and exceeding our client&apos;s expectations.
          </p>
          <p className="text-[#6B7280] leading-relaxed text-sm sm:text-base">
            At Filstar, we will assist you in purchasing your ideal dwelling and selling your property at a reasonable price. We do more than only sell and acquire homes; we also prioritize clients who wish to develop their money through property investment. We are dedicated to honesty, communication, and delivering the greatest results for our clients.
          </p>
        </div>
        <div className="p-8 bg-white border border-[#21252E]/10 rounded-3xl shadow-xl flex flex-col space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#c9a86a]/10 flex items-center justify-center text-[#c9a86a] mb-2">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className={`${playfair.className} text-xl font-bold text-[#21252E]`}>
            Our Commitment
          </h3>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Filstar Real Estate Brokerage offers documentation services for real estate transactions, including ownership transfers, extrajudicial settlements, due diligence, and more. Also, we will make certain that our clients are taken care of from the minute they inquire until the transaction is done.
          </p>
          <blockquote className="border-l-2 border-[#c9a86a] pl-4 italic text-xs text-[#21252E] mt-4">
            &ldquo;Allow us to assist you in finding your ideal house or selling your property at the greatest possible price.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Background & History Section */}
      <section className="w-full max-w-5xl bg-white border border-[#21252E]/10 rounded-3xl p-8 md:p-12 shadow-xl mb-20">
        <div className="flex items-center gap-3 mb-6 text-[#c9a86a]">
          <History className="w-7 h-7" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase">OUR STORY</span>
        </div>
        <h2 className={`${playfair.className} text-3xl font-bold text-[#21252E] mb-6`}>
          How Filstar Began
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#6B7280] leading-relaxed">
          <p>
            Filstar Real Estate Brokerage began in 2004 when the owner, Mr. Feliciano B. Tare, requested accreditation with Ayala Land; however, one of Ayala Land&apos;s prerequisites is a DTI permit. So, without knowing what his business name would be, Mr. Feliciano proceeded to the DTI office to obtain the permit. When filling out a form, he came up with the idea of utilizing his name.
          </p>
          <p>
            Thus, <strong className="text-[#21252E]">Fil</strong> derived from his first name FELiciano, and <strong className="text-[#21252E]">Tar</strong> from TARE and combined them to form <strong className="text-[#21252E]">FILSTAR</strong>, adding an S in the middle to make it more suitable. In 2009, he opened a physical office in Teresa Rizal and began selling acquired assets of the Bangko Sentral ng Pilipinas. After 5 years, he established a satellite office in Santa Rosa Laguna.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="p-8 bg-white text-white rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#c9a86a]/20 flex items-center justify-center text-[#c9a86a] mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className={`${playfair.className} text-2xl font-bold mb-4 text-[#c9a86a]`}>
              Our Mission
            </h3>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li className="flex items-start gap-2">
                <span className="text-[#c9a86a]">•</span> Let the client feel comfortable while the transaction is ongoing.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c9a86a]">•</span> Teach everyone the proper use of savings using investing, to give the best and highest quality of service to the client.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c9a86a]">•</span> Help clients propose or suggest the most likely preference regarding their needs and wants in a property.
              </li>
            </ul>
          </div>
        </div>

        <div className="p-8 bg-white text-white rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#c9a86a]/20 flex items-center justify-center text-[#c9a86a] mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className={`${playfair.className} text-2xl font-bold mb-4 text-[#c9a86a]`}>
              Our Vision
            </h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Filstar Real Estate Brokerage is dedicated to making an impression on both current and potential clients with our real estate services so that everyone we interact with will be happy and proud, and enthusiastically refer us to their friends, family, and coworkers. Our clients deserve excellent service and value, which is why we strive to be the top realtors in the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Founder / Broker Profile Section */}
      <section className="w-full max-w-5xl bg-white border border-[#21252E]/10 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-10 items-center">
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 shrink-0 rounded-full overflow-hidden border-4 border-[#c9a86a]/40 shadow-md">
          {/* Replace src with your founder image path if hosted in public folder */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 shrink-0 rounded-full overflow-hidden border-4 border-[#c9a86a]/40 shadow-md">
                <img 
                    src="/founder2.jpg" 
                    alt="Mr. Feliciano B. Tare" 
                    className="w-full h-full object-cover" 
                />
            </div>
        </div>
        <div className="flex flex-col space-y-4 text-center md:text-left">
          <span className="text-xs font-semibold tracking-widest text-[#c9a86a] uppercase">
            FOUNDER & LEAD PROFESSIONAL
          </span>
          <h3 className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#21252E]`}>
            Mr. Feliciano B. Tare
          </h3>
          <p className="text-xs font-medium text-[#21252E]/70">
            License Broker • Owner of Filstar Real Estate Brokerage
          </p>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Mr. Feliciano B. Tare worked at V.V. Soliven Group of Companies from 1997 to 2010 as a building permit and developing permit in charge. A true working student, he studied at Jose Rizal University taking a Bachelor of Science in Accountancy. While working and studying, he took a review in the Real Estate Course (when real estate was under DTI) and successfully passed the real estate broker exam in 2003.
          </p>
        </div>
      </section>

    </div>
  );
}