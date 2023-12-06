<template>
        <div class="text-black w-2/4 py-10 border rounded-lg absolute translate-x-[-50%] left-2/4 top-[30%]">
          <h1 class="my-4 text-center font-bold text-3xl">Reset Password</h1>
            <input v-model="oldPassword" type="text" placeholder="userName" class="w-[70%] block p-2  outline-none rounded-full px-3 my-4   mx-auto">
            <input v-model="newPassword" type="text" placeholder="password" class="w-[70%] block p-2 outline-none rounded-full px-3 my-4   mt-2 mx-auto">

            <button @click="resetPassword" class="px-20 py-2 block mx-auto mt-5 bg-green-400 rounded-full text-white">
Reset
            </button>
        </div>
</template>
    
<script setup>
    import {ref} from 'vue'
    import axios from 'axios'


    const oldPassword = ref('')
    const newPassword = ref('')

    const resetPassword = () => {
  axios.patch(
    `https://rb.algorithmic.uz/api/Teachers/ResetPassword?userName=${oldPassword.value}&newPass=${newPassword.value}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      withCredentials: true, // withCredentials ni true qilish
    }
  ).then(res => {
    console.log(res);
  });
}                                                                   

</script>
    
<style lang="scss" scoped>
    
</style>