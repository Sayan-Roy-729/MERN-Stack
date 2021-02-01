import { ProgressPlugin } from "webpack";

import React from 'react';

import Aux from '../../hoc/auxiliary';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            {ProgressPlugin.children}
        </main>
    </Aux>
);

export default layout;