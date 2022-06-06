/** @jsx jsx */
import { jsx, Container } from 'theme-ui'
import { Notification, Link } from 'hds-react'

import * as styles from './styles'

export const MainContainer = ({ children, ...rest }) => {
  return (
    <Container sx={styles.container} {...rest}>
      {process.env.GATSBY_SHOW_DEPRECATED_WARNING === 'TRUE' &&
        <div style={{marginBottom: '24px', maxWidth: '800px'}}>
          <Notification label={"Deprecated"} type="alert">
            You are viewing a deprecated version (V1) of Helsinki Design System documentation. Please find the up to date version here: <Link size={"s"} href={"https://hds.hel.fi"}>HDS</Link>
          </Notification>
        </div>
      }
      {children}
    </Container>
  )
}
