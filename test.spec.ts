import raw from './raw.txt'

describe('some typescript tests', () => {
    it('should work with typescript', () => {
        const x: number = 4;
        expect(x).toBe(4)
    });

    it('should allow non typescript file imports to resolve to strings', () => {
        expect(raw).toEqual('hello world')
    });
})
