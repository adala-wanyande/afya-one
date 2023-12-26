import React from 'react'
import { Heading } from '@chakra-ui/react'

const Title = (props) => {
  return (
    <Heading color='#8A8B96' p={4} size='sm' fontSize='50px'>
        {props.title}
    </Heading>
  )
}

export default Title