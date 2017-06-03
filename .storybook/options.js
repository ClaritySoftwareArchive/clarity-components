import qs from 'query-string';
import pkg from '../starter/config/minimal-package';

const getResponsiveOptions = () => {
  if (typeof window === 'undefined') return {};

  const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  return {
    downPanelInRight: width > 1200,
    goFullScreen: width < 600,
  }
};

export const getOptionsFromUrl = () => {
  if (typeof window === 'undefined') return {};
  const queryString = location.search.substring(1);
  if (!queryString || queryString === '') return {};
  const parsedQs = qs.parse(queryString);
  const {
    full,
    down,
    left,
    panelRight,
  } = parsedQs;

  const options = {};

  if (typeof full !== 'undefined') options.goFullScreen = Boolean(Number(full));
  if (typeof down !== 'undefined') options.showDownPanel = Boolean(Number(down));
  if (typeof left !== 'undefined') options.showLeftPanel = Boolean(Number(left));
  if (typeof panelRight !== 'undefined') options.downPanelInRight = Boolean(Number(panelRight));

  return options;
};

const defaultOptions = {
  name: pkg.name,
  url: pkg.repository.url,
  showLeftPanel: true,
  showDownPanel: true,
  downPanelInRight: true,
};

export default {
  ...defaultOptions,
  // ...getResponsiveOptions(),
  // ...getOptionsFromUrl(),
};
