const sum = require('./sum');

test('verificando se a função sum está funcionando', () => {
    const resultado = sum(8, 5)
    expect(resultado).toBe(13)
})