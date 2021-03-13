import React from "react"
import { Container } from "semantic-ui-react"

import { DefaultFooter } from "./DefaultFooter"
import { DefaultHeader } from "./DefaultHeader"


export const FixedMenuLayout: React.FC<{Header?: React.FC, Footer?: React.FC}> = ({children, Header = DefaultHeader, Footer = DefaultFooter})  => {
    return (
    <div>
        <header className="header">
            <Header />
        </header>
        <Container style={{ marginTop: '7em' }}>
            {children}
        </Container>

        <footer className="footer">
            <Footer />
        </footer>
    </div>
    )
}