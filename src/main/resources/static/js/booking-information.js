// khai bao ajax


$(document).ready(function () {
    $('#loopkUpFrom').submit(function (event) {
        event.preventDefault();
        $.ajax(
            {
                context: this, //trong pham vi event hanlder this chinh la phan tu dang kich hoat su kien
                url: '/lookup',
                type: 'POST',
                data: $(this).serialize(),
                success: function (result) {
                    if (result == "not found") {
                        $('#not-found-error').html('Mã đặt phòng không tồn tại trong hệ thống!')
                    } else {
                        this.submit();
                    }

                }
            }
        )
    });

})


// vo hieu hoa click tren moi tab
$("#bookingInfoTab, #personalTab, #paymentTab, #doneTab").click(function (event) {
    event.preventDefault()
    event.stopPropagation();
});


if ($("#promotion").length || !$(".single-room-details.fix").length) {
    // neu co ton tai phan tu h4#promotion (hien thi promotion value)
    // vo hieu hoa form (checkpromtion)
    $("#promotionForm").hide();

}

$("#nextToPersonal").click(function () {
    $("#bookingInfoTab, #personalTab, #paymentTab, #doneTab").off('click');
    $("#personalTab").click();
    $("#bookingInfoTab, #personalTab, #paymentTab, #doneTab").click(function (event) {
        event.preventDefault()
        event.stopPropagation();
    });

});


$("#personalForm").submit(function (event) {
    $("#bookingInfoTab, #personalTab, #paymentTab, #doneTab").off('click');
    event.preventDefault();
    $("#paymentTab").click();
    $("#bookingInfoTab, #personalTab, #paymentTab, #doneTab").click(function (event) {
        event.preventDefault()
        event.stopPropagation();
    });
});

$("#payForm").submit(function (event) {
    event.preventDefault();
    $('#credit-cart-error').html('<img src="http://preloaders.net/preloaders/287/Filling%20broken%20ring.gif"> loading...');
    var queryString = $(this).serialize() + '&' + $('#personalForm').serialize();
    $.ajax(
        {
            url: '/booking-process',
            type: "POST",
            data: queryString,
            success: function (result) {
                console.log(result);
                // XU LY LOGIC O DAY
                if (result == "not match") {
                    $('#credit-cart-error').html("Thông tin thẻ không chính xác");
                    return;
                } else if (result == "not enough") {
                    $('#credit-cart-error').html("Thẻ hiện không có đủ tiền");
                    return;
                }


                // neu thanh cong thi redirect den /booking-done/<bookingDone>
                window.location.replace('/booking-done/' + result)

                // $('#bookingCode').html('Mã đặt phòng của bạn là: ' + result.);
                // $("#bookingInfoTab, #personalTab, #paymentTab, #doneTab").off('click');
                // $('#doneTab').click();
                // $("#bookingInfoTab, #personalTab, #paymentTab, #doneTab").click(function (event) {
                //     event.preventDefault()
                //     event.stopPropagation();
                // });
            }


        }
    )
});


