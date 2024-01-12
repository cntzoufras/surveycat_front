import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import {
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  FlexibleWidthXYPlot,
  YAxis,
} from 'react-vis';
import {
  Card, CardBody, CardTitleWrap, CardTitle,
} from '@/shared/components/Card';

const Bar = () => {
  const { t } = useTranslation('common');

  return (
    <Col xs={12} md={12} lg={12} xl={4}>
      <Card>
        <CardBody>
          <CardTitleWrap>
            <CardTitle>{t('charts.react_vis.bars')}</CardTitle>
          </CardTitleWrap>
          <div className="react-vis">
            <FlexibleWidthXYPlot
              xType="ordinal"
              height={250}
              xDistance={100}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <VerticalBarSeries
                data={[
                  { x: 'A', y: 110 },
                  { x: 'B', y: 15 },
                  { x: 'C', y: 55 },
                  { x: 'D', y: 25 },
                  { x: 'E', y: 35 },
                  { x: 'F', y: 45 },
                  { x: 'G', y: 115 },
                ]}
                color="#70bbfd"
              />
             
              <VerticalBarSeries
                data={[
                  { x: 'A', y: 210 },
                  { x: 'B', y: 205 },
                  { x: 'C', y: 215 },
                  { x: 'D', y: 225 },
                  { x: 'E', y: 235 },
                  { x: 'F', y: 245 },
                  { x: 'G', y: 200 },
                ]}
                color="#AFDE1E"
              />
            </FlexibleWidthXYPlot>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Bar;
