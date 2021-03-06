import React, { useState, useCallback, useEffect } from 'react';
import OlMap from 'ol/Map';
import TileWMS from 'ol/source/TileWMS';

import Overlay from 'ol/Overlay';
import OverlayPositioning from 'ol/OverlayPositioning';

import { createStringXY } from 'ol/coordinate';

import { FiXCircle } from 'react-icons/fi';

import { Container } from './styles';

import { useTranslation } from 'react-i18next';

interface PopupProps {
  map: OlMap;
  source: TileWMS;
}

const Popup: React.FC<PopupProps> = ({ map, source }) => {
  const { t } = useTranslation();

  const [popcoords, setPopCoords] = useState<string>();
  const [popclass, setPopClass] = useState<string>();
  const [popvalue, setPopValue] = useState<string>();

  let luclasses = [
    t('label_forest'),
    t('label_savanna'),
    t('label_grasslands'),
    t('label_mosaic'),
    t('label_rainfed'),
    t('label_irrigated'),
    t('label_pasture'),
    t('label_water'),
    t('label_urban'),
  ];

  const closePopUp = useCallback(() => {
    const element: HTMLElement = document.getElementById(
      'popup-class',
    ) as HTMLElement;

    element.style.display = 'none';
  }, []);

  const getData = useCallback(
    (url, coordinate) => {
      fetch(url)
        .then(response => {
          return response.text();
        })
        .then(value => {
          setPopCoords(coordinate);
          setPopClass(luclasses[parseInt(value) - 1]);
          setPopValue(value);
        });
    },
    [luclasses],
  );

  useEffect(() => {
    map.on('pointermove', function (evt) {
      if (evt.dragging) {
        return;
      }

      let hit = map.forEachLayerAtPixel(
        evt.pixel,
        (_, rgba) => {
          return true;
        },
        { layerFilter: layer => layer.getClassName() !== 'ol-layer' },
      );

      map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });

    map.on('singleclick', evt => {
      let res = map.getView().getResolution();
      let proj = map.getView().getProjection();

      const stringifyFunc = createStringXY(5);

      let url = source.getFeatureInfoUrl(evt.coordinate, res, proj, {
        INFO_FORMAT: 'text/html',
        VERSION: '1.3.0',
      });

      getData(url, stringifyFunc(evt.coordinate));

      const element: HTMLElement = document.getElementById(
        'popup-class',
      ) as HTMLElement;

      const popup = new Overlay({
        position: evt.coordinate,
        element: element,
        positioning: OverlayPositioning.BOTTOM_LEFT,
        autoPan: true,
        autoPanAnimation: {
          duration: 500,
        },
      });

      element.style.display = 'unset';

      map.addOverlay(popup);
    });
  }, [map, getData, source]);

  return (
    <Container>
      <tbody
        id="popup-class"
        className="popup-class"
        style={{
          boxShadow: `0px 2px 3px rgba(0, 0, 0, 0.13), 1px 2px 2px rgba(0, 0, 0, 0.1),
      -1px -2px 2px rgba(0, 0, 0, 0.05)`,
        }}
      >
        <tr className="table-header">
          <th
            colSpan={2}
            style={{ background: '#1f5582', borderRadius: '2px 2px 0px 0px' }}
          >
            <FiXCircle
              id="close-popup"
              type="close"
              onClick={closePopUp}
              style={{
                display: 'flex',
                color: '#fff',
                fontSize: '25px',
                padding: '2px',
                float: 'right',
                cursor: 'pointer',
              }}
            />
          </th>
        </tr>
        <tr style={{ background: '#fff' }}>
          <td style={{ padding: `2px 5px` }}>{t('label_popup_class')}</td>
          <td id="popup-lulc" style={{ padding: `2px 5px` }}>
            {popclass ? popclass : t('popup_clickout')}
          </td>
        </tr>
        <tr style={{ background: '#fff' }}>
          <td style={{ padding: `2px 5px` }}>{t('label_popup_code')}</td>
          <td id="popup-value" style={{ padding: `2px 5px` }}>
            {popvalue ? popvalue : t('popup_clickout')}
          </td>
        </tr>
        <tr style={{ background: '#fff' }}>
          <td style={{ padding: `2px 5px`, borderRadius: `0px 0px 0px 2px` }}>
            LON, LAT
          </td>
          <td
            id="popup-coords"
            style={{ padding: `2px 5px`, borderRadius: `0px 0px 2px 0px` }}
          >
            {popcoords ? popcoords : t('popup_clickonlayer')}
          </td>
        </tr>
      </tbody>
    </Container>
  );
};

export default Popup;
