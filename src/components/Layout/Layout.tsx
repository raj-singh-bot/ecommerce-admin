import { Box, Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom';
import layout from './layout.module.css'

const Layout = (props:any) => {
  return (
    <>
    {
         props.sidebar ?
         <Box >
          <VStack>
            <Box  className={layout.sidebar}>
              <ul>
                <li><NavLink to={`/`}>Home</NavLink></li>
                <li><NavLink to={`/category`}>Category</NavLink></li>
                <li><NavLink to={`/products`}>Products</NavLink></li>
                <li><NavLink to={`/orders`}>Orders</NavLink></li>
              </ul>
            </Box>
            <Box  style={{width:'85%',marginLeft: 'auto', paddingTop: '60px' }}>
              {props.children}
            </Box>
          </VStack>
        </Box>
        :
        props.children
       }
    </>
  )
}

export default Layout