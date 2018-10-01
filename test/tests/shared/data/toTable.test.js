describe('toTable', function(){
    it('Returns an ASCII table representation of an array', function(){
        var testArray = [[1,2],[3,4]];
        var tableASCII = bci.toTable(testArray);
        assert.equal(tableASCII, '0  1\n-  -\n1  2\n3  4\n');
    });
});
