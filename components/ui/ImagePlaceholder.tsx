interface ImagePlaceholderProps {
    label: string;
    className?: string;
}

export function ImagePlaceholder({ label, className = "" }: ImagePlaceholderProps) {
    return (
        <div
            className={`bg-slate-200 border border-slate-300 flex items-center justify-center text-center ${className}`}
        >
            <div className="flex flex-col items-center gap-2 px-4">
                <svg
                    className="w-10 h-10 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                    />
                </svg>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {label}
                </span>
            </div>
        </div>
    );
}
