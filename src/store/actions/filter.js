
export const filterValueChange = (newvalues, accid, innerid) => {
    return dispatch =>{
        dispatch({
            type: 'filter_value_change',
            newvalues: newvalues,
            accid: accid,
            innerid: innerid
        });
    }
}