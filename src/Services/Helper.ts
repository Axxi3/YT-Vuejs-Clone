const formatNumber = (value : number) => {
    if(value !== null) {
        if (value >= 1000000){
            return (value / 1000000).toFixed(1) + 'M';
        }
        else if (value >= 1000){
            return (value / 1000).toFixed(1) + 'K';
        }
        else {
            return value.toString();
        }
    } 
    else {
        return '235k'
    }
}