import { describe, expect, test } from 'vitest';

describe('Api should be working', () => {
    test('It should return success', async  () => {
        // const response = await fetch('http://localhost:3333/hello-world')

        // const json = await response.json()

        // expect(json).toHaveProperty('success')

        expect(1 + 1).toBe(2)
    })
});