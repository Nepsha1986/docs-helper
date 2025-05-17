import type { SVGProps } from "react";

const ClipboardIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"/>
        </svg>
    )
}

export default ClipboardIcon;
