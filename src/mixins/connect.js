import store from '../store'

export default  {
    data()  {
        let mainUrl='http://localhost:3000/'
        
        return  {
            baseUrl: mainUrl,
            baseUrlPostPhoto: `${mainUrl}uploads/posts/`, 
            baseUrlUserPhoto: `${mainUrl}uploads/users/`,
            baseUrlWs: 'ws://localhost:3030/chat',
            subUrl: {
                register: 'register/',
                login: 'login/',
                post: 'post/',
                user: 'user/',
                reaction: 'reaction/',
                comment: 'comment/',
                

            },
            childUrl:   {
                edit: 'edit/',
                editPassword: 'edit/password/'
            },
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'authorization': store.state.user==undefined || store.state.user===null?null:store.state.user.token
            }
        }        
    },
    methods:    {
        postRequest: function(url, formData)    {
            return new Promise((resolve)=>  {

                const options={
                    method: 'POST',
                    headers: this.headers,   
                    body: JSON.stringify(formData)                    
                }
                fetch(`${this.baseUrl}${url}`, options).then(response=> {
                    response.json().then(jsonData=> {
                        resolve({ status: response.status, body: jsonData })
                    })
                    .catch(err=>    {
                        return resolve(err)
                    })
                })
           })     
        },
        getRequest: function(url)   {
            return new Promise((resolve)=>  {
                const options={
                    method: 'GET',
                    headers: this.headers,
                }
                fetch(`${this.baseUrl}${url}`, options).then(response=>    {
                    response.json().then(jsonData=> {
                        resolve({ status: response.status, body: jsonData })
                    })
                    .catch(err=>    {
                        return resolve(err)
                    })
                })
            })
        },
        patchRequest: function(url, formData)   {
            return new Promise((resolve)=>  {
                const options={
                    method: 'PATCH',
                    headers: this.headers,
                    body: JSON.stringify(formData)                
                }
                fetch(`${this.baseUrl}${url}`, options).then(response=>    {
                    response.json().then(jsonData=> {
                        resolve({ status: response.status, body: jsonData })
                    })
                    .catch(err=>    {
                        return resolve(err)
                    })
                })
            })    
        },
        logOut()    {
            this.state.user=null
            localStorage.removeItem('user')
            this.$router.replace('/login')
        }    









            





    }
}