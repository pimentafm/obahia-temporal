import React, { useEffect } from 'react';
import { Tooltip } from 'antd';

import OlMap from 'ol/Map';

import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';

import { Container } from './styles';

interface FooterProps {
  id: string;
  map: OlMap;
}

const Footer: React.FC<FooterProps> = ({ id, map, ...rest }) => {
  const mousePosition = new MousePosition({
    coordinateFormat: createStringXY(5),
    projection: 'EPSG:4326',
    className: 'mouse-position',
    undefinedHTML: '&nbsp;',
  });

  useEffect(() => {
    mousePosition.setTarget('mouse-position-coordinates');
    map.addControl(mousePosition);
  });

  return (
    <Container id={id}>
      <div id="mouse-position-coordinates" className="mouse-position" />
      <Tooltip placement="leftTop" title="Sistema de coordenadas">
        <label>EPSG: 4326</label>
      </Tooltip>
    </Container>
  );
};

export default Footer;