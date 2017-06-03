import ImageRenderer from './ImageRenderer';
import withImage from './withImage';

const Image = withImage(ImageRenderer);
Image.displayName = 'Image';

export default Image;
