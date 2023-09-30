import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../firebase";

export const useLogInChack = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(user => {
            if (!user) {
                navigate('/admin');
            }
        });

        // 컴포넌트가 언마운트될 때 리스너를 정리합니다.
        return () => unsubscribe();
    }, [navigate]);
}