var assert = require('assert');
import * as Paging from '../index';
import chai from 'chai';

const expect = chai.expect;
global.__DEV__ = true;

describe('Paging', function () {
    describe('#getTotalPages()', function () {
        it('should return totalPages successfully', function () {
            const props = {
                total: 50,
                pageSize: 10,
            };
            assert.equal(Paging.getTotalPages(props), 5);

            const props2 = {
                total: 55,
                pageSize: 10,
            };
            assert.equal(Paging.getTotalPages(props2), 6);

            const props3 = {
                total: 0,
                pageSize: 10,
            };
            assert.equal(Paging.getTotalPages(props3), 0);
        });
    });

    describe('#intArr()', function () {
        it('should return a array filled with sorted numbers', function () {
            const arr = Paging.intArr(10, 1);

            expect(arr.length).to.equal(10);
            expect(arr).to.have.all.ordered.members([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        });
        it('should return a array filled with sorted numbers when step is exist.', function () {
            const arr = Paging.intArr(10, 1, 2);

            expect(arr.length).to.equal(10);
            expect(arr).to.have.all.ordered.members([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
        });
        it('should return a array filled with sorted numbers when start is not exist.', function () {
            const arr = Paging.intArr(10);
            expect(arr.length).to.equal(10);
            expect(arr).to.have.all.ordered.members([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

            const arr1 = Paging.intArr(1);
            expect(arr1.length).to.equal(1);
            expect(arr1).to.have.all.ordered.members([1]);

            const arr2 = Paging.intArr(5);
            expect(arr2.length).to.equal(5);
            expect(arr2).to.have.all.ordered.members([1, 2, 3, 4, 5]);
        });
        it('should return a array filled with sorted numbers when start is not equal 1.', function () {
            const arr = Paging.intArr(9, 3, 2);
            expect(arr.length).to.equal(9);
            expect(arr).to.have.all.ordered.members([3, 5, 7, 9, 11, 13, 15, 17, 19]);

            const arr1 = Paging.intArr(5, 0, 3);
            expect(arr1.length).to.equal(5);
            expect(arr1).to.have.all.ordered.members([0, 3, 6, 9, 12]);
        });
    });

    describe('#concat()', function () {
        it('should return a flatten array', function () {
            const arr = Paging.concat([1], [2, 3, 4], [5, 6], [7]);

            expect(arr).to.have.all.ordered.members([1, 2, 3, 4, 5, 6, 7])
        })
    });

    describe('#getSiblings()', function () {
        it('should return right siblings successfully when current = 1', function () {
            const pageNums = Paging.getSiblings({
                current: 1,
                pageShowCount: 5,
                edgeWeight: 1,
                total: 55,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([1, 2, 3, 4]);
        });
        it('should return right siblings successfully when current = 2', function () {
            const pageNums = Paging.getSiblings({
                current: 2,
                pageShowCount: 5,
                edgeWeight: 1,
                total: 55,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([1, 2, 3, 4]);
        });
        it('should return right siblings successfully when current = 3', function () {
            const pageNums2 = Paging.getSiblings({
                current: 3,
                pageShowCount: 5,
                edgeWeight: 1,
                total: 55,
                pageSize: 10,
            });
            expect(pageNums2).to.have.all.ordered.members([2, 3, 4]);
        });
        it('should return right siblings successfully when current = 4', function () {
            const pageNums = Paging.getSiblings({
                current: 4,
                pageShowCount: 5,
                edgeWeight: 1,
                total: 55,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([3, 4, 5]);
        });
        it('should return right siblings successfully when current = 10', function () {
            const pageNums2 = Paging.getSiblings({
                current: 10,
                pageShowCount: 5,
                edgeWeight: 1,
                total: 92,
                pageSize: 10,
            });
            expect(pageNums2).to.have.all.ordered.members([7, 8, 9, 10]);
        });
        it('should return right siblings successfully when current = 9', function () {
            const pageNums2 = Paging.getSiblings({
                current: 9,
                pageShowCount: 5,
                edgeWeight: 1,
                total: 92,
                pageSize: 10,
            });
            expect(pageNums2).to.have.all.ordered.members([7, 8, 9, 10]);
        });
        it('should return right siblings successfully when current = 8', function () {
            const pageNums = Paging.getSiblings({
                current: 8,
                pageShowCount: 5,
                edgeWeight: 1,
                total: 92,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([7, 8, 9]);
        });
        it('should return right siblings successfully when current = 1 and pageShowCount = 6', function () {
            const pageNums = Paging.getSiblings({
                current: 1,
                pageShowCount: 6,
                edgeWeight: 1,
                total: 61,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([1, 2, 3, 4, 5]);
        });
        it('should return right siblings successfully when current = 2 and pageShowCount = 6', function () {
            const pageNums = Paging.getSiblings({
                current: 2,
                pageShowCount: 6,
                edgeWeight: 1,
                total: 61,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([1, 2, 3, 4, 5]);
        });
        it('should return right siblings successfully when current = 3 and pageShowCount = 6', function () {
            const pageNums = Paging.getSiblings({
                current: 3,
                pageShowCount: 6,
                edgeWeight: 1,
                total: 61,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([2, 3, 4, 5]);
        });
        it('should return right siblings successfully when current = 4 and pageShowCount = 6', function () {
            const pageNums = Paging.getSiblings({
                current: 4,
                pageShowCount: 6,
                edgeWeight: 1,
                total: 61,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([3, 4, 5, 6]);
        });
        it('should return right siblings successfully when current = 7 and pageShowCount = 6', function () {
            const pageNums = Paging.getSiblings({
                current: 7,
                pageShowCount: 6,
                edgeWeight: 1,
                total: 61,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([3, 4, 5, 6, 7]);
        });
        it('should return right siblings successfully when current = 6 and pageShowCount = 6', function () {
            const pageNums = Paging.getSiblings({
                current: 6,
                pageShowCount: 6,
                edgeWeight: 1,
                total: 61,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([3, 4, 5, 6, 7]);
        });
        it('should return right siblings successfully when current = 5 and pageShowCount = 6', function () {
            const pageNums = Paging.getSiblings({
                current: 5,
                pageShowCount: 6,
                edgeWeight: 1,
                total: 61,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([3, 4, 5, 6, 7]);
        });
        it('should return right siblings successfully when current = 4 and pageShowCount = 6', function () {
            const pageNums = Paging.getSiblings({
                current: 4,
                pageShowCount: 6,
                edgeWeight: 1,
                total: 61,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([3, 4, 5, 6]);
        });
    });

    describe('#getShowNumbers()', function () {
        it('should return truly show page numbers.', function () {
            const pageNums = Paging.getShowNumbers({
                current: 1,
                pageShowCount: 5,
                edgeWeight: 1,
                total: 55,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([1, 2, 3, 4, 6]);
        });
        it('should return truly show page numbers when current = 3.', function () {
            const pageNums = Paging.getShowNumbers({
                current: 3,
                pageShowCount: 5,
                edgeWeight: 1,
                total: 55,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([1, 2, 3, 4, 6]);
        });
        it('should return truly show page numbers when current = 4.', function () {
            const pageNums = Paging.getShowNumbers({
                current: 4,
                pageShowCount: 5,
                edgeWeight: 1,
                total: 55,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([1, 3, 4, 5, 6]);
        });
        it('should return truly show page numbers when current = 4 and pageShowCount = 6.', function () {
            const pageNums = Paging.getShowNumbers({
                current: 4,
                pageShowCount: 6,
                edgeWeight: 1,
                total: 61,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([1, 3, 4, 5, 6, 7]);
        });
        it('should return truly show page numbers when current = 5 and pageShowCount = 6.', function () {
            const pageNums = Paging.getShowNumbers({
                current: 5,
                pageShowCount: 6,
                edgeWeight: 1,
                total: 61,
                pageSize: 10,
            });
            expect(pageNums).to.have.all.ordered.members([1, 3, 4, 5, 6, 7]);
        });
    })
});
