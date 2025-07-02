"use client"

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import ApolloWrapper from '../ApolloWrapper'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ChakraProvider value={defaultSystem}>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </ChakraProvider>
    </ThemeProvider>
  )
}
