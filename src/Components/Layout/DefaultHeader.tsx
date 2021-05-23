import React from "react"
import { Container, Dropdown, Image, Menu } from "semantic-ui-react"
import "./DefaultHeader.css"

export const DefaultHeader: React.FC = () => {
    return (
        <Menu fixed='top' inverted>
            <Image class="costco-logo" size='medium' src="https://i.imgur.com/hbGegUk.png" style={{ marginRight: '1.5em' }} />
            <Container>
                {/* <Menu.Item as='a'>Home</Menu.Item> */}

                {/* <Dropdown item simple text='Dropdown'>
                <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Header Item</Dropdown.Header>
                    <Dropdown.Item>
                    <i className='dropdown icon' />
                    <span className='text'>Submenu</span>
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown> */}
            </Container>
        </Menu>
    )
}