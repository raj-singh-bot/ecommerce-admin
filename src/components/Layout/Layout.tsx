import { Box, Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom';
import layout from './layout.module.css'

const Layout = (props:any) => {
  let activeStyle = {
    // textDecoration: "underline",
    background: "#333",
    color: "#fff"
  };
  return (
    <>
    {
         props.sidebar ?
         <Box >
          <VStack>
            <Box  className={layout.sidebar}>
              <ul>
                <li><NavLink to={`/`} style={({ isActive }) =>isActive ? activeStyle : undefined}>Home</NavLink></li>
                <li><NavLink to={`/category`} style={({ isActive }) =>isActive ? activeStyle : undefined} >Category</NavLink></li>
                <li><NavLink to={`/products`}style={({ isActive }) =>isActive ? activeStyle : undefined}>Products</NavLink></li>
                <li><NavLink to={`/orders`}style={({ isActive }) =>isActive ? activeStyle : undefined}>Orders</NavLink></li>
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