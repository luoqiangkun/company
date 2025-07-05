
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Props = {
    href: string;
    text: string;
    show?: boolean,
    target?: string,
    className? : string
};


export const NavigationLink = ({ href,text,target,show, className }: Props) => {
     return (
        <Link
            className={cn(
                'px-4 py-2 flex gap-2 items-center justify-center text-white text-sm leading-[110%] rounded-md hover:bg-neutral-800 hover:text-white/80 hover:shadow-[0px_1px_0px_0px_var(--neutral-600)_inset] transition duration-200',
                className,
                show &&
                    ' text-gray-800'
            )}
            target={target}
            href={href}
        >
            {text}
        </Link>
    );
};
