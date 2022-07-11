import { merkletree_generator } from '../index';
import path from 'path';

test('test merkle generator', () => {
    const originalpath = path.join(__dirname, 'example/example_format_3.json');
    const generatedPath = path.join(__dirname, 'example/result.json');
    const merkleResult = merkletree_generator(originalpath, generatedPath);
    expect(merkleResult.merkleRoot).not.toBeNull();
})
