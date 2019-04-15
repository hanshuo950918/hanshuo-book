jQuery(document).ready(function($) {

    'use strict';


        $(".Modern-Slider").slick({
            autoplay:true,
            speed:1000,
            slidesToShow:1,
            slidesToScroll:1,
            pauseOnHover:false,
            dots:true,
            fade: true,
            pauseOnDotsHover:true,
            cssEase:'linear',
           // fade:true,
            draggable:false,
            prevArrow:'<button class="PrevArrow"></button>',
            nextArrow:'<button class="NextArrow"></button>', 
          });

        $('#nav-toggle').on('click', function (event) {
            event.preventDefault();
            $('#main-nav').toggleClass("open");
        });


        $('.tabgroup > div').hide();
            $('.tabgroup > div:first-of-type').show();
        //     $('.tabs a').click(function(e){
        //       e.preventDefault();
        //         var $this = $(this),
        //         tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
        //         others = $this.closest('li').siblings().children('a'),
        //         target = $this.attr('href');
        //     others.removeClass('active');
        //     $this.addClass('active');
        //     $(tabgroup).children('div').hide();
        //     $(target).show();
          
        // })



        $(".box-video").click(function(){
          $('iframe',this)[0].src += "&amp;autoplay=1";
          $(this).addClass('open');
        });

        $('.owl-carousel').owlCarousel({
            loop:true,
            margin:30,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:2,
                    nav:false
                },
                1000:{
                    items:3,
                    nav:true,
                    loop:false
                }
            }
        })



        var contentSection = $('.content-section, .main-banner');
        var navigation = $('nav');
        
        //when a nav link is clicked, smooth scroll to the section
        navigation.on('click', 'a', function(event){
            event.preventDefault(); //prevents previous event
            smoothScroll($(this.hash));
        });
        
        //update navigation on scroll...
        $(window).on('scroll', function(){
            updateNavigation();
        })
        //...and when the page starts
        updateNavigation();
        
        /////FUNCTIONS
        function updateNavigation(){
            contentSection.each(function(){
                var sectionName = $(this).attr('id');
                var navigationMatch = $('nav a[href="#' + sectionName + '"]');
                if( ($(this).offset().top - $(window).height()/2 < $(window).scrollTop()) &&
                      ($(this).offset().top + $(this).height() - $(window).height()/2 > $(window).scrollTop()))
                    {
                        navigationMatch.addClass('active-section');
                    }
                else {
                    navigationMatch.removeClass('active-section');
                }
            });
        }
        function smoothScroll(target){
            $('body,html').animate({
                scrollTop: target.offset().top
            }, 800);
        }


        $('.button a[href*=#]').on('click', function(e) {
          e.preventDefault();
          $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top -0 }, 500, 'linear');
        });

        $(".teshu").click(function(){
            $('.zhuce').show();
            $('.rightBox').hide();
        })
        $(".teshu1").click(function(){
            $('.rightBox').show();
            $('.zhuce').hide();
         })

        $('#reg_zhuce').find('button').click(function(){
            $.ajax({
                type: 'post',
                url:'/api/user/register',
                data:{
                    username:$('#reg_zhuce').find('[name="username"]').val(),
                    password:$('#reg_zhuce').find('[name="password"]').val(),
                    password1:$('#reg_zhuce').find('[name="password1"]').val()
                },
                dataType: 'json',
                success: function (result) {
                    $('#reg_zhuce').find('.colWarning').html(result.message);

                    if(!result.code){

                        setTimeout(function(){
                            $('.rightBox').show();
                            $('.zhuce').hide();
                        },1000);
                        
                    }
                }
            });
        });

        $('.rightBox').find('button').click(function(){
            $.ajax({
                type:'post',
                url:'api/user/login',
                data:{
                    username:$('.rightBox').find('[name="username"]').val(),
                    password:$('.rightBox').find('[name="password"]').val() 
                },
                dataType:'json',
                success:function(result){

                  $('.rightBox').find('.colWarning').html(result.message);

                  if(!result.code){
                    //登陆成功
                    // setTimeout(function(){
                    //     $('.rightBox').hide();
                    //     $('.yonghuxinxi').show();

                    //     //显示登陆用户的信息
                    //     $('.yonghuxinxi').find('.username').html( result.userInfo.username );
                    //     $('.yonghuxinxi').find('.info').html('你好，欢迎光临我的博客！');

                    // },1000);
                    window.location.reload();
                    
                }
                }
            })

         });
         //退出
         $('#logout').click(function(){
          $.ajax({
            url:'/api/user/logout',
            success:function(result){
              if(!result.code){
                window.location.reload();
              }
            }
          })
        })


});