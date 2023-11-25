import axios from '../api/axios';
import {useAuth} from '../context/AuthProvider';

const useRefreshToken = () => {
const { auth,login } = useAuth();

    const refresh = async () => {
        try{
            const headers = {
                'x_authorization': `${localStorage.getItem('mcode_token')}`
            };
            const response = await axios.get('auth/refresh', {
                withCredentials: true,
                headers
            });
            return response;
        } catch (error){
            console.log('Error refreshing token: ',error);
            throw error;
        }        
    }
    return refresh;
};

export default useRefreshToken;