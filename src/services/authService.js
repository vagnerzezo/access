import axios from 'axios';

const API_URL = 'https://dummyjson.com/user/login';

export const login = async (username, password) => {
     try {
          const response = await axios.post(API_URL, { username, password });
          console.log('Dados recebidos:', response.data); // Para depuração
          return response.data; // Retorna os dados extraídos
     } catch (error) {
          throw new Error(error.response?.data?.message || 'Erro ao realizar login');
     }
};