'use client';
import { useLayout } from '@/content/LayoutContext';
import { useEffect } from 'react';

type Props = {
    layout: string;
};

export default function LayoutSetter({ layout }: Props ) {
    if(layout){
        const { setLayout } = useLayout();
        useEffect(() => {
            setLayout(layout);
            return () => setLayout('default'); 
        }, []);
    }
    return <></>;
}
