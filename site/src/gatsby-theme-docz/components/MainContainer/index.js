/** @jsx jsx */
import { jsx, Container } from 'theme-ui'
import { Notification, Link } from 'hds-react'

import * as styles from './styles'

export const MainContainer = ({ children, ...rest }) => {
  return (
    <Container sx={styles.container} {...rest}>
      {process.env.GATSBY_SHOW_DEPRECATED_WARNING === 'TRUE' &&
        <div style={{marginBottom: '24px', maxWidth: '800px'}}>
          <Notification label={"This is a deprecated version"} type="alert">
            You are viewing an old version (V1) of the Helsinki Design System documentation. If you are using a newer version of the HDS, please refer to <Link size={"s"} href={"https://hds.hel.fi"}>the up to date documentation site</Link>. If you are looking for information on how to migrate to the new version, refer to the <Link size={"s"} href={"https://hds.hel.fi/getting-started/hds-2.0/migrating-to-2.0/"}>HDS 2.0 migration guide</Link>.
          </Notification>
        </div>
      }
      {children}
    </Container>
  )
}
