import { Box, Center, Flex, Heading, Input, Spacer, VStack } from '@chakra-ui/react';
import React from 'react'
import Layout from '../../components/Layout/Layout';

const Home = () => {
  return (
    <>
    <Box position={"fixed"} w="100%" zIndex={200}>
        <VStack py={5} key={"vStack"} background ="#33ccff" >
          <Flex w="92%" >
            <Heading ml="8" size="lg" fontWeight="semibold" color="white">
              Dashboard
            </Heading>
            <Spacer></Spacer>
            {/* <Button mr={5}>
            {!busy && !(accounts || []).length ? null : <CSVLink data={csvData} filename="user">Excel</CSVLink>}
          </Button> */}
            <Heading size="md" fontWeight="semibold">
              <Center>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search..."
                  // onChange={(e) => {
                  //   setSearch(e.target.value);
                  // }}
                  backgroundColor="white"
                ></Input>
              </Center>
            </Heading>
          </Flex>
        </VStack>
      </Box>
      <div 
      // style={{width: "92vw",
          // maxWidth: "92vw",
          // top: "20vh ",
          // left: "4vw",
          // position: "relative",}}
          >
        <Layout sidebar/>
      </div>
      {/* <UserTable query={searchQuery} /> */}
    </>
  )
}

export default Home