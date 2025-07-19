import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import TooltipTop from './components/TooltipTop';
import TooltipBottom from './components/TooltipBottom';
import TooltipRight from './components/TooltipRight';
import TooltipLeft from './components/TooltipLeft';
import PopoverTop from './components/PopoverTop';
import PopoverBottom from './components/PopoverBottom';
import PopoverRight from './components/PopoverRight';
import PopoverLeft from './components/PopoverLeft';

const TooltipsPopovers = () => {
  const { t } = useTranslation('common');

  // const rtl = useSelector(state => state.rtl);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('ui_elements.tooltips_popovers.title')}</h3>
          <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
            information
          </h3>
        </Col>
      </Row>
      <Row>
        <TooltipTop />
        <TooltipRight />
        <TooltipLeft />
        <TooltipBottom />
        <PopoverTop />
        <PopoverRight />
        <PopoverLeft />
        <PopoverBottom />
      </Row>
    </Container>
  );
};

export default TooltipsPopovers;
