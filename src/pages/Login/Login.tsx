import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Center,
  useToast,
} from "@chakra-ui/react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import style from './login.module.css'
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Login() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const toast = useToast({
      position: 'top',
    })
  let navigate = useNavigate();
//   const dispatch = useDispatch();

  const validationSchema= Yup.object().shape({
    email:  Yup.string().required("Please enter your email address").email('Invalid email address'),
    password: Yup.string().required("Please enter your password")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    // ),
    
  })
  const handleSubmit = async(values:any) => {
    setIsSubmitting(true);
    console.log(values);

    try {
      const res = await axios.post('http://localhost:8000/auth/admin/signin', {
      email: values.email,
      password: values.password
     })
      console.log(res.data)
      localStorage.setItem('auth-token', JSON.stringify(res.data));
      navigate('/')
    } catch (error: any) {
      console.log(error)
      toast({
        description: `${error.response.data.error}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
    
    setIsSubmitting(false);
  }
  const defaultValues = {
    email:"",
    password:"",
  }
  
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <Box p={4}>
          <Box textAlign="center">
            <Text>
              <br></br>
            </Text>
            <Heading>Sign In to Your Account</Heading>
            <Text>
              <br></br>
            </Text>
          </Box>
          <Box my={8} textAlign="left">
            <Formik initialValues={defaultValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >{({setFieldValue})=>(
                    <Form>
                    <div className="row">
                        <FormControl mt={4} isRequired>
                        <FormLabel>Enter Username </FormLabel>
                            <Field name="email" placeholder = "Enter Your First Name" type="text" className={style.formInput}/>
                            <p className={style.textDanger}>
                            <ErrorMessage  name="email"/>
                            </p>
                        </FormControl>
                        <FormControl mt={4} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Field name="password" placeholder = "Enter Your Last Name" type="password" className={style.formInput}/>
                        <p className={style.textDanger}>
                        <ErrorMessage  name="password"/>
                        </p>
                        </FormControl>
                        </div>
                        {isSubmitting ? (
              <Flex
                bg="white.500"
                color="gery.500"
                width="full"
                justifyContent="center"
                mt={4}
              >
                <Center>
                  <CircularProgress
                    size={7}
                    isIndeterminate
                    color="green.500"
                    m={1}
                  />
                </Center>
              </Flex>
                        ) : (
                        <Button
                            bg="green.500"
                            color="white"
                            width="full"
                            mt={4}
                            type='submit'
                        >
                            Sign In
                        </Button>
                        )}
                    </Form>
                )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
