const fontSizesToUse = [10, 12, 14, 16, 18, 20, 22, 26, 28, 32, 36, 42, 46, 52, 58];

var fontSizePattern = new RegExp(`text-(${fontSizesToUse.join('|')})`);

module.exports = { fontSizesToUse, fontSizePattern };
