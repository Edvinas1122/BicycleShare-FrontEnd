"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import Pusher from 'pusher-js';

// Create a context
type PusherContextType = {
    pusher: Pusher | null;
}

const PusherContext = createContext<PusherContextType>({
    pusher: null
});

export const usePusher = () => {
    return useContext(PusherContext);
}

export const PusherProvider = ({
    children,
    pusherKey,
}: {
    children: React.ReactNode;
    pusherKey: string;
}) => {
    const [pusher, setPusher] = useState<Pusher | null>(null);

    // https://github.com/pusher/pusher-js#subscribing-to-channels
    useEffect(() => {
        const pusher = new Pusher(pusherKey, {
            cluster: 'eu',
            // @ts-ignore
            channelAuthorization: {
                endpoint: "/pusher/auth"
            } as any,
        });
        Pusher.log = (msg: any) => {
            console.log("Pusher log:", msg);
        };
        setPusher(pusher);
        return () => {
            pusher.disconnect();
        }
    }, []);


    return (
        <PusherContext.Provider value={{ pusher }}>
            {children}
        </PusherContext.Provider>
    );
}