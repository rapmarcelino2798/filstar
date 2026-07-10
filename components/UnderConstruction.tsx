export default function UnderConstruction() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="mb-6 p-4 bg-yellow-500/10 rounded-full">
                <svg 
                    className="w-12 h-12 text-yellow-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-100 mb-3">
                Under Construction
            </h1>
            
            <p className="text-slate-400 max-w-md">
                This section is currently being built. Please check back later for updates.
            </p>
        </div>
    )
}