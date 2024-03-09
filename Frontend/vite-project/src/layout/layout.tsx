import React from 'react'

import Header from '@/components/Header'

//we are passing children React.ReactNode 
type props={ 
    children:React.ReactNode
}

function layout({children}:props) {

  return (
    <div className='flex flex-col min-h-screen'>
        <Header/> 
        <div className='container mx-auto flex-1 py-10'>{children}</div>
    </div>
  )
}

layout.propTypes = {}

export default layout
