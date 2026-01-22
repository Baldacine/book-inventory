export const breakpoints = {
    mobile: '480px',
    tablet: '768px',
    ipad: '1024px',
    mac: '1440px',
    large: '1920px'
};

export const device = {
    mobile: `(max-width: ${breakpoints.mobile})`,
    tablet: `(max-width: ${breakpoints.tablet})`,
    ipad: `(max-width: ${breakpoints.ipad})`,
    mac: `(min-width: ${breakpoints.mac})`,
};