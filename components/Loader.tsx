import clsx from 'clsx';
import { Loader2Icon } from 'lucide-react';

interface RippleLoadingButtonProps {
    children?: React.ReactNode;
    className?: string;
    spinCircle?:boolean;
}

export const RippleLoaderCircle = ({

    children = '',
    className,
    spinCircle = false
}: RippleLoadingButtonProps) => {
    return (
        <div className='overflow-hidden'>
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <span className="ripple-circle animate-ripple absolute overflow-hidden" style={{ animationDelay: '0.5s' }}></span>
                <span className="ripple-circle animate-ripple-delay absolute overflow-hidden"></span>
            </div>

            <span className={clsx('z-20', '',className)}>
                {spinCircle?<Loader2Icon className='animate-spin'/>:children}
            </span>
        </div>

    );
};
