const costCalculation = require('./costCalculation');

test('Расчет стоимости для ".doc" на "ua', () => {
  expect(
    costCalculation({
      mimetype: 'doc',
      language: 'ua',
      count: 100,
    }),
  ).toBe(50);
  expect(
    costCalculation({
      mimetype: 'doc',
      language: 'ua',
      count: 1333,
    }),
  ).toBe(66.65);
});
test('Расчет стоимости для ".doc" на "ru', () => {
  expect(
    costCalculation({
      mimetype: 'doc',
      language: 'ru',
      count: 100,
    }),
  ).toBe(50);
  expect(
    costCalculation({
      mimetype: 'doc',
      language: 'ru',
      count: 1333,
    }),
  ).toBe(66.65);
});
test('Расчет стоимости для ".doc" на "en', () => {
  expect(
    costCalculation({
      mimetype: 'doc',
      language: 'en',
      count: 100,
    }),
  ).toBe(120);
  expect(
    costCalculation({
      mimetype: 'doc',
      language: 'en',
      count: 1333,
    }),
  ).toBe(159.96);
});

//--------------------------------------------------
test('Расчет стоимости для ".docx" на "ua', () => {
  expect(
    costCalculation({
      mimetype: 'docx',
      language: 'ua',
      count: 100,
    }),
  ).toBe(50);
  expect(
    costCalculation({
      mimetype: 'docx',
      language: 'ua',
      count: 1333,
    }),
  ).toBe(66.65);
});
test('Расчет стоимости для ".docx" на "ru', () => {
  expect(
    costCalculation({
      mimetype: 'docx',
      language: 'ru',
      count: 100,
    }),
  ).toBe(50);
  expect(
    costCalculation({
      mimetype: 'docx',
      language: 'ru',
      count: 1333,
    }),
  ).toBe(66.65);
});
test('Расчет стоимости для ".docx" на "en', () => {
  expect(
    costCalculation({
      mimetype: 'docx',
      language: 'en',
      count: 100,
    }),
  ).toBe(120);
  expect(
    costCalculation({
      mimetype: 'docx',
      language: 'en',
      count: 1333,
    }),
  ).toBe(159.96);
});

// ---------------------------------------------------------
test('Расчет стоимости для ".rtf" на "ua', () => {
  expect(
    costCalculation({
      mimetype: 'rtf',
      language: 'ua',
      count: 100,
    }),
  ).toBe(50);
  expect(
    costCalculation({
      mimetype: 'rtf',
      language: 'ua',
      count: 1333,
    }),
  ).toBe(66.65);
});
test('Расчет стоимости для ".rtf" на "ru', () => {
  expect(
    costCalculation({
      mimetype: 'rtf',
      language: 'ru',
      count: 100,
    }),
  ).toBe(50);
  expect(
    costCalculation({
      mimetype: 'rtf',
      language: 'ru',
      count: 1333,
    }),
  ).toBe(66.65);
});
test('Расчет стоимости для ".rtf" на "en', () => {
  expect(
    costCalculation({
      mimetype: 'rtf',
      language: 'en',
      count: 100,
    }),
  ).toBe(120);
  expect(
    costCalculation({
      mimetype: 'rtf',
      language: 'en',
      count: 1333,
    }),
  ).toBe(159.96);
});

// ----------------------------------
test('Расчет стоимости не для "doc, docx, rtf" на "ua" ', () => {
  expect(
    costCalculation({
      mimetype: 'pdf',
      language: 'ua',
      count: 100,
    }),
  ).toBe(60);
  expect(
    costCalculation({
      mimetype: 'pdf',
      language: 'ua',
      count: 1333,
    }),
  ).toBe(79.98);
});
test('Расчет стоимости не для "doc, docx, rtf" на "ru" ', () => {
  expect(
    costCalculation({
      mimetype: 'pdf',
      language: 'ru',
      count: 100,
    }),
  ).toBe(60);
  expect(
    costCalculation({
      mimetype: 'pdf',
      language: 'ru',
      count: 1333,
    }),
  ).toBe(79.98);
});
test('Расчет стоимости не для "doc, docx, rtf" на "en" ', () => {
  expect(
    costCalculation({
      mimetype: 'pdf',
      language: 'en',
      count: 100,
    }),
  ).toBe(144);
  expect(
    costCalculation({
      mimetype: 'pdf',
      language: 'en',
      count: 1333,
    }),
  ).toBe(191.95);
});
