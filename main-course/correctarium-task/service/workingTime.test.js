const workingTime = require('./workingTime');
describe('Расчет времени в часах для выполнения задания для ".doc":', () => {
  test('текст на "ua"', () => {
    expect(
      workingTime({
        mimetype: 'doc',
        language: 'ua',
        count: 100,
      }),
    ).toBe(60);
    expect(
      workingTime({
        mimetype: 'doc',
        language: 'ua',
        count: 1333,
      }),
    ).toBe(90);
  });
  test('текст на "ru"', () => {
    expect(
      workingTime({
        mimetype: 'doc',
        language: 'ru',
        count: 100,
      }),
    ).toBe(60);
    expect(
      workingTime({
        mimetype: 'doc',
        language: 'ru',
        count: 1333,
      }),
    ).toBe(90);
  });
  test('текст на "en"', () => {
    expect(
      workingTime({
        mimetype: 'doc',
        language: 'en',
        count: 100,
      }),
    ).toBe(60);
    expect(
      workingTime({
        mimetype: 'doc',
        language: 'en',
        count: 333,
      }),
    ).toBe(90);
  });
});
describe('Расчет времени в часах для выполнения задания для ".docx":', () => {
  test('текст на "ua', () => {
    expect(
      workingTime({
        mimetype: 'docx',
        language: 'ua',
        count: 100,
      }),
    ).toBe(60);
    expect(
      workingTime({
        mimetype: 'docx',
        language: 'ua',
        count: 1333,
      }),
    ).toBe(90);
  });
  test('текст на "ru', () => {
    expect(
      workingTime({
        mimetype: 'docx',
        language: 'ru',
        count: 100,
      }),
    ).toBe(60);
    expect(
      workingTime({
        mimetype: 'docx',
        language: 'ru',
        count: 1333,
      }),
    ).toBe(90);
  });
  test('текст на "en', () => {
    expect(
      workingTime({
        mimetype: 'docx',
        language: 'en',
        count: 100,
      }),
    ).toBe(60);
    expect(
      workingTime({
        mimetype: 'docx',
        language: 'en',
        count: 333,
      }),
    ).toBe(90);
  });
});
describe('Расчет времени в часах для выполнения задания для ".rtf":', () => {
  test('текст на "ua', () => {
    expect(
      workingTime({
        mimetype: 'rtf',
        language: 'ua',
        count: 100,
      }),
    ).toBe(60);
    expect(
      workingTime({
        mimetype: 'rtf',
        language: 'ua',
        count: 1333,
      }),
    ).toBe(90);
  });
  test('текст на "ru', () => {
    expect(
      workingTime({
        mimetype: 'rtf',
        language: 'ru',
        count: 100,
      }),
    ).toBe(60);
    expect(
      workingTime({
        mimetype: 'rtf',
        language: 'ru',
        count: 1333,
      }),
    ).toBe(90);
  });
  test('текст на "en', () => {
    expect(
      workingTime({
        mimetype: 'rtf',
        language: 'en',
        count: 100,
      }),
    ).toBe(60);
    expect(
      workingTime({
        mimetype: 'rtf',
        language: 'en',
        count: 333,
      }),
    ).toBe(90);
  });
});
describe('Расчет времени в часах для выполнения задания не для "doc, docx, rtf":', () => {
  test('текст на "ua" ', () => {
    expect(
      workingTime({
        mimetype: 'pdf',
        language: 'ua',
        count: 100,
      }),
    ).toBe(72);
    expect(
      workingTime({
        mimetype: 'pdf',
        language: 'ua',
        count: 1333,
      }),
    ).toBe(108);
  });
  test('текст на "ru" ', () => {
    expect(
      workingTime({
        mimetype: 'pdf',
        language: 'ru',
        count: 100,
      }),
    ).toBe(72);
    expect(
      workingTime({
        mimetype: 'pdf',
        language: 'ru',
        count: 1333,
      }),
    ).toBe(108);
  });
  test('текст на "en" ', () => {
    expect(
      workingTime({
        mimetype: 'pdf',
        language: 'en',
        count: 100,
      }),
    ).toBe(72);
    expect(
      workingTime({
        mimetype: 'pdf',
        language: 'en',
        count: 333,
      }),
    ).toBe(108);
  });
});
