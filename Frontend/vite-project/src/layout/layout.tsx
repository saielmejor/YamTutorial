import React from 'react'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

//we are passing children React.ReactNode 
type props={ 
    children:React.ReactNode; 
    showHero?:boolean
}

function  layout({children, showHero=false}:props) {

  return (
    <div className='flex flex-col min-h-screen'>
        <Header/> 
        {showHero && < Hero/>}
      
        <div className='container mx-auto flex-1 py-10'>{children}</div>
        <Footer/> 
    </div>
  )
}

layout.propTypes = {}

export default layout
