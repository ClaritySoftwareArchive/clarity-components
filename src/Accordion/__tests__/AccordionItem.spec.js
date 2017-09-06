/* eslint-env jest */
import React from 'react';
import enzymeToJson from 'enzyme-to-json';
import { shallowWithUntil as shallow } from 'react-render-counter/utils/testHelpers/until';
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
  });

  describe('when device is wide', () => {
    beforeEach(() => {
      props.wide = true;
    });

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
  });
});
