/* eslint-env jest */
import React from 'react';
import snapshotHocProps from 'react-render-counter/utils/testHelpers/snapshotHocProps';
import asAccordion from '../asAccordion';

describe('asAccordion(BaseComponent): NewComponent', () => {
  let props;
  beforeEach(() => {
    props = {
      children: [
        <div key={0} />,
        <div />,
        <div itemKey={2} />,
      ],
    };
  });

  afterEach(() => snapshotHocProps(asAccordion, props));

  describe('with narrow screen', () => {
    test('with default props and single child', () => {
      props.children = <div />;
    });

    test('set default activeKey', () => {
      props = {
        ...props,
        defaultActiveKey: '1',
      };
    });
  });

  describe('with wide screen', () => {
    beforeEach(() => {
      props.wide = true;
    });

    test('with default props and single child', () => {
      props.children = <div />;
    });

    test('set default activeKey', () => {
      props = {
        ...props,
        defaultActiveKey: 1,
      };
    });
  });
});
