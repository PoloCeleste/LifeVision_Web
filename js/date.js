var selectedDate;

$(document).ready(function() {
    $(".datepicker").datepicker({
        closeText: "닫기",
        prevText: "이전달",
        nextText: "다음달",
        currentText: "오늘",
        monthNames: ["1월", "2월", "3월", "4월", "5월", "6월",
        "7월", "8월", "9월", "10월", "11월", "12월"
        ],
        monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월",
        "7월", "8월", "9월", "10월", "11월", "12월"
        ],
        dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
        weekHeader: "주",
        dateFormat: "yy-mm-dd",
        firstDay: 0,
        isRTL: false,
        todayHighlight :true,
        showMonthAfterYear: true,
        yearSuffix: "년",
        onSelect: function(date) {
            selectedDate = date;
            const event = new CustomEvent('dateSelected', { detail: date });
            document.dispatchEvent(event);
            console.log("Select : "+selectedDate);
        }
    });
    $(".datepicker").datepicker();
});