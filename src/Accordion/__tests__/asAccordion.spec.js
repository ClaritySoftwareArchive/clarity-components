/* eslint-env jest */
import React from 'react';
import snapshotHocProps from 'react-render-counter/utils/testHelpers/snapshotHocProps';
import asAccordion from '../asAccordion';

describe('asAccordion(BaseComponent): NewComponent', () => {
  let props;
  let children;
  beforeEach(() => {
    children = [
      <div key="1" />,
      <div key="2" />,
    ];
  });

  afterEach(() => snapshotHocProps(asAccordion, props));

  describe('with narrow screen', () => {
    test('with default props', () => {
      props = { children };
    });

    test('set default activeKey', () => {
      props = {
        defaultActiveKey: 1,
        children,
      };
    });
  });

  describe('with wide screen', () => {
    beforeEach(() => {
      props.wide = true;
    });

    test('with default props', () => {
      props = {
        ...props,
        children,
      };
    });
  });
});
