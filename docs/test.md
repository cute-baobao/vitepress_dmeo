# 状态管理

Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。

在nuxt配置pinia，和配置pinia持久化插件。

1. pinia

```
npm install -d pinia @pinia/nuxt
```

2. pinia持久化插件

```
npm i -D @pinia-plugin-persistedstate/nuxt
```

3. 在```nuxt.config.ts```中配置

```
modules:["@pinia/nuxt","@pinia-plugin-persistedstate/nuxt"],
```

## 使用方法

1. 设置状态管理：

   在```composables```文件夹下，创建一个xxx文件夹，中使用pinia中的defineStore来设置状态管理的store，第一个参数时store的唯一id

   ```js
   import { defineStore } from "pinia";
   //如果放在composables文件夹下，并且文件名和下面导出的对象的名称相同，即可不用引入直接使用。
   export const useTokenStore = defineStore("store", () => {
       const token = ref("")
       const setToken = (val) => {
           token.value = val
       }
       const getToken = () => {
           return token.value
       }
       return { token, setToken, getToken }
   });
   ```

2. 使用方法：

   在nuxt中，服务端设置的store，客户端可以访问到，并且同步到客户端，客户端设置的store，用户端访问不到。服务端设置的token在浏览器的pinia插件中是无法查看到的。

   ```js
   <script setup>
   const token = useTokenStore()
   const login = ()=>{
   	token.setToken("123456")
   	console.log(token.token)
   }
   </script>
   ```

   

3. 持久化的方法:

   持久化到localstorage的数据，服务端是获取不到持久化的数据。
   存储到Cookies里的数据，是可以被服务端访问到的。

   ```js
   import { defineStore } from "pinia";
   
   export const useTokenStore = defineStore("store", () => {
       const token = ref("")
       const setToken = (val) => {
           token.value = val
       }
       const getToken = () => {
           return token.value
       }
       
       return { token, setToken, getToken }
   },{
       persist:{
           paths:["token"],
           storage: persistedState.localStorage
       }
   });
   ```

   

4. 设置持久化到cookies中：

   将token存储到cookies中，每次向后端发送请求都会携带cookies。

   ```js
   import { defineStore } from "pinia";
   
   export const useTokenStore = defineStore("store", () => {
       const token = ref("")
       const setToken = (val) => {
           token.value = val
       }
       const getToken = () => {
           return token.value
       }
       
       return { token, setToken, getToken }
   },{
       persist:true
   });
   ```

5. 修改拦截器，和路由守卫。

   ```ts
   export default defineNuxtRouteMiddleware((to,from)=>{
       let path = ['/login','/about','/','/Blog','/errorpage']
       let token:string = useTokenStore().getToken()
       if(!path.includes(to.path)) {
           if(token){
               return true
           }else{
               return navigateTo({
                   path:'/login',
                   query:{
                       code:'401',
                       msg:'请先登录'
                   },
               })
           }
       }
   })
   ```

   拦截器

   ```js
   export const apiCore = (url, options) => {
       const nuxtapp = useNuxtApp()
       const config = useRuntimeConfig()
       return useFetch(url, {
           baseURL: config.public.BASE_URL,
           onRequest({ options }) {
               let token = useTokenStore().getToken()
               options.headers = {
                   Cookies:`token=${token}`,
                   ...options.headers
               }
           },
           onResponse({ response }) {
               if (response.status >= 200 && response.status < 300) {
                   if (response._data.code != 1) {
                       if (import.meta.client) {
                           ElMessage.error(response._data.msg)
                       } else {
                           nuxtapp.runWithContext(() => {
                               navigateTo({
                                   path: "/errorpage",
                                   query: {
                                       code: response._data.code,
                                       msg: response._data.msg
                                   }
                               })
                           })
                       }
                   }
               }
           },
           onResponseError({ response }) {
               if (import.meta.client) {
                   ElMessage.error(response.statusText)
               } else {
                   nuxtapp.runWithContext(() => {
                       navigateTo({
                           path: "/errorpage",
                           query: {
                               code: response.status,
                               msg: response.statusText
                           }
                       })
                   })
               }
           },
           ...options
       })
   }
   export const myFetch = (url, options) => {
       return new Promise((resolve, reject) => {
           apiCore(url, {
               method: "GET",
               ...options
           }).then(res => {
               //返回一个响应式对象
               resolve(res.data.value)
           }).catch(err => {
               reject(err)
           })
       })
   }
```