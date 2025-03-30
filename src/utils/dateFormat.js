import moment from "moment";
import 'moment/dist/locale/az';


export const dateFormat = (date) => {
    moment.locale('az');
    const formattedDate = moment(date).fromNow();
    return formattedDate;
}
