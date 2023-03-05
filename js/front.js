$(function () {
  
    // ------------------------------------------------------ //
    // For demo purposes, can be deleted
    // ------------------------------------------------------ //

    // var stylesheet = $('link#theme-stylesheet');
    // $( "<link id='new-stylesheet' rel='stylesheet'>" ).insertAfter(stylesheet);
    // var alternateColour = $('link#new-stylesheet');

    // if ($.cookie("theme_csspath")) {
    //     alternateColour.attr("href", $.cookie("theme_csspath"));
    // }

    // $("#colour").change(function () {

    //     if ($(this).val() !== '') {

    //         var theme_csspath = 'css/style.' + $(this).val() + '.css';

    //         alternateColour.attr("href", theme_csspath);

    //         $.cookie("theme_csspath", theme_csspath, { expires: 365, path: document.URL.substr(0, document.URL.lastIndexOf('/')) });

    //     }

    //     return false;
    // });



    const btn = document.getElementById("menu-open");
    const mask = document.getElementById("menu-close");
    const body = document.body;
    let documentTop = 0; 
    btn.addEventListener("click", e => {
        mask.classList.remove("hide");
        documentTop = document.scrollingElement.scrollTop;
        body.style.position = "fixed"
        body.style.top = -documentTop + "px";
    })
    mask.addEventListener("click", e => {
        mask.classList.add("hide");
        body.style.position = "static";
        body.style.top = "auto";
        document.scrollingElement.scrollTop = documentTop;
    })



    $('.m-footer .list-item').on('click', function (e) {
      console.log('aaaaaaaaaaaa',e.target.className)
      if(e.target.className.includes('open')){
        e.target.className = e.target.className.replace('open','')
      }else{
        e.target.className = `${e.target.className} open`
      }
  });


    // =====================================================
    //      NAVBAR
    // =====================================================
    var c, currentScrollTop = 0;
    $(window).on('scroll load', function () {
        if ($(window).scrollTop() >= 10) {
            $('header.header').addClass('active');
        } else {
            $('header.header').removeClass('active');
        }
        // Navbar functionality
        var a = $(window).scrollTop(), b = $('.header.header').height();
        currentScrollTop = a;
        if (c < currentScrollTop && a > b + b) {
            $('header.header').addClass("scrollUp");
        } else if (c > currentScrollTop && !(a <= b)) {
            $('header.header').removeClass("scrollUp");
        }
        c = currentScrollTop;
    });


    // =====================================================
    //      PREVENTING URL UPDATE ON NAVIGATION LINK
    // =====================================================
    $('.link-scroll').on('click', function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 100
        }, 1000);

        e.preventDefault();
    });


    // =====================================================
    //      SCROLL SPY
    // =====================================================
    $('body').scrollspy({
        target: '#navbarSupportedContent',
        offset: 80
    });


    

});


function handleContact() {
    let name = $('#name').val();
    let company = $('#company').val();
    let phone = $('#phone').val();
    if (!name) {
        alert("姓名不能为空");
        return;
      }
      if (!company) {
        alert("公司不能为空");
        return;
      }
      if (!phone) {
        alert("联系电话不能为空");
        return;
      }
    if (!phone || !(/^1[3456789]\d{9}$/.test(phone))) {
      alert("请输入正确的联系电话");
      return;
    }
    // var reg = new RegExp("^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$"); //正则表达式
    // if (email === "") { //输入不能为空
    //   alert("邮箱不能为空");
    //   return false;
    // }
    // else if (!reg.test(email)) { //正则验证不通过，格式不对
    //   alert("请输入正确的邮箱");
    //   return false;
    // }
    // if (!desc) {
    //   alert("请输入您想了解的内容");
    //   return false;
    // }
    let param = {
      "name": name,
      "email": '',
      "phone": phone,
      "desc": company,
      "source": "1"
    };
    $.ajax({
      type: "POST",
      url: "http://www.delightgo.com:8029/send_email",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(param),
      complete: function (XMLHttpRequest, textStatus) {
        if (XMLHttpRequest.status === 200 && XMLHttpRequest.responseText === "success") {
          console.log("请求成功")
          alert("已将您的信息提交给管理员，请耐心等待...");
          $('#name').val('');
          $('#phone').val('');
          $('#company').val('');
          this.role = '';
          this.know = [];
        } else {
          console.log("请求失败")
        }
      }
    });
}

function showModal(){
    $('#apply-modal').removeClass("hidden");
}
function hiddenModal(){
    $('#apply-modal').addClass("hidden");
}

function mobileOpenMenu() {
  // console.log();
  if($('.head-menus').attr('class').includes('open')){
    $('.head-menus').removeClass("open");
  }else{
    $('.head-menus').addClass("open");
  }
}

