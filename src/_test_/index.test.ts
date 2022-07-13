import { merkletree_generator } from '../index';
import path from 'path';

test('test merkle generator basing on format data 1', () => {
    const originalpath = path.join(__dirname, 'example/example_format_1.json');
    const generatedPath = path.join(__dirname, 'example/result.json');
    const merkleResult = merkletree_generator(originalpath, generatedPath);
    expect(merkleResult.merkleRoot).not.toBeNull();
})

test('test merkle generator basing on format data 2', () => {
    const originalpath = path.join(__dirname, 'example/example_format_2.json');
    const generatedPath = path.join(__dirname, 'example/result.json');
    const merkleResult = merkletree_generator(originalpath, generatedPath);
    expect(merkleResult.merkleRoot).not.toBeNull();
})

test('test merkle generator basing on format data 3', () => {
    const originalpath = path.join(__dirname, 'example/example_format_3.json');
    const generatedPath = path.join(__dirname, 'example/result.json');
    const merkleResult = merkletree_generator(originalpath, generatedPath);
    expect(merkleResult.merkleRoot).not.toBeNull();
})

test('test merkle generator basing on format data 4', () => {
    const originalpath = path.join(__dirname, 'example/example_format_4.json');
    const generatedPath = path.join(__dirname, 'example/result.json');
    const merkleResult = merkletree_generator(originalpath, generatedPath);
    expect(merkleResult.merkleRoot).not.toBeNull();
})
