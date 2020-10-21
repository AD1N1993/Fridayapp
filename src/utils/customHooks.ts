import {useEffect, useState} from "react";


export const useRedirect = (shipment: boolean) => {
    const [redirect, makeRedirect] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!shipment) return;
            makeRedirect(true);
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [shipment]);
    return redirect;
}