
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentDate: this.props.highlightDate}
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
    }

    handleYearChange(change) {
        var date = new Date(this.state.currentDate);
        var newCurrentDate = date.setFullYear(date.getFullYear() + change);
        this.setState({ currentDate: newCurrentDate })
    }

    handleMonthChange(change) {
        var date = new Date(this.state.currentDate);
        var newCurrentDate = date.setMonth(date.getMonth() + change);
        this.setState({ currentDate: newCurrentDate })
    }

    render() {
        var currentDate = new Date(this.state.currentDate);

        var fdayMonth = new Date(currentDate).setDate(1);
        var dayOfWeek = new Date(fdayMonth).getDay();
        var fdayCalendar = new Date(fdayMonth).setDate(1 - dayOfWeek);

        let rows = [];

        var loopDate = new Date(fdayCalendar);
        var currentEvent;
        for (var i = 0; i < this.props.calendarRows; i++) {
            let tds = [];
            for (var j = 0; j < 7; j++) {
               tds.push(
                    <td id={loopDate.toDateString()}
                        className={`${loopDate.wt() === new Date(this.props.highlightDate).wt() ? "today" : ""}
                                    ${loopDate.getMonth() != currentDate.getMonth() ? "inactive-month" : ""}`
                        }
                    >
                        <span className="date">{loopDate.getDate()}</span>
                    </td>
                );
                loopDate.setDate(loopDate.getDate() + 1)
            }
            rows.push(<tr>{tds}</tr>);
          }
        return (<div style={{ display: "contents" }}>

            <table id="calendartable">
                <thead>
                    <tr key="month">
                        <th colSpan="1">
                            <button className="calendar-button" onClick={() => this.handleYearChange(-1)}>&lt;&lt;</button>
                        </th>
                        <th colSpan="1">
                            <button className="calendar-button" onClick={() => this.handleMonthChange(-1)}>&lt;</button>
                        </th>
                        <th colSpan="3">
                            {currentDate.toLocaleString('default', { month: 'short' })}&nbsp; {currentDate.getFullYear()}
                        </th>
                        <th colSpan="1">
                            <button className="calendar-button" onClick={() => this.handleMonthChange(1)}>&gt;</button>
                        </th>
                        <th colSpan="1">
                            <button className="calendar-button" onClick={() => this.handleYearChange(1)}>&gt;&gt;</button>
                        </th>
                    </tr>
                    <tr key="week">
                        {this.props.weekdayFormat.map(day => { return <th className="weekDayNames">{day}</th> })}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
         </div>

        )
    }
}

Calendar.defaultProps =
{
    highlightDate: [new Date()],
    weekdayFormat: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    calendarRows: 6,
};

Date.prototype.wt = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
}

ReactDOM.render(<Calendar></Calendar>,document.getElementById('Calendar'));