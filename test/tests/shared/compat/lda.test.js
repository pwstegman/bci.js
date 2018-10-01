describe('LDA (deprecated: replaced by ldaLearn and ldaProject)', function () {
	describe('#project', function () {
		it('Should compute LDA projected data', function () {
			var class1 = [
				[0, 0],
				[1, 2],
				[2, 2],
				[1.5, 0.5]
			];

			var class2 = [
				[8, 8],
				[9, 10],
				[7, 8],
				[9, 9]
			];

			var lda = new bci.LDA(class1, class2);

			var unknownPoints = [
				[-1, 0],
				[1.5, 2],
				[3, 3],
				[5, 5],
				[7, 9],
				[10, 12]
			];

			var projections = unknownPoints.map(function (p) {
				return lda.project(p);
			});

			assert(arrayAlmostEqual(projections, [
				-25.45927601809955,
				-14.623303167420817,
				-8.53846153846154,
				0.9638009049773757,
				14.633484162895929,
				28.8868778280543
			]));
		});
	});

	describe('lda', function () {
		it('bci.lda should point to bci.LDA', function () {
			assert.equal(bci.lda, bci.LDA);
		});
	});
});
