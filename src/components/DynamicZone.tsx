
import React from 'react';
import dynamic from 'next/dynamic';

interface Item {
    __component: string;
    id: number;
    [key: string]: any;
}

interface Props {
    data: Item[];
}

const componentMapping: { [key: string]: any } = {
    'dynamic-zone.banner': dynamic(
        () => import('./Banner').then((mod) => mod.Banner),
        { ssr: true }
    ),
};

const DynamicZone: React.FC<Props> = ({ data }) => {
    return (
        <>
            {data.map((item : Item) => {
                const Component = componentMapping[item.__component];
                if (!Component) {
                    console.warn(`No component found for: ${item.__component}`);
                    return null;
                }
                return <Component key={item.id} {...item} />;
            })}
        </>
    );
};

export default  DynamicZone;
