import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import {
  HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, FlexibleWidthXYPlot, YAxis,
} from 'react-vis';
import {
  Card, CardBody, CardTitleWrap, CardTitle,
} from '@/shared/components/Card';

const LineSeriesChart = () => {
  const { t } = useTranslation('common');

  return (
    <Col xs={12} md={12} lg={12} xl={4}>
      <Card>
        <CardBody>
          <CardTitleWrap>
            <CardTitle>{t('charts.react_vis.line_series')}</CardTitle>
          </CardTitleWrap>
          <div className="react-vis">
            <FlexibleWidthXYPlot height={250}>
              <HorizontalGridLines />
              <VerticalGridLines />
              <XAxis />
              <YAxis />
              
              <LineSeries
                className="react-vis__svg-line"
                curve="curveMonotoneX"
                data={[
                  { x: 0, y: 10 },
                  { x: 2, y: 4 },
                  { x: 2, y: 21 },
                  { x: 4, y: 14 },
                  { x: 14, y: 14 },
                ]}
                color="#c88ffa"
              />
              
            </FlexibleWidthXYPlot>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LineSeriesChart;
