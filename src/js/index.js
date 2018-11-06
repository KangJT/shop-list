require(['jquery', 'swiper', 'bscroll'], function($, swiper, bscroll) {
    new bscroll('.left');
    new bscroll('.right');
    $.ajax({
        url: "/api/index.swiper",
        success: function(data) {
            var data = JSON.parse(data);
            if (data.code === 0) {
                var listleft = document.querySelector('.listleft');
                var dat = data.success;
                var str = '';
                $.each(dat, function(i, item) {
                    if (i === 0) {
                        str += `<li class='active'>${item.tile}</li>`
                    } else {
                        str += `<li>${item.tile}</li>`
                    }

                })
                listleft.innerHTML = str;
            } else {
                console.log('没有访问到数据')
            }
        }
    })
})