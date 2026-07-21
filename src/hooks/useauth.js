import { useEffect, useState } from "react";
import { authListener } from "../services/authService";

export default function useAuth() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = authListener(currentUser => {

            setUser(currentUser);
            setLoading(false);

        });

        return unsubscribe;

    }, []);

    return {
        user,
        loading
    };

}