const deviceSizes = {
  mobile: '1024px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
};

const colors = {
  charcoalGrey: '#464052',
  black: '#000',
  coolGrey: '#A4A6B0',
  battleshipGrey: '#74747E',
  paleLilac: '#E6E6EB',
  paleGrey: '#F9F9FB',
};

const theme = {
  device,
  colors,
};

export default theme;
