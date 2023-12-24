import React from 'react'
import { Heading } from '@chakra-ui/react'

const Title = (props) => {
  return (
    <Heading p={4} size='md' fontSize='50px'>
        {props.title}
    </Heading>
  )
}

export default Title