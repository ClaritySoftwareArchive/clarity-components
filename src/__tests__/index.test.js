/* eslint-env jest */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import components, { Image, withImage } from '../index';
import Image1, { withImage as withImage1 } from '../Image';

describe('[entry]index.js', () => {
  it('should export components hierarchically', () => {
    expect(Image).not.to.be.undefined;
    expect(Image).to.equal(components.Image);
    expect(Image).to.equal(Image1);

    expect(withImage).not.to.be.undefined;
    expect(withImage).to.equal(components.withImage);
    expect(withImage).to.equal(withImage1);
  });
});
