/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';
import snapshotHocProps from 'react-render-counter/utils/testHelpers/snapshotHocProps';
import AccordionItem, { AccordionItemRenderer } from '../AccordionItem';
import asAccordionItem from '../asAccordionItem';

describe('<AccordionItem {...props} />: elements tree', () => {
  let props;
  beforeEach(() => {
    props = { ...AccordionItemRenderer.defaultProps };
  });

  afterEach(() => {
    snapshotHocProps(asAccordionItem, props);

    const wrapper = shallow(<AccordionItem {...props} />).until(AccordionItemRenderer);
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  describe('when device is narrow', () => {
    test('when item is expanded', () => {
      props = {
        ...props,
        itemKey: 1,
        activeKey: 1,
      };
    });

    test('when item is collapsed', () => {
      props = {
        ...props,
        itemKey: 1,
        activeKey: 0,
      };
    });

    test('when animation is off', () => {
      props = {
        ...props,
        animation: false,
      };
    });
  });

  describe('when device is wide', () => {
    beforeEach(() => {
      props.wide = true;
    });

    test('when item is expanded and the first', () => {
      props = {
        ...props,
        isFirst: true,
        itemKey: 1,
        activeKey: 1,
      };
    });

    test('when item is collapsed and the last', () => {
      props = {
        ...props,
        isLast: false,
        itemKey: 1,
        activeKey: 0,
      };
    });
  });
});
