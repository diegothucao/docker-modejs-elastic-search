import { Client } from '@elastic/elasticsearch'

const client = new Client({ node: process.env.EL_URL })

export const searhState = async function searhState(state) {
    const { body } = await client.search({
      index: 'bank',
      body: {
        query: {
          match: { state: state }
        }
      }
    })
  
    return body.hits.hits
  }

  export const getAll = async function getAll() {
    const { body } = await client.search({
      index: 'bank',
      size : 10000
    })
    return body.hits.hits
  }

  
  export const searhStateAndEmployer = async function searhStateAndEmployer(state, employer) {
    const { body } = await client.search({
      index: 'bank',
      size : 10000,
      body: {
        query: {
          bool: {
            must: [
              { match: { state: state } },
              { match: { employer: employer } },
            ]
          }
        }
      }
    })
    return body.hits.hits
  }

    
  export const searhNotStateAndEmployer = async function searhNotStateAndEmployer(state, employer) {
    const { body } = await client.search({
      index: 'bank',
      size : 10000,
      body: {
        query: {
          bool: {
            must_not: [
              { match: { state: state } },
              { match: { employer: employer } },
            ]
          }
        }
      }
    })
    return body.hits.hits
  }

  export const termAccountNumber = async function termAccountNumber(account_number) {
    const { body } = await client.search({
      index: 'bank',
      body: {
        query: {
          term: {
            account_number: account_number
          }
        }
      }
    })
    return body.hits.hits
  }