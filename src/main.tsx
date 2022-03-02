import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { createServer, Model } from 'miragejs'

createServer({

  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
      {
        id: 1,
        title: 'Freelance de website',
        type: 'deposit',
        amount: 6000,
        category: 'Dev',
        createdAt: new Date('2022-03-01'),
      },

      {
        id: 2,
        title: 'Aluguel',
        type: 'withdraw',
        amount: 1100,
        category: 'Casa',
        createdAt: new Date('2022-03-11'),
      }
    
      ]
    })
  },
 
      

  routes(){
    this.namespace = 'api';

    this.get('/transactions', () =>{
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) =>{
      const data = JSON.parse(request.requestBody) //OS DADOS DO REQUEST VEM EM string, ENTAO PRECISA CONVERTER PRA JSON PARA UTILIZAR.

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
