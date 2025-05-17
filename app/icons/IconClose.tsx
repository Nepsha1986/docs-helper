import type { SVGProps } from "react";

const IconClose = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
        </svg>
    )
}

export default IconClose;
