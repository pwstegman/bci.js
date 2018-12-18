describe('transpose', function(){
    it('Transposes an array', function(){
        let array = [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [10,11,12]
        ];

        let expected = [
            [1, 4, 7, 10],
            [2, 5, 8, 11],
            [3, 6, 9, 12]
        ];

        var transposed = bci.transpose(array);

        assert.deepEqual(expected, transposed);
    });
});
