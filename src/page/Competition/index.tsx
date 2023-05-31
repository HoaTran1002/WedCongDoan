import React, { useEffect, useState } from 'react'
import Layout from '~/components/layout/Layout'
import useAxios from '~/hook/useAxios'

const Index = (): JSX.Element => {
  const url = '/Competitions' // Replace with your actual API endpoint
  const method = 'GET'
  const body = {}
  const headers = { 'Access-Control-Allow-Origin': 'http://localhost:5237' }

  // const [competitions, setCompetitions] = useState<any>(null)
  const [response, error, loading] = useAxios({ url, method, body, headers })

  if (response) {
    console.log('phan hoi:' + response)
  }

  if (error) {
    console.log('Loi :' + error)
  }

  return (
    <>
      {loading ? (
        <h1>ddang loading</h1>
      ) : (
        <Layout>
          <div>this is competion</div>
        </Layout>
      )}
    </>
  )
}

export default Index
