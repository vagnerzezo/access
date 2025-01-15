<template>
     <div class="bg-white dark:bg-gray-900">
          <div class="flex justify-center h-screen">
               <div class="hidden bg-cover lg:block lg:w-2/3"
                    style="background-image: url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)">
                    <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                         <div>
                              <h2 class="text-4xl font-bold text-white">zezo solutions</h2>

                              <p class="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing
                                   elit. In autem
                                   ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam
                                   temporibus molestiae</p>
                         </div>
                    </div>
               </div>
               <div v-if="!auth" class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div class="flex-1">
                         <div class="text-center">
                              <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">zezo solutions
                              </h2>

                              <p class="mt-3 text-gray-500 dark:text-gray-300">Entre para acessar sua conta</p>
                         </div>

                         <div class="mt-8">
                              <form @submit.prevent="handleLogin">
                                   <div>
                                        <label for="email"
                                             class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Username
                                        </label>
                                        <input type="username" name="username" id="username" v-model="username"
                                             placeholder="vagnerzezo" autocomplete="username"
                                             class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                   </div>

                                   <div class="mt-6">
                                        <div class="flex justify-between mb-2">
                                             <label for="password"
                                                  class="text-sm text-gray-600 dark:text-gray-200">Senha</label>
                                        </div>

                                        <input type="password" v-model="password" name="password" id="password"
                                             placeholder="Your Password" autocomplete="current-password"
                                             class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                   </div>

                                   <div class="mt-6">
                                        <button type="submit"
                                             class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                             Entrar
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
               <div v-else class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <Logado :userId="userId" />
               </div>

          </div>
          <button @click="toggleModal"
               class="fixed bottom-5 left-5 bg-blue-500 text-white rounded-md px-4 py-2 shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
               User Exemplos
          </button>
          <!-- Modal -->
          <div v-if="showModal" class="fixed bottom-16 left-5 bg-gray-800 text-white w-64 p-4 rounded-lg shadow-lg">
               <h2 class="text-lg font-semibold mb-4">User Exemplos</h2>
               <ul class="space-y-2">
                    <li v-for="(user, index) in exampleUsers" :key="index" class="text-sm">
                         <p><span class="font-bold">Username:</span> {{ user.username }}</p>
                         <p><span class="font-bold">Password:</span> {{ user.password }}</p>
                    </li>
               </ul>
               <button @click="toggleModal"
                    class="mt-4 w-full bg-red-500 text-white rounded-md py-1.5 shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                    Fechar
               </button>
          </div>
     </div>
</template>

<script>
import { login } from '@/services/authService';
import Logado from '@/components/logado.vue';

export default {
     data() {
          return {
               username: '',
               password: '',
               error: null,
               auth: false, // Começa como não autenticado
               userId: null,
               showModal: false,
               exampleUsers: [
                    { username: "emilys", password: "emilyspass" },
                    { username: "michaelw", password: "michaelwpass" },
                    { username: "sophiab", password: "sophiabpass" },
                    { username: "jamesd", password: "jamesdpass" },
               ],
          };
     },
     components: {
          Logado,
     },
     methods: {
          async handleLogin() {
               try {
                    const userData = await login(this.username, this.password);
                    console.log('ID do usuário:', userData.id); // Verificação do ID
                    localStorage.setItem('token', userData.accessToken); // Salva o token
                    this.userId = userData.id; // Salva o ID do usuário
                    this.auth = true; // Atualiza o estado de autenticação
               } catch (err) {
                    this.error = err.message;
               }
          },
          checkAuth() {
               const token = localStorage.getItem('token');
               if (token) {
                    this.auth = true; // Usuário autenticado
               } else {
                    this.auth = false; // Usuário não autenticado
               }
          },
          clearLocalStorage() {
               localStorage.clear(); // Limpa todo o localStorage
          },
          toggleModal() {
               this.showModal = !this.showModal;
          },
     },
     created() {
          this.checkAuth(); // Verifica autenticação ao montar o componente
          // Adiciona o evento para limpar o localStorage antes de sair
          window.addEventListener('beforeunload', this.clearLocalStorage);
     },
     beforemount() {
          // Remove o evento ao destruir o componente
          window.removeEventListener('beforeunload', this.clearLocalStorage);
     },
};
</script>