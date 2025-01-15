<template>
     <div class="text-white">
          <h1>Detalhes do Usuário</h1>

          <div class="mt-6">
               <span class="relative inline-block">
                    <img class="size-10 rounded-full" :src="user.image" alt="">
                    <span
                         class="absolute bottom-0 right-0 block size-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
               </span>
          </div>
          <div class="mt-6">
               <h2 class="text-sm mb-2 italic">Informações Gerais</h2>
               <ul class="flex flex-col gap-2">
                    <li class="text-xs"><span class="text-sm">Nome:</span> {{ user.firstName }} {{ user.lastName }}
                         {{ user.maidenName }}
                    </li>
                    <li class="text-xs"><span class="text-sm">Idade:</span> {{ user.age }}</li>
                    <li class="text-xs"><span class="text-sm">Gênero:</span> {{ user.gender }}</li>
                    <li class="text-xs"><span class="text-sm">Email:</span> {{ user.email }}</li>
                    <li class="text-xs"><span class="text-sm">Telefone:</span> {{ user.phone }}</li>
                    <li class="text-xs"><span class="text-sm">Usuário:</span> {{ user.username }}</li>
                    <li class="text-xs"><span class="text-sm">Data de Nascimento:</span>
                         {{ formatBirthDate(user.birthDate) }}
                    </li>
                    <li class="text-xs"><span class="text-sm">Grupo Sanguíneo:</span> {{ user.bloodGroup }}</li>
               </ul>
          </div>

          <div class="mt-6">
               <h2 class="text-sm mb-2 italic">Endereço</h2>
               <ul class="flex flex-col gap-2">
                    <li class="text-xs"><span class="text-sm">Endereço:</span> {{ user?.address?.address }}</li>
                    <li class="text-xs"><span class="text-sm">Cidade:</span> {{ user?.address?.city }}</li>
                    <li class="text-xs"><span class="text-sm">Estado:</span> {{ user?.address?.state }} ({{
                         user?.address?.stateCode }})</li>
                    <li class="text-xs"><span class="text-sm">CEP:</span> {{ user?.address?.postalCode }}</li>
                    <li class="text-xs"><span class="text-sm">País:</span> {{ user?.address?.country }}</li>
               </ul>
          </div>

          <div class="mt-6">
               <h2 class="text-sm mb-2 italic">Empresa</h2>
               <ul class="flex flex-col gap-2">
                    <li class="text-xs"><span class="text-sm">Nome:</span> {{ user?.company?.name }}</li>
                    <li class="text-xs"><span class="text-sm">Departamento:</span> {{ user?.company?.department }}
                    </li>
                    <li class="text-xs"><span class="text-sm">Cargo:</span> {{ user?.company?.title }}</li>
                    <li class="text-xs">
                         <span class="text-sm">Endereço:</span>
                         {{ user?.company?.address?.address }}, {{ user?.company?.address?.city }},
                         {{ user?.company?.address?.state }} ({{ user?.company?.address?.stateCode }})
                    </li>
               </ul>
          </div>
          <div class="mt-6">
               <button type="button" @click="logout"
                    class="rounded-full bg-indigo-600 py-1.5 px-8 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    SAIR</button>
          </div>

     </div>
</template>

<script>
export default {
     props: {
          userId: {
               type: Number,
               required: true,
          },
     },
     data() {
          return {
               user: {}, // Armazena os dados do usuário
          };
     },
     async mounted() {
          await this.fetchUserData();
     },
     methods: {
          async fetchUserData() {
               try {
                    const response = await fetch(`https://dummyjson.com/users/${this.userId}`);
                    const data = await response.json();
                    this.user = data; // Atualiza os dados do usuário no estado
               } catch (error) {
                    console.error("Erro ao buscar os dados do usuário:", error);
               }
          },
          formatBirthDate(dateString) {
               const date = new Date(dateString);
               const day = String(date.getDate()).padStart(2, '0');
               const month = String(date.getMonth() + 1).padStart(2, '0');
               const year = date.getFullYear();
               return `${day}/${month}/${year}`;
          },
          logout() {
               localStorage.clear(); // Limpa o localStorage
               window.location.reload(); // Atualiza a página
          },
     },
};
</script>