import Link from 'next/link';

export default function MainFooter() {
    return (
        <footer className="sticky top-0 z-50 w-full flex items-center justify-center px-10 h-15 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] bg-[#282c35] text-white border-t-2 border-white/50">
           <p className="text-xs">&copy; 2026 FILSTAR Real Estate Brokerage. All rights reserved.</p>
        </footer>
    )
}