import React from 'react'
import {Switch } from 'react-router-dom'
import {RenderRoutes} from './router'
import mainrouter from './main_config'


class index extends React.Component {
    render () {
        return (
            <Switch>
                <RenderRoutes routes={mainrouter} />
            </Switch>
        )
    }
}

export default index