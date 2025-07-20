'use client';
import { useLayout } from '@/content/LayoutContext';
import { useEffect } from 'react';

type Props = {
    layout: string;
};

export default function LayoutSetter({ layout }: Props) {
    const { setLayout } = useLayout();
    useEffect(() => {
        setLayout(layout);
    }, [layout, setLayout]);
    return null;
}
