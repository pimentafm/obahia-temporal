import React from 'react';

import 'antd/dist/antd.css';

import { Switch } from 'antd';
import { LayerContainer}  from './styles';

class LayerSwitcher extends React.Component {

    render () {
        return (
            <LayerContainer>
                <div id="landuse-div" className="layer-div">
                    <label> Uso do solo</label>
                    <Switch layer="landuse" defaultChecked onChange={this.props.onOffLanduse} />
                </div>
                <div id="landsat-div" className="layer-div">
                    <label> Imagens de satélite</label>
                    <Switch onChange={this.props.onOffLandsat} />
                </div>
            </LayerContainer>
        )
    }
}

export default LayerSwitcher;