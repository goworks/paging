import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import isUndefined from 'lodash/isUndefined';
import classNames from 'classnames';
import {withState} from 'recompose';
import * as PagerUtils from '../index';

function Btn(props) {
    return (
        <div
            className={classNames('tiny-btn', {
                isCurrent: props.isCurrent,
            })}
            onClick={props.onClick}
        >{props.children}</div>
    );
}

Btn.propTypes = {
    onClick: PropTypes.func,
    isCurrent: PropTypes.bool,
};
Btn.defaultProps = {
    onClick: noop,
    isCurrent: false,
};

Btn.displayName = 'Btn';

function TinyPagination(props) {
    const {
        className,
        current, changeCurrent,
        onChange,
    } = props;
    const showNumbers = PagerUtils.getShowNumbers(props);
    const btns = [];

    function handleClick(num) {
        onChange && onChange(num);
        changeCurrent(num);
    }

    let prevNum;
    showNumbers.forEach((num) => {
        const btn = (
            <Btn
                key={String(num)}
                onClick={() => handleClick(num)}
                isCurrent={current === num}
            >{num}</Btn>
        );
        if (!isUndefined(prevNum) && prevNum !== num - 1) {
            btn.push(<span className="page-ellipsis">...</span>);
        }
        btns.push(btn);
    });

    return (
        <div className={classNames('tiny-pagination', className)}>{btns}</div>
    );
}

TinyPagination.propTypes = {
    onChange: PropTypes.func,
    current: PropTypes.number,
    changeCurrent: PropTypes.func,
};

TinyPagination.defaultProps = {
    onChange: noop,
    edgeWeight: 1,
    defaultCurrent: 1,
    total: 50,
    pageShowCount: 5,
    pageSize: 10,
    hideOnlyOnePage: true,
};

TinyPagination.displayName = 'TinyPagination';

export default withState('current', 'changeCurrent', 1)(TinyPagination);
