import React from 'react'
//
import { Container, Content } from 'native-base'
// 
export function Body (props: any) {
	return <Container>
		<Content padder>
			{props.children}
		</Content>
	</Container>
}