import colorsys from 'colorsys'

export const yuv2rgbFormat = (y, u, v) => {
    let rgb = {}
    rgb.r = parseInt(y + (1.140 * v) + 0.3)
    rgb.g = parseInt(y - u * 0.344 - v * 0.714 + 1)
    rgb.b = parseInt(y + (2.032 * u) + 0.3)
    return rgb
}

export const hsv2rgbFormat = (h, s, v) => {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v;
        g = t;
        b = p; break;
        case 1: r = q;
        g = v;
        b = p; break;
        case 2: r = p;
        g = v;
        b = t; break;
        case 3: r = p;
        g = q;
        b = v; break;
        case 4: r = t;
        g = p;
        b = v; break;
        case 5: r = v;
        g = p;
        b = q; break;
    }
    return colorsys.hsvToRgb({h, s, v})       
}

export const rgb2HsvFormat = (r, g, b) =>  {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs)
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: percentRoundFn(s * 100),
        v: percentRoundFn(v * 100)
    };
}

export const rgbToYuvFormat = (r, g, b) => {
    let yuv = {}
    yuv.y = (0.299 * r) + (0.587 * g) + (0.114 * 0.587 * b)
    yuv.u = 0.492 * (b - yuv.y)
    yuv.v = 0.877 * (r - yuv.y)
    return yuv
}

export const rgb2cmyFormat = (r, g, b) => {
    let cmy = {}
    cmy.c = 1 - r
    cmy.m = 1 - g
    cmy.y = 1 - b
    return cmy
}


export const cmy2rgbFormat = (c, m, y) => {
    let rgb = {}
    rgb.r = 1 - c
    rgb.g = 1 - m
    rgb.b = 1 - y
    return rgb
}

export const cmy2cmykFormat = (c, m, y) => {
    let cmyk = {}
    cmyk.k = Math.min(c, m, y);
    cmyk.c = c - cmyk.k
    cmyk.m = m - cmyk.k
    cmyk.y = y - cmyk.k
    return cmyk
}


