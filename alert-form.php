<script type="text/javascript">
$(document).ready(function(){
  $('#alert_email').prop('required', true).val('');
  $('#alert_email').attr('placeholder', '<?php echo osc_esc_js(__('أدخل بريدك الإلكتروني', 'starter')) ; ?>');

  $('.alert-show').click(function(e) {
    e.preventDefault();
    $('#n-block .top').slideUp(300, function(){
      $('#n-block .bot').slideDown(300);
    });
  });


  $(".alert-notify").click(function(e){
    e.preventDefault();
    
    if(($("#alert_email").val() == '' || !strIsEmail($("#alert_email").val())) && parseInt($("#alert_userId").val()) <= 0) {
      $("#alert_email").focus();
      return false;
    }
    
    $.post(
      '<?php echo osc_base_url(true); ?>', 
      {
        email: $("#alert_email").val(), 
        userid: $("#alert_userId").val(), 
        alert: $("#alert").val(), 
        page:"ajax", 
        action:"alerts"
      }, 
      
      function(data){
        if(data==1) {
          if (!!$.prototype.fancybox) {
            $.fancybox({
              'padding':  0,
              'width':    640,
              'minHeight': 100,
              'height':   240,
              'autoSize': false,
              'autoDimensions': false,
              'closeBtn' : true,
              'wrapCSS':  'alert-func',
              'content':  '<div id="alert-ok" class="fw-box alert-messages">' + $('.fw-box#alert-ok').html() + '</div>'
            });
          }
        } else if(data==-1) { 
          if (!!$.prototype.fancybox) {
            $.fancybox({
              'padding':  0,
              'width':    640,
              'minHeight': 100,
              'height':   240,
              'autoSize': false,
              'autoDimensions': false,
              'closeBtn' : true,
              'wrapCSS':  'alert-func',
              'content':  '<div id="alert-email" class="fw-box alert-messages">' + $('.fw-box#alert-email').html() + '</div>'
            });
          }
        } else if(data==0) { 
          if (!!$.prototype.fancybox) {
            $.fancybox({
              'padding':  0,
              'width':    640,
              'minHeight': 100,
              'height':   240,
              'autoSize': false,
              'autoDimensions': false,
              'closeBtn' : true,
              'wrapCSS':  'alert-func',
              'content':  '<div id="alert-error" class="fw-box alert-messages">' + $('.fw-box#alert-error').html() + '</div>'
            });
          }
        }
    });

    return false;
  });
});

function strIsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
</script>

<div id="n-block" class="block <?php if(osc_is_web_user_logged_in()) { ?>logged_user<?php } else { ?>unlogged_user<?php } ?>">
  <div class="n-wrap">
    <h3><?php _e('يشترك', 'starter'); ?></h3>
    <div class="text"><?php _e('احصل على قوائم جديدة تطابق معايير البحث هذه على الفور إلى بريدك الإلكتروني.', 'starter'); ?></div>

    <form action="<?php echo osc_base_url(true); ?>" method="post" name="sub_alert" id="sub_alert">
      <?php AlertForm::page_hidden(); ?>
      <?php AlertForm::alert_hidden(); ?>
      <?php AlertForm::user_id_hidden(); ?>

      <?php if(osc_is_web_user_logged_in()) { ?>

        <?php AlertForm::email_hidden(); ?>
        <button type="button" class="btn btn-secondary alert-notify"><?php _e('اشترك في هذا البحث', 'starter'); ?></button>

      <?php } else { ?>
        <div class="n-box">
          <?php AlertForm::email_text(); ?>
          <button type="button" class="btn btn-secondary alert-notify"><?php _e('يشترك', 'starter'); ?></button>
        </div>
      <?php } ?>
    </form>
  </div>
</div>



<!-- ALERT MESSAGES -->
<div class="alert-fancy-boxes">
  <div id="alert-ok" class="fw-box">
    <div class="head">
      <h2><?php _e('اشترك في التنبيه', 'starter'); ?></h2>
    </div>

    <div class="middle">
      <div class="a-message">
        <div class="icon good"><i class="fa fa-check-circle"></i></div>
        <span class="first"><?php _e('لقد قمت بالاشتراك بنجاح في التنبيه!', 'starter'); ?></span>
        <span><?php _e('ستتلقى إشعارًا على بريدك الإلكتروني بمجرد وجود قائمة جديدة تتوافق مع معايير البحث الخاصة بك.', 'starter'); ?></span>
      </div>
    </div>
  </div>

  <div id="alert-email" class="fw-box">
    <div class="head">
      <h2><?php _e('اشترك في التنبيه', 'starter'); ?></h2>
    </div>

    <div class="middle">
      <div class="a-message">
        <div class="icon bad"><i class="fa fa-times-circle"></i></div>
        <span class="first"><?php _e('حدث خطأ أثناء عملية الاشتراك!', 'starter'); ?></span>
        <span><?php _e('لقد أدخلت عنوان البريد الإلكتروني بتنسيق غير صحيح أو لم تقم بإدخال عنوان البريد الإلكتروني.', 'starter'); ?></span>
      </div>
    </div>
  </div>

  <div id="alert-error" class="fw-box">
    <div class="head">
      <h2><?php _e('اشترك في التنبيه', 'starter'); ?></h2>
    </div>

    <div class="middle">
      <div class="a-message">
        <div class="icon good"><i class="fa fa-check-circle"></i></div>
        <span class="first"><?php _e('لقد اشتركت بالفعل في هذا البحث.', 'starter'); ?></span>
        <span><?php _e('يمكنك العثور على التنبيهات التي اشتركت فيها في حسابك.', 'starter'); ?></span>
      </div>
    </div>
  </div>
</div>