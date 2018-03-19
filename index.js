import toArray from 'lodash/toArray';
import has from 'lodash/has';
import every from 'lodash/every';
import first from 'lodash/first';
import last from 'lodash/last';
import tail from 'lodash/tail';

/**
 * 不为null
 * @param x
 * @returns {boolean}
 */
export function existy(x) {
    return x != null;
}

export function concat(...args) {
    const head = first(args);
    if (!existy(head)) {
        return [];
    }
    // eslint-disable-next-line
    return head.concat.apply(head, tail(args));
}

/**
 * 判断一个对象是否应某些属性
 * @returns {func}
 */
export function hasKeys(...args) {
    const KEYS = toArray(args);
    const func = function (obj) {
        return every(KEYS, k => has(obj, k));
    };
    func.message = concat(['Must have values for keys:'], KEYS).join(' ');
    return func;
}

/**
 * 参数校验器
 * @param message
 * @param fun
 * @returns {f}
 */
export function validator(message, fun) {
    const f = function (...args) {
        return fun.apply(fun, ...args);
    };
    f.message = message;
    return f;
}

/**
 * 获取总页数
 * @param props
 * @returns {number}
 */
export function getTotalPages(props) {
    const {total, pageSize} = props;
    return Math.ceil(total / pageSize);
}

/**
 * 返回填充数字的数组
 * @param len
 * @param start
 * @param step
 * @returns {Array}
 */
export function intArr(len, start = 1, step = 1) {
    const arr = new Array(len);
    for (let i = 0; i < len; i += 1) {
        arr[i] = start + (step * i);
    }
    return arr;
}


/**
 * 获取current的兄弟按钮包括自己
 * @param props
 * @returns {Array}
 */
export function getSiblings(props) {
    const {current, pageShowCount, edgeWeight} = props;
    const padding = edgeWeight * 2;
    const siblingCount = pageShowCount - padding;
    const totalPage = getTotalPages(props);
    const halfCount = Math.floor((siblingCount + 1) / 2);
    const startSingular = edgeWeight + halfCount; // 左奇点
    let endSingular = totalPage - edgeWeight - halfCount; // 左奇点

    if (siblingCount % 2 !== 0) {
        endSingular += 1;
    }

    if (__DEV__) {
        console.log(`开始执行getSiblings：startSingular: ${startSingular}, endSingular: ${endSingular}`);
    }
    // 处理起始的边界值
    if (current < startSingular) {
        if (__DEV__) {
            console.log(`命中左边界, half: ${halfCount}, current: ${current}`);
        }
        return intArr(pageShowCount - 1);
    }
    // 处理结束的边界值
    if (current > endSingular) {
        if (__DEV__) {
            console.log(`命中右边界, half: ${halfCount}, current: ${current}`);
        }
        return intArr(pageShowCount - 1, (totalPage - pageShowCount) + edgeWeight + 1);
    }
    if (__DEV__) {
        console.log(`未命中边界 current: ${current}, half: ${halfCount}, siblingCount: ${siblingCount}`);
    }
    const start = current - Math.floor((siblingCount - 0.5) / 2);
    return intArr(siblingCount, start);
}

/**
 * 获取分页需要按钮数字
 * @param props
 * @returns {Array}
 */
export function getShowNumbers(props) {
    const {pageShowCount, hideOnlyOnePage, edgeWeight} = props;
    const totalPages = getTotalPages(props);

    if (totalPages === 1 && hideOnlyOnePage) {
        return [];
    }

    if (totalPages <= pageShowCount) {
        return intArr(totalPages);
    }

    const siblings = getSiblings(props);

    const attachLeftEdge = (function () {
        const firstNum = first(siblings);
        const leftEdge = [];
        for (let i = 1; i <= edgeWeight && i < firstNum; i += 1) {
            leftEdge.push(i);
        }
        return leftEdge;
    }());

    const attachRightEdge = (function () {
        const lastNum = last(siblings);
        const rightEdge = [];
        for (let i = totalPages, w = 0; w < edgeWeight && i > lastNum; i -= 1, w += 1) {
            rightEdge.push(i);
        }
        return rightEdge.reverse();
    }());

    if (__DEV__) {
        console.log(`#getShowNumbers() return:
            attachLeftEdge：${attachLeftEdge},
            siblings：${siblings},
            attachRightEdge：${attachRightEdge}
        `);
    }

    return concat(attachLeftEdge, siblings, attachRightEdge);
}

